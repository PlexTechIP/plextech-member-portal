

import requests

def bluevine_send_money(accountNumber=None, routingNumber=None, description=None):
    with requests.Session() as s:
        # s.headers.update({'referer': ''})

        # login
        res = s.post(
            "https://app.bluevine.com/api/v3/auth/login/",
            {"email": "shamith09@berkeley.edu", "password": 'Magistrates821"'},
        )
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

        # verify mfa
        res = s.post(
            f"https://app.bluevine.com/api/v3/company/{login['company_slug']}/user/{login['slug']}/mfa/verify_token/",
            {"token": input("Enter MFA token: "), "trust_device": True},
            headers={"referer": "https://app.bluevine.com/dashboard"},
        )
        print(res.text)

        # create payee
        res = s.post(
            f"https://app.bluevine.com/api/v3/dda-company/{login['company_slug']}/dda-user/{login['slug']}/payee/",
            {
                "name": "Shamith Pasula",
                "status": "Active",
                "payee_type": "P",
                "address": "295 Summerford Circle, San Ramon, CA, 94583",
                "service": "Other Products and Services",
                "bank_name": "Bank of America",
                "encrypted_account_number": "325130449148",
                "verify_account_number": "325130449148",
                "ach_routing_number": "121000358",
                "contact_email": "shamith09@gmail.com",
                "address_city": "San Ramon",
                "address_extra": "",
                "address_state": "CA",
                "address_zip": "94583",
            },
            headers={
                "referer": "https://app.bluevine.com/dashboard/payees",
                "x-csrftoken": s.cookies["csrftoken"],
            },
        )
        print(res.text)

# bluevine_send_money()
