from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class ProjectRequestCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    description: str = Field(min_length=10)
    project_type: str = Field(min_length=2, max_length=50)


class ProjectRequestReview(BaseModel):
    status: Literal["accepted", "rejected"]




class ProjectRequestResponse(BaseModel):
    id: int
    name: str
    description: str
    project_type: str
    status: str
    owner_id: int
    owner_name: str | None = None
    owner_email: str | None = None
    reviewed_by: int | None
    created_at: datetime
    reviewed_at: datetime | None

    model_config = {"from_attributes": True}