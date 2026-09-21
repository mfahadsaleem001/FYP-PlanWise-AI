from datetime import datetime
from pydantic import BaseModel, Field

class ProjectCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    description: str = Field(min_length=10)
    project_type: str = Field(min_length=2, max_length=50)


class ProjectUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    description: str | None = Field(
        default=None,
        min_length=10,
    )

    project_type: str | None = Field(
        default=None,
        min_length=2,
        max_length=50,
    )


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str
    project_type: str
    status: str
    owner_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }