import plaid
from plaid.api import plaid_api
from plaid.model.payment_initiation_payment_create_request import (
    PaymentInitiationPaymentCreateRequest,
)
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import (
    ItemPublicTokenExchangeRequest,
)
from plaid.model.auth_get_request import AuthGetRequest
from plaid.configuration import Configuration
from plaid.api_client import ApiClient
from dotenv import load_dotenv
from os import getenv

load_dotenv()

host = (
    plaid.Environment.Sandbox
    if getenv("ENVIRONMENT") == "local"
    else plaid.Environment.Development
)

configuration = Configuration(
    host=host,
    api_key={
        "clientId": getenv("PLAID_CLIENT_ID"),
        "secret": getenv("PLAID_SECRET"),
    },
)

api_client = ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)


def create_link_token(user_id):
    try:
        request = LinkTokenCreateRequest(
            products=[Products("auth")],
            client_name="PlexTech Finance",
            country_codes=[CountryCode("US")],
            language="en",
            user=LinkTokenCreateRequestUser(client_user_id=user_id),
        )
        response = client.link_token_create(request)
        return response.link_token
    except plaid.ApiException as e:
        print(f"Error creating link token: {e}")
        return None


def exchange_public_token(public_token):
    try:
        request = ItemPublicTokenExchangeRequest(public_token=public_token)
        response = client.item_public_token_exchange(request)
        return response.access_token, response.item_id
    except plaid.ApiException as e:
        print(f"Error exchanging public token: {e}")
        return None, None


def get_account_info(access_token):
    try:
        request = AuthGetRequest(access_token=access_token)
        response = client.auth_get(request)
        return response.accounts, response.numbers.ach
    except plaid.ApiException as e:
        print(f"Error getting account info: {e}")
        return None, None


def initiate_payment(access_token, recipient_id, amount):
    try:
        request = PaymentInitiationPaymentCreateRequest(
            access_token=access_token,
            amount=amount,
            description="PlexTech Reimbursement",
            recipient_id=recipient_id,
        )
        response = client.payment_initiation_payment_create(request)
        return response.payment_id
    except plaid.ApiException as e:
        print(f"Error initiating payment: {e}")
        return None
