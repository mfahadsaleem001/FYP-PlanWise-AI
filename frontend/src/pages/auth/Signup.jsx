import { useState } from "react";
import "./Auth.css";

function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const handleSubmit = (event) => {
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

    // Backend signup will be connected later.
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

        {/* SIGNUP CARD */}
        <div className="auth-card">

          <div className="auth-header">
            <span className="auth-label">
              GET STARTED
            </span>

            <h1>
              Create your
              <span> PlanWise account.</span>
            </h1>

            <p>
              Create your account and start planning your
              software projects with intelligent analysis.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* FULL NAME */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create your password"
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
                placeholder="Confirm your password"
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

            {/* SIGNUP BUTTON */}
            <button
              type="submit"
              className="auth-submit"
            >
              Signup
              <span>→</span>
            </button>

          </form>

          {/* SIGNIN */}
          <div className="auth-switch">
            <span>
              Already have an account?
            </span>

            <a href="/auth/signin">
              Signin
            </a>
          </div>

        </div>

        <p className="auth-footer-note">
          Intelligent project estimation &amp; planning
        </p>

      </div>

    </div>
  );
}

export default Signup;