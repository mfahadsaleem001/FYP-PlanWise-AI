
import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_email(
    *,
    to_email: str,
    subject: str,
    html_content: str,
) -> dict:
    smtp_email = settings.smtp_email
    smtp_app_password = settings.smtp_app_password

    if not smtp_email or not smtp_app_password:
        raise RuntimeError(
            "Gmail SMTP credentials are not configured."
        )

    message = EmailMessage()
    message["From"] = smtp_email
    message["To"] = to_email
    message["Subject"] = subject

    message.set_content(
        "Please open this email in an HTML-compatible email client."
    )
    message.add_alternative(html_content, subtype="html")

    with smtplib.SMTP(
        settings.smtp_host,
        settings.smtp_port,
        timeout=30,
    ) as server:
        server.starttls()
        server.login(smtp_email, smtp_app_password)
        server.send_message(message)

    return {
        "success": True,
        "to": to_email,
    }