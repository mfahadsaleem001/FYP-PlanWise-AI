import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

import "./AdminLogin.css";
import { adminLogin } from "../../services/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await adminLogin(
        email,
        password
      );

      localStorage.setItem(
        "planwise_access_token",
        data.access_token
      );

      window.location.href = "/admin/dashboard";
    } catch (error) {
      setError(
        error.message || "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-container">

        {/* =====================================================
            BRAND / INTRO
        ===================================================== */}

        <section className="admin-login-intro">
          <div className="admin-login-brand">
            <div className="admin-login-brand-mark">
              <ShieldCheck size={22} />
            </div>

            <div>
              <strong>PLANWISE</strong>
              <span>ADMIN PORTAL</span>
            </div>
          </div>

          <div className="admin-login-intro-content">
            <span className="admin-login-eyebrow">
              SECURE ADMINISTRATION
            </span>

            <h1>
              Manage PlanWise
              <br />
              with confidence.
            </h1>

            <p>
              Access project management, resource planning,
              system intelligence, and administrative controls
              from one secure workspace.
            </p>
          </div>

          <div className="admin-login-security-note">
            <ShieldCheck size={17} />

            <div>
              <strong>Protected workspace</strong>

              <span>
                Admin access is restricted to authorized accounts.
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <section className="admin-login-card">
          <div className="admin-login-card-header">
            <span className="admin-login-card-label">
              ADMIN ACCESS
            </span>

            <h2>Sign in to Admin Panel</h2>

            <p>
              Enter your administrator credentials to continue.
            </p>
          </div>

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="admin-login-field">
              <label htmlFor="admin-email">
                Email Address
              </label>

              <div className="admin-login-input-wrapper">
                <Mail size={17} />

                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  placeholder="admin@planwise.ai"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="admin-login-field">
              <div className="admin-login-label-row">
                <label htmlFor="admin-password">
                  Password
                </label>

                <button
                  type="button"
                  className="admin-forgot-password"
                >
                  Forgot password?
                </button>
              </div>

              <div className="admin-login-input-wrapper">
                <Lock size={17} />

                <input
                  id="admin-password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div className="admin-login-message">
                <AlertCircle size={15} />

                <span>{error}</span>
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              <span>
                {loading ? "Signing In..." : "Sign In"}
              </span>

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="admin-login-footer">
            <ShieldCheck size={14} />

            <span>
              Authorized administrators only
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminLogin;