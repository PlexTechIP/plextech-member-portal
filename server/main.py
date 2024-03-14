from flask import Flask, request, jsonify, make_response, redirect
from dotenv import load_dotenv
from bson.objectid import ObjectId
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
from pymongo.errors import BulkWriteError
from random import randint
from cryptography.fernet import Fernet

from send_email import gmail_send_message, send_comment_email, send_email
from sheets import add_row_to_sheet

# from venmo import request_money, send_money, search
from bluevine import bluevine_send_money

import time
import bcrypt
import pymongo
import json

load_dotenv()

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["JWT_SECRET_KEY"] = getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

key = getenv("FERNET_KEY")
f = Fernet(key)


@app.after_request
def after_request(response):
    # cors
    if getenv("ENVIRONMENT") == "local":
        origin = "*"
    elif getenv("ENVIRONMENT") == "production":
        origin = "https://plextech-member-portal.vercel.app"

    response.headers.add(
        "Access-Control-Allow-Origin",
        origin,
    )
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With"
    )
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")

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
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


client = pymongo.MongoClient(getenv("MONGO_URL"))
db = client.test


def get_hashed_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password, bcrypt.gensalt())


def check_password(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password, hashed_password)


def encrypt(p):
    return f.encrypt(p.encode()).decode()


def decrypt(c):
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


@app.route("/profile/", methods=["PUT", "POST", "GET", "DELETE", "OPTIONS"])
@jwt_required()
def protected_user_routes():
    if request.method == "OPTIONS":
        return {}, 200
    id = ObjectId(get_jwt_identity())
    if request.method == "PUT":
        db.Users.update_one(
            {"_id": id},
            {
                "$set": {
                    "password": get_hashed_password(dict(request.json)["password"])
                },
                "$unset": {"reset_password": "", "timestamp": ""},
            },
        )
        return {}, 200

    if request.method == "POST":
        form = dict(request.json)
        user = db.Users.find_one({"_id": id})
        if not user["treasurer"]:
            return {}, 401
        try:
            emails = form["emails"]
            query = [
                {
                    "email": email,
                    "registered": False,
                    "treasurer": False,
                    "tardies": [],
                    "absences": [],
                    "strikes": [],
                }
                for email in emails
            ]
            res = db.Users.insert_many(query)
            for i in range(len(res.inserted_ids)):
                query[i]["_id"] = str(res.inserted_ids[i])
                query[i]["requests"] = []

        except BulkWriteError as e:
            pass

        return {"users": query}, 200

    if request.method == "GET":
        user = db.Users.find_one({"_id": id})
        if not user["registered"]:
            return {}, 401
        user = dict(user)
        user["_id"] = str(user["_id"])
        del user["requests"]
        del user["password"]
        if (
            "bank" in user
            and user["bank"]
            and "accountNumber" in user["bank"]
            and "routingNumber" in user["bank"]
        ):
            user["bank"]["accountNumber"] = str(user["bank"]["accountNumber"])[:20]
            user["bank"]["routingNumber"] = str(user["bank"]["routingNumber"])[:20]
        return dict(user), 200


