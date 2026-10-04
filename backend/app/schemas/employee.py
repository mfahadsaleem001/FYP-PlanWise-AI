from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class EmployeeCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )

    email: EmailStr

    phone: str | None = Field(
        default=None,
        max_length=30,
    )

    job_title: str = Field(
        min_length=2,
        max_length=100,
    )

    experience: str | None = Field(
        default=None,
        max_length=100,
    )

    availability_status: str = Field(
        default="available",
        min_length=3,
        max_length=30,
    )

    skills: list[str] = Field(
        default_factory=list,
    )

    capacity_hours: int = Field(
        default=40,
        gt=0,
        le=168,
    )

    location: str | None = Field(
        default=None,
        max_length=150,
    )


class EmployeeUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    email: EmailStr | None = None

    phone: str | None = Field(
        default=None,
        max_length=30,
    )

    job_title: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    experience: str | None = Field(
        default=None,
        max_length=100,
    )

    availability_status: str | None = Field(
        default=None,
        min_length=3,
        max_length=30,
    )

    skills: list[str] | None = None

    capacity_hours: int | None = Field(
        default=None,
        gt=0,
        le=168,
    )

    location: str | None = Field(
        default=None,
        max_length=150,
    )


class EmployeeResponse(BaseModel):
    id: int
    user_id: int

    name: str
    email: EmailStr

    phone: str | None
    job_title: str
    experience: str | None
    skills: list[str]

    availability_status: str
    capacity_hours: int

    location: str | None

    account_status: str
    user_status: str

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )