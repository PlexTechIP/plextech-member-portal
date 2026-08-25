# type: ignore
from time import sleep
from os import getenv
from dotenv import load_dotenv
from datetime import datetime, timedelta
from threading import Thread
from flask import Flask
import requests
import mysql.connector
import logging
import json
import uuid

logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")

load_dotenv()

app = Flask(__name__)


def get_db():
    return mysql.connector.connect(
        host=getenv("MYSQL_HOST"),
        user=getenv("MYSQL_USER"),
        password=getenv("MYSQL_PASSWORD"),
        database=getenv("MYSQL_DATABASE"),
    )


def execute_query(query, params=None, fetch=True):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(query, params or ())
        if fetch:
            result = cursor.fetchall()
        else:
            db.commit()
            result = cursor.lastrowid
        return result
    except Exception as e:
        logging.error(f"Database error: {str(e)}")
        db.rollback()
        raise
    finally:
        cursor.close()
        db.close()


def ensure_pending_mfa_row(request_id: str):
    execute_query(
        """
        INSERT INTO mfa (id, code) VALUES (%s, NULL)
        ON DUPLICATE KEY UPDATE code = NULL, created_at = CURRENT_TIMESTAMP
        """,
        (request_id,),
        fetch=False,
    )


def next_business_day():
    date = datetime.now() + timedelta(days=1)
    while date.weekday() >= 5:
        date += timedelta(days=1)
    return date.strftime("%Y-%m-%d")

def mark_request_error(request_id: str, message: str):
    try:
        logging.error("marking request %s as errors: %s", request_id, message)
        execute_query(
            "UPDATE requests SET status = 'errors' WHERE id = %s",
            (request_id,),
            fetch=False,
        )
    except Exception:
        logging.error("failed to mark request error", exc_info=True)


def normalize_name(name: str) -> str:
    return " ".join((name or "").strip().lower().split())


def extract_last4(value) -> str | None:
    if value is None:
        return None
    s = str(value)
    digits = "".join(ch for ch in s if ch.isdigit())
    return digits[-4:] if len(digits) >= 4 else None


def reconcile_existing_payee(
    s,
    login_data,
    user_id: str,
    full_name: str,
    routing_number: str,
    account_number: str,
):
    """
    BlueVine may already have a payee we didn't persist locally. When payee creation
    fails with payee_name_already_exists, fetch payees and try a safe match.
    """
    try:
        payee_url = f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/payee/"
        res = s.get(
            payee_url,
            headers={
                "referer": "https://app.bluevine.com/dashboard/payees",
                "x-csrftoken": s.cookies.get("csrftoken"),
                "origin": "https://app.bluevine.com",
                "x-client-route": "payees",
                "bv-trace-id": str(uuid.uuid4()),
                "accept": "application/json, text/plain, */*",
            },
        )

        logging.info("list payees status: %s", res.status_code)
        if res.status_code != 200:
            logging.error("list payees failed with status %s", res.status_code)
            return None

        data = res.json()
        # BlueVine response shape may be a list or an object with results/items.
        payees = (
            data
            if isinstance(data, list)
            else data.get("results") or data.get("items") or data.get("payees") or []
        )

        target_name = normalize_name(full_name)
        target_routing = "".join(ch for ch in str(routing_number) if ch.isdigit())
        target_last4 = extract_last4(account_number)

        best = None
        best_score = -1

        for p in payees:
            if not isinstance(p, dict):
                continue
            slug = p.get("slug") or p.get("id")
            if not slug:
                continue

            score = 0
            p_name = normalize_name(p.get("name") or p.get("payee_name") or "")
            if p_name and p_name == target_name:
                score += 2

            p_routing = p.get("ach_routing_number") or p.get("routing_number")
            if p_routing:
                p_routing_digits = "".join(ch for ch in str(p_routing) if ch.isdigit())
                if p_routing_digits and p_routing_digits == target_routing:
                    score += 2

            # Try multiple possible fields for "last4"
            p_last4 = (
                p.get("account_last4")
                or p.get("account_number_last4")
                or p.get("last4")
                or extract_last4(p.get("encrypted_account_number"))
            )
            if target_last4 and p_last4 and str(p_last4)[-4:] == target_last4:
                score += 2

            # Only accept "safe" matches: name + (routing or last4)
            if score >= 4 and score > best_score:
                best = slug
                best_score = score

        if not best:
            logging.error("no safe payee match found for reconciliation")
            return None

        execute_query(
            "UPDATE users SET bluevine_slug = %s WHERE id = %s",
            (best, user_id),
            fetch=False,
        )
        logging.info("reconciled existing payee")
        return best

    except Exception:
        logging.error("payee reconciliation failed", exc_info=True)
        return None


