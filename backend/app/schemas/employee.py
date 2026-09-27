from datetime import datetime
from pydantic import BaseModel, Field


class EmployeeCreate(BaseModel):
    user_id: int = Field(gt=0)
    job_title: str = Field(
        min_length=2,
        max_length=100,
    )
    availability_status: str = Field(
        default="available",
        min_length=3,
        max_length=30,
    )
    capacity_hours: int = Field(
        default=40,
        gt=0,
        le=168,
    )


class EmployeeUpdate(BaseModel):
    job_title: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )
    availability_status: str | None = Field(
        default=None,
        min_length=3,
        max_length=30,
    )
    capacity_hours: int | None = Field(
        default=None,
        gt=0,
        le=168,
    )


class EmployeeResponse(BaseModel):
    id: int
    user_id: int
    job_title: str
    availability_status: str
    capacity_hours: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }