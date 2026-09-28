from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class AdminUserCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=128,
    )


class AdminUserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
    
class AdminUserDetailResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    status: str
    projects: int
    last_activity: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }