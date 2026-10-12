import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import BrandLogo from "../components/ui/BrandLogo";
import { useAuth } from "../auth/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Dev credentials pre-fill
const DEV_EMAIL = import.meta.env.DEV ? import.meta.env.VITE_DEV_EMAIL || "" : "";
const DEV_PASSWORD = import.meta.env.DEV ? import.meta.env.VITE_DEV_PASSWORD || "" : "";

export default function Login() {
  const { isAuthenticated, login, notice } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState(DEV_EMAIL);
  const [password, setPassword] = useState(DEV_PASSWORD);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) return setError("Enter a valid email address.");
    if (!password) return setError("Enter your password.");

    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password, remember);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Couldn't sign in. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <aside className="login__brand">
        <BrandLogo />
        <div className="login__pitch">
          <h1>Charger verification, in one place.</h1>
          <p>Review submitted photos and details, then verify or reject chargers.</p>
        </div>
      </aside>

      <main className="login__panel">
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <span className="login__icon" aria-hidden="true">
            <ShieldCheck size={22} />
          </span>
          <h2>Sign in</h2>
          <p className="muted">Use your admin account to continue.</p>

          {(error || notice) && (
            <p className={`login__alert ${error ? "login__alert--error" : ""}`} role={error ? "alert" : "status"}>
              {error || notice}
            </p>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              autoFocus
            />
          </label>

          <label className="field">
            <span>Password</span>
            <span className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <label className="check">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Keep me signed in on this device
          </label>

          <button type="submit" className="btn btn--primary login__submit" disabled={submitting}>
            {submitting && <span className="spinner spinner--small" aria-hidden="true" />}
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    </div>
  );
}
