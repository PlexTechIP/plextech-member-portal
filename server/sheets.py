from dotenv import load_dotenv
from traceback import print_exc
import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

load_dotenv()

# EDIT IF NEEDED
SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")
SHEET_NAME = os.getenv("SHEET_NAME")


SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

creds = None

if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)

# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
        token.write(creds.to_json())

service = build("sheets", "v4", credentials=creds)

def add_row_to_sheet(data):
    """
    Adds a row to the sheet.
    """
    try:
        sheet = service.spreadsheets()
        result = (
            sheet.values()
            .append(
                spreadsheetId=SPREADSHEET_ID,
                range=f"{SHEET_NAME}!A1",
                valueInputOption="USER_ENTERED",
                body={"values": [data]},
            )
            .execute()
        )
        return result
    except HttpError as err:
        print(err)
        print_exc()
        return None
