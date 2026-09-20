from sqlalchemy import select

from app.core.config import settings
from app.database.connection import SessionLocal
from app.models.user import User


def main():
    db = SessionLocal()

    try:
        statement = select(User).where(User.role == "admin")
        admin = db.scalar(statement)

        if admin is None:
            print("No admin account found.")
            return

        old_email = admin.email
        admin.email = settings.initial_admin_email

        db.commit()
        db.refresh(admin)

        print("Admin email updated successfully.")
        print(f"Old email: {old_email}")
        print(f"New email: {admin.email}")

    finally:
        db.close()


if __name__ == "__main__":
    main()