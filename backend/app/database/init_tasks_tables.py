from app.database.connection import engine

from app.models.project import Project
from app.models.user import User
from app.models.weekly_plan import WeeklyPlan


def init_weekly_plans_table():
    # Ensure the referenced models are registered in SQLAlchemy metadata.
    _ = (Project, User)

    WeeklyPlan.__table__.create(
        bind=engine,
        checkfirst=True,
    )

    print("weekly_plans table created or already exists.")


if __name__ == "__main__":
    init_weekly_plans_table()