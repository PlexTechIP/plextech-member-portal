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

logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")

load_dotenv()

app = Flask(__name__)


def get_db():
    return mysql.connector.connect(
        host=getenv("MYSQL_HOST"),
        user=getenv("MYSQL_USER"),
        password=getenv("MYSQL_PASSWORD"),
        database="plexfinance",
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
    logging.warning(s.headers)
    # login
    res = s.post(
        "https://app.bluevine.com/api/v3/auth/login/",
        {"email": bluevineEmail, "password": bluevinePassword},
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    logging.info(res.text)
    if res.status_code != 200:
        raise Exception("Failed to login to bluevine: " + str(res.json()))
    s.headers.update({"x-csrftoken": s.cookies["csrftoken"]})

    login_data = res.json()

    res = s.get(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    logging.info(res.text)

    # get mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    logging.info(res.text)

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
    logging.info("after_login started")

    i = 0
    while True:
        mfa_codes = execute_query("SELECT code FROM mfa LIMIT 1")
        if mfa_codes:
            code = mfa_codes[0]["code"]
            execute_query("DELETE FROM mfa WHERE code = %s", (code,), fetch=False)
            break

        logging.info("waiting for mfa")
        sleep(1)
        i += 1
        if i > 60:
            return {"error": "mfa timeout"}, 400

    # verify mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
        {"token": code, "trust_device": True},
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    logging.info("verify mfa: %s", res.text)

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
        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/payee/",
            body,
            headers={
                "referer": "https://app.bluevine.com/dashboard/payees",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )

        if "slug" not in res.json():
            return {"error": "failed to create payee: " + res.text}, 400

        payee_slug = res.json()["slug"]
        execute_query(
            "UPDATE users SET bluevine_slug = %s WHERE id = %s",
            (payee_slug, user_id),
            fetch=False,
        )
    else:
        payee_slug = user["bluevine_slug"]

    # send money
    res = s.post(
        f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/scheduled_payment/",
        {
            "account": "dcce374f0a9f45d0984c59ae9e33d27d",
            "payee_slug": payee_slug,
            "next_payment_date": (datetime.now() + timedelta(days=1)).strftime(
                "%Y-%m-%d"
            ),
            "payment_type": "ACH",
            "amount": amount,
            "frequency": "once",
            "is_continuously_recurring": False,
            "funds_source": "dda",
            "send_email_to_payee": True,
        },
        headers={
            "referer": "https://app.bluevine.com/dashboard/payees",
            "x-csrftoken": s.cookies["csrftoken"],
        },
    )
    logging.info("send money: %s, %s", res.text, res.status_code)

    if res.status_code == 428:
        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
            headers={
                "referer": "https://app.bluevine.com/dashboard",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )

        i = 0
        while True:
            mfa_codes = execute_query("SELECT code FROM mfa LIMIT 1")
            if mfa_codes:
                code = mfa_codes[0]["code"]
                execute_query("DELETE FROM mfa WHERE code = %s", (code,), fetch=False)
                break

            sleep(2)
            i += 1
            if i > 30:
                return {"error": "mfa timeout"}, 400

        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
            {"trust_device": True, "token": code},
        )

        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/scheduled_payment/",
            {
                "payee_slug": payee_slug,
                "next_payment_date": (datetime.now() + timedelta(days=1)).strftime(
                    "%Y-%m-%d"
                ),
                "payment_type": "ACH",
                "amount": amount,
                "frequency": "once",
                "is_continuously_recurring": False,
                "funds_source": "dda",
                "send_email_to_payee": True,
                "account": "dcce374f0a9f45d0984c59ae9e33d27d",
            },
            headers={
                "referer": "https://app.bluevine.com/dashboard/payees",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )

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

    return {}, 200


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
