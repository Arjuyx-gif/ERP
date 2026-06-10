import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import UnderlineInput from "../../components/ui/UnderlineInput";
import { pageStyles } from "./authStyles";
import {
  isValidEmail,
  isCiplEmail,
  isStrongPassword,
  isValidEmployeeId,
  isValidFullName,
} from "../../utils/validation";

// ── Illustration ──────────────────────────────────────────────────────────────
const SignUpIllustration = () => (
  <svg viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
    <rect x="40" y="270" width="260" height="14" rx="5" fill="white" fillOpacity="0.2" />
    <rect x="80" y="160" width="180" height="110" rx="10" fill="#1a2b4a" fillOpacity="0.65" />
    <rect x="90" y="170" width="160" height="90" rx="6" fill="white" fillOpacity="0.06" />
    <rect x="102" y="182" width="90" height="10" rx="4" fill="white" fillOpacity="0.4" />
    <rect x="102" y="198" width="65" height="7" rx="3" fill="white" fillOpacity="0.22" />
    <rect x="102" y="211" width="120" height="7" rx="3" fill="white" fillOpacity="0.18" />
    <rect x="102" y="224" width="80" height="7" rx="3" fill="white" fillOpacity="0.15" />
    <rect x="102" y="237" width="100" height="7" rx="3" fill="white" fillOpacity="0.12" />
    <rect x="158" y="270" width="24" height="16" rx="3" fill="white" fillOpacity="0.2" />
    <rect x="142" y="284" width="56" height="6" rx="3" fill="white" fillOpacity="0.15" />
    <rect x="245" y="218" width="52" height="66" rx="5" fill="white" fillOpacity="0.88" />
    <rect x="253" y="230" width="36" height="6" rx="2" fill="#2979FF" fillOpacity="0.55" />
    <rect x="253" y="242" width="28" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.3" />
    <rect x="253" y="251" width="32" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.22" />
    <rect x="253" y="260" width="24" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.18" />
    <rect x="253" y="269" width="30" height="4" rx="2" fill="#1a2b4a" fillOpacity="0.15" />
    <rect x="90" y="292" width="120" height="18" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="96" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="108" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="120" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="132" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="144" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="156" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="168" y="296" width="8" height="6" rx="1" fill="white" fillOpacity="0.2" />
    <rect x="96" y="306" width="60" height="6" rx="1" fill="white" fillOpacity="0.15" />
    <rect x="222" y="294" width="22" height="28" rx="11" fill="white" fillOpacity="0.2" />
    <line x1="233" y1="294" x2="233" y2="308" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
    <circle cx="170" cy="106" r="24" fill="#f5c5a3" />
    <ellipse cx="170" cy="90" rx="24" ry="16" fill="#1a2b4a" fillOpacity="0.8" />
    <circle cx="170" cy="82" r="10" fill="#1a2b4a" fillOpacity="0.8" />
    <rect x="162" y="126" width="16" height="14" rx="4" fill="#f5c5a3" />
    <rect x="138" y="136" width="64" height="60" rx="10" fill="#2979FF" fillOpacity="0.7" />
    <path d="M138 148 L100 185" stroke="#f5c5a3" strokeWidth="13" strokeLinecap="round" />
    <circle cx="95" cy="189" r="9" fill="#f5c5a3" />
    <path d="M202 148 L228 185" stroke="#f5c5a3" strokeWidth="13" strokeLinecap="round" />
    <circle cx="232" cy="189" r="9" fill="#f5c5a3" />
    <path d="M155 195 L148 230" stroke="#1a2b4a" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M185 195 L192 230" stroke="#1a2b4a" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.7" />
    <ellipse cx="145" cy="233" rx="11" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <ellipse cx="195" cy="233" rx="11" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
  </svg>
);

const EMPTY_ERRORS = {
  fullName: "",
  email: "",
  employeeId: "",
  password: "",
  confirmPassword: "",
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
  const [fieldErrors, setFieldErrors] = useState(EMPTY_ERRORS);
  const [termsError, setTermsError] = useState("");

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const setFieldError = (field, msg) =>
    setFieldErrors((prev) => ({ ...prev, [field]: msg }));

  const validators = {
    fullName: () => {
      if (!form.fullName.trim()) { setFieldError("fullName", "Full name is required."); return false; }
      if (!isValidFullName(form.fullName)) { setFieldError("fullName", "Enter a valid full name (letters only, min 2 chars)."); return false; }
      return true;
    },
    email: () => {
      if (!form.email.trim()) { setFieldError("email", "Email is required."); return false; }
      if (!isValidEmail(form.email)) { setFieldError("email", "Enter a valid email address."); return false; }
      if (!isCiplEmail(form.email)) { setFieldError("email", "Email must use the @cipl.org.in domain."); return false; }
      return true;
    },
    employeeId: () => {
      if (!form.employeeId.trim()) { setFieldError("employeeId", "Employee ID is required."); return false; }
      if (!isValidEmployeeId(form.employeeId)) { setFieldError("employeeId", "Employee ID must be a letter followed by at least 3 digits (e.g. A001)."); return false; }
      return true;
    },
    password: () => {
      if (!form.password) { setFieldError("password", "Password is required."); return false; }
      if (!isStrongPassword(form.password)) { setFieldError("password", "Password must be at least 8 characters with uppercase, lowercase, and a number."); return false; }
      return true;
    },
    confirmPassword: () => {
      if (!form.confirmPassword) { setFieldError("confirmPassword", "Please confirm your password."); return false; }
      if (form.confirmPassword !== form.password) { setFieldError("confirmPassword", "Passwords do not match."); return false; }
      return true;
    },
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const results = Object.values(validators).map((fn) => fn());
    if (!agreed) setTermsError("Please agree to the terms & conditions.");
    else setTermsError("");
    if (results.includes(false) || !agreed) return;

    setLoading(true);
    // Replace this timeout with your actual API call
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1200);
  };

  return (
    <AuthLayout illustration={<SignUpIllustration />}>
      <h1 style={pageStyles.heading}>
        Welcome to our ERP.
        <br />
        Sign Up to get started.
      </h1>
      <p style={pageStyles.subheading}>Enter your details to proceed further</p>

      <form onSubmit={handleSignUp} style={{ marginTop: 24 }} noValidate>
        <UnderlineInput
          label="Full name"
          value={form.fullName}
          onChange={set("fullName")}
          onBlur={validators.fullName}
          placeholder="Full Name"
          autoComplete="name"
          error={fieldErrors.fullName}
        />
        <UnderlineInput
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          onBlur={validators.email}
          placeholder="__________@cipl.org.in"
          autoComplete="username"
          error={fieldErrors.email}
        />
        <UnderlineInput
          label="Employee ID"
          value={form.employeeId}
          onChange={set("employeeId")}
          onBlur={validators.employeeId}
          placeholder="A001"
          autoComplete="off"
          error={fieldErrors.employeeId}
        />
        <UnderlineInput
          label="Password"
          type="password"
          value={form.password}
          onChange={set("password")}
          onBlur={validators.password}
          placeholder="Start typing..."
          autoComplete="new-password"
          showToggle
          error={fieldErrors.password}
        />
        <UnderlineInput
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={set("confirmPassword")}
          onBlur={validators.confirmPassword}
          placeholder="Start typing..."
          autoComplete="new-password"
          showToggle
          error={fieldErrors.confirmPassword}
        />

        <label style={{ ...pageStyles.checkboxLabel, marginBottom: 4, marginTop: 6 }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => { setAgreed(e.target.checked); if (e.target.checked) setTermsError(""); }}
            style={{ accentColor: "#2979FF", width: 15, height: 15, marginRight: 8, flexShrink: 0 }}
          />
          I agree with terms &amp; conditions
        </label>
        {termsError && <span style={termsErrorStyle}>{termsError}</span>}

        <div style={{ ...pageStyles.buttonRow, marginTop: 20 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ ...pageStyles.btnPrimary, opacity: loading ? 0.75 : 1 }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1565C0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2979FF"; }}
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={pageStyles.btnOutline}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f5ff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
          >
            Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

const termsErrorStyle = {
  display: "block",
  fontSize: 11,
  color: "#cc0000",
  marginBottom: 12,
};

export default SignUp;