@app.route("/users/", methods=["POST", "OPTIONS"])
def login_signup_add_PIC():
    if request.method == "OPTIONS":
        return {}, 200
    form = dict(request.json)

    user = db.Users.find_one({"email": form["email"]})

    if not user:
        return {"error": "Incorrect email"}, 401

    if form["method"] == "login":
        # login success
        if not user["registered"]:
            return {}, 404

        if not ("google" in user and user["google"]) and form["google"]:
            user["google"] = True
            db.Users.update_one({"email": form["email"]}, {"$set": {"google": True}})

        # try:
        if ("google" in user and user["google"] and form["google"]) or check_password(
            form["password"].encode("utf-8"), user["password"].encode("utf-8")
        ):
            access_token = create_access_token(identity=str(user["_id"]))
            res = {"access_token": access_token}

            if request.cookies.get("attendanceId"):
                attendance_info = db.Attendance.find_one(
                    {"_id": request.cookies.get("attendanceId")}
                )

                attendance_info["attendees"][user["_id"]] = (
                    request.cookies.get("attendanceTime"),
                    f"{user['firstName']} {user['lastName']}",
                )
                res.update(
                    {
                        "startTime": attendance_info["startTime"],
                        "attendanceTime": request.cookies.get("attendanceTime"),
                    }
                )

            response = make_response(res)
            response.delete_cookie("attendanceTime")
            response.delete_cookie("attendanceId")
            return response
        else:
            return {"error": "Incorrect password"}, 401

        # except:
        #     return {
        #         "error": "Tried to log in with password but signed up with Google."
        #     }, 400

    if form["method"] == "signup":
        del form["method"]
        form["requests"] = []
        form["registered"] = True
        form["treasurer"] = False
        form["tardies"] = []
        form["absences"] = []
        form["strikes"] = []

        if "google" in form and form["google"]:
            db.Users.replace_one({"_id": user["_id"]}, form)
        else:
            form["google"] = False
            if user["registered"]:
                return {"error": "Account already exists"}, 400

            form["password"] = get_hashed_password(form["password"].encode("utf-8"))
            db.Users.replace_one({"_id": user["_id"]}, form)

        access_token = create_access_token(identity=str(user["_id"]))
        response = {"access_token": access_token}
        return response, 200

    if form["method"] == "passwordCode":
        number = str(randint(10000, 99999))
        db.Users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "reset_password": get_hashed_password(number),
                    "timestamp": time(),
                }
            },
        )

        gmail_send_message(
            form["email"],
            f"[PlexTech] Reset Password Code",
            f"Your 5-digit password reset code is: {number}. This code will expire in 5 minutes.",
        )

        return {}, 200

    if form["method"] == "checkResetPasswordCode":
        if time() - user["timestamp"] >= 300:
            return {"error": "Expired code"}, 498
        if check_password(form["code"], user["reset_password"]):
            access_token = create_access_token(identity=str(user["_id"]))
            response = {"access_token": access_token}
            return response, 200
        else:
            return {"error": "Incorrect code"}, 401


