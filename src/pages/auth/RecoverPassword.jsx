// src/pages/auth/RecoverPassword.jsx
// Matches wireframe: "Lost your password?" heading, email field,
// inline "Send Code" button, full-width Recover button.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

// ── Illustration ──────────────────────────────────────────────────────────────
const RecoverIllustration = () => (
  <svg viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
    {/* Envelope body */}
    <rect x="40" y="148" width="240" height="160" rx="12" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />

    {/* Envelope flap (open, folded up) */}
    <path d="M40 160 L160 228 L280 160" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" />

    {/* Letter poking out of envelope */}
    <rect x="82" y="90" width="156" height="120" rx="7" fill="white" fillOpacity="0.92" />
    <rect x="98" y="108" width="96" height="10" rx="4" fill="#2979FF" fillOpacity="0.55" />
    <rect x="98" y="124" width="122" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.28" />
    <rect x="98" y="136" width="88" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.2" />
    <rect x="98" y="148" width="108" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.18" />
    <rect x="98" y="160" width="70" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.15" />
    <rect x="98" y="172" width="90" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.13" />

    {/* Plant - left side */}
    <rect x="56" y="326" width="18" height="28" rx="4" fill="#1a2b4a" fillOpacity="0.3" />
    {/* plant stem */}
    <path d="M65 326 Q58 305 50 292" stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M65 320 Q74 300 72 285" stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* leaves */}
    <ellipse cx="47" cy="290" rx="13" ry="8" fill="#0F6E56" fillOpacity="0.55" transform="rotate(-25 47 290)" />
    <ellipse cx="74" cy="283" rx="12" ry="7" fill="#0F6E56" fillOpacity="0.45" transform="rotate(20 74 283)" />
    <ellipse cx="55" cy="278" rx="10" ry="6" fill="#1D9E75" fillOpacity="0.4" transform="rotate(-40 55 278)" />

    {/* Person - standing right side, pointing at envelope */}
    {/* legs */}
    <path d="M246 390 L238 354" stroke="#1a2b4a" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.75" />
    <path d="M266 390 L274 354" stroke="#1a2b4a" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.75" />
    {/* feet */}
    <ellipse cx="236" cy="393" rx="12" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <ellipse cx="276" cy="393" rx="12" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    {/* suit body */}
    <rect x="240" y="304" width="40" height="52" rx="8" fill="#1a2b4a" fillOpacity="0.75" />
    {/* shirt / tie */}
    <rect x="256" y="304" width="8" height="52" rx="2" fill="white" fillOpacity="0.12" />
    <polygon points="260,308 256,328 260,334 264,328" fill="#2979FF" fillOpacity="0.7" />
    {/* head */}
    <circle cx="260" cy="290" r="18" fill="#f5c5a3" />
    {/* hair */}
    <ellipse cx="260" cy="277" rx="18" ry="11" fill="#1a2b4a" fillOpacity="0.8" />
    {/* pointing arm (left arm toward envelope) */}
    <path d="M240 314 L196 262" stroke="#f5c5a3" strokeWidth="11" strokeLinecap="round" />
    <circle cx="191" cy="258" r="9" fill="#f5c5a3" />
    {/* right arm */}
    <path d="M280 318 L294 340" stroke="#1a2b4a" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.75" />
  </svg>
);

// ── RecoverPassword Page ──────────────────────────────────────────────────────
const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSendCode = () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setError("");
    setCodeSent(true);
  };

  const handleRecover = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!codeSent) {
      setError("Please send the verification code to your email first.");
      return;
    }

    setLoading(true);
    // Replace this timeout with your actual API call (verify code + reset)
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1200);
  };

  return (
    <AuthLayout illustration={<RecoverIllustration />}>
      {/* Heading */}
      <h1 style={pageStyles.heading}>
        Lost your password?
        <br />
        Enter your details to recover.
      </h1>
      <p style={pageStyles.subheading}>Enter your details to proceed further</p>

      {/* Error message */}
      {error && <div style={pageStyles.errorBox}>{error}</div>}

      {/* Code sent confirmation */}
      {codeSent && (
        <div style={pageStyles.successBox}>
          A recovery code has been sent to <strong>{email}</strong>. Check your inbox.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleRecover} style={{ marginTop: 28 }}>
        {/* Email field with inline Send Code button */}
        <div style={{ marginBottom: 32 }}>
          <label style={inputStyles.label}>Email</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (codeSent) setCodeSent(false);
              }}
              placeholder="Start typing..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                ...inputStyles.input,
                paddingRight: 90,
                borderBottomColor: focused ? "#2979FF" : "#d0d0d0",
                boxShadow: focused ? "0 1px 0 0 #2979FF" : "none",
              }}
            />
            <button
              type="button"
              onClick={handleSendCode}
              style={{
                position: "absolute",
                right: 0,
                background: "none",
                border: "none",
                color: codeSent ? "#1D9E75" : "#2979FF",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              {codeSent ? "Code Sent ✓" : "Send Code"}
            </button>
          </div>
        </div>

        {/* Recover button - full width */}
        <button
          type="submit"
          disabled={loading}
          style={{ ...pageStyles.btnPrimary, opacity: loading ? 0.75 : 1 }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = "#1565C0"; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = "#2979FF"; }}
        >
          {loading ? "Recovering…" : "Recover"}
        </button>

        {/* Back to sign in */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={pageStyles.backLink}
          >
            ← Back to Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const inputStyles = {
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    border: "none",
    borderBottom: "1.5px solid #d0d0d0",
    padding: "8px 0",
    fontSize: 14,
    color: "#222",
    backgroundColor: "transparent",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-bottom-color 0.2s, box-shadow 0.2s",
  },
};

const pageStyles = {
  heading: {
    fontSize: 26,
    fontWeight: 700,
    color: "#111",
    lineHeight: 1.3,
    margin: 0,
  },
  subheading: {
    fontSize: 13,
    color: "#888",
    marginTop: 8,
    marginBottom: 0,
  },
  errorBox: {
    marginTop: 16,
    padding: "10px 14px",
    backgroundColor: "#fff0f0",
    border: "1px solid #ffcccc",
    borderRadius: 6,
    fontSize: 13,
    color: "#cc0000",
  },
  successBox: {
    marginTop: 16,
    padding: "10px 14px",
    backgroundColor: "#f0fff8",
    border: "1px solid #b3f0d4",
    borderRadius: 6,
    fontSize: 13,
    color: "#0a6640",
  },
  btnPrimary: {
    width: "100%",
    padding: "13px 0",
    backgroundColor: "#2979FF",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.15s",
    fontFamily: "inherit",
  },
  backLink: {
    background: "none",
    border: "none",
    color: "#2979FF",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
  },
};

export default RecoverPassword;
