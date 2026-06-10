// src/pages/auth/SignUp.jsx
// Matches wireframe: Full Name, Email (@cipl.org.in), Employee ID,
// Password, Confirm Password, Terms checkbox, Sign Up + Sign In buttons.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

// ── Illustration ──────────────────────────────────────────────────────────────
const SignUpIllustration = () => (
  <svg viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
    {/* Desk surface */}
    <rect x="40" y="270" width="260" height="14" rx="5" fill="white" fillOpacity="0.2" />

    {/* Monitor */}
    <rect x="80" y="160" width="180" height="110" rx="10" fill="#1a2b4a" fillOpacity="0.65" />
    <rect x="90" y="170" width="160" height="90" rx="6" fill="white" fillOpacity="0.06" />

    {/* Screen content */}
    <rect x="102" y="182" width="90" height="10" rx="4" fill="white" fillOpacity="0.4" />
    <rect x="102" y="198" width="65" height="7" rx="3" fill="white" fillOpacity="0.22" />
    <rect x="102" y="211" width="120" height="7" rx="3" fill="white" fillOpacity="0.18" />
    <rect x="102" y="224" width="80" height="7" rx="3" fill="white" fillOpacity="0.15" />
    <rect x="102" y="237" width="100" height="7" rx="3" fill="white" fillOpacity="0.12" />

    {/* Monitor stand */}
    <rect x="158" y="270" width="24" height="16" rx="3" fill="white" fillOpacity="0.2" />
    <rect x="142" y="284" width="56" height="6" rx="3" fill="white" fillOpacity="0.15" />

    {/* Document on right side of desk */}
    <rect x="245" y="218" width="52" height="66" rx="5" fill="white" fillOpacity="0.88" />
    <rect x="253" y="230" width="36" height="6" rx="2" fill="#2979FF" fillOpacity="0.55" />
    <rect x="253" y="242" width="28" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.3" />
    <rect x="253" y="251" width="32" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.22" />
    <rect x="253" y="260" width="24" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.18" />
    <rect x="253" y="269" width="30" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.15" />

    {/* Keyboard */}
    <rect x="90" y="292" width="120" height="18" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="96" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="108" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="120" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="132" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="144" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="156" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="168" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="96" y="306" width="60" height="6" rx="1" fill="white" fillOpacity="0.15" />

    {/* Mouse */}
    <rect x="222" y="294" width="22" height="28" rx="11" fill="white" fillOpacity="0.2" />
    <line x1="233" y1="294" x2="233" y2="308" stroke="white" strokeOpacity="0.15" strokeWidth="1" />

    {/* Person */}
    {/* head */}
    <circle cx="170" cy="106" r="24" fill="#f5c5a3" />
    {/* hair - dark bun/ponytail style */}
    <ellipse cx="170" cy="90" rx="24" ry="16" fill="#1a2b4a" fillOpacity="0.8" />
    <circle cx="170" cy="82" r="10" fill="#1a2b4a" fillOpacity="0.8" />
    {/* neck */}
    <rect x="162" y="126" width="16" height="14" rx="4" fill="#f5c5a3" />
    {/* body - blue shirt */}
    <rect x="138" y="136" width="64" height="60" rx="10" fill="#2979FF" fillOpacity="0.7" />
    {/* left arm */}
    <path d="M138 148 L100 185" stroke="#f5c5a3" strokeWidth="13" strokeLinecap="round" />
    <circle cx="95" cy="189" r="9" fill="#f5c5a3" />
    {/* right arm */}
    <path d="M202 148 L228 185" stroke="#f5c5a3" strokeWidth="13" strokeLinecap="round" />
    <circle cx="232" cy="189" r="9" fill="#f5c5a3" />
    {/* legs */}
    <path d="M155 195 L148 230" stroke="#1a2b4a" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M185 195 L192 230" stroke="#1a2b4a" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.7" />
    {/* feet on desk area */}
    <ellipse cx="145" cy="233" rx="11" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <ellipse cx="195" cy="233" rx="11" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
  </svg>
);

// ── Reusable underline input ──────────────────────────────────────────────────
const UnderlineInput = ({ label, type = "text", value, onChange, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
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

// ── SignUp Page ───────────────────────────────────────────────────────────────
const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.employeeId || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the terms & conditions.");
      return;
    }

    setLoading(true);
    // Replace this timeout with your actual API call
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1200);
  };

  return (
    <AuthLayout illustration={<SignUpIllustration />}>
      {/* Heading */}
      <h1 style={pageStyles.heading}>
        Welcome to our ERP.
        <br />
        Sign Up to getting started.
      </h1>
      <p style={pageStyles.subheading}>Enter your details to proceed further</p>

      {/* Error message */}
      {error && <div style={pageStyles.errorBox}>{error}</div>}

      {/* Form */}
      <form onSubmit={handleSignUp} style={{ marginTop: 24 }}>
        <UnderlineInput
          label="Full name"
          value={form.fullName}
          onChange={set("fullName")}
          placeholder="Full Name"
        />
        <UnderlineInput
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="__________@cipl.org.in"
        />
        <UnderlineInput
          label="Employee ID"
          value={form.employeeId}
          onChange={set("employeeId")}
          placeholder="A000"
        />
        <UnderlineInput
          label="Password"
          type="password"
          value={form.password}
          onChange={set("password")}
          placeholder="Start typing..."
        />
        <UnderlineInput
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={set("confirmPassword")}
          placeholder="Start typing..."
        />

        {/* Terms */}
        <label style={pageStyles.termsLabel}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ accentColor: "#2979FF", width: 15, height: 15, marginRight: 8, flexShrink: 0 }}
          />
          I agree with terms &amp; conditions
        </label>

        {/* Action buttons */}
        <div style={pageStyles.buttonRow}>
          <button
            type="submit"
            disabled={loading}
            style={{ ...pageStyles.btnPrimary, opacity: loading ? 0.75 : 1 }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#1565C0"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#2979FF"; }}
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={pageStyles.btnOutline}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#f0f5ff"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#ffffff"; }}
          >
            Sign In
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
    marginTop: 14,
    padding: "10px 14px",
    backgroundColor: "#fff0f0",
    border: "1px solid #ffcccc",
    borderRadius: 6,
    fontSize: 13,
    color: "#cc0000",
  },
  termsLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#444",
    cursor: "pointer",
    marginBottom: 24,
    marginTop: 6,
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

export default SignUp;
