from sqlalchemy import inspect, text

from app.database.connection import engine
from app.models.employee import Employee
from app.models.project import Project
from app.models.project_employee_assignment import ProjectEmployeeAssignment
from app.models.task import Task, TaskAssignment
from app.models.task_weekly_plan import TaskWeeklyPlan
from app.models.user import User
from app.models.weekly_plan import WeeklyPlan


def migrate_task_weekly_plans():
    print("Starting task weekly plans migration...")

    # Ensure SQLAlchemy has loaded the related models.
    _ = (
        Employee,
        Project,
        ProjectEmployeeAssignment,
        Task,
        TaskAssignment,
        User,
        WeeklyPlan,
    )

    with engine.begin() as connection:
        TaskWeeklyPlan.__table__.create(
            bind=connection,
            checkfirst=True,
        )

        inspector = inspect(connection)

        task_columns = {
            column["name"]
            for column in inspector.get_columns("tasks")
        }

        if "weekly_plan_id" not in task_columns:
            raise RuntimeError(
                "The tasks.weekly_plan_id column is missing. "
                "Run the weekly plans migration first."
            )

        # Preserve each existing task's original weekly-plan link.
        existing_tasks = connection.execute(
            text("""
                SELECT id, weekly_plan_id, created_by
                FROM tasks
                WHERE weekly_plan_id IS NOT NULL
            """)
        ).mappings().all()

        inserted_count = 0

        for task in existing_tasks:
            result = connection.execute(
                text("""
                    INSERT INTO task_weekly_plans (
                        task_id,
                        weekly_plan_id,
                        is_original,
                        added_by
                    )
                    VALUES (
                        :task_id,
                        :weekly_plan_id,
                        TRUE,
                        :added_by
                    )
                    ON CONFLICT (task_id, weekly_plan_id)
                    DO NOTHING
                """),
                {
                    "task_id": task["id"],
                    "weekly_plan_id": task["weekly_plan_id"],
                    "added_by": task["created_by"],
                },
            )

            inserted_count += result.rowcount or 0

    print("Task weekly plans table is ready.")
    print(f"Original weekly links added: {inserted_count}")
    print("Task weekly plans migration completed successfully.")


if __name__ == "__main__":
    migrate_task_weekly_plans()