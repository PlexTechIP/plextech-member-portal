# type: ignore
from time import sleep
from os import getenv
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId

import requests
import pymongo
import pickle
import json

load_dotenv()

client = pymongo.MongoClient(
    f'mongodb+srv://{getenv("MONGO_USERNAME")}:{getenv("MONGO_PASSWORD")}@cluster0.mkbc83o.mongodb.net/?retryWrites=true&w=majority'
)
db = client.test


def login(s):
    # login
    res = s.post(
        "https://app.bluevine.com/api/v3/auth/login/",
        {"email": getenv("BLUEVINE_EMAIL"), "password": getenv("BLUEVINE_PASSWORD")},
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )
    if res.status_code != 200:
        raise Exception("Failed to login to bluevine: " + str(res.json()))
    s.headers.update({"x-csrftoken": s.cookies["csrftoken"]})

    login_data = res.json()

    res = s.get(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )

    # get mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/send_token/",
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )

    return s, login_data


def after_login(
    code,
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
    s = pickle.loads(s)

    # verify mfa
    res = s.post(
        f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
        {"token": code, "trust_device": True},
        headers={"referer": "https://app.bluevine.com/dashboard"},
    )

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

    # create payee
    res = s.post(
        f"https://app.bluevine.com/api/v3/dda-company/{login_data['company_slug']}/dda-user/{login_data['slug']}/payee/",
        body,
        headers={
            "referer": "https://app.bluevine.com/dashboard/payees",
            "x-csrftoken": s.cookies["csrftoken"],
        },
    )

    if res.status_code == 412:
        payee_slug = db.Users.find_one({"_id": user_id})["bluevine_slug"]
    else:
        payee_slug = res.json()["slug"]
        db.Users.update_one({"_id": user_id}, {"$set": {"bluevine_slug": payee_slug}})

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
            "account": "dcce374f0a9f45d0984c59ae9e33d27d",
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

        while not len(list(db.MFA.find({}))):
            print("waiting for mfa")
            sleep(5)

        mfa = db.MFA.find_one_and_delete({})["code"]

        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login_data['company_slug']}/user/{login_data['slug']}/mfa/verify_token/",
            {"trust_device": True, "token": "1875489"},
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
):
    s = requests.session()
    s, login_data = login(s)

    db.MFA.insert_one(
        {
            "s": pickle.dumps(s),
            "login_data": login_data,
            "accountNumber": accountNumber,
            "routingNumber": routingNumber,
            "bankName": bankName,
            "fullName": fullName,
            "email": email,
            "user_id": user_id,
            "amount": amount,
            "description": description,
            "comments": comments,
            "request_id": request_id,
        }
    )


# bluevine_send_money()
