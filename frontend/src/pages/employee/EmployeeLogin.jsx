import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";

import "./EmployeeLogin.css";

function EmployeeLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

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

    const { email, password } = formData;

    if (!email.trim() || !password) {
      setError("Please enter your work email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }

    if (password.length < 4 || password.length > 12) {
      setError("Password must be between 4 and 12 characters.");
      return;
    }

    /*
      Frontend demo only.

      Real employee authentication will be connected
      to the backend after the Employee Auth API is built.
    */

    window.location.href = "/employee/dashboard";
  };

  return (
    <main className="employee-login-page">
      <div className="employee-login-shell">
        <section className="employee-login-brand-panel">
          <div className="employee-login-brand">
            <span className="employee-login-brand-mark">
              P
            </span>

            <span className="employee-login-brand-name">
              PlanWise <span>AI</span>
            </span>
          </div>

          <div className="employee-login-brand-content">
            <span className="employee-login-eyebrow">
              EMPLOYEE WORKSPACE
            </span>

            <h1>
              Welcome back to your
              <span> workspace.</span>
            </h1>

            <p>
              Access your assigned projects, tasks,
              schedules, team communication, and
              workspace activity from one place.
            </p>
          </div>

          <div className="employee-login-security">
            <div className="employee-login-security-icon">
              <ShieldCheck />
            </div>

            <div>
              <strong>Secure employee access</strong>
              <span>
                Your workspace access is managed by
                PlanWise administration.
              </span>
            </div>
          </div>
        </section>

        <section className="employee-login-form-panel">
          <div className="employee-login-form-wrapper">
            <div className="employee-login-form-header">
              <span className="employee-login-form-eyebrow">
                SIGN IN
              </span>

              <h2>Employee Login</h2>

              <p>
                Sign in using the email address associated
                with your employee account.
              </p>
            </div>

            <form
              className="employee-login-form"
              onSubmit={handleSubmit}
            >
              {error && (
                <div
                  className="employee-login-error"
                  role="alert"
                >
                  <ShieldCheck />
                  <span>{error}</span>
                </div>
              )}

              <div className="employee-login-field">
                <label htmlFor="employeeEmail">
                  Email Address
                </label>

                <div className="employee-login-input-wrapper">
                  <Mail />

                  <input
                    id="employeeEmail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="employee-login-field">
                <div className="employee-login-label-row">
                  <label htmlFor="employeePassword">
                    Password
                  </label>

                  <a
                    href="/employee/forgot-password"
                    className="employee-login-forgot"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="employee-login-input-wrapper employee-login-password-wrapper">
                  <LockKeyhole />

                  <input
                    id="employeePassword"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    minLength={4}
                    maxLength={12}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="employee-login-password-toggle"
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

                <span className="employee-login-password-hint">
                  4–12 characters
                </span>
              </div>

              <label className="employee-login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                />

                <span className="employee-login-checkmark">
                  <span></span>
                </span>

                <span>Remember me</span>
              </label>

              <button
                type="submit"
                className="employee-login-submit"
              >
                <span>Sign In</span>
                <ArrowRight />
              </button>
            </form>

            <div className="employee-login-divider">
              <span></span>
              <small>EMPLOYEE ACCESS</small>
              <span></span>
            </div>

            <div className="employee-login-invitation">
              <div>
                <strong>
                  Have an invitation?
                </strong>

                <span>
                  Activate your employee account
                  before signing in.
                </span>
              </div>

              <a href="/employee/setup">
                Accept Invitation
                <ArrowRight />
              </a>
            </div>

            <div className="employee-login-footer">
              <a href="/">
                Back to PlanWise AI
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default EmployeeLogin;