from venmo_api import Client
from dotenv import load_dotenv
from os import getenv

load_dotenv()

access_token = getenv('VENMO_ACCESS_TOKEN')
payment_method_id = getenv('VENMO_PAYMENT_METHOD_ID')
venmo = Client(access_token=access_token)

def request_money(receiver_id, amount, subject):
    venmo.payment.request_money(float(amount), subject, receiver_id)


def send_money(receiver_id, amount, subject):
    if receiver_id == getenv('SHAMITH_VENMO_ID') or amount == 0:
        return
    venmo.payment.send_money(amount=float(amount), note=subject, target_user_id=receiver_id, funding_source_id=payment_method_id)
    
def search(username):
    jsons = [user.to_json() for user in venmo.user.search_for_users(query=username)]
    return [{k: user[k] for k in ('display_name', 'profile_picture_url', 'username', 'id')} for user in jsons]
