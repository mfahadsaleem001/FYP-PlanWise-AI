import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";

import "./EmployeeForgotPassword.css";

function EmployeeForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    /*
      Frontend demo only.

      This represents the email address currently
      linked with the demo employee account.

      Later, the backend will check the email against
      the employee account stored in the database.
    */

    const registeredEmail = "fahad@gmail.com";

    if (normalizedEmail !== registeredEmail) {
      setError(
        "This email address is not linked to your employee account. Please enter the email address associated with your account."
      );
      return;
    }

    /*
      Backend will later:

      1. Verify the employee email.
      2. Generate a secure 4-digit verification code.
      3. Store the hashed code with expiry and attempt limits.
      4. Send the code to the registered email.
      5. Allow password reset only after successful verification.
    */

    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="employee-forgot-page">
        <div className="employee-forgot-success-card">
          <div className="employee-forgot-success-icon">
            <CheckCircle2 />
          </div>

          <span className="employee-forgot-success-eyebrow">
            VERIFICATION CODE SENT
          </span>

          <h1>Check your email.</h1>

          <p>
            A 4-digit verification code has been sent
            to the email address associated with your
            employee account.
          </p>

          <button
            type="button"
            className="employee-forgot-success-button"
            onClick={() =>
              (window.location.href =
                "/employee/reset-password")
            }
          >
            <span>Enter Verification Code</span>
            <ArrowRight />
          </button>

          <button
            type="button"
            className="employee-forgot-back-button"
            onClick={() =>
              (window.location.href =
                "/employee/login")
            }
          >
            <ArrowLeft />
            <span>Back to Employee Login</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="employee-forgot-page">
      <div className="employee-forgot-shell">

        {/* =====================================================
            BRAND PANEL
        ===================================================== */}

        <section className="employee-forgot-brand-panel">
          <div className="employee-forgot-brand">
            <span className="employee-forgot-brand-mark">
              P
            </span>

            <span className="employee-forgot-brand-name">
              PlanWise <span>AI</span>
            </span>
          </div>

          <div className="employee-forgot-brand-content">
            <span className="employee-forgot-eyebrow">
              ACCOUNT RECOVERY
            </span>

            <h1>
              Get back into your
              <span> workspace.</span>
            </h1>

            <p>
              Recover access to your employee workspace
              using the email address associated with your
              PlanWise AI account.
            </p>
          </div>

          <div className="employee-forgot-security">
            <div className="employee-forgot-security-icon">
              <ShieldCheck />
            </div>

            <div>
              <strong>Secure password recovery</strong>

              <span>
                A verification code is required before
                your password can be changed.
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            FORM PANEL
        ===================================================== */}

        <section className="employee-forgot-form-panel">
          <div className="employee-forgot-form-wrapper">

            <div className="employee-forgot-form-header">
              <span className="employee-forgot-form-eyebrow">
                FORGOT PASSWORD
              </span>

              <h2>Reset your password</h2>

              <p>
                Enter the email address associated with
                your employee account. We'll send you a
                4-digit verification code.
              </p>
            </div>

            <form
              className="employee-forgot-form"
              onSubmit={handleSubmit}
            >
              {error && (
                <div
                  className="employee-forgot-error"
                  role="alert"
                >
                  <ShieldCheck />
                  <span>{error}</span>
                </div>
              )}

              <div className="employee-forgot-field">
                <label htmlFor="employeeForgotEmail">
                  Email Address
                </label>

                <div className="employee-forgot-input-wrapper">
                  <Mail />

                  <input
                    id="employeeForgotEmail"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="employee-forgot-submit"
              >
                <span>Send Verification Code</span>
                <ArrowRight />
              </button>
            </form>

            <div className="employee-forgot-code-note">
              <div className="employee-forgot-code-note-icon">
                <ShieldCheck />
              </div>

              <div>
                <strong>Verification required</strong>

                <span>
                  The 4-digit code must be verified
                  before you can create a new password.
                </span>
              </div>
            </div>

            <div className="employee-forgot-footer">
              <ArrowLeft />

              <a href="/employee/login">
                Back to Employee Login
              </a>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default EmployeeForgotPassword;