
from pydantic import BaseModel, EmailStr, Field


class EmployeePasswordSetupRequest(BaseModel):
    token: str = Field(min_length=20, max_length=200)
    password: str = Field(min_length=8, max_length=128)


class EmployeePasswordSetupResponse(BaseModel):
    message: str


class EmployeeSetupDetailsResponse(BaseModel):
    name: str
    email: EmailStr
    job_title: str
    phone: str | None = None
    experience: str | None = None
    skills: list[str]
    location: str | None = None
