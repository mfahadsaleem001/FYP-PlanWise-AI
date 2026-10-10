import hashlib
import secrets
from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.employee_setup_token import EmployeeSetupToken


SETUP_TOKEN_EXPIRE_MINUTES = 30


def hash_setup_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def create_setup_token(
    db: Session,
    *,
    user_id: int,
) -> str:
    raw_token = secrets.token_urlsafe(32)
    token_hash = hash_setup_token(raw_token)

    now = datetime.utcnow()

    # Invalidate previous unused setup tokens for this user.
    previous_tokens = db.scalars(
        select(EmployeeSetupToken).where(
            EmployeeSetupToken.user_id == user_id,
            EmployeeSetupToken.used_at.is_(None),
        )
    ).all()

    for previous_token in previous_tokens:
        previous_token.used_at = now

    setup_token = EmployeeSetupToken(
        user_id=user_id,
        token_hash=token_hash,
        expires_at=now + timedelta(
            minutes=SETUP_TOKEN_EXPIRE_MINUTES
        ),
    )

    try:
        db.add(setup_token)
        db.commit()
    except Exception:
        db.rollback()
        raise

    return raw_token


def get_valid_setup_token(
    db: Session,
    *,
    raw_token: str,
) -> EmployeeSetupToken | None:
    token_hash = hash_setup_token(raw_token)

    setup_token = db.scalar(
        select(EmployeeSetupToken).where(
            EmployeeSetupToken.token_hash == token_hash,
            EmployeeSetupToken.used_at.is_(None),
            EmployeeSetupToken.expires_at > datetime.utcnow(),
        )
    )

    return setup_token
