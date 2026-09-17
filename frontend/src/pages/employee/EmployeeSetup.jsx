import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import "./EmployeeSetup.css";

function EmployeeSetup() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /*
    Frontend demo employee information.

    Later this information will come from the backend
    after the invitation token has been verified.

    The email shown here represents the email address
    provided by the employee to the administrator when
    the employee account was created.
  */

  const employee = {
    name: "Fahad Saleem",
    email: "fahad@gmail.com",
    role: "Backend Developer",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your password."
      );
      return;
    }

    if (
      password.length < 4 ||
      password.length > 12
    ) {
      setError(
        "Password must be between 4 and 12 characters."
      );
      return;
    }

    if (
      confirmPassword.length < 4 ||
      confirmPassword.length > 12
    ) {
      setError(
        "Confirm password must be between 4 and 12 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Password and confirm password do not match."
      );
      return;
    }

    /*
      Frontend demo only.

      Backend will later:

      1. Verify the invitation token.
      2. Load the employee account and email address.
      3. Hash the password securely.
      4. Activate the employee account.
      5. Mark the invitation as used.
      6. Create an authenticated session/JWT.
    */

    setSuccess(true);
  };

  if (success) {
    return (
      <main className="employee-setup-page">
        <div className="employee-setup-success-card">
          <div className="employee-setup-success-icon">
            <CheckCircle2 />
          </div>

          <span className="employee-setup-success-eyebrow">
            ACCOUNT ACTIVATED
          </span>

          <h1>You're all set.</h1>

          <p>
            Your employee account has been successfully
            activated. You can now sign in to your
            PlanWise AI workspace.
          </p>

          <button
            type="button"
            className="employee-setup-success-button"
            onClick={() =>
              (window.location.href =
                "/employee/login")
            }
          >
            <span>Continue to Employee Login</span>
            <ArrowRight />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="employee-setup-page">
      <div className="employee-setup-shell">

        {/* =====================================================
            BRAND PANEL
        ===================================================== */}

        <section className="employee-setup-brand-panel">
          <div className="employee-setup-brand">
            <span className="employee-setup-brand-mark">
              P
            </span>

            <span className="employee-setup-brand-name">
              PlanWise <span>AI</span>
            </span>
          </div>

          <div className="employee-setup-brand-content">
            <span className="employee-setup-eyebrow">
              EMPLOYEE INVITATION
            </span>

            <h1>
              Welcome to your
              <span> PlanWise workspace.</span>
            </h1>

            <p>
              Your employee account has been created by
              PlanWise administration. Complete your
              account setup to access your assigned work.
            </p>
          </div>

          <div className="employee-setup-security">
            <div className="employee-setup-security-icon">
              <ShieldCheck />
            </div>

            <div>
              <strong>Secure account setup</strong>

              <span>
                This invitation is intended only for the
                employee associated with this email address.
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            FORM PANEL
        ===================================================== */}

        <section className="employee-setup-form-panel">
          <div className="employee-setup-form-wrapper">

            <div className="employee-setup-form-header">
              <span className="employee-setup-form-eyebrow">
                ACCOUNT SETUP
              </span>

              <h2>Accept Invitation</h2>

              <p>
                Confirm your account details and create
                your password to activate your workspace.
              </p>
            </div>

            {/* =================================================
                EMPLOYEE ACCOUNT INFORMATION
            ================================================= */}

            <div className="employee-setup-account-card">
              <div className="employee-setup-account-icon">
                <UserRound />
              </div>

              <div className="employee-setup-account-info">
                <strong>{employee.name}</strong>

                <span>
                  <Mail />
                  {employee.email}
                </span>

                <small>{employee.role}</small>
              </div>

              <div className="employee-setup-account-status">
                <span></span>
                Invitation
              </div>
            </div>

            {/* =================================================
                SETUP FORM
            ================================================= */}

            <form
              className="employee-setup-form"
              onSubmit={handleSubmit}
            >
              {error && (
                <div
                  className="employee-setup-error"
                  role="alert"
                >
                  <ShieldCheck />
                  <span>{error}</span>
                </div>
              )}

              {/* CREATE PASSWORD */}

              <div className="employee-setup-field">
                <label htmlFor="setupPassword">
                  Create Password
                </label>

                <div className="employee-setup-password-wrapper">
                  <LockKeyhole />

                  <input
                    id="setupPassword"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create your password"
                    minLength={4}
                    maxLength={12}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="employee-setup-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>

                <span className="employee-setup-password-hint">
                  4–12 characters
                </span>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="employee-setup-field">
                <label htmlFor="setupConfirmPassword">
                  Confirm Password
                </label>

                <div className="employee-setup-password-wrapper">
                  <LockKeyhole />

                  <input
                    id="setupConfirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    minLength={4}
                    maxLength={12}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="employee-setup-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>
              </div>

              {/* PASSWORD RULES */}

              <div className="employee-setup-password-rules">
                <div>
                  <CheckCircle2 />

                  <span>
                    Password must contain 4–12
                    characters.
                  </span>
                </div>

                <div>
                  <CheckCircle2 />

                  <span>
                    Both password fields must match.
                  </span>
                </div>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="employee-setup-submit"
              >
                <span>
                  Accept Invitation & Create Account
                </span>

                <ArrowRight />
              </button>
            </form>

            {/* FOOTER */}

            <div className="employee-setup-footer">
              <span>
                Already activated your account?
              </span>

              <a href="/employee/login">
                Employee Login
              </a>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default EmployeeSetup;