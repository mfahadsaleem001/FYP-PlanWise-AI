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

import { useEffect, useState } from "react";
import {
  completeEmployeePasswordSetup,
  getEmployeeSetupDetails,
} from "../../services/api";

import "./EmployeeSetup.css";

function EmployeeSetup() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const setupToken = new URLSearchParams(
      window.location.search
    ).get("token");

    if (!setupToken) {
      setError("The setup link is missing its security token.");
      setLoading(false);
      return;
    }

    setToken(setupToken);

    let cancelled = false;

    async function loadEmployeeDetails() {
      try {
        const data = await getEmployeeSetupDetails(setupToken);

        if (!cancelled) {
          setEmployee(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              "This setup link is invalid or has expired."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEmployeeDetails();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const { password, confirmPassword } = formData;

    if (password.length < 8 || password.length > 128) {
      setError("Password must be between 8 and 128 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    if (!token || !employee) {
      setError("Please open a valid employee setup link.");
      return;
    }

    setSubmitting(true);

    try {
      await completeEmployeePasswordSetup(token, password);
      setSuccess(true);
    } catch (err) {
      setError(
        err.message ||
          "Unable to create your password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
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
            onClick={() => {
              window.location.href = "/employee/login";
            }}
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

        <section className="employee-setup-form-panel">
          <div className="employee-setup-form-wrapper">
            <div className="employee-setup-form-header">
              <span className="employee-setup-form-eyebrow">
                ACCOUNT SETUP
              </span>

              <h2>Accept Invitation</h2>

              <p>
                Review your account details and create
                your password to activate your workspace.
              </p>
            </div>

            {loading ? (
              <p role="status">
                Verifying invitation and loading employee details...
              </p>
            ) : employee ? (
              <>
                {/* Employee Name and Email Only */}
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
                  </div>

                  <div className="employee-setup-account-status">
                    <span />
                    Invitation
                  </div>
                </div>

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

                  <div className="employee-setup-field">
                    <label htmlFor="setupPassword">
                      Create Password
                    </label>

                    <div className="employee-setup-password-wrapper">
                      <LockKeyhole />

                      <input
                        id="setupPassword"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create your password"
                        minLength={8}
                        maxLength={128}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="employee-setup-password-toggle"
                        onClick={() =>
                          setShowPassword((current) => !current)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>

                    <span className="employee-setup-password-hint">
                      8–128 characters
                    </span>
                  </div>

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
                          showConfirmPassword ? "text" : "password"
                        }
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        minLength={8}
                        maxLength={128}
                        autoComplete="new-password"
                        required
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
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <div className="employee-setup-password-rules">
                    <div>
                      <CheckCircle2 />
                      <span>
                        Password must contain 8–128 characters.
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
                    className="employee-setup-submit"
                    disabled={submitting}
                  >
                    <span>
                      {submitting
                        ? "Creating Account..."
                        : "Accept Invitation & Create Account"}
                    </span>
                    <ArrowRight />
                  </button>
                </form>
              </>
            ) : (
              <div
                className="employee-setup-error"
                role="alert"
              >
                <ShieldCheck />
                <span>{error}</span>
              </div>
            )}

            <div className="employee-setup-footer">
              <span>Already activated your account?</span>
              <a href="/employee/login">Employee Login</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default EmployeeSetup;