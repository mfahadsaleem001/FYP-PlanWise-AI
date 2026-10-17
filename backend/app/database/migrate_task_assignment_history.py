from sqlalchemy import inspect

from app.database.connection import engine
from app.models.employee import Employee
from app.models.task import Task, TaskAssignment
from app.models.task_assignment_history import TaskAssignmentHistory
from app.models.user import User


def migrate_task_assignment_history():
    print("Starting task assignment history migration...")

    # Ensure all related models are loaded.
    _ = (
        Employee,
        Task,
        TaskAssignment,
        TaskAssignmentHistory,
        User,
    )

    with engine.begin() as connection:
        TaskAssignmentHistory.__table__.create(
            bind=connection,
            checkfirst=True,
        )

        inspector = inspect(connection)
        tables = set(inspector.get_table_names())

        if "task_assignment_history" not in tables:
            raise RuntimeError(
                "The task_assignment_history table was not created."
            )

    print("Task assignment history table is ready.")
    print("Task assignment history migration completed successfully.")


if __name__ == "__main__":
    migrate_task_assignment_history()