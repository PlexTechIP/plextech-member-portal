import logging
import os
from pathlib import Path

import mysql.connector
import requests
from dotenv import load_dotenv


load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


def get_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
    )


def main():
    upload_url = os.getenv("PROFILE_IMAGE_UPLOAD_URL")
    upload_secret = os.getenv("PROFILE_IMAGE_UPLOAD_SECRET")
    profile_dir = Path(
        os.getenv(
            "PROFILE_IMAGE_DIRECTORY",
            "/home/p/pl/plextech/app/public/profile-pictures",
        )
    )

    if not upload_url or not upload_secret:
        raise RuntimeError(
            "PROFILE_IMAGE_UPLOAD_URL and PROFILE_IMAGE_UPLOAD_SECRET are required"
        )

    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, image_url FROM users WHERE registered = TRUE")
        users = cursor.fetchall()

        migrated = 0
        skipped = 0
        for user in users:
            if (user.get("image_url") or "").startswith("https://"):
                skipped += 1
                continue

            image_path = profile_dir / f"{user['id']}.jpg"
            if not image_path.exists():
                skipped += 1
                continue

            response = requests.post(
                upload_url,
                data=image_path.read_bytes(),
                headers={
                    "Authorization": f"Bearer {upload_secret}",
                    "Content-Type": "image/jpeg",
                    "X-Member-Id": user["id"],
                },
                timeout=30,
            )
            response.raise_for_status()
            image_url = response.json()["url"]

            cursor.execute(
                "UPDATE users SET image_url = %s WHERE id = %s",
                (image_url, user["id"]),
            )
            db.commit()
            migrated += 1
            logging.info("Migrated %s", user["id"])

        logging.info("Migration complete: %s migrated, %s skipped", migrated, skipped)
    finally:
        cursor.close()
        db.close()


if __name__ == "__main__":
    main()
