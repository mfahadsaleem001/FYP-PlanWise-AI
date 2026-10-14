from sqlalchemy import inspect

from app.database.connection import engine
from app.database.base import Base
from app.models.user import User
from app.models.project_request import ProjectRequest
from app.models.project_message import ProjectMessage


def init_messages_table():
    inspector = inspect(engine)

    if inspector.has_table("project_messages"):
        print("project_messages table already exists.")
        return

    ProjectMessage.__table__.create(
        bind=engine,
        checkfirst=True,
    )

    print("project_messages table created successfully.")


if __name__ == "__main__":
    init_messages_table()