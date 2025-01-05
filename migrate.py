import pymongo
import mysql.connector
from dotenv import load_dotenv
import os
import uuid
import json
from datetime import datetime

load_dotenv()

# MongoDB connection
mongo_client = pymongo.MongoClient(os.getenv("MONGO_URL"))
mongo_db = mongo_client.test

# MySQL connection
mysql_conn = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST", "localhost"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database="plexfinance",
)
cursor = mysql_conn.cursor()


def convert_date(date_str):
    if not date_str:
        return None
    try:
        # Try parsing ISO format
        return datetime.fromisoformat(date_str.replace("Z", "+00:00")).strftime(
            "%Y-%m-%d"
        )
    except:
        try:
            # Try parsing MongoDB ISODate
            return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%fZ").strftime(
                "%Y-%m-%d"
            )
        except:
            try:
                # Try parsing simple date format
                return datetime.strptime(date_str, "%Y-%m-%d").strftime("%Y-%m-%d")
            except:
                return None


def migrate_users():
    users = mongo_db.Users.find({})
    for user in users:
        user_id = str(uuid.uuid4())
        cursor.execute(
            """
            INSERT INTO users (
                id, email, password, registered, treasurer, first_name, last_name,
                google, reset_password, reset_timestamp, bank_account_number,
                bank_routing_number, bank_name, bluevine_email, bluevine_password,
                tardies, absences, strikes
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
            (
                user_id,
                user.get("email"),
                user.get("password"),
                user.get("registered", False),
                user.get("treasurer", False),
                user.get("firstName"),
                user.get("lastName"),
                user.get("google", False),
                user.get("reset_password"),
                user.get("timestamp"),
                user.get("bank", {}).get("accountNumber") if "bank" in user else None,
                user.get("bank", {}).get("routingNumber") if "bank" in user else None,
                user.get("bank", {}).get("bankName") if "bank" in user else None,
                user.get("bluevineEmail"),
                user.get("bluevinePassword"),
                json.dumps(user.get("tardies", [])),
                json.dumps(user.get("absences", [])),
                json.dumps(user.get("strikes", [])),
            ),
        )
        # Store mapping of MongoDB _id to MySQL id for foreign key references
        id_mapping[str(user["_id"])] = user_id
    mysql_conn.commit()


def migrate_requests():
    requests = mongo_db.Requests.find({})
    for request in requests:
        request_id = str(uuid.uuid4())
        cursor.execute(
            """
            INSERT INTO requests (
                id, user_id, status, item_description, amount, date,
                comments, images, team_budget
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
            (
                request_id,
                id_mapping.get(str(request["user_id"])),
                request.get("status", "pendingReview"),
                request.get("itemDescription"),
                request.get("amount"),
                convert_date(request.get("date")),
                json.dumps(request.get("comments", [])),
                json.dumps(request.get("images", [])),
                request.get("teamBudget"),
            ),
        )
    mysql_conn.commit()


def migrate_attendance():
    attendance = mongo_db.Attendance.find({})
    for record in attendance:
        attendance_id = str(uuid.uuid4())
        cursor.execute(
            """
            INSERT INTO attendance (
                id, name, meeting_leader, start_time, code, attendees
            ) VALUES (%s, %s, %s, %s, %s, %s)
        """,
            (
                attendance_id,
                record.get("name"),
                id_mapping.get(str(record.get("meetingLeader"))),
                record.get("startTime"),
                str(record.get("code")) if record.get("code") else None,
                json.dumps(record.get("attendees", {})),
            ),
        )
    mysql_conn.commit()


def migrate_posts():
    posts = mongo_db.Posts.find({})
    for post in posts:
        post_id = str(uuid.uuid4())
        cursor.execute(
            """
            INSERT INTO posts (
                id, user_id, first_name, last_name, content,
                anonymous, date, upvotes, downvotes
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
            (
                post_id,
                id_mapping.get(str(post.get("user_id"))),
                post.get("firstName"),
                post.get("lastName"),
                post.get("content"),
                post.get("anonymous", False),
                convert_date(post.get("date")),
                json.dumps([id_mapping.get(str(u)) for u in post.get("upvotes", [])]),
                json.dumps([id_mapping.get(str(u)) for u in post.get("downvotes", [])]),
            ),
        )
    mysql_conn.commit()


def migrate_mfa():
    mfa = mongo_db.MFA.find({})
    for record in mfa:
        mfa_id = str(uuid.uuid4())
        cursor.execute(
            """
            INSERT INTO mfa (id, code) VALUES (%s, %s)
        """,
            (mfa_id, record.get("code")),
        )
    mysql_conn.commit()


if __name__ == "__main__":
    # Dictionary to store mapping of MongoDB ObjectId to MySQL UUID
    id_mapping = {}

    try:
        migrate_users()
        migrate_requests()
        migrate_attendance()
        migrate_posts()
        migrate_mfa()
        print("Migration completed successfully!")
    except Exception as e:
        print(f"Error during migration: {e}")
    finally:
        cursor.close()
        mysql_conn.close()
        mongo_client.close()