def extract_payee_identifier(payee_json: dict) -> str | None:
    if not isinstance(payee_json, dict):
        return None

    candidates = [
        "slug",
        "payee_slug",
        "id",
        "payee_id",
        "uuid",
    ]
    for field in candidates:
        val = payee_json.get(field)
        if val:
            return str(val)
    return None


def login(
    s,
    accountNumber,
    routingNumber,
    bankName,
    fullName,
    email,
    user_id,
    amount,
    comments,
    request_id,
    description=None,
    bluevineEmail=None,
    bluevinePassword=None,
):
    # login
    res = s.post(
        "https://app.bluevine.com/api/v3/auth/login/",
        json={"email": bluevineEmail, "password": bluevinePassword},
        headers={
            "referer": "https://app.bluevine.com/dashboard",
            "origin": "https://app.bluevine.com",
            "bv-trace-id": str(uuid.uuid4()),
            "accept": "application/json, text/plain, */*",
        },
    )

    logging.info("login status: %s", res.status_code)

    if res.status_code != 200:
        raise RuntimeError(f"BlueVine login failed ({res.status_code})")
    s.headers.update({"x-csrftoken": s.cookies["csrftoken"]})

    login_data = res.json()

    res = s.get(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    logging.info("MFA configuration status: %s", res.status_code)

    # get mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    logging.info("send_token status: %s", res.status_code)

    # Create a pending MFA row so the frontend can detect the challenge.
    ensure_pending_mfa_row(request_id)

    logging.info("starting after_login thread")

    # start a new thread that waits for mfa then runs after_login
    Thread(
        target=after_login,
        args=(
            s,
            login_data,
            accountNumber,
            routingNumber,
            bankName,
            fullName,
            email,
            user_id,
            amount,
            comments,
            request_id,
            description,
        ),
    ).start()


def after_login(
    s,
    login_data,
    accountNumber,
    routingNumber,
    bankName,
    fullName,
    email,
    user_id,
    amount,
    comments,
    request_id,
    description=None,
):
    try:
        logging.info("after_login started")

        i = 0
        while True:
            mfa_codes = execute_query(
                "SELECT id, code FROM mfa WHERE id = %s AND code IS NOT NULL LIMIT 1",
                (request_id,),
            )
            if mfa_codes:
                row = mfa_codes[0]
                code = row["code"]
                execute_query("DELETE FROM mfa WHERE id = %s", (row["id"],), fetch=False)
                break

            sleep(1)
            i += 1
            if i > 60:
                logging.error("MFA timeout after 60s")
                mark_request_error(request_id, "MFA timeout (initial)")
                return {"error": "mfa timeout"}, 400

        # verify mfa
        logging.info("verifying MFA...")
        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
            json={"token": code, "trust_device": True},
            headers={
                "referer": "https://app.bluevine.com/dashboard/depositAccounts",
                "origin": "https://app.bluevine.com",
                "x-csrftoken": s.cookies["csrftoken"],
                "x-client-route": "depositAccounts",
                "bv-trace-id": str(uuid.uuid4()),
                "accept": "application/json, text/plain, */*",
            },
        )
        logging.info("verify mfa status: %s", res.status_code)
        if res.status_code != 200:
            mark_request_error(request_id, f"BlueVine MFA verify failed ({res.status_code})")
            return {"error": "mfa verify failed"}, 400

        body = {
            "name": fullName,
            "status": "Active",
            "payee_type": "P",
            "service": "Other Products and Services",
            "bank_name": bankName,
            "encrypted_account_number": str(accountNumber),
            "verify_account_number": str(accountNumber),
            "ach_routing_number": str(routingNumber),
            "contact_email": email,
            "address": "295 Summerford Cir",
            "address_city": "San Ramon",
            "address_extra": "",
            "address_state": "CA",
            "address_zip": "94583",
        }

        user = execute_query("SELECT bluevine_slug FROM users WHERE id = %s", (user_id,))[0]

        if not user.get("bluevine_slug"):
            # create payee
            logging.info("creating payee...")
            res = s.post(
                f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/payee/",
                json=body,
                headers={
                    "referer": "https://app.bluevine.com/dashboard/payees",
                    "x-csrftoken": s.cookies["csrftoken"],
                    "origin": "https://app.bluevine.com",
                    "x-client-route": "payees",
                    "bv-trace-id": str(uuid.uuid4()),
                    "accept": "application/json, text/plain, */*",
                },
            )
            logging.info("create payee status: %s", res.status_code)

            if res.status_code == 428:
                logging.info("428 on payee creation, requesting MFA...")
                ensure_pending_mfa_row(request_id)
                s.post(
                    f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
                    headers={
                        "referer": "https://app.bluevine.com/dashboard",
                        "x-csrftoken": s.cookies["csrftoken"],
                    },
                )

                i = 0
                while True:
                    mfa_codes = execute_query(
                        "SELECT id, code FROM mfa WHERE id = %s AND code IS NOT NULL LIMIT 1",
                        (request_id,),
                    )
                    if mfa_codes:
                        row = mfa_codes[0]
                        code = row["code"]
                        execute_query(
                            "DELETE FROM mfa WHERE id = %s", (row["id"],), fetch=False
                        )
                        break

                    sleep(2)
                    i += 1
                    if i > 30:
                        logging.error("payee MFA timeout")
                        mark_request_error(request_id, "MFA timeout (payee)")
                        return {"error": "mfa timeout"}, 400

                logging.info("verifying payee MFA...")
                res = s.post(
                    f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
                    json={"trust_device": True, "token": code},
                    headers={
                        "referer": "https://app.bluevine.com/dashboard/depositAccounts",
                        "origin": "https://app.bluevine.com",
                        "x-csrftoken": s.cookies["csrftoken"],
                        "x-client-route": "depositAccounts",
                        "bv-trace-id": str(uuid.uuid4()),
                        "accept": "application/json, text/plain, */*",
                    },
                )
                logging.info("payee MFA verify status: %s", res.status_code)
                if res.status_code != 200:
                    mark_request_error(
                        request_id, f"BlueVine MFA verify failed (payee) ({res.status_code})"
                    )
                    return {"error": "mfa verify failed"}, 400

                # retry payee creation
                logging.info("retrying payee creation...")
                res = s.post(
                    f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/payee/",
                    json=body,
                    headers={
                        "referer": "https://app.bluevine.com/dashboard/payees",
                        "x-csrftoken": s.cookies["csrftoken"],
                        "origin": "https://app.bluevine.com",
                        "x-client-route": "payees",
                        "bv-trace-id": str(uuid.uuid4()),
                        "accept": "application/json, text/plain, */*",
                    },
                )
                logging.info("retry create payee status: %s", res.status_code)

            # BlueVine may respond with an existing-payee error (e.g. payee_name_already_exists).
            if res.status_code == 412:
                try:
                    err = res.json().get("error")
                except Exception:
                    err = None
                if err == "payee_name_already_exists":
                    logging.info("payee already exists; attempting reconciliation")
                    reconciled = reconcile_existing_payee(
                        s,
                        login_data,
                        user_id=user_id,
                        full_name=fullName,
                        routing_number=str(routingNumber),
                        account_number=str(accountNumber),
                    )
                    if reconciled:
                        payee_slug = reconciled
                    else:
                        mark_request_error(request_id, "failed to reconcile existing payee")
                        return {"error": "failed to reconcile existing payee"}, 400

            if "slug" not in res.json() and "payee_slug" not in locals():
                logging.error("failed to create payee")
                mark_request_error(request_id, "failed to create payee")
                return {"error": "failed to create payee"}, 400

            if "payee_slug" not in locals():
                payee_json = res.json()
                extracted = extract_payee_identifier(payee_json)
                if not extracted:
                    mark_request_error(request_id, "create payee missing identifier field")
                    return {"error": "create payee missing identifier field"}, 400

                payee_slug = extracted
                execute_query(
                    "UPDATE users SET bluevine_slug = %s WHERE id = %s",
                    (payee_slug, user_id),
                    fetch=False,
                )
        else:
            payee_slug = user["bluevine_slug"]

        # send money
        logging.info("sending scheduled payment...")
        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/scheduled_payment/",
            json={
                "account": "dcce374f0a9f45d0984c59ae9e33d27d",
                "payee_slug": payee_slug,
                "next_payment_date": next_business_day(),
                "payment_type": "ACH",
                "amount": amount,
                "frequency": "once",
                "is_continuously_recurring": False,
                "funds_source": "dda",
                "send_email_to_payee": True,
            },
            headers={
                "referer": "https://app.bluevine.com/dashboard/depositAccounts",
                "x-csrftoken": s.cookies["csrftoken"],
                "origin": "https://app.bluevine.com",
                "x-client-route": "depositAccounts",
                "bv-trace-id": str(uuid.uuid4()),
                "accept": "application/json, text/plain, */*",
            },
        )
        logging.info("send money status: %s", res.status_code)

        if res.status_code == 428:
            logging.info("428 received, requesting second MFA...")
            ensure_pending_mfa_row(request_id)
            res = s.post(
                f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
                headers={
                    "referer": "https://app.bluevine.com/dashboard",
                    "x-csrftoken": s.cookies["csrftoken"],
                },
            )
            logging.info("second send_token status: %s", res.status_code)

            i = 0
            while True:
                mfa_codes = execute_query(
                    "SELECT id, code FROM mfa WHERE id = %s AND code IS NOT NULL LIMIT 1",
                    (request_id,),
                )
                if mfa_codes:
                    row = mfa_codes[0]
                    code = row["code"]
                    execute_query("DELETE FROM mfa WHERE id = %s", (row["id"],), fetch=False)
                    break

                sleep(2)
                i += 1
                if i > 30:
                    logging.error("second MFA timeout")
                    mark_request_error(request_id, "MFA timeout (second)")
                    return {"error": "mfa timeout"}, 400

            logging.info("verifying second MFA...")
            res = s.post(
                f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
                json={"trust_device": True, "token": code},
                headers={
                    "referer": "https://app.bluevine.com/dashboard/depositAccounts",
                    "origin": "https://app.bluevine.com",
                    "x-csrftoken": s.cookies["csrftoken"],
                    "x-client-route": "depositAccounts",
                    "bv-trace-id": str(uuid.uuid4()),
                    "accept": "application/json, text/plain, */*",
                },
            )
            logging.info("second verify mfa status: %s", res.status_code)
            if res.status_code != 201:
                mark_request_error(
                    request_id, f"BlueVine MFA verify failed (second) ({res.status_code})"
                )
                return {"error": "mfa verify failed"}, 400

            logging.info("retrying scheduled payment...")
            res = s.post(
                f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/scheduled_payment/",
                json={
                    "payee_slug": payee_slug,
                    "next_payment_date": next_business_day(),
                    "payment_type": "ACH",
                    "amount": amount,
                    "frequency": "once",
                    "is_continuously_recurring": False,
                    "funds_source": "dda",
                    "send_email_to_payee": True,
                    "account": "dcce374f0a9f45d0984c59ae9e33d27d",
                },
                headers={
                    "referer": "https://app.bluevine.com/dashboard/depositAccounts",
                    "x-csrftoken": s.cookies["csrftoken"],
                    "origin": "https://app.bluevine.com",
                    "x-client-route": "depositAccounts",
                    "bv-trace-id": str(uuid.uuid4()),
                    "accept": "application/json, text/plain, */*",
                },
            )
            logging.info("retry send money status: %s", res.status_code)

        if res.status_code not in [200, 201]:
            mark_request_error(request_id, f"BlueVine payment failed ({res.status_code})")
            return {"error": "payment failed"}, 400

        logging.info("updating request status in DB...")
        execute_query(
            """
            UPDATE requests
            SET status = 'paid', comments = JSON_ARRAY_APPEND(
                COALESCE(comments, '[]'),
                '$',
                %s
            )
            WHERE id = %s
            """,
            (json.dumps(comments), request_id),
            fetch=False,
        )
        logging.info("done!")

        return {}, 200

    except Exception:
        logging.error("after_login crashed", exc_info=True)
        mark_request_error(request_id, "BlueVine payment processing failed")


def bluevine_send_money(
    accountNumber,
    routingNumber,
    bankName,
    fullName,
    email,
    user_id,
    amount,
    comments,
    request_id,
    description=None,
    bluevineEmail=None,
    bluevinePassword=None,
):
    s = requests.session()
    login(
        s,
        accountNumber,
        routingNumber,
        bankName,
        fullName,
        email,
        user_id,
        amount,
        comments,
        request_id,
        description,
        bluevineEmail=bluevineEmail,
        bluevinePassword=bluevinePassword,
    )

    return {}, 200


# bluevine_send_money()