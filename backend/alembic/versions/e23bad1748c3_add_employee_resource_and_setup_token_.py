"""add employee resource and setup token fields

Revision ID: e23bad1748c3
Revises: 1440e731addb
Create Date: 2026-10-04 17:16:01.669278
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e23bad1748c3"
down_revision: Union[str, Sequence[str], None] = "1440e731addb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "employee_setup_tokens",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("token_hash", sa.String(length=255), nullable=False),
        sa.Column("expires_at", sa.DateTime(), nullable=False),
        sa.Column("used_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("token_hash"),
    )

    op.create_index(
        op.f("ix_employee_setup_tokens_id"),
        "employee_setup_tokens",
        ["id"],
        unique=False,
    )

    op.create_index(
        op.f("ix_employee_setup_tokens_user_id"),
        "employee_setup_tokens",
        ["user_id"],
        unique=False,
    )

    op.add_column(
        "employees",
        sa.Column("phone", sa.String(length=30), nullable=True),
    )

    op.add_column(
        "employees",
        sa.Column("experience", sa.String(length=100), nullable=True),
    )

    # Add skills temporarily as nullable because existing employees
    # already exist in the database.
    op.add_column(
        "employees",
        sa.Column("skills", sa.JSON(), nullable=True),
    )

    # Give existing employees an empty skills list.
    op.execute(
        "UPDATE employees SET skills = '[]'::json WHERE skills IS NULL"
    )

    # Now that all existing rows have a value, enforce NOT NULL.
    op.alter_column(
        "employees",
        "skills",
        existing_type=sa.JSON(),
        nullable=False,
    )

    op.add_column(
        "employees",
        sa.Column("location", sa.String(length=150), nullable=True),
    )

    op.alter_column(
        "users",
        "password_hash",
        existing_type=sa.VARCHAR(length=255),
        nullable=True,
    )

    op.alter_column(
        "users",
        "status",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=30),
        existing_nullable=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.alter_column(
        "users",
        "status",
        existing_type=sa.String(length=30),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )

    op.alter_column(
        "users",
        "password_hash",
        existing_type=sa.VARCHAR(length=255),
        nullable=False,
    )

    op.drop_column("employees", "location")
    op.drop_column("employees", "skills")
    op.drop_column("employees", "experience")
    op.drop_column("employees", "phone")

    op.drop_index(
        op.f("ix_employee_setup_tokens_user_id"),
        table_name="employee_setup_tokens",
    )

    op.drop_index(
        op.f("ix_employee_setup_tokens_id"),
        table_name="employee_setup_tokens",
    )

    op.drop_table("employee_setup_tokens")