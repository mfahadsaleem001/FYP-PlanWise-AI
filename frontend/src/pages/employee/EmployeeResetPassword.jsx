import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";

import "./EmployeeResetPassword.css";

function EmployeeResetPassword() {
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /*
    Frontend demo only.

    Later the backend will generate a secure
    4-digit verification code and send it to
    the employee's registered email address.

    Demo verification code:
    1234
  */

  const verificationCode = "1234";

  const handleCodeChange = (event) => {
    const value = event.target.value;

    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
      setError("");
    }
  };

  const handleVerifyCode = (event) => {
    event.preventDefault();

    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    if (code.length !== 4) {
      setError(
        "Verification code must contain exactly 4 digits."
      );
      return;
    }

    if (code !== verificationCode) {
      setError(
        "The verification code is incorrect. Please try again."
      );
      return;
    }

    setError("");
    setCodeVerified(true);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
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

      1. Verify the reset token/session.
      2. Confirm the OTP was valid and has not expired.
      3. Hash the new password securely.
      4. Update the employee account password.
      5. Invalidate the verification code.
      6. Invalidate any active password-reset session.
    */

    setError("");
    setSuccess(true);
  };

  if (success) {
    return (
      <main className="employee-reset-page">
        <div className="employee-reset-success-card">
          <div className="employee-reset-success-icon">
            <CheckCircle2 />
          </div>

          <span className="employee-reset-success-eyebrow">
            PASSWORD UPDATED
          </span>

          <h1>Password reset complete.</h1>

          <p>
            Your employee account password has been
            successfully updated. You can now sign in
            using your new password.
          </p>

          <button
            type="button"
            className="employee-reset-success-button"
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
    <main className="employee-reset-page">
      <div className="employee-reset-shell">

        {/* =====================================================
            BRAND PANEL
        ===================================================== */}

        <section className="employee-reset-brand-panel">
          <div className="employee-reset-brand">
            <span className="employee-reset-brand-mark">
              P
            </span>

            <span className="employee-reset-brand-name">
              PlanWise <span>AI</span>
            </span>
          </div>

          <div className="employee-reset-brand-content">
            <span className="employee-reset-eyebrow">
              ACCOUNT RECOVERY
            </span>

            <h1>
              Verify your identity,
              <span> reset your password.</span>
            </h1>

            <p>
              Enter the verification code sent to the
              email address associated with your employee
              account. A valid code is required before
              your password can be changed.
            </p>
          </div>

          <div className="employee-reset-security">
            <div className="employee-reset-security-icon">
              <ShieldCheck />
            </div>

            <div>
              <strong>Protected password recovery</strong>

              <span>
                Your password cannot be changed without
                successful verification.
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            FORM PANEL
        ===================================================== */}

        <section className="employee-reset-form-panel">
          <div className="employee-reset-form-wrapper">

            <div className="employee-reset-form-header">
              <span className="employee-reset-form-eyebrow">
                RESET PASSWORD
              </span>

              <h2>
                {codeVerified
                  ? "Create a new password"
                  : "Verify your email"}
              </h2>

              <p>
                {codeVerified
                  ? "Your verification code has been confirmed. Create a new password for your employee account."
                  : "Enter the 4-digit verification code sent to your registered email address."}
              </p>
            </div>

            {/* =================================================
                VERIFICATION CODE
            ================================================= */}

            {!codeVerified && (
              <form
                className="employee-reset-form"
                onSubmit={handleVerifyCode}
              >
                {error && (
                  <div
                    className="employee-reset-error"
                    role="alert"
                  >
                    <ShieldCheck />
                    <span>{error}</span>
                  </div>
                )}

                <div className="employee-reset-field">
                  <label htmlFor="verificationCode">
                    Verification Code
                  </label>

                  <input
                    id="verificationCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Enter 4-digit code"
                    autoComplete="one-time-code"
                  />

                  <span className="employee-reset-code-hint">
                    Enter the 4-digit code sent to your
                    account email.
                  </span>
                </div>

                <button
                  type="submit"
                  className="employee-reset-submit"
                >
                  <span>Verify Code</span>
                  <ArrowRight />
                </button>
              </form>
            )}

            {/* =================================================
                NEW PASSWORD
            ================================================= */}

            {codeVerified && (
              <form
                className="employee-reset-form"
                onSubmit={handleResetPassword}
              >
                {error && (
                  <div
                    className="employee-reset-error"
                    role="alert"
                  >
                    <ShieldCheck />
                    <span>{error}</span>
                  </div>
                )}

                <div className="employee-reset-verified">
                  <CheckCircle2 />

                  <span>
                    Verification successful
                  </span>
                </div>

                <div className="employee-reset-field">
                  <label htmlFor="resetPassword">
                    New Password
                  </label>

                  <div className="employee-reset-password-wrapper">
                    <LockKeyhole />

                    <input
                      id="resetPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) => {
                        setPassword(
                          event.target.value
                        );
                        setError("");
                      }}
                      placeholder="Enter your new password"
                      minLength={4}
                      maxLength={12}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="employee-reset-password-toggle"
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

                  <span className="employee-reset-password-hint">
                    4–12 characters
                  </span>
                </div>

                <div className="employee-reset-field">
                  <label htmlFor="resetConfirmPassword">
                    Confirm New Password
                  </label>

                  <div className="employee-reset-password-wrapper">
                    <LockKeyhole />

                    <input
                      id="resetConfirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(
                          event.target.value
                        );
                        setError("");
                      }}
                      placeholder="Confirm your new password"
                      minLength={4}
                      maxLength={12}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="employee-reset-password-toggle"
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

                <div className="employee-reset-password-rules">
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

                <button
                  type="submit"
                  className="employee-reset-submit"
                >
                  <span>Reset Password</span>
                  <ArrowRight />
                </button>
              </form>
            )}

            <div className="employee-reset-footer">
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

export default EmployeeResetPassword;