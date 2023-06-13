from __future__ import print_function

import base64
from email.message import EmailMessage
from email.mime.text import MIMEText

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os.path

from flask import render_template

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]


def gmail_send_message(to, subject, message_content):
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
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

    try:
        service = build("gmail", "v1", credentials=creds)
        message = EmailMessage()

        message.set_content(message_content)

        message["To"] = to
        message["From"] = "shamith09@berkeley.edu"
        message["Subject"] = subject

        # encoded message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        create_message = {"raw": encoded_message}
        # pylint: disable=E1101
        send_message = (
            service.users().messages().send(userId="me", body=create_message).execute()
        )

    except HttpError as error:
        print(f"An error occurred: {error}")
        send_message = None
    return send_message


def send_comment_email(
    email,
    subject,
    requester_first_name,
    sender_first_name,
    sender_last_name,
    item_description,
    message,
):
    message_text = render_template(
        "comment_email.html",
        requester_first_name=requester_first_name,
        sender_first_name=sender_first_name,
        sender_last_name=sender_last_name,
        item_description=item_description,
        message=message,
    )

    gmail_send_message(email, subject, MIMEText(message_text, "html"))


def send_email(email, subject, header, message):
    message_text = render_template(
        "index.html",
        header=header,
        message=message,
    )
    gmail_send_message(email, subject, MIMEText(message_text, "html"))
