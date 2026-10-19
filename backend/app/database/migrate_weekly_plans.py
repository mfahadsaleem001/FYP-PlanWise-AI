from sqlalchemy import inspect

from app.database.connection import engine
from app.models.project import Project
from app.models.user import User
from app.models.weekly_plan import WeeklyPlan


def migrate_weekly_plans():
    print("Starting weekly plans migration...")

    # Ensure referenced model tables are registered.
    _ = (Project, User)

    with engine.begin() as connection:
        WeeklyPlan.__table__.create(
            bind=connection,
            checkfirst=True,
        )

        inspector = inspect(connection)

        if not inspector.has_table("projects"):
            raise RuntimeError(
                "The projects table does not exist. "
                "Initialize the project tables first."
            )

        if not inspector.has_table("users"):
            raise RuntimeError(
                "The users table does not exist. "
                "Initialize the user tables first."
            )

    print("Weekly plans table is ready.")
    print("Weekly plans migration completed successfully.")


if __name__ == "__main__":
    migrate_weekly_plans()