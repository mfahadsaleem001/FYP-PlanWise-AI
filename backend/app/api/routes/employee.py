
import logging
from datetime import datetime
from html import escape

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import require_admin
from app.core.security import hash_password
from app.database.connection import get_db
from app.models.employee import Employee
from app.models.user import User
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate,
)
from app.schemas.employee_setup import (
    EmployeePasswordSetupRequest,
    EmployeePasswordSetupResponse,
    EmployeeSetupDetailsResponse,
)
from app.services.activity_log_service import create_activity_log
from app.services.email_service import send_email
from app.services.employee_service import (
    create_employee,
    delete_employee,
    get_all_employees,
    get_employee_by_id,
    get_employee_by_user_id,
    update_employee,
)
from app.services.employee_setup_service import (
    create_setup_token,
    get_valid_setup_token,
)
from app.services.user_service import get_user_by_id


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/admin/employees",
    tags=["Admin Employees"],
)


def build_employee_response(
    employee: Employee,
    user: User,
) -> EmployeeResponse:
    account_status = (
        "pending_setup"
        if user.password_hash is None
        else "active"
    )

    return EmployeeResponse(
        id=employee.id,
        user_id=user.id,
        name=user.name,
        email=user.email,
        phone=employee.phone,
        job_title=employee.job_title,
        experience=employee.experience,
        skills=employee.skills,
        availability_status=employee.availability_status,
        capacity_hours=employee.capacity_hours,
        location=employee.location,
        account_status=account_status,
        user_status=user.status,
        created_at=employee.created_at,
        updated_at=employee.updated_at,
    )


def send_employee_setup_email(
    *,
    user: User,
    raw_token: str,
    employee: Employee | None = None,
) -> None:
    setup_url = (
        f"{settings.frontend_url.rstrip('/')}"
        f"/employee/setup?token={raw_token}"
    )

    safe_name = escape(user.name or "Employee")
    safe_email = escape(user.email or "Not provided")
    safe_setup_url = escape(setup_url, quote=True)

    # Use the actual employee profile when available.
    job_title = (
        employee.job_title
        if employee and employee.job_title
        else "Employee"
    )
    phone = (
        employee.phone
        if employee and employee.phone
        else "Not provided"
    )
    experience = (
        employee.experience
        if employee and employee.experience
        else "Not specified"
    )
    location = (
        employee.location
        if employee and employee.location
        else "Not specified"
    )
    skills = employee.skills if employee and employee.skills else []

    safe_job_title = escape(str(job_title))
    safe_phone = escape(str(phone))
    safe_experience = escape(str(experience))
    safe_location = escape(str(location))

    # Render skills as separate email-safe tags.
    skills_html = ""

    for skill in skills:
        if not skill:
            continue

        safe_skill = escape(str(skill))
        skills_html += f"""
            <span style="
                display: inline-block;
                margin: 0 6px 7px 0;
                padding: 7px 11px;
                background-color: #F7F0E5;
                border: 1px solid #E9DCCB;
                color: #711D3C;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                line-height: 1.4;
                font-weight: bold;
            ">{safe_skill}</span>
        """

    if not skills_html:
        skills_html = """
            <span style="
                color: #786B65;
                font-size: 13px;
            ">No skills provided</span>
        """

    # A two-letter avatar is more reliable than remote images in email.
    initials = "".join(
        part[0] for part in (user.name or "E").split() if part
    )[:2].upper()
    safe_initials = escape(initials or "E")

    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">
      <title>PlanWise AI Employee Account Setup</title>
    </head>

    <body style="
      margin: 0;
      padding: 0;
      background-color: #F7F0E5;
      color: #2C1B1B;
      font-family: Arial, Helvetica, sans-serif;
    ">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        border="0" style="width: 100%; background-color: #F7F0E5;">
        <tr>
          <td align="center" style="padding: 28px 12px;">

            <!-- Main email container -->
            <table role="presentation" width="600" cellspacing="0"
              cellpadding="0" border="0" style="
                width: 100%;
                max-width: 600px;
                background-color: #FFFFFF;
                border: 1px solid #E8DED2;
              ">

              <!-- Brand header -->
              <tr>
                <td style="
                  padding: 25px 28px;
                  background-color: #711D3C;
                  border-bottom: 4px solid #B18A52;
                ">
                  <table role="presentation" width="100%" cellspacing="0"
                    cellpadding="0" border="0">
                    <tr>
                      <td valign="middle">
                        <p style="
                          margin: 0;
                          color: #FFFFFF;
                          font-size: 24px;
                          line-height: 1.3;
                          font-weight: bold;
                          letter-spacing: 0.2px;
                        ">PlanWise AI</p>

                        <p style="
                          margin: 6px 0 0;
                          color: #F0DCC5;
                          font-size: 11px;
                          line-height: 1.5;
                          letter-spacing: 1.5px;
                          text-transform: uppercase;
                        ">Employee Account Setup</p>
                      </td>
                      <td align="right" valign="middle">
                        <span style="
                          display: inline-block;
                          padding: 7px 10px;
                          border: 1px solid #A96D80;
                          color: #FFFFFF;
                          font-size: 10px;
                          line-height: 1.4;
                          letter-spacing: 0.5px;
                          text-transform: uppercase;
                        ">Team Invitation</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Welcome section -->
              <tr>
                <td style="padding: 30px 26px 20px;">
                  <p style="
                    margin: 0 0 9px;
                    color: #B18A52;
                    font-size: 11px;
                    line-height: 1.5;
                    font-weight: bold;
                    letter-spacing: 1.4px;
                    text-transform: uppercase;
                  ">Welcome to the team</p>

                  <h1 style="
                    margin: 0 0 13px;
                    color: #2C1B1B;
                    font-size: 27px;
                    line-height: 1.3;
                    font-weight: bold;
                  ">Let's set up your account.</h1>

                  <p style="
                    margin: 0;
                    color: #625454;
                    font-size: 14px;
                    line-height: 1.8;
                  ">
                    Hello {safe_name}, your employee profile has been created.
                    Please review your details and complete your account setup
                    to get started with PlanWise AI.
                  </p>
                </td>
              </tr>

              <!-- Employee profile card -->
              <tr>
                <td style="padding: 0 26px 24px;">
                  <table role="presentation" width="100%" cellspacing="0"
                    cellpadding="0" border="0" style="
                      width: 100%;
                      border: 1px solid #E8DED2;
                      background-color: #FFFFFF;
                    ">

                    <!-- Profile heading -->
                    <tr>
                      <td style="
                        padding: 18px;
                        background-color: #FBF7F0;
                        border-bottom: 1px solid #E8DED2;
                      ">
                        <table role="presentation" width="100%" cellspacing="0"
                          cellpadding="0" border="0">
                          <tr>
                            <td width="58" valign="middle">
                              <table role="presentation" width="46" height="46"
                                cellspacing="0" cellpadding="0" border="0"
                                style="
                                  width: 46px;
                                  height: 46px;
                                  background-color: #711D3C;
                                ">
                                <tr>
                                  <td align="center" valign="middle" style="
                                    color: #FFFFFF;
                                    font-size: 17px;
                                    font-weight: bold;
                                  ">{safe_initials}</td>
                                </tr>
                              </table>
                            </td>
                            <td valign="middle" style="padding-left: 10px;">
                              <p style="
                                margin: 0 0 5px;
                                color: #2C1B1B;
                                font-size: 18px;
                                line-height: 1.4;
                                font-weight: bold;
                              ">{safe_name}</p>
                              <p style="
                                margin: 0;
                                color: #711D3C;
                                font-size: 13px;
                                line-height: 1.5;
                                font-weight: bold;
                              ">{safe_job_title}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Employee information -->
                    <tr>
                      <td style="padding: 20px 18px 6px;">
                        <p style="
                          margin: 0 0 17px;
                          color: #711D3C;
                          font-size: 11px;
                          line-height: 1.5;
                          font-weight: bold;
                          letter-spacing: 1.2px;
                          text-transform: uppercase;
                        ">Employee details</p>

                        <!-- Email -->
                        <table role="presentation" width="100%"
                          cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding: 0 0 15px;">
                              <p style="
                                margin: 0 0 5px;
                                color: #8A7B74;
                                font-size: 10px;
                                line-height: 1.5;
                                font-weight: bold;
                                letter-spacing: 0.8px;
                              ">EMAIL ADDRESS</p>
                              <p style="
                                margin: 0;
                                color: #2C1B1B;
                                font-size: 13px;
                                line-height: 1.7;
                                overflow-wrap: anywhere;
                                word-break: break-word;
                              ">{safe_email}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Phone and experience -->
                        <table role="presentation" width="100%"
                          cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td width="50%" valign="top"
                              style="padding: 0 10px 16px 0;">
                              <p style="
                                margin: 0 0 5px;
                                color: #8A7B74;
                                font-size: 10px;
                                line-height: 1.5;
                                font-weight: bold;
                                letter-spacing: 0.8px;
                              ">PHONE</p>
                              <p style="
                                margin: 0;
                                color: #2C1B1B;
                                font-size: 13px;
                                line-height: 1.7;
                                overflow-wrap: anywhere;
                                word-break: break-word;
                              ">{safe_phone}</p>
                            </td>
                            <td width="50%" valign="top"
                              style="padding: 0 0 16px 10px;">
                              <p style="
                                margin: 0 0 5px;
                                color: #8A7B74;
                                font-size: 10px;
                                line-height: 1.5;
                                font-weight: bold;
                                letter-spacing: 0.8px;
                              ">EXPERIENCE</p>
                              <p style="
                                margin: 0;
                                color: #2C1B1B;
                                font-size: 13px;
                                line-height: 1.7;
                              ">{safe_experience}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Location -->
                        <table role="presentation" width="100%"
                          cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="padding: 0 0 17px;">
                              <p style="
                                margin: 0 0 5px;
                                color: #8A7B74;
                                font-size: 10px;
                                line-height: 1.5;
                                font-weight: bold;
                                letter-spacing: 0.8px;
                              ">LOCATION</p>
                              <p style="
                                margin: 0;
                                color: #2C1B1B;
                                font-size: 13px;
                                line-height: 1.7;
                              ">{safe_location}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Skills -->
                        <table role="presentation" width="100%"
                          cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="
                              padding: 16px 0 12px;
                              border-top: 1px solid #EEE5DA;
                            ">
                              <p style="
                                margin: 0 0 12px;
                                color: #8A7B74;
                                font-size: 10px;
                                line-height: 1.5;
                                font-weight: bold;
                                letter-spacing: 0.8px;
                              ">TECHNICAL SKILLS</p>
                              <div style="line-height: 2.3;">
                                {skills_html}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Setup action -->
              <tr>
                <td style="padding: 0 26px 26px;">
                  <table role="presentation" width="100%" cellspacing="0"
                    cellpadding="0" border="0" style="
                      background-color: #FBF7F0;
                      border: 1px solid #E9DCCB;
                    ">
                    <tr>
                      <td style="padding: 18px;">
                        <p style="
                          margin: 0 0 7px;
                          color: #2C1B1B;
                          font-size: 15px;
                          line-height: 1.5;
                          font-weight: bold;
                        ">Secure your account</p>
                        <p style="
                          margin: 0;
                          color: #625454;
                          font-size: 13px;
                          line-height: 1.8;
                        ">
                          Create your password to activate your account.
                          Your setup link expires in <strong>30 minutes</strong>
                          and can only be used once.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 0 18px 20px;">
                        <table role="presentation" cellspacing="0"
                          cellpadding="0" border="0">
                          <tr>
                            <td align="center" bgcolor="#711D3C"
                              style="background-color: #711D3C;">
                              <a href="{safe_setup_url}" style="
                                display: inline-block;
                                padding: 15px 28px;
                                color: #FFFFFF;
                                font-family: Arial, Helvetica, sans-serif;
                                font-size: 14px;
                                line-height: 1.3;
                                font-weight: bold;
                                text-decoration: none;
                              ">Set Up Your Account &rarr;</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <p style="
                    margin: 22px 0 8px;
                    color: #625454;
                    font-size: 12px;
                    line-height: 1.8;
                  ">
                    <strong style="color: #2C1B1B;">
                      Button not working?
                    </strong>
                    Copy and paste this link into your browser:
                  </p>

                  <p style="
                    margin: 0;
                    font-size: 11px;
                    line-height: 1.8;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                  ">
                    <a href="{safe_setup_url}" style="
                      color: #711D3C;
                      text-decoration: underline;
                      overflow-wrap: anywhere;
                      word-break: break-word;
                    ">{safe_setup_url}</a>
                  </p>

                  <p style="
                    margin: 20px 0 0;
                    color: #786B65;
                    font-size: 12px;
                    line-height: 1.8;
                  ">
                    If you were not expecting this invitation, you can
                    safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  padding: 22px 26px;
                  background-color: #FBF7F0;
                  border-top: 1px solid #E8DED2;
                ">
                  <p style="
                    margin: 0 0 6px;
                    color: #711D3C;
                    font-size: 14px;
                    line-height: 1.5;
                    font-weight: bold;
                  ">PlanWise AI</p>

                  <p style="
                    margin: 0;
                    color: #786B65;
                    font-size: 11px;
                    line-height: 1.8;
                  ">
                    AI-powered software project estimation, risk analysis
                    and planning.
                  </p>

                  <p style="
                    margin: 13px 0 0;
                    color: #958981;
                    font-size: 10px;
                    line-height: 1.7;
                  ">
                    This is an automated account setup email.
                    Please do not reply directly to this message.
                  </p>
                </td>
              </tr>
            </table>

            <p style="
              margin: 16px 0 0;
              color: #8A7B74;
              font-size: 10px;
              line-height: 1.6;
              text-align: center;
            ">PLANWISE AI &bull; SMARTER PROJECT PLANNING</p>

          </td>
        </tr>
      </table>
    </body>
    </html>
    """

    send_email(
        to_email=user.email,
        subject="Set up your PlanWise AI employee account",
        html_content=html_content,
    )


@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_employee(
    employee_data: EmployeeCreate,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    normalized_email = str(employee_data.email).lower()

    existing_user = db.scalar(
        select(User).where(User.email == normalized_email)
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    employee = create_employee(
        db=db,
        name=employee_data.name,
        email=normalized_email,
        phone=employee_data.phone,
        job_title=employee_data.job_title,
        experience=employee_data.experience,
        availability_status=employee_data.availability_status,
        skills=employee_data.skills,
        capacity_hours=employee_data.capacity_hours,
        location=employee_data.location,
    )

    user = get_user_by_id(
        db=db,
        user_id=employee.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee user account could not be loaded",
        )

    try:
        raw_token = create_setup_token(
            db,
            user_id=user.id,
        )

        send_employee_setup_email(
            user=user,
            raw_token=raw_token,
            employee=employee,
        )

    except Exception:
        logger.exception(
            "Employee setup token creation or email delivery failed "
            "for user_id=%s",
            user.id,
        )

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                "Employee account was created but the setup email "
                "could not be sent. The account remains pending setup."
            ),
        )

    try:
        create_activity_log(
            db=db,
            user_id=current_admin.id,
            action="employee_created",
            description=(
                f"Created employee {user.email} "
                f"with employee profile {employee.id}; "
                "setup email sent"
            ),
        )
    except Exception:
        db.rollback()
        logger.exception(
            "Activity log creation failed for employee_id=%s",
            employee.id,
        )

    return build_employee_response(
        employee=employee,
        user=user,
    )


@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_employees(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employees = get_all_employees(db)
    responses = []

    for employee in employees:
        user = get_user_by_id(
            db=db,
            user_id=employee.user_id,
        )

        if user is None:
            continue

        responses.append(
            build_employee_response(
                employee=employee,
                user=user,
            )
        )

    return responses


@router.get(
    "/setup-details",
    response_model=EmployeeSetupDetailsResponse,
)
def get_employee_setup_details(
    token: str = Query(min_length=20, max_length=200),
    db: Session = Depends(get_db),
):
    setup_token = get_valid_setup_token(
        db,
        raw_token=token,
    )

    if setup_token is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired setup link",
        )

    user = get_user_by_id(
        db=db,
        user_id=setup_token.user_id,
    )

    if (
        user is None
        or user.role != "employee"
        or user.status != "pending_setup"
        or user.password_hash is not None
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account cannot be activated with this link",
        )

    employee = get_employee_by_user_id(
        db=db,
        user_id=user.id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee profile not found",
        )

    return EmployeeSetupDetailsResponse(
        name=user.name,
        email=user.email,
        job_title=employee.job_title,
        phone=employee.phone,
        experience=employee.experience,
        skills=employee.skills,
        location=employee.location,
    )


@router.post("/{employee_id}/resend-setup")
def resend_employee_setup_email(
    employee_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(db, employee_id)

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    user = get_user_by_id(db, employee.user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee user account not found",
        )

    if (
        user.role != "employee"
        or user.status != "pending_setup"
        or user.password_hash is not None
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Setup email can only be resent to employees "
                "whose accounts are pending setup."
            ),
        )

    try:
        raw_token = create_setup_token(
            db,
            user_id=user.id,
        )

        send_employee_setup_email(
            user=user,
            raw_token=raw_token,
            employee=employee,
        )

    except Exception:
        logger.exception(
            "Employee setup email resend failed for user_id=%s",
            user.id,
        )

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                "Setup email could not be sent. "
                "Check backend logs for the actual error."
            ),
        )

    return {
        "message": "Setup email sent successfully."
    }


@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(
        db=db,
        employee_id=employee_id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    user = get_user_by_id(
        db=db,
        user_id=employee.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee user account not found",
        )

    return build_employee_response(
        employee=employee,
        user=user,
    )


@router.patch(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def update_existing_employee(
    employee_id: int,
    employee_data: EmployeeUpdate,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(
        db=db,
        employee_id=employee_id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    user = get_user_by_id(
        db=db,
        user_id=employee.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee user account not found",
        )

    if employee_data.email is not None:
        normalized_email = str(employee_data.email).lower()

        if normalized_email != user.email:
            existing_user = db.scalar(
                select(User).where(
                    User.email == normalized_email,
                    User.id != user.id,
                )
            )

            if existing_user is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A user with this email already exists",
                )

            user.email = normalized_email

    if employee_data.name is not None:
        user.name = employee_data.name

    try:
        updated_employee = update_employee(
            db=db,
            employee=employee,
            phone=employee_data.phone,
            job_title=employee_data.job_title,
            experience=employee_data.experience,
            availability_status=employee_data.availability_status,
            skills=employee_data.skills,
            capacity_hours=employee_data.capacity_hours,
            location=employee_data.location,
        )
        db.refresh(user)

    except Exception:
        db.rollback()
        raise

    return build_employee_response(
        employee=updated_employee,
        user=user,
    )


@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_existing_employee(
    employee_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(
        db=db,
        employee_id=employee_id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    delete_employee(
        db=db,
        employee=employee,
    )

    return None


@router.post(
    "/setup-password",
    response_model=EmployeePasswordSetupResponse,
)
def setup_employee_password(
    setup_data: EmployeePasswordSetupRequest,
    db: Session = Depends(get_db),
):
    setup_token = get_valid_setup_token(
        db,
        raw_token=setup_data.token,
    )

    if setup_token is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired setup link",
        )

    user = get_user_by_id(
        db=db,
        user_id=setup_token.user_id,
    )

    if (
        user is None
        or user.role != "employee"
        or user.status != "pending_setup"
        or user.password_hash is not None
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account cannot be activated with this link",
        )

    try:
        user.password_hash = hash_password(setup_data.password)
        user.status = "active"
        setup_token.used_at = datetime.utcnow()
        db.commit()

    except Exception:
        db.rollback()
        logger.exception(
            "Employee password setup failed for user_id=%s",
            setup_token.user_id,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to complete account setup",
        )

    return EmployeePasswordSetupResponse(
        message=(
            "Password created successfully. "
            "Your account is now active."
        )
    )