from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
from os import getenv
from random import randint
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)
from datetime import datetime, timedelta, timezone
from time import time
from cryptography.fernet import Fernet
import os
from flask_cors import CORS

try:
    from .send_email import gmail_send_message
    from .bluevine import bluevine_send_money
except ImportError:
    from send_email import gmail_send_message
    from bluevine import bluevine_send_money
import time
import bcrypt
import mysql.connector
import json
import logging
import uuid

load_dotenv()

# Set up environment-specific CORS settings
if getenv("ENVIRONMENT") == "local":
    origins = ["http://localhost:3000"]
else:
    origins = [
        "https://plextech.studentorg.berkeley.edu",
        "https://plextech-member-portal.vercel.app",
    ]

# Add Google OAuth domains
origins.extend(
    [
        "https://accounts.google.com",
        "https://www.googleapis.com",
        "https://oauth2.googleapis.com",
    ]
)

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {
            "origins": origins,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"],
            "supports_credentials": True,
            "expose_headers": ["Content-Type", "Authorization"],
            "allow_credentials": True,
        }
    },
)


# Add logging for CORS issues
@app.after_request
def after_request(response):
    # Log CORS headers for debugging
    if getenv("ENVIRONMENT") != "local":
        logging.info(f"Request Origin: {request.headers.get('Origin')}")
        logging.info(f"Response CORS headers: {dict(response.headers)}")

    # refresh expiring jwt
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
    except (RuntimeError, KeyError):
        pass

    return response


app.config["CORS_HEADERS"] = "Content-Type"
app.config["JWT_SECRET_KEY"] = getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

ACCOUNT_NUMBER_KEY = getenv("FERNET_ACCOUNT_NUMBER_KEY")
ROUTING_NUMBER_KEY = getenv("FERNET_ROUTING_NUMBER_KEY")
BLUEVINE_PASSWORD_KEY = getenv("FERNET_BLUEVINE_PASSWORD_NUMBER_KEY")

logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


def get_db():
    return mysql.connector.connect(
        host=getenv("MYSQL_HOST"),
        user=getenv("MYSQL_USER"),
        password=getenv("MYSQL_PASSWORD"),
        database=getenv("MYSQL_DATABASE"),
    )


def execute_query(query, params=None, fetch=True):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(query, params or ())
        if fetch:
            result = cursor.fetchall()
        else:
            db.commit()
            result = cursor.lastrowid
        return result
    except Exception as e:
        logging.error(f"Database error: {str(e)}")
        db.rollback()
        raise
    finally:
        cursor.close()
        db.close()


def generate_uuid():
    return str(uuid.uuid4())


def get_hashed_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password, bcrypt.gensalt())


def check_password(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password, hashed_password)


def encrypt(p, key):
    f = Fernet(key)
    return f.encrypt(p.encode()).decode()


def decrypt(c, key):
    f = Fernet(key)
    return f.decrypt(c.encode()).decode()


@app.route("/logout/", methods=["POST", "OPTIONS"])
@jwt_required()
def logout():
    if request.method == "OPTIONS":
        return {}, 200
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/ping/", methods=["GET"])
@jwt_required()
def ping():
    return {}, 200


