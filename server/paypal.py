from paypalrestsdk import Payout, ResourceNotFound
from dotenv import load_dotenv
from json import dumps
from os import getenv

import paypalrestsdk

load_dotenv()


def request_money(email, amount, subject):
    pass


def send_money(email, amount, subject):
    paypalrestsdk.configure({
        "mode": "live",  # sandbox or live
        "client_id": getenv('PAYPAL_CLIENT_ID'),
        "client_secret": getenv('PAYPAL_CLIENT_SECRET')})

    batch_payout = Payout({
        "sender_batch_header": {
            "sender_batch_id": "PlexTech_Payout",
            "email_subject": "You have a payout!",
            "email_message": "You have received a payout! Thanks for using our service!"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": str(amount),
                    "currency": "USD"
                },
                "note": subject,
                "receiver": email,
                "recipient_wallet": "RECIPIENT_SELECTED"
            }
        ]
    })

    if batch_payout.create():
        print("payout[%s] created successfully" %
              (batch_payout.batch_header.payout_batch_id))
    else:
        print(batch_payout.error)
