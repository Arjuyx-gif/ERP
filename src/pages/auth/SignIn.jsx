// src/pages/auth/SignIn.jsx
// Matches wireframe: heading, email (@cipl.org.in), password,
// remember me checkbox, recover password link, Sign In + Sign Up buttons.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

// ── Illustration ──────────────────────────────────────────────────────────────
const SignInIllustration = () => (
  <svg viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
    {/* Phone frame */}
    <rect x="70" y="20" width="180" height="300" rx="22" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
    <rect x="78" y="32" width="164" height="276" rx="14" fill="white" fillOpacity="0.08" />

    {/* Screen content rows */}
    <rect x="94" y="52" width="110" height="11" rx="5" fill="white" fillOpacity="0.35" />
    <rect x="94" y="70" width="76" height="8" rx="4" fill="white" fillOpacity="0.2" />
    <rect x="94" y="90" width="130" height="8" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="94" y="104" width="96" height="8" rx="4" fill="white" fillOpacity="0.14" />
    <rect x="94" y="118" width="118" height="8" rx="4" fill="white" fillOpacity="0.14" />

    {/* Highlighted card floating over phone */}
    <rect x="46" y="168" width="228" height="66" rx="12" fill="white" fillOpacity="0.95" />
    <circle cx="76" cy="201" r="19" fill="#2979FF" fillOpacity="0.15" />
    <circle cx="76" cy="195" r="7" fill="#2979FF" fillOpacity="0.8" />
    <ellipse cx="76" cy="212" rx="10" ry="7" fill="#2979FF" fillOpacity="0.7" />
    <rect x="103" y="191" width="88" height="10" rx="4" fill="#1a2b4a" fillOpacity="0.55" />
    <rect x="103" y="207" width="60" height="8" rx="3" fill="#1a2b4a" fillOpacity="0.25" />
    <rect x="232" y="197" width="28" height="8" rx="4" fill="#2979FF" fillOpacity="0.5" />

    {/* Bottom screen rows */}
    <rect x="94" y="248" width="130" height="8" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="94" y="262" width="96" height="8" rx="4" fill="white" fillOpacity="0.14" />
    <rect x="94" y="276" width="110" height="8" rx="4" fill="white" fillOpacity="0.12" />

    {/* Person - standing, arms raised */}
    {/* legs */}
    <path d="M196 368 L188 334" stroke="#1a2b4a" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.75" />
    <path d="M214 368 L222 334" stroke="#1a2b4a" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.75" />
    {/* shoes */}
    <ellipse cx="186" cy="370" rx="10" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <ellipse cx="224" cy="370" rx="10" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    {/* body */}
    <rect x="194" y="290" width="32" height="46" rx="8" fill="#1a2b4a" fillOpacity="0.7" />
    {/* head */}
    <circle cx="210" cy="277" r="16" fill="#f5c5a3" />
    {/* hair */}
    <ellipse cx="210" cy="265" rx="16" ry="10" fill="#1a2b4a" fillOpacity="0.8" />
    {/* left arm raised */}
    <path d="M194 302 L162 272" stroke="#1a2b4a" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.7" />
    <circle cx="158" cy="270" r="8" fill="#f5c5a3" />
    {/* right arm raised */}
    <path d="M226 302 L244 272" stroke="#1a2b4a" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.7" />
    <circle cx="248" cy="270" r="8" fill="#f5c5a3" />
  </svg>
);

// ── Reusable underline input ──────────────────────────────────────────────────
const UnderlineInput = ({ label, type = "text", value, onChange, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={inputStyles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyles.input,
          borderBottomColor: focused ? "#2979FF" : "#d0d0d0",
          boxShadow: focused ? "0 1px 0 0 #2979FF" : "none",
        }}
      />
    </div>
  );
};

// ── SignIn Page ───────────────────────────────────────────────────────────────
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    // Replace this timeout with your actual API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard"); // redirect after login
    }, 1200);
  };

  return (
    <AuthLayout illustration={<SignInIllustration />}>
      {/* Heading */}
      <h1 style={pageStyles.heading}>
        Welcome to our ERP.
        <br />
        Sign In to see latest updates.
      </h1>
      <p style={pageStyles.subheading}>Enter your details to proceed further</p>

      {/* Error message */}
      {error && <div style={pageStyles.errorBox}>{error}</div>}

      {/* Form */}
      <form onSubmit={handleSignIn} style={{ marginTop: 28 }}>
        <UnderlineInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="__________@cipl.org.in"
        />
        <UnderlineInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Start typing..."
        />

        {/* Remember me + Recover password row */}
        <div style={pageStyles.rememberRow}>
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

        {/* Action buttons */}
        <div style={pageStyles.buttonRow}>
          <button
            type="submit"
            disabled={loading}
            style={{ ...pageStyles.btnPrimary, opacity: loading ? 0.75 : 1 }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#1565C0"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#2979FF"; }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={pageStyles.btnOutline}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#f0f5ff"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#ffffff"; }}
          >
            Sign Up
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
  rememberRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#444",
    cursor: "pointer",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#2979FF",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    padding: 0,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
  },
  btnPrimary: {
    flex: 1,
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
  btnOutline: {
    flex: 1,
    padding: "13px 0",
    backgroundColor: "#ffffff",
    color: "#2979FF",
    border: "1.5px solid #2979FF",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.15s",
    fontFamily: "inherit",
  },
};

export default SignIn;
