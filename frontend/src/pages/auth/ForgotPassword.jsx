import { useState } from "react";
import "./Auth.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSendCode = (event) => {
    event.preventDefault();

    setError("");

    // Backend will send the 4-digit code to this email later.
    setStep(2);
  };

  const handleVerifyCode = (event) => {
    event.preventDefault();

    if (code.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }

    setError("");

    // Backend will verify the code later.
    setStep(3);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);

    if (value.length > 0 && value.length < 4) {
      setPasswordError("Password is too short");
    } else if (value.length > 12) {
      setPasswordError("Password is too long");
    } else {
      setPasswordError("");
    }

    if (
      confirmPassword.length > 0 &&
      value !== confirmPassword
    ) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;

    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (password.length < 4) {
      setPasswordError("Password is too short");
      return;
    }

    if (password.length > 12) {
      setPasswordError("Password is too long");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setConfirmPasswordError("");

    // Backend password reset will be connected later.
    setStep(4);
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* BRAND */}
        <div className="auth-brand">
          <a href="/" className="auth-logo">
            <span className="auth-logo-mark">P</span>

            <span className="auth-logo-text">
              PlanWise <span>AI</span>
            </span>
          </a>
        </div>


        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <div className="auth-card">

            <div className="auth-header">
              <span className="auth-label">
                PASSWORD RECOVERY
              </span>

              <h1>
                Forgot your
                <span> password?</span>
              </h1>

              <p>
                Enter the email address linked to your
                PlanWise account and we'll send you a
                4-digit verification code.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSendCode}
            >

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                Send Code
                <span>→</span>
              </button>

            </form>

            <div className="auth-switch">
              <span>
                Remember your password?
              </span>

              <a href="/auth/signin">
                Signin
              </a>
            </div>

          </div>
        )}


        {/* STEP 2 - VERIFY CODE */}
        {step === 2 && (
          <div className="auth-card">

            <div className="auth-header">
              <span className="auth-label">
                VERIFY EMAIL
              </span>

              <h1>
                Enter your
                <span> code.</span>
              </h1>

              <p>
                We've sent a 4-digit verification code to
                your email address.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleVerifyCode}
            >

              <div className="form-group">
                <label htmlFor="code">
                  Verification Code
                </label>

                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 4-digit code"
                  value={code}
                  onChange={(event) => {
                    const value =
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);

                    setCode(value);
                    setError("");
                  }}
                  maxLength={4}
                  required
                />

                {error && (
                  <p className="password-error">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                Verify Code
                <span>→</span>
              </button>

            </form>

            <div className="auth-switch">
              <span>
                Didn't receive the code?
              </span>

              <button
                type="button"
                className="forgot-password"
                onClick={() => setStep(1)}
              >
                Try again
              </button>
            </div>

          </div>
        )}


        {/* STEP 3 - RESET PASSWORD */}
        {step === 3 && (
          <div className="auth-card">

            <div className="auth-header">
              <span className="auth-label">
                RESET PASSWORD
              </span>

              <h1>
                Create a
                <span> new password.</span>
              </h1>

              <p>
                Choose a new password for your PlanWise
                account.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleResetPassword}
            >

              {/* NEW PASSWORD */}
              <div className="form-group">

                <label htmlFor="newPassword">
                  New Password
                </label>

                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                  maxLength={13}
                  required
                />

                {passwordError && (
                  <p className="password-error">
                    {passwordError}
                  </p>
                )}

              </div>


              {/* CONFIRM PASSWORD */}
              <div className="form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  maxLength={13}
                  required
                />

                {confirmPasswordError && (
                  <p className="password-error">
                    {confirmPasswordError}
                  </p>
                )}

              </div>


              <button
                type="submit"
                className="auth-submit"
              >
                Reset Password
                <span>→</span>
              </button>

            </form>

          </div>
        )}


        {/* STEP 4 - SUCCESS */}
        {step === 4 && (
          <div className="auth-card">

            <div className="auth-header">
              <span className="auth-label">
                PASSWORD UPDATED
              </span>

              <h1>
                Password
                <span> reset successfully.</span>
              </h1>

              <p>
                Your PlanWise password has been updated.
                You can now signin using your new password.
              </p>
            </div>

            <a
              href="/auth/signin"
              className="auth-submit"
            >
              Go to Signin
              <span>→</span>
            </a>

          </div>
        )}


        <p className="auth-footer-note">
          Intelligent project estimation &amp; planning
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;