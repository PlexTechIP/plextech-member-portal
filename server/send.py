from flask import Flask
from markupsafe import Markup
from send_email import send_email

app = Flask(__name__)

message = '''
I hope this email finds you well. I'm reaching out to ask for your preferences for the role you would like to take on in the Fall 2023 semester and for your feedback on our club's activities and future direction. We want to make sure your voice is heard as we plan for the upcoming semester.
<br><br>
We've noticed that a few of our members have not yet completed the <a href="https://forms.gle/V3at2z2qyNa8PbrRA">PlexTech Continuation Form</a> for the next semester. Please take a few minutes to fill out the form so we can gather the necessary information in order to give you a great experience next semester.
<br><br>
The form references the <a href="https://docs.google.com/document/d/1S6Xc2IjcY_wDtghbt58PqlZrvR_jK6x0DZhTxpsVFsM/edit#">PlexTech Roles and Responsibilties Doc</a> that may be useful when completing the form.
<br><br>
Please note that a few responses were submitted without names. If you're receiving this email but you've already filled out the form, kindly let me know so we can attribute your feedback and preferences correctly.
<br><br>
Furthermore, if you do not plan on being active in the club next semester, we would still appreciate it if you could fill out the form so we know whether or not to reach out to you for future events.
<br><br>
Please aim to fill out the form by the end of this week. We're eager to gather your input and start planning for a successful semester ahead.
'''
# email, subject, header, message
with app.app_context():
    # with open('templates/emails.txt') as f:
        # lines = f.read().splitlines()
        # emails = [line.split(', ')[0] for line in lines]
        # names = [line.split(', ')[1] for line in lines]
        
    emails = ['shamith09@berkeley.edu']
    names = ['Shamith']
    
    for (name, email) in zip(names, emails):
        send_email(email, 'PlexTech Continuation Fall 2023', f'Hi {name},', Markup(message))
        # print(email, name)