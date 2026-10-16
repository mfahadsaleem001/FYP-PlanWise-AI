from datetime import date, datetime, time, timedelta

from sqlalchemy import inspect, text

from app.database.connection import engine
from app.models.employee import Employee
from app.models.project import Project
from app.models.project_employee_assignment import ProjectEmployeeAssignment
from app.models.task import Task, TaskAssignment
from app.models.user import User
from app.models.weekly_plan import WeeklyPlan


def migrate_weekly_plans():
    print("Starting weekly plans migration...")

    with engine.begin() as connection:
        # Ensure referenced model tables are registered.
        _ = (
            Employee,
            Project,
            ProjectEmployeeAssignment,
            User,
            TaskAssignment,
        )

        # Create weekly_plans before adding the foreign key.
        WeeklyPlan.__table__.create(
            bind=connection,
            checkfirst=True,
        )
        print("weekly_plans table is ready.")

        inspector = inspect(connection)

        if not inspector.has_table("tasks"):
            raise RuntimeError(
                "The tasks table does not exist. "
                "Initialize the task tables first."
            )

        task_columns = {
            column["name"]
            for column in inspector.get_columns("tasks")
        }

        if "weekly_plan_id" not in task_columns:
            connection.execute(
                text(
                    "ALTER TABLE tasks "
                    "ADD COLUMN weekly_plan_id INTEGER"
                )
            )
            print("Added nullable weekly_plan_id column.")

        # Read existing tasks without relying on the updated ORM model.
        existing_tasks = connection.execute(
            text(
                """
                SELECT id, project_id, due_date, created_by
                FROM tasks
                WHERE weekly_plan_id IS NULL
                ORDER BY id
                """
            )
        ).mappings().all()

        # Cache each project's plan by its Monday week-start date.
        plan_ids = {}

        for task in existing_tasks:
            due_date = task["due_date"]

            if isinstance(due_date, datetime):
                task_date = due_date.date()
            elif isinstance(due_date, date):
                task_date = due_date
            else:
                raise RuntimeError(
                    f"Task {task['id']} has an unsupported due_date."
                )

            week_start = task_date - timedelta(
                days=task_date.weekday()
            )
            week_end = week_start + timedelta(days=6)
            plan_key = (task["project_id"], week_start)

            if plan_key not in plan_ids:
                existing_plan_id = connection.execute(
                    text(
                        """
                        SELECT id
                        FROM weekly_plans
                        WHERE project_id = :project_id
                          AND week_start_date = :week_start
                        """
                    ),
                    {
                        "project_id": task["project_id"],
                        "week_start": week_start,
                    },
                ).scalar_one_or_none()

                if existing_plan_id is None:
                    existing_plan_id = connection.execute(
                        text(
                            """
                            INSERT INTO weekly_plans (
                                project_id,
                                week_start_date,
                                week_end_date,
                                created_by,
                                created_at,
                                updated_at
                            )
                            VALUES (
                                :project_id,
                                :week_start,
                                :week_end,
                                :created_by,
                                :now,
                                :now
                            )
                            RETURNING id
                            """
                        ),
                        {
                            "project_id": task["project_id"],
                            "week_start": week_start,
                            "week_end": week_end,
                            "created_by": task["created_by"],
                            "now": datetime.utcnow(),
                        },
                    ).scalar_one()

                plan_ids[plan_key] = existing_plan_id

            connection.execute(
                text(
                    """
                    UPDATE tasks
                    SET weekly_plan_id = :plan_id
                    WHERE id = :task_id
                    """
                ),
                {
                    "plan_id": plan_ids[plan_key],
                    "task_id": task["id"],
                },
            )

        print(f"Linked {len(existing_tasks)} existing task(s).")

        # Ensure tasks cannot reference a nonexistent weekly plan.
        foreign_keys = inspector.get_foreign_keys("tasks")
        has_weekly_plan_fk = any(
            fk.get("constrained_columns") == ["weekly_plan_id"]
            and fk.get("referred_table") == "weekly_plans"
            for fk in foreign_keys
        )

        if not has_weekly_plan_fk:
            connection.execute(
                text(
                    """
                    ALTER TABLE tasks
                    ADD CONSTRAINT fk_tasks_weekly_plan
                    FOREIGN KEY (weekly_plan_id)
                    REFERENCES weekly_plans (id)
                    ON DELETE CASCADE
                    """
                )
            )

        # New and existing tasks must have a valid weekly plan.
        connection.execute(
            text(
                """
                ALTER TABLE tasks
                ALTER COLUMN weekly_plan_id SET NOT NULL
                """
            )
        )

        # Add an index to support weekly-plan lookups.
        connection.execute(
            text(
                """
                CREATE INDEX IF NOT EXISTS
                ix_tasks_weekly_plan_id
                ON tasks (weekly_plan_id)
                """
            )
        )

    print("Weekly plans migration completed successfully.")


if __name__ == "__main__":
    migrate_weekly_plans()