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

SCOPES = ['https://www.googleapis.com/auth/gmail.send']


def gmail_send_message(to, subject, message_content):
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('gmail', 'v1', credentials=creds)
        message = EmailMessage()

        message.set_content(message_content)

        message['To'] = to
        message['From'] = 'shamith09@berkeley.edu'
        message['Subject'] = subject

        # encoded message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()) \
            .decode()

        create_message = {
            'raw': encoded_message
        }
        # pylint: disable=E1101
        send_message = (service.users().messages().send
                        (userId="me", body=create_message).execute())

    except HttpError as error:
        print(F'An error occurred: {error}')
        send_message = None
    return send_message


def send_comment_email(email, subject, requester_first_name, sender_first_name, sender_last_name, item_description, message):
    message_text = '''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "DM Sans", sans-serif;
        margin: 0;
        padding: 0;
      }

      .email-container {
        background-image: url("https://plextech.berkeley.edu/images/LandingBackground.webp");
        width: 100%;
        padding: 30px;
      }

      .email-wrapper {
        background-color: #ffffff;
        max-width: 600px;
        margin: 0;
        padding: 20px;
        border-radius: 8px;
      }

      .header {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
      }

      .content {
        font-size: 16px;
        color: #444;
        line-height: 1.5;
      }

      a {
        color: #1a73e8;
        text-decoration: none;
      }

      .footer {
        font-size: 12px;
        color: #777;
        margin-top: 20px;
      }

      .signature {
        display: flex;
        flex-direction: column;
        padding-top: 24px;
        color: #888;
      }

      .title {
        font-size: 14px;
        color: #777;
      }
    </style>
  </head>
  ''' + f'''
  <body>
    <div class="email-container">
      <div class="email-wrapper">
        <a href="https://plextech.berkeley.edu">
          <img
            src="https://plextech.berkeley.edu/images/PlexTechLogo.png"
            alt="PlexTech Logo"
            style="width: 64px; margin-bottom: 15px"
          />
        </a>
        <div class="header">Hello {requester_first_name},</div>
        <div class="content">
          {sender_first_name} {sender_last_name} has commented on your reimbursement request for
          "{item_description}", with:
          <br /><br />
          <blockquote>{message}</blockquote>
          <br />
          To see your request, go to
          <a href="https://plextech-member-portal.vercel.app/reimbursements"
            >https://plextech-member-portal.vercel.app/reimbursements</a
          >.
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="signature">
        Thanks, <br />
        Shamith Pasula<br />
        President | PlexTech Software Consulting
      </div>
    </div>
  </body>
</html>
'''

    gmail_send_message(email, subject,
                   MIMEText(message_text, 'html'))