@app.route("/members/", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def members():
    id = get_jwt_identity()
    if request.method == "OPTIONS":
        return {}, 200

    if request.method == "PUT":
        form = dict(request.json)
        user = execute_query("SELECT treasurer FROM users WHERE id = %s", (id,))[0]
        if not user["treasurer"]:
            return {}, 401

        updates = []
        values = []
        if "treasurer" in form:
            updates.append("treasurer = %s")
            values.append(form["treasurer"])
        if "current_position" in form:
            updates.append("current_position = %s")
            values.append(form["current_position"])

        if updates:
            values.append(form["user_id"])
            execute_query(
                f"UPDATE users SET {', '.join(updates)} WHERE id = %s",
                tuple(values),
                fetch=False,
            )
        return {}, 200

    if request.method == "DELETE":
        form = dict(request.json)
        user = execute_query("SELECT treasurer FROM users WHERE id = %s", (id,))[0]
        if not user["treasurer"]:
            return {}, 401
        execute_query(
            "DELETE FROM users WHERE id = %s",
            (form.get("user_id"),),
            fetch=False,
        )
        return {}, 200

    if request.method == "GET":
        users = execute_query(
            """
            SELECT id, email, registered, first_name, last_name, treasurer, current_position
            FROM users
            """
        )

        for user in users:
            if user["current_position"] is None:
                user["current_position"] = ""

        return {"users": users}, 200


@app.route("/profile/", methods=["PUT", "POST", "GET", "DELETE", "OPTIONS"])
@jwt_required()
def protected_user_routes():
    if request.method == "OPTIONS":
        return {}, 200
    id = get_jwt_identity()

    if request.method == "PUT":
        form = dict(request.json)
        if "password" in form:
            execute_query(
                """
                UPDATE users 
                SET password = %s, reset_password = NULL, reset_timestamp = NULL
                WHERE id = %s
                """,
                (get_hashed_password(form["password"]), id),
                fetch=False,
            )
        else:
            execute_query(
                """
                UPDATE users 
                SET profile_blurb = %s,
                    linkedin_username = %s, instagram_username = %s,
                    calendly_username = %s, current_company = %s,
                    current_position = %s,
                    first_name = %s, last_name = %s
                WHERE id = %s
                """,
                (
                    form.get("profile_blurb").strip()[:250],
                    form.get("linkedin_username").strip(),
                    form.get("instagram_username").strip(),
                    form.get("calendly_username").strip(),
                    form.get("current_company").strip(),
                    form.get("current_position").strip(),
                    form.get("first_name").strip(),
                    form.get("last_name").strip(),
                    id,
                ),
                fetch=False,
            )
        return {}, 200

    if request.method == "POST":
        form = dict(request.json)
        user = execute_query("SELECT treasurer FROM users WHERE id = %s", (id,))[0]
        if not user["treasurer"]:
            return {}, 401

        emails = form["emails"]
        query = []
        for email in emails:
            new_id = generate_uuid()
            execute_query(
                """
                INSERT INTO users (id, email, registered, treasurer, tardies, absences, strikes)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (new_id, email, False, False, None, None, None),
                fetch=False,
            )
            query.append(
                {
                    "id": new_id,
                    "email": email,
                    "registered": False,
                    "treasurer": False,
                    "tardies": [],
                    "absences": [],
                    "strikes": [],
                }
            )

        return {"users": query}, 200

    if request.method == "GET":
        user = execute_query(
            """
            SELECT id, email, registered, first_name, last_name, treasurer,
                   bank_account_number, bank_routing_number, bank_name,
                   bluevine_email, bluevine_password, current_position,
                   profile_blurb, linkedin_username, instagram_username,
                   calendly_username, current_company
            FROM users
            WHERE id = %s
            """,
            (id,),
        )[0]

        for field in [
            "profile_blurb",
            "linkedin_username",
            "instagram_username",
            "calendly_username",
            "current_company",
        ]:
            if user[field] is None:
                user[field] = ""

        if not user["registered"]:
            return {}, 401

        if user["bank_account_number"]:
            user["bank"] = {
                "account_number": user["bank_account_number"][:20],
                "routing_number": user["bank_routing_number"][:20],
                "bank_name": user["bank_name"],
            }
        del user["bank_account_number"]
        del user["bank_routing_number"]
        del user["bank_name"]

        if user["bluevine_password"]:
            user["bluevine_password"] = str(user["bluevine_password"])[:20]

        return user, 200


@app.route("/bluevine/", methods=["PUT", "OPTIONS"])
@jwt_required()
def update_bluevine():
    if request.method == "OPTIONS":
        return {}, 200
    id = get_jwt_identity()
    form = dict(request.json)

    user = execute_query("SELECT 1 FROM users WHERE id = %s", (id,))
    if not user:
        return {"error": "User not found"}, 404

    bluevine_email = form.get("bluevineEmail")
    update_fields = ["bluevine_email = %s"]
    params = [bluevine_email]

    if "bluevinePassword" in form:
        update_fields.append("bluevine_password = %s")
        params.append(encrypt(form["bluevinePassword"], BLUEVINE_PASSWORD_KEY))

    params.append(id)
    execute_query(
        f"""
        UPDATE users 
        SET {', '.join(update_fields)}
        WHERE id = %s
        """,
        tuple(params),
        fetch=False,
    )
    return {}, 200


@app.route("/users/", methods=["POST", "OPTIONS"])
def login_signup_add_PIC():
    if request.method == "OPTIONS":
        return {}, 200
    form = dict(request.json)

    user = execute_query("SELECT * FROM users WHERE email = %s", (form["email"],))
    if not user:
        return {"error": "Incorrect email"}, 401

    user = user[0]

    if form["method"] == "login":
        if not user["registered"]:
            return {}, 404

        if not user["google"] and form["google"]:
            execute_query(
                "UPDATE users SET google = TRUE WHERE email = %s",
                (form["email"],),
                fetch=False,
            )
            user["google"] = True

        if (user["google"] and form["google"]) or check_password(
            form["password"].encode("utf-8"), user["password"]
        ):
            access_token = create_access_token(identity=str(user["id"]))
            res = {"access_token": access_token}

            aid = form.get("attendanceId")
            if aid:
                attendees_dict = execute_query(
                    "SELECT attendees, start_time FROM attendance WHERE id = %s", (aid,)
                )
                if not attendees_dict:
                    return res

                attendees_dict = attendees_dict[0]
                attendees = json.loads(attendees_dict["attendees"])
                attendees[str(user["id"])] = (
                    form.get("attendanceTime"),
                    f"{user['first_name']} {user['last_name']}",
                )

                execute_query(
                    "UPDATE attendance SET attendees = %s WHERE id = %s",
                    (json.dumps(attendees), aid),
                    fetch=False,
                )

                res["redirect"] = (
                    f"http://localhost:3000/attendance/?attendancetime={form.get('attendanceTime')}&starttime={attendees_dict['start_time']}"
                    if getenv("ENVIRONMENT") == "local"
                    else f"https://plextech-member-portal.vercel.app/attendance/?attendancetime={form.get('attendanceTime')}&starttime={attendees_dict['start_time']}"
                )

            return res
        else:
            return {"error": "Incorrect password"}, 401

    if form["method"] == "signup":
        del form["method"]
        form["registered"] = True
        form["treasurer"] = user.get("treasurer", False)
        form["tardies"] = "[]"
        form["absences"] = "[]"
        form["strikes"] = "[]"

        if "google" in form and form["google"]:
            execute_query(
                """
                UPDATE users 
                SET registered = TRUE, first_name = %s, last_name = %s, google = TRUE
                WHERE id = %s
                """,
                (form["firstName"], form["lastName"], user["id"]),
                fetch=False,
            )
        else:
            form["google"] = False
            if user["registered"]:
                return {"error": "Account already exists"}, 400

            form["password"] = get_hashed_password(form["password"].encode("utf-8"))
            execute_query(
                """
                UPDATE users 
                SET registered = TRUE, first_name = %s, last_name = %s, 
                    password = %s, google = FALSE
                WHERE id = %s
                """,
                (form["firstName"], form["lastName"], form["password"], user["id"]),
                fetch=False,
            )

        access_token = create_access_token(identity=str(user["id"]))
        response = {"access_token": access_token}
        return response, 200

    if form["method"] == "passwordCode":
        number = str(randint(10000, 99999))
        execute_query(
            """
            UPDATE users 
            SET reset_password = %s, reset_timestamp = %s
            WHERE id = %s
            """,
            (get_hashed_password(number), int(time.time()), user["id"]),
            fetch=False,
        )

        gmail_send_message(
            form["email"],
            "[PlexTech] Reset Password Code",
            f"Your 5-digit password reset code is: {number}. This code will expire in 5 minutes.",
        )

        return {}, 200

    if form["method"] == "checkResetPasswordCode":
        if time.time() - user["reset_timestamp"] >= 300:
            return {"error": "Expired code"}, 498
        if check_password(form["code"].encode("utf-8"), user["reset_password"]):
            access_token = create_access_token(identity=str(user["id"]))
            response = {"access_token": access_token}
            return response, 200
        else:
            return {"error": "Incorrect code"}, 401


@app.route("/attendance/", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"])
@jwt_required(optional=True)
def attendance():
    if request.method == "OPTIONS":
        return {}, 200

    jwt = get_jwt_identity()

    # marking attendance by scanning qr code
    if request.method == "PUT":
        aid = request.json.get("meetingId")
        attendee_data = request.json.get("attendee")
        attendee_id = request.json.get("attendeeId")
        if attendee_data:
            if jwt:
                attendees_dict = execute_query(
                    "SELECT attendees FROM attendance WHERE id = %s", (aid,)
                )[0]
                attendees = json.loads(attendees_dict["attendees"])
                attendees[attendee_id] = attendee_data

                execute_query(
                    "UPDATE attendance SET attendees = %s WHERE id = %s",
                    (json.dumps(attendees), aid),
                    fetch=False,
                )
                return {}, 200
            else:
                return {"error": "Not Authorized"}, 401

        code = request.json.get("attendancecode")
        attendance_info = execute_query(
            "SELECT * FROM attendance WHERE id = %s", (aid,)
        )[0]

        if code == attendance_info["code"]:
            form = dict(request.json)
            if jwt:
                id = jwt
                attendees = json.loads(attendance_info["attendees"])
                if str(id) not in attendees:
                    user = execute_query(
                        "SELECT first_name, last_name FROM users WHERE id = %s", (id,)
                    )[0]
                    attendees[str(id)] = (
                        form["time"],
                        f"{user['first_name']} {user['last_name']}",
                    )
                    execute_query(
                        "UPDATE attendance SET attendees = %s WHERE id = %s",
                        (json.dumps(attendees), aid),
                        fetch=False,
                    )
                    return {
                        "attendanceTime": form["time"],
                        "startTime": attendance_info["start_time"],
                    }
            else:
                res = {
                    "redirect": (
                        "http://localhost:3000/"
                        if getenv("ENVIRONMENT") == "local"
                        else "https://plextech-member-portal.vercel.app/"
                    ),
                    "attendanceTime": form["time"],
                    "attendanceId": aid,
                }
                return res
        else:
            return {"error": "invalid code"}, 402

        return {}, 200

    if not jwt:
        return {}, 401
    id = jwt

    # generate new qr code
    if request.method == "POST":
        form = dict(request.json)
        if "id" in form:
            aid = form.get("id")
            attendance_info = execute_query(
                "SELECT * FROM attendance WHERE id = %s", (aid,)
            )[0]
            if form["set"]:
                new_code = generate_uuid()
                execute_query(
                    "UPDATE attendance SET code = %s WHERE id = %s",
                    (new_code, aid),
                    fetch=False,
                )
                attendance_info["code"] = new_code
        else:
            aid = generate_uuid()
            attendance_info = {
                "id": aid,
                "name": form.get("name"),
                "meeting_leader": form.get("meetingLeader"),
                "start_time": form.get("startTime"),
                "attendees": "{}",
            }
            if form["set"]:
                attendance_info["code"] = generate_uuid()
                execute_query(
                    """
                    INSERT INTO attendance 
                    (id, name, meeting_leader, start_time, attendees, code)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    (
                        aid,
                        attendance_info["name"],
                        attendance_info["meeting_leader"],
                        attendance_info["start_time"],
                        attendance_info["attendees"],
                        attendance_info["code"],
                    ),
                    fetch=False,
                )

        attendees = json.loads(attendance_info.get("attendees") or "{}")
        registered_users = execute_query(
            "SELECT first_name, last_name FROM users WHERE registered = TRUE"
        )
        unregistered_users = execute_query(
            "SELECT email FROM users WHERE registered = FALSE"
        )

        return {
            "code": attendance_info.get("code"),
            "id": aid,
            "attendees": attendees,
            "absent": [
                f"{user['first_name']} {user['last_name']}"
                for user in registered_users
                if str(user["id"]) not in attendees
            ]
            + [user["email"] for user in unregistered_users],
        }, 200

    if request.method == "GET":
        query_param = request.args.get("query")
        if query_param == "sessions":
            sessions = execute_query("SELECT id, name FROM attendance")
            return {"sessions": sessions}, 200
        else:
            aid = query_param
            attendance_info = execute_query(
                "SELECT attendees FROM attendance WHERE id = %s", (aid,)
            )[0]
            attendees = json.loads(attendance_info["attendees"])
            registered_users = execute_query(
                "SELECT first_name, last_name FROM users WHERE registered = TRUE"
            )
            unregistered_users = execute_query(
                "SELECT email FROM users WHERE registered = FALSE"
            )

            return {
                "attendees": attendees,
                "absent": [
                    f"{user['first_name']} {user['last_name']}"
                    for user in registered_users
                    if str(user["id"]) not in attendees
                ]
                + [user["email"] for user in unregistered_users],
            }, 200

    if request.method == "DELETE":
        # TODO: implement stopping session if needed
        form = dict(request.json)
        return {}, 200


@app.route("/approval/<request_id>/", methods=["GET", "PUT", "POST", "OPTIONS"])
@jwt_required()
def approve_request(request_id):
    if request.method == "OPTIONS":
        return {}, 200
    id = get_jwt_identity()
    user = execute_query("SELECT treasurer FROM users WHERE id = %s", (id,))[0]
    if not user["treasurer"]:
        return {}, 401

    if request.method == "GET":
        r = execute_query("SELECT images FROM requests WHERE id = %s", (request_id,))[0]
        return {"images": json.loads(r["images"])}, 200

    if request.method == "PUT":
        form = dict(request.json)
        r = execute_query("SELECT * FROM requests WHERE id = %s", (request_id,))[0]

        if form["status"] == "approved":
            requester = execute_query(
                """
                SELECT first_name, last_name, bank_account_number, bank_routing_number,
                       bank_name, email, id
                FROM users 
                WHERE id = %s
                """,
                (r["user_id"],),
            )[0]

            if not requester["bank_account_number"]:
                return {"error": "Need to set bank info"}, 407

            bluevine_user = execute_query(
                "SELECT bluevine_email, bluevine_password FROM users WHERE id = %s",
                (id,),
            )[0]

            bluevine_send_money(
                fullName=f"{requester['first_name']} {requester['last_name']}",
                accountNumber=decrypt(
                    requester["bank_account_number"], ACCOUNT_NUMBER_KEY
                ),
                routingNumber=decrypt(
                    requester["bank_routing_number"], ROUTING_NUMBER_KEY
                ),
                bankName=requester["bank_name"],
                amount=form["amount"],
                user_id=requester["id"],
                email=requester["email"],
                comments=form["comments"],
                request_id=request_id,
                description=r["item_description"],
                bluevineEmail=bluevine_user["bluevine_email"],
                bluevinePassword=decrypt(
                    bluevine_user["bluevine_password"], BLUEVINE_PASSWORD_KEY
                ),
            )

        execute_query(
            """
            UPDATE requests 
            SET status = %s, comments = %s
            WHERE id = %s
            """,
            (form["status"], json.dumps(form["comments"]), request_id),
            fetch=False,
        )

        return {}, 200

    if request.method == "POST":
        form = dict(request.json)
        code = str(form["code"])

        execute_query(
            "INSERT INTO mfa (id, code) VALUES (%s, %s)",
            (generate_uuid(), code),
            fetch=False,
        )

        return {}, 200


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


@app.route("/requests/", methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required()
def requests():
    if request.method == "OPTIONS":
        return {}, 200
    id = get_jwt_identity()

    if request.method == "GET":
        try:
            user = execute_query(
                "SELECT first_name, last_name, treasurer FROM users WHERE id = %s",
                (id,),
            )[0]
        except:
            return {}, 401

        res = {
            "firstName": user.get("first_name", ""),
            "lastName": user.get("last_name", ""),
            "treasurer": user.get("treasurer", False),
            "pendingReview": [],
            "underReview": [],
            "errors": [],
            "approved": [],
            "paid": [],
        }

        if res["treasurer"]:
            user_filter = request.args.get("user_filter")
            if user_filter:
                requests = execute_query(
                    """
                    SELECT r.id, r.user_id, r.status, r.item_description,
                           r.amount, r.date, r.comments, r.team_budget, r.created_at,
                           u.first_name, u.last_name, u.email,
                           u.bank_account_number IS NOT NULL as bank_set
                    FROM requests r
                    JOIN users u ON r.user_id = u.id
                    WHERE u.registered = TRUE AND u.id = %s
                    """,
                    (user_filter,),
                )
            else:
                requests = execute_query(
                    """
                    SELECT r.id, r.user_id, r.status, r.item_description,
                           r.amount, r.date, r.comments, r.team_budget, r.created_at,
                           u.first_name, u.last_name, u.email,
                           u.bank_account_number IS NOT NULL as bank_set
                    FROM requests r
                    JOIN users u ON r.user_id = u.id
                    WHERE u.registered = TRUE
                    """
                )

        else:
            requests = execute_query(
                """
                SELECT r.id, r.user_id, r.status, r.item_description,
                       r.amount, r.date, r.comments, r.team_budget, r.created_at,
                       u.first_name, u.last_name, u.email,
                       u.bank_account_number IS NOT NULL as bank_set
                FROM requests r
                JOIN users u ON r.user_id = u.id
                WHERE r.user_id = %s
                """,
                (id,),
            )

            res["treasurer"] = False

        for r in requests:
            r["comments"] = json.loads(r["comments"] or "[]")
            r["created_at"] = r["created_at"].strftime("%Y-%m-%d")
            if r["status"] != "paid" or (
                datetime.strptime(r["created_at"], "%Y-%m-%d")
                > datetime.now() - timedelta(days=180)
            ):
                res[r["status"]].append(r)

        return res, 200

    form = dict(request.json)

    if request.method == "POST":
        if "comment" in form:
            req = execute_query(
                """
                UPDATE requests 
                SET comments = JSON_ARRAY_APPEND(
                    COALESCE(comments, '[]'),
                    '$',
                    %s
                )
                WHERE id = %s
                RETURNING *
                """,
                (json.dumps(form["comment"]), form["request_id"]),
                fetch=False,
            )
            if not req:
                return {"error": "request not found"}, 404

            return {}, 200
        else:
            form["user_id"] = id
            request_id = generate_uuid()
            execute_query(
                """
                INSERT INTO requests (
                    id, user_id, status, item_description, amount, date,
                    comments, images, team_budget
                )
                VALUES (%s, %s, 'pendingReview', %s, %s, %s, NULL, %s, %s)
                """,
                (
                    request_id,
                    id,
                    form["item_description"],
                    form["amount"],
                    convert_date(form["date"]),
                    json.dumps(form["images"]),
                    form.get("team_budget"),
                ),
                fetch=False,
            )

            form["id"] = request_id
            del form["images"]
            form["user_id"] = id
            return {"id": form["id"]}, 200

    if request.method == "PUT":
        if "comment" in form:
            if form["request_id"] is None:
                return {"comments": []}, 200
            r = execute_query(
                "SELECT comments FROM requests WHERE id = %s", (form["request_id"],)
            )[0]
            return {"comments": json.loads(r["comments"] or "[]")}, 200

        if "images" in form:
            if form["request_id"] is None:
                return {"images": []}, 200
            r = execute_query(
                "SELECT images FROM requests WHERE id = %s", (form["request_id"],)
            )[0]
            return {"images": json.loads(r["images"] or "[]")}, 200

        request_id = form.pop("request_id")
        del form["id"]
        execute_query(
            """
            INSERT INTO requests (
                id, user_id, status, item_description, amount, date,
                comments, images, team_budget
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                status = VALUES(status),
                item_description = VALUES(item_description),
                amount = VALUES(amount),
                date = VALUES(date),
                comments = VALUES(comments),
                images = VALUES(images),
                team_budget = VALUES(team_budget)
            """,
            (
                request_id,
                form["user_id"],
                form["status"],
                form["item_description"],
                form["amount"],
                convert_date(form["date"]),
                json.dumps(form.get("comments", []) or "[]"),
                json.dumps(form.get("images", []) or "[]"),
                form.get("team_budget"),
            ),
            fetch=False,
        )
        return {"id": id}, 200

    if request.method == "DELETE":
        request_id = form["id"]
        execute_query("DELETE FROM requests WHERE id = %s", (request_id,), fetch=False)
        return {}, 200


@app.route("/forum/", methods=["GET", "POST", "PUT", "PATCH"])
@jwt_required()
def forum():
    if request.method == "OPTIONS":
        return {}, 200
    id = get_jwt_identity()

    # get user name
    if request.method == "PATCH":
        user = execute_query(
            "SELECT first_name, last_name FROM users WHERE id = %s", (id,)
        )[0]
        return {"firstName": user["first_name"], "lastName": user["last_name"]}, 200

    if request.method == "GET":
        posts = execute_query(
            """
            SELECT p.*, 
                   JSON_ARRAYAGG(DISTINCT uv.id) as upvotes,
                   JSON_ARRAYAGG(DISTINCT dv.id) as downvotes
            FROM posts p
            LEFT JOIN posts_upvotes uv ON p.id = uv.post_id
            LEFT JOIN posts_downvotes dv ON p.id = dv.post_id
            GROUP BY p.id
            """
        )
        return {"posts": posts}, 200

    form = dict(request.json)

    if request.method == "POST":
        post_id = generate_uuid()
        if not form["anonymous"]:
            user = execute_query(
                "SELECT first_name, last_name FROM users WHERE id = %s", (id,)
            )[0]
            execute_query(
                """
                INSERT INTO posts (
                    id, user_id, first_name, last_name, content,
                    anonymous, date
                )
                VALUES (%s, %s, %s, %s, %s, %s, CURDATE())
                """,
                (
                    post_id,
                    id,
                    user["first_name"],
                    user["last_name"],
                    form["content"],
                    form["anonymous"],
                ),
                fetch=False,
            )
        else:
            execute_query(
                """
                INSERT INTO posts (id, content, anonymous, date)
                VALUES (%s, %s, %s, CURDATE())
                """,
                (post_id, form["content"], form["anonymous"]),
                fetch=False,
            )
        return {}, 200

    if request.method == "PUT":
        updated = 0
        if form["removeFromDownvote"]:
            updated += execute_query(
                "DELETE FROM posts_downvotes WHERE post_id = %s AND user_id = %s",
                (form["postId"], id),
                fetch=False,
            )

        if form["removeFromUpvote"]:
            updated += execute_query(
                "DELETE FROM posts_upvotes WHERE post_id = %s AND user_id = %s",
                (form["postId"], id),
                fetch=False,
            )

        if form["addToDownvote"]:
            updated += execute_query(
                "INSERT INTO posts_downvotes (post_id, user_id) VALUES (%s, %s)",
                (form["postId"], id),
                fetch=False,
            )

        if form["addToUpvote"]:
            updated += execute_query(
                "INSERT INTO posts_upvotes (post_id, user_id) VALUES (%s, %s)",
                (form["postId"], id),
                fetch=False,
            )

        if not updated:
            return {"error": "did not update anything"}, 400

        return {}, 200


@app.route("/bank/", methods=["PUT"])
@jwt_required()
def bank_details():
    if request.method == "OPTIONS":
        return {}, 200

    if request.method == "PUT":
        id = get_jwt_identity()
        form = dict(request.json)

        update_fields = []
        params = []

        if "accountNumber" in form and form["accountNumber"]:
            update_fields.append("bank_account_number = %s")
            params.append(
                encrypt(str(form["accountNumber"]).strip(), ACCOUNT_NUMBER_KEY)
            )

        if "routingNumber" in form and form["routingNumber"]:
            update_fields.append("bank_routing_number = %s")
            params.append(
                encrypt(str(form["routingNumber"]).strip(), ROUTING_NUMBER_KEY)
            )

        if "bankName" in form and form["bankName"]:
            update_fields.append("bank_name = %s")
            params.append(form["bankName"].strip())

        if update_fields:
            params.append(id)
            execute_query(
                f"""
                UPDATE users 
                SET {', '.join(update_fields)}
                WHERE id = %s
                """,
                tuple(params),
                fetch=False,
            )

        return {}, 200


@app.route("/profile/image/", methods=["PUT"])
@jwt_required()
def update_profile_image():
    if request.method == "PUT":
        id = get_jwt_identity()

        if "image" not in request.files:
            return {"error": "No image file"}, 400

        file = request.files["image"]
        if file.filename == "":
            return {"error": "No selected file"}, 400

        # Save to file
        profile_dir = (
            "./images"
            if getenv("ENVIRONMENT") == "local"
            else "/home/p/pl/plextech/app/public/profile-pictures"
        )
        if not os.path.exists(profile_dir):
            return {"error": "Profile pictures directory does not exist"}, 500

        file.save(f"{profile_dir}/{id}.jpg")
        return {}, 200


@app.route("/profile/image/<user_id>", methods=["GET"])
def get_profile_image(user_id):
    profile_dir = (
        "./images"
        if getenv("ENVIRONMENT") == "local"
        else "/home/p/pl/plextech/app/public/profile-pictures"
    )
    image_path = f"{profile_dir}/{user_id}.jpg"

    if not os.path.exists(image_path):
        return {"error": "Image not found"}, 404

    return send_from_directory(profile_dir, f"{user_id}.jpg", mimetype="image/jpeg")


if __name__ == "__main__":
    app.run(port=getenv("PORT"), host="0.0.0.0", debug=getenv("ENVIRONMENT") == "local")
