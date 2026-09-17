import { useState } from "react";
import "./Auth.css";

function SignIn() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    setPasswordError("");

    // Backend authentication will be connected later.
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

        {/* SIGNIN CARD */}
        <div className="auth-card">

          <div className="auth-header">
            <span className="auth-label">
              WELCOME BACK
            </span>

            <h1>
              Signin to
              <span> PlanWise.</span>
            </h1>

            <p>
              Continue planning and analyzing your software
              projects from one place.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

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

              <div className="form-label-row">
                <label htmlFor="password">
                  Password
                </label>

                <a
                  href="/auth/forgot-password"
                  className="forgot-password"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
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

            {/* SIGNIN BUTTON */}
            <button
              type="submit"
              className="auth-submit"
            >
              Signin
              <span>→</span>
            </button>

          </form>

          {/* SIGNUP */}
          <div className="auth-switch">
            <span>
              Don't have an account?
            </span>

            <a href="/signup">
              Create an account
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

export default SignIn;