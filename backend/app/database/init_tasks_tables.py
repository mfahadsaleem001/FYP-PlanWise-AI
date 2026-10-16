from app.database.connection import engine

from app.models.employee import Employee
from app.models.project import Project
from app.models.project_employee_assignment import ProjectEmployeeAssignment
from app.models.task import Task, TaskAssignment
from app.models.user import User
from app.models.weekly_plan import WeeklyPlan


def init_tasks_tables():
    # Ensure referenced models are registered in SQLAlchemy metadata.
    _ = (
        Employee,
        Project,
        ProjectEmployeeAssignment,
        User,
        WeeklyPlan,
    )

    # Create the weekly plans table first because tasks reference it.
    WeeklyPlan.__table__.create(
        bind=engine,
        checkfirst=True,
    )
    print("weekly_plans table created or already exists.")

    # Create task tables if they do not exist.
    Task.__table__.create(
        bind=engine,
        checkfirst=True,
    )
    print("tasks table created or already exists.")

    TaskAssignment.__table__.create(
        bind=engine,
        checkfirst=True,
    )
    print("task_assignments table created or already exists.")


if __name__ == "__main__":
    init_tasks_tables()