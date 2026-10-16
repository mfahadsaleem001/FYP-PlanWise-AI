from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

class WeeklyPlanCreate(BaseModel):
    project_id: int = Field(gt=0)
    week_start_date: date
    week_end_date: date

    @field_validator("week_end_date")
    @classmethod
    def validate_week_dates(cls, value: date, info) -> date:
        week_start = info.data.get("week_start_date")

        if week_start is not None:
            if week_end_date_is_invalid(week_start, value):
                raise ValueError(
                    "Week end date must be after week start date "
                    "and the plan must cover exactly seven days."
                )

        return value


def week_end_date_is_invalid(
    week_start: date,
    week_end: date,
) -> bool:
    return (
        week_end <= week_start
        or (week_end - week_start).days != 6
    )


class WeeklyPlanResponse(BaseModel):
    id: int
    project_id: int
    week_start_date: date
    week_end_date: date
    created_by: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1)
    project_id: int = Field(gt=0)
    weekly_plan_id: int = Field(gt=0)
    priority: str = "medium"
    due_date: datetime
    employee_ids: list[int] = Field(min_length=1)

    @field_validator("title", "description")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("This field cannot be empty")
        return value

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value: str) -> str:
        value = value.lower().strip()
        if value not in {"low", "medium", "high", "critical"}:
            raise ValueError(
                "Priority must be low, medium, high, or critical"
            )
        return value

    @field_validator("employee_ids")
    @classmethod
    def validate_employee_ids(cls, value: list[int]) -> list[int]:
        if any(employee_id <= 0 for employee_id in value):
            raise ValueError("Employee IDs must be positive integers")

        if len(value) != len(set(value)):
            raise ValueError("Duplicate employee IDs are not allowed")

        return value


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = Field(default=None, min_length=1)
    priority: str | None = None
    status: str | None = None
    due_date: datetime | None = None
    employee_ids: list[int] | None = None

    @field_validator("title", "description")
    @classmethod
    def strip_optional_text(cls, value: str | None) -> str | None:
        if value is None:
            return value

        value = value.strip()
        if not value:
            raise ValueError("This field cannot be empty")
        return value

    @field_validator("priority")
    @classmethod
    def validate_optional_priority(cls, value: str | None) -> str | None:
        if value is None:
            return value

        value = value.lower().strip()
        if value not in {"low", "medium", "high", "critical"}:
            raise ValueError(
                "Priority must be low, medium, high, or critical"
            )
        return value

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: str | None) -> str | None:
        if value is None:
            return value

        value = value.lower().strip()
        if value not in {
            "pending",
            "in_progress",
            "completed",
            "blocked",
            "cancelled",
        }:
            raise ValueError(
                "Status must be pending, in_progress, completed, "
                "blocked, or cancelled"
            )
        return value

    @field_validator("employee_ids")
    @classmethod
    def validate_optional_employee_ids(
        cls,
        value: list[int] | None,
    ) -> list[int] | None:
        if value is None:
            return value

        if any(employee_id <= 0 for employee_id in value):
            raise ValueError("Employee IDs must be positive integers")

        if len(value) != len(set(value)):
            raise ValueError("Duplicate employee IDs are not allowed")

        return value


class TaskAssignmentResponse(BaseModel):
    id: int
    task_id: int
    employee_id: int
    assigned_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    project_id: int
    weekly_plan_id: int
    priority: str
    status: str
    due_date: datetime
    created_by: int
    created_at: datetime
    updated_at: datetime
    assignments: list[TaskAssignmentResponse] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)