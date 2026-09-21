from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def create_project(
    db: Session,
    project_data: ProjectCreate,
    owner_id: int,
) -> Project:
    project = Project(
        name=project_data.name,
        description=project_data.description,
        project_type=project_data.project_type,
        owner_id=owner_id,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_project_by_id(
    db: Session,
    project_id: int,
    owner_id: int,
) -> Project | None:
    statement = select(Project).where(
        Project.id == project_id,
        Project.owner_id == owner_id,
    )

    return db.scalar(statement)


def get_projects_by_owner(
    db: Session,
    owner_id: int,
) -> list[Project]:
    statement = (
        select(Project)
        .where(Project.owner_id == owner_id)
        .order_by(Project.created_at.desc())
    )

    return list(db.scalars(statement).all())


def update_project(
    db: Session,
    project: Project,
    project_data: ProjectUpdate,
) -> Project:
    update_data = project_data.model_dump(
        exclude_unset=True,
    )

    for field, value in update_data.items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)

    return project

def delete_project(
    db: Session,
    project: Project,
) -> None:
    db.delete(project)
    db.commit()