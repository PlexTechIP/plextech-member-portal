# type: ignore
from time import sleep
from os import getenv
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId
from threading import Thread
from send_email import send_email
from flask import Flask

app = Flask(__name__)

import requests
import pymongo

load_dotenv()

client = pymongo.MongoClient(getenv("MONGO_URL"))
db = client.test


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
        {"email": bluevineEmail, "password": bluevinePassword},
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    print(res.text)
    if res.status_code != 200:
        raise Exception("Failed to login to bluevine: " + str(res.json()))
    s.headers.update({"x-csrftoken": s.cookies["csrftoken"]})

    login_data = res.json()

    res = s.get(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    print(res.text)

    # get mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    print(res.text)

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
    print('after_login started')

    i = 0
    while not len(list(db.MFA.find({}))):
        sleep(1)
        if i > 60:
            return {"error": "mfa timeout"}, 400

    code = db.MFA.find_one_and_delete({})["code"]

    # verify mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
        {"token": code, "trust_device": True},
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    print(res.text)

    # if not res.ok:
    #     return {"error": "bad mfa"}, 400

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
    # body.update(address)
    user = db.Users.find_one({"_id": ObjectId(user_id)}, {"bluevine_slug": 1, "_id": 0})
    if "bluevine_slug" not in user:
        # create payee
        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/payee/",
            body,
            headers={
                "referer": "https://app.bluevine.com/dashboard/payees",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )
        print(res.text)

        if "slug" not in res.json():
            return {"error": "failed to create payee: " + res.text}, 400

        payee_slug = res.json()["slug"]
        db.Users.update_one({"_id": user_id}, {"$set": {"bluevine_slug": payee_slug}})
    else:
        payee_slug = user["bluevine_slug"]

    # send money
    res = s.post(
        f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/scheduled_payment/",
        {
            "payee_slug": payee_slug,
            "next_payment_date": datetime.now().strftime("%Y-%m-%d"),
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
    print(res.text)

    if res.status_code == 428:
        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
            headers={
                "referer": "https://app.bluevine.com/dashboard",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )

        i = 0
        while not len(list(db.MFA.find({}))):
            sleep(2)
            if i > 30:
                return {"error": "mfa timeout"}, 400

        code = db.MFA.find_one_and_delete({})["code"]

        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
            {"trust_device": True, "token": code},
        )

        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/scheduled_payment/",
            {
                "payee_slug": payee_slug,
                "next_payment_date": datetime.now().strftime("%Y-%m-%d"),
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

    db.Requests.find_one_and_update(
        {"_id": ObjectId(request_id)},
        {
            "$set": {"status": "paid"},
            "$push": {"comments": {"$each": comments}},
        },
    )

    # with app.app_context():
    #     send_email(
    #         email,
    #         "Reimbursement Request Approved",
    #         f"Hi {fullName},",
    #         f'Your reimbursement request of ${amount} for "{description}" has been approved. The ACH transfer may take up to 5 business days to complete. If you do not receive the money by then, please contact info@plextech.berkeley.edu or a PlexTech Executive Board member.',
    #     )

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
