from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    jwt_secret_key: str
    jwt_access_token_expire_minutes: int = 30
    initial_admin_email: str
    initial_admin_password: str
    gemini_api_key: str | None = None

    # Gmail SMTP configuration
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_email: str | None = None
    smtp_app_password: str | None = None

    # Existing email configuration
    resend_api_key: str | None = None
    resend_from_email: str = "onboarding@resend.dev"

    # Frontend configuration
    frontend_url: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()