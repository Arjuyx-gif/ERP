import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import UnderlineInput from "../../components/ui/UnderlineInput";
import { pageStyles } from "./authStyles";
import { isValidEmail, isCiplEmail } from "../../utils/validation";

// ── Illustration ──────────────────────────────────────────────────────────────
const SignInIllustration = () => (
  <svg viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
    <rect x="70" y="20" width="180" height="300" rx="22" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
    <rect x="78" y="32" width="164" height="276" rx="14" fill="white" fillOpacity="0.08" />
    <rect x="94" y="52" width="110" height="11" rx="5" fill="white" fillOpacity="0.35" />
    <rect x="94" y="70" width="76" height="8" rx="4" fill="white" fillOpacity="0.2" />
    <rect x="94" y="90" width="130" height="8" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="94" y="104" width="96" height="8" rx="4" fill="white" fillOpacity="0.14" />
    <rect x="94" y="118" width="118" height="8" rx="4" fill="white" fillOpacity="0.14" />
    <rect x="46" y="168" width="228" height="66" rx="12" fill="white" fillOpacity="0.95" />
    <circle cx="76" cy="201" r="19" fill="#2979FF" fillOpacity="0.15" />
    <circle cx="76" cy="195" r="7" fill="#2979FF" fillOpacity="0.8" />
    <ellipse cx="76" cy="212" rx="10" ry="7" fill="#2979FF" fillOpacity="0.7" />
    <rect x="103" y="191" width="88" height="10" rx="4" fill="#1a2b4a" fillOpacity="0.55" />
    <rect x="103" y="207" width="60" height="8" rx="3" fill="#1a2b4a" fillOpacity="0.25" />
    <rect x="232" y="197" width="28" height="8" rx="4" fill="#2979FF" fillOpacity="0.5" />
    <rect x="94" y="248" width="130" height="8" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="94" y="262" width="96" height="8" rx="4" fill="white" fillOpacity="0.14" />
    <rect x="94" y="276" width="110" height="8" rx="4" fill="white" fillOpacity="0.12" />
    <path d="M196 368 L188 334" stroke="#1a2b4a" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.75" />
    <path d="M214 368 L222 334" stroke="#1a2b4a" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.75" />
    <ellipse cx="186" cy="370" rx="10" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <ellipse cx="224" cy="370" rx="10" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <rect x="194" y="290" width="32" height="46" rx="8" fill="#1a2b4a" fillOpacity="0.7" />
    <circle cx="210" cy="277" r="16" fill="#f5c5a3" />
    <ellipse cx="210" cy="265" rx="16" ry="10" fill="#1a2b4a" fillOpacity="0.8" />
    <path d="M194 302 L162 272" stroke="#1a2b4a" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.7" />
    <circle cx="158" cy="270" r="8" fill="#f5c5a3" />
    <path d="M226 302 L244 272" stroke="#1a2b4a" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.7" />
    <circle cx="248" cy="270" r="8" fill="#f5c5a3" />
  </svg>
);

const EMPTY_ERRORS = { email: "", password: "" };

// ── SignIn Page ───────────────────────────────────────────────────────────────
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(EMPTY_ERRORS);

  const setFieldError = (field, msg) =>
    setFieldErrors((prev) => ({ ...prev, [field]: msg }));

  const clearFieldError = (field) => setFieldError(field, "");

  const validateEmail = () => {
    if (!email.trim()) { setFieldError("email", "Email is required."); return false; }
    if (!isValidEmail(email)) { setFieldError("email", "Enter a valid email address."); return false; }
    if (!isCiplEmail(email)) { setFieldError("email", "Email must use the @cipl.org.in domain."); return false; }
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) { setFieldError("password", "Password is required."); return false; }
    return true;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    if (!emailOk || !passwordOk) return;

    setLoading(true);
    // Replace this timeout with your actual API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <AuthLayout illustration={<SignInIllustration />}>
      <h1 style={pageStyles.heading}>
        Welcome to our ERP.
        <br />
        Sign In to see latest updates.
      </h1>
      <p style={pageStyles.subheading}>Enter your details to proceed further</p>

      <form onSubmit={handleSignIn} style={{ marginTop: 28 }} noValidate>
        <UnderlineInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
          onBlur={validateEmail}
          placeholder="__________@cipl.org.in"
          autoComplete="username"
          error={fieldErrors.email}
        />
        <UnderlineInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
          onBlur={validatePassword}
          placeholder="Start typing..."
          autoComplete="current-password"
          showToggle
          error={fieldErrors.password}
        />

        <div style={rememberRow}>
          <label style={pageStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: "#2979FF", width: 15, height: 15, marginRight: 8 }}
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => navigate("/recover")}
            style={pageStyles.linkButton}
          >
            Recover password
          </button>
        </div>

        <div style={pageStyles.buttonRow}>
          <button
            type="submit"
            disabled={loading}
            style={{ ...pageStyles.btnPrimary, opacity: loading ? 0.75 : 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1565C0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2979FF"; }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={pageStyles.btnOutline}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f5ff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

const rememberRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 28,
  marginTop: 4,
};

export default SignIn;