@app.route("/attendance/", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
@jwt_required(optional=True)
def attendance():
    if request.method == "OPTIONS":
        return {}, 200

    jwt = get_jwt_identity()

    # marking attendance by scanning qr code
    if request.method == "PUT":
        code = ObjectId(request.json.get("attendancecode"))
        aid = ObjectId(request.json.get("meetingId"))

        attendance_info = db.Attendance.find_one({"_id": aid})

        if code == attendance_info["code"]:
            form = dict(request.json)
            if jwt:
                id = ObjectId(get_jwt_identity())

                if (
                    str(id)
                    not in attendance_info["attendees"]
                    # and id != attendance_info["meetingLeader"]
                ):
                    user = db.Users.find_one({"_id": id})
                    attendance_info["attendees"][str(id)] = (
                        form["time"],
                        f"{user['firstName']} {user['lastName']}",
                    )
                    db.Attendance.replace_one({"_id": aid}, attendance_info)
                    return {
                        "attendanceTime": form["time"],
                        "startTime": attendance_info["startTime"],
                    }
            else:
                response = make_response({
                    'redirect': "https://plextech-member-portal.vercel.app/"
                })
                response.set_cookie("attendanceTime", form["time"])
                response.set_cookie("attendanceId", str(aid))
                return response
        else:
            return {"error": "invalid code"}, 402

        return {}, 200

    if not jwt:
        return {}, 401
    id = ObjectId(get_jwt_identity())
    user = db.Users.find_one({"_id": id})

    # generate new qr code
    if request.method == "POST":
        form = dict(request.json)
        if "id" in form:
            aid = ObjectId(form.get("id"))
            attendance_info = db.Attendance.find_one({"_id": aid})
            if form["set"]:
                attendance_info["code"] = ObjectId()
                db.Attendance.replace_one({"_id": aid}, attendance_info)
        else:
            aid = ObjectId()
            attendance_info = {
                "_id": aid,
                "name": form.get("name"),
                "meetingLeader": ObjectId(form.get("meetingLeader")),
                "startTime": form.get("startTime"),
                "attendees": {},
            }
            if form["set"]:
                attendance_info["code"] = ObjectId()
                db.Attendance.insert_one(attendance_info)

        return {
            "code": str(attendance_info["code"]),
            "id": str(aid),
            "attendees": attendance_info["attendees"],
            "absent": [
                user["firstName"] + " " + user["lastName"]
                for user in db.Users.find({"registered": True})
                if str(user["_id"]) not in attendance_info["attendees"]
            ]
            + [user["email"] for user in db.Users.find({"registered": False})],
        }, 200

    if request.method == "GET":
        query_param = request.args.get("query")
        if query_param == "sessions":
            sessions = list(db.Attendance.find({}, {"name": 1}))
            for s in sessions:
                s["_id"] = str(s["_id"])
            return {"sessions": sessions}, 200

        else:
            aid = ObjectId(query_param)
            attendance_info = db.Attendance.find_one({"_id": aid})
            return {
                "attendees": attendance_info["attendees"],
                "absent": [
                    user["firstName"] + " " + user["lastName"]
                    for user in db.Users.find({"registered": True})
                    if str(user["_id"]) not in attendance_info["attendees"]
                ]
                + [user["email"] for user in db.Users.find({"registered": False})],
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
    id = ObjectId(get_jwt_identity())
    user = db.Users.find_one({"_id": id})
    if not user["treasurer"]:
        return {}, 401

    if request.method == "GET":
        r = db.Requests.find_one({"_id": ObjectId(request_id)})

        return {"images": r["images"]}, 200

    if request.method == "PUT":
        form = dict(request.json)

        r = db.Requests.find_one(
            {"_id": ObjectId(request_id)},
        )

        if form["status"] == "approved":
            requester = db.Users.find_one({"_id": r["user_id"]})
            # if "venmo" not in user:
            #     r = db.Requests.find_one_and_update(
            #         {"_id": ObjectId(request_id)},
            #         {
            #             "$set": {"status": "errors"},
            #             "$push": {"comments": {"$each": form["comments"]}},
            #         },
            #     )
            #     return {"error": "Need to set venmo username"}, 407
            if "bank" not in requester:
                # send_email(
                #     requester["email"],
                #     "PlexTech Reimbursement Error",
                #     f'Hi {requester["firstName"]},',
                #     'You need to set your bank account information in order to be reimbursed. Please go to <a href="https://plextech-member-portal.vercel.app/">https://plextech-member-portal.vercel.app/</a> to set your bank account information.',
                # )
                return {"error": "Need to set bank info"}, 407
            # send_money(user['venmo']['id'], form['amount'],
            #             f'PlexTech Reimbursement: {r["itemDescription"]}')
            # db.PaymentQueue.insert_one({'_id': ObjectId(request_id), 'venmo_id': user['venmo']['id'], 'amount': float(
            #     form['amount']), 'subject': r["itemDescription"], 'successes': 0})
            bluevine_send_money(
                fullName=requester["firstName"] + " " + requester["lastName"],
                accountNumber=decrypt(requester["bank"]["accountNumber"]),
                routingNumber=decrypt(requester["bank"]["routingNumber"]),
                bankName=requester["bank"]["bankName"],
                amount=form["amount"],
                user_id=requester["_id"],
                email=requester["email"],
                comments=form["comments"],
                request_id=request_id,
                description=r["itemDescription"],
                bluevineEmail=user["bluevineEmail"],
                bluevinePassword=decrypt(user["bluevinePassword"]),
            )

        db.Requests.update_one(
            {"_id": ObjectId(request_id)},
            {
                "$set": {"status": form["status"]},
                "$push": {"comments": {"$each": form["comments"]}},
            },
        )

        return {}, 200

    if request.method == "POST":
        form = dict(request.json)
        code = str(form["code"])

        db.MFA.insert_one({"code": code})

        return {}, 200


@app.route("/requests/", methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required()
def requests():
    if request.method == "OPTIONS":
        return {}, 200
    id = ObjectId(get_jwt_identity())

    if request.method == "GET":
        try:
            user = dict(db.Users.find_one({"_id": id}))
        except:
            return {}, 401

        res = {
            "firstName": user.get("firstName", ""),
            "lastName": user.get("lastName", ""),
            "treasurer": user.get("treasurer", False),
            "pendingReview": [],
            "underReview": [],
            "errors": [],
            "approved": [],
            "paid": [],
        }

        if res["treasurer"]:
            user_filter = request.args.get("user_filter")
            filter = (
                {"registered": True, "_id": ObjectId(user_filter)}
                if user_filter
                else {"registered": True}
            )

            ### BEGIN CHATGPT MAGIC ###

            pipeline = [
                {"$match": filter},
                {
                    "$addFields": {
                        "convertedRequests": {
                            "$map": {
                                "input": "$requests",
                                "in": {"$toObjectId": "$$this"},
                            }
                        }
                    }
                },
                {
                    "$lookup": {
                        "from": "Requests",
                        "localField": "convertedRequests",
                        "foreignField": "_id",
                        "as": "user_requests",
                    }
                },
                {"$unwind": "$user_requests"},
                {
                    "$project": {
                        "_id": {"$toString": "$user_requests._id"},
                        "user_id": {"$toString": "$_id"},
                        "request_id": {"$toString": "$user_requests._id"},
                        "status": "$user_requests.status",
                        "itemDescription": "$user_requests.itemDescription",
                        "amount": "$user_requests.amount",
                        "date": "$user_requests.date",
                        "firstName": "$firstName",
                        "lastName": "$lastName",
                        "email": "$email",
                        "comments": "$user_requests.comments",
                        "bank_set": "$bank",
                        "teamBudget": "$user_requests.teamBudget",
                    }
                },
            ]

            users_requests = list(db.Users.aggregate(pipeline))

            # Grouping requests by status in application layer, since MongoDB doesn't provide an efficient way to do this
            for ur in users_requests:
                res[ur["status"]].append(ur)

            ### END CHATGPT MAGIC ###
        else:
            response = db.Requests.find(
                {"_id": {"$in": [ObjectId(r) for r in user["requests"]]}}, {"images": 0}
            )

            for r in response:
                r["_id"] = str(r["_id"])
                r["user_id"] = str(user["_id"])
                res[r["status"]].append(r)
            res["treasurer"] = False

        return res, 200

    form = dict(request.json)

    if request.method == "POST":
        if "comment" in form:
            req = db.Requests.find_one_and_update(
                {"_id": ObjectId(form["request_id"])},
                {"$push": {"comments": form["comment"]}},
            )
            if not req:
                return {"error": "request not found"}, 404
            request_user = db.Users.find_one(
                {"_id": req["user_id"]},
                {"_id": 1, "firstName": 1, "lastName": 1, "email": 1},
            )
            user = db.Users.find_one(
                {"_id": id}, {"_id": 1, "firstName": 1, "lastName": 1, "email": 1}
            )
            # if user["_id"] == request_user["_id"]:
            #     for user in db.Users.find({"treasurer": True}, {"_id": 0, "email": 1}):
            #         send_comment_email(
            #             user["email"],
            #             f'[PlexTech] {user["firstName"]} commented on your request',
            #             request_user["firstName"],
            #             user["firstName"],
            #             user["lastName"],
            #             req["itemDescription"],
            #             form["comment"]["message"],
            #         )
            # else:
            #     send_comment_email(
            #         request_user["email"],
            #         f'[PlexTech] {user["firstName"]} commented on your request',
            #         request_user["firstName"],
            #         user["firstName"],
            #         user["lastName"],
            #         req["itemDescription"],
            #         form["comment"]["message"],
            #     )
            return {}, 200
        else:
            form["user_id"] = id
            res = db.Requests.insert_one(form)

            request_id = str(res.inserted_id)
            db.Users.update_one(
                {"_id": id}, {"$push": {"requests": ObjectId(request_id)}}
            )

            form["_id"] = request_id
            del form["images"]
            form["user_id"] = str(id)
            return {"_id": form["_id"]}, 200

    if request.method == "PUT":
        if "comment" in form:
            if form["request_id"] is None:
                return {"comments": []}, 200
            r = list(
                db.Requests.find(
                    {"_id": ObjectId(form["request_id"])}, {"_id": 0, "comments": 1}
                )
            )[0]
            return {"comments": r["comments"]}, 200

        if "images" in form:
            if form["request_id"] is None:
                return {"images": []}, 200
            r = list(
                db.Requests.find(
                    {"_id": ObjectId(form["request_id"])}, {"_id": 0, "images": 1}
                )
            )[0]

            return {"images": r["images"]}, 200

        request_id = form.pop("request_id")
        del form["_id"]
        # try:
        res = db.Requests.replace_one({"_id": ObjectId(request_id)}, form)
        if res.matched_count == 0:
            db.Requests.insert_one(form)
        # except:
        #     return {'error': 'Internal Server Error'}, 500
        return {"_id": str(id)}, 200

    if request.method == "DELETE":
        request_id = ObjectId(form["_id"])
        db.Requests.delete_one({"_id": request_id})
        db.Users.update_one({"_id": id}, {"$pull": {"requests": request_id}})
        return {}, 200


@app.route("/forum/", methods=["GET", "POST", "PUT", "PATCH"])
@jwt_required()
def forum():
    if request.method == "OPTIONS":
        return {}, 200
    id = ObjectId(get_jwt_identity())

    # get user name
    if request.method == "PATCH":
        user = db.Users.find_one({"_id": id})
        return {"firstName": user["firstName"], "lastName": user["lastName"]}, 200

    if request.method == "GET":
        res = list(db.Posts.find({}))
        for r in res:
            r["_id"] = str(r["_id"])
            r["upvotes"] = [str(u) for u in r["upvotes"]]
            r["downvotes"] = [str(u) for u in r["downvotes"]]

        return {"posts": res}, 200

    form = dict(request.json)

    if request.method == "POST":
        if not form["anonymous"]:
            user = db.Users.find_one({"_id": id})
            form["user_id"] = id
            form["firstName"] = user["firstName"]
            form["lastName"] = user["lastName"]

        d = str(datetime.now())
        d = d[: d.index(" ")]
        form["date"] = d
        form["upvotes"] = []
        form["downvotes"] = []
        db.Posts.insert_one(form)
        return {}, 200

    if request.method == "PUT":
        updated = 0
        if form["removeFromDownvote"]:
            updated += db.Posts.update_one(
                {"_id": ObjectId(form["postId"])}, {"$pull": {"downvotes": id}}
            ).modified_count

        if form["removeFromUpvote"]:
            updated += db.Posts.update_one(
                {"_id": ObjectId(form["postId"])}, {"$pull": {"upvotes": id}}
            ).modified_count

        if form["addToDownvote"]:
            updated += db.Posts.update_one(
                {"_id": ObjectId(form["postId"])}, {"$push": {"downvotes": id}}
            ).modified_count

        if form["addToUpvote"]:
            updated += db.Posts.update_one(
                {"_id": ObjectId(form["postId"])}, {"$push": {"upvotes": id}}
            ).modified_count

        if not updated:
            return {"error": "did not update anything"}, 400

        return {}, 200


@app.route("/venmo/<id>/", methods=["GET", "PUT"])
@jwt_required()
def venmo_search(id):
    if request.method == "OPTIONS":
        return {}, 200

    if request.method == "GET":
        return {"users": search(id)}, 200  # id functions as username here

    if request.method == "PUT":
        _id = ObjectId(get_jwt_identity())
        form = dict(request.json)
        db.Users.update_one({"_id": _id}, {"$set": {"venmo": form}})

        return {}, 200


@app.route("/bank/", methods=["PUT"])
@jwt_required()
def bank_details():
    if request.method == "OPTIONS":
        return {}, 200

    if request.method == "PUT":
        _id = ObjectId(get_jwt_identity())
        form = dict(request.json)

        user = db.Users.find_one({"_id": _id}, {"_id": 0, "bank": 1})
        if "bank" in user:
            bank = user["bank"]
        else:
            bank = {}

        if "accountNumber" in form and form["accountNumber"]:
            bank["accountNumber"] = encrypt(str(form["accountNumber"]).strip())
        if "routingNumber" in form and form["routingNumber"]:
            bank["routingNumber"] = encrypt(str(form["routingNumber"]).strip())
        if "bankName" in form and form["bankName"]:
            bank["bankName"] = form["bankName"].strip()

        db.Users.update_one(
            {"_id": _id},
            {
                "$set": {
                    "bank": bank,
                }
            },
        )

        return {}, 200


if __name__ == "__main__":
    app.run(port=getenv("PORT"), host="0.0.0.0", debug=getenv("ENVIRONMENT") == "local")
