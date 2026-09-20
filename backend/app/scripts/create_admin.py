from app.database.connection import SessionLocal
from app.services.admin_provisioning import create_initial_admin


def main():
    db = SessionLocal()

    try:
        admin = create_initial_admin(db)

        if admin is None:
            print("Initial admin already exists.")
            return

        print("Initial admin created successfully.")
        print(f"Admin email: {admin.email}")

    finally:
        db.close()


if __name__ == "__main__":
    main()