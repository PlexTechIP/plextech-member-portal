# type: ignore
from time import sleep

import requests


def bluevine_send_money(
    accountNumber=None,
    routingNumber=None,
    bankName=None,
    email=None,
    address={},
    description=None,
    fullName=None,
    db=None,
):
    with requests.Session() as s:
        # s.headers.update({'referer': ''})

        # login
        res = s.post(
            "https://app.bluevine.com/api/v3/auth/login/",
            {"email": "shamith09@berkeley.edu", "password": 'Magistrates821"'},
        )
        if res.status_code != 200:
            raise Exception("Failed to login to bluevine: " + res.json()['reason'])
        s.headers.update({"x-csrftoken": s.cookies["csrftoken"]})

        login = res.json()
        print(login)

        res = s.get(
            f"https://app.bluevine.com/api/v3/company/{login['company_slug']}/user/{login['slug']}/mfa/",
            headers={"referer": "https://app.bluevine.com/dashboard"},
        )
        print(res.text)

        # get mfa
        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login['company_slug']}/user/{login['slug']}/mfa/send_token/",
            headers={"referer": "https://app.bluevine.com/dashboard"},
        )
        print(res.text)

        while not db.MFA.find({}):
            sleep(5)

        mfa = db.MFA.find_one_and_delete({})["code"]

        # verify mfa
        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login['company_slug']}/user/{login['slug']}/mfa/verify_token/",
            {"token": mfa, "trust_device": True},
            headers={"referer": "https://app.bluevine.com/dashboard"},
        )
        print(res.text)

        body = {
            "name": fullName,
            "status": "Active",
            "payee_type": "P",
            "service": "Other Products and Services",
            "bank_name": BankName,
            "encrypted_account_number": str(accountNumber),
            "verify_account_number": str(accountNumber),
            "ach_routing_number": str(routingNumber),
            "contact_email": email,
            # "address": "295 Summerford Circle, San Ramon, CA, 94583",
            # "address_city": "San Ramon",
            # "address_extra": "",
            # "address_state": "CA",
            # "address_zip": "94583",
        }
        body.update(address)

        # create payee
        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login['company_slug']}/dda-user/{login['slug']}/payee/",
            body,
            headers={
                "referer": "https://app.bluevine.com/dashboard/payees",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )
        print(res.text)


# bluevine_send_money()
