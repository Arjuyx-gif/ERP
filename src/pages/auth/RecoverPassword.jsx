import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import UnderlineInput from "../../components/ui/UnderlineInput";
import { pageStyles } from "./authStyles";
import { isValidEmail, isCiplEmail } from "../../utils/validation";

// ── Illustration ──────────────────────────────────────────────────────────────
const RecoverIllustration = () => (
  <svg viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
    <rect x="40" y="148" width="240" height="160" rx="12" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
    <path d="M40 160 L160 228 L280 160" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" />
    <rect x="82" y="90" width="156" height="120" rx="7" fill="white" fillOpacity="0.92" />
    <rect x="98" y="108" width="96" height="10" rx="4" fill="#2979FF" fillOpacity="0.55" />
    <rect x="98" y="124" width="122" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.28" />
    <rect x="98" y="136" width="88" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.2" />
    <rect x="98" y="148" width="108" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.18" />
    <rect x="98" y="160" width="70" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.15" />
    <rect x="98" y="172" width="90" height="6" rx="3" fill="#1a2b4a" fillOpacity="0.13" />
    <rect x="56" y="326" width="18" height="28" rx="4" fill="#1a2b4a" fillOpacity="0.3" />
    <path d="M65 326 Q58 305 50 292" stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M65 320 Q74 300 72 285" stroke="#0F6E56" strokeWidth="3" strokeLinecap="round" fill="none" />
    <ellipse cx="47" cy="290" rx="13" ry="8" fill="#0F6E56" fillOpacity="0.55" transform="rotate(-25 47 290)" />
    <ellipse cx="74" cy="283" rx="12" ry="7" fill="#0F6E56" fillOpacity="0.45" transform="rotate(20 74 283)" />
    <ellipse cx="55" cy="278" rx="10" ry="6" fill="#1D9E75" fillOpacity="0.4" transform="rotate(-40 55 278)" />
    <path d="M246 390 L238 354" stroke="#1a2b4a" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.75" />
    <path d="M266 390 L274 354" stroke="#1a2b4a" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.75" />
    <ellipse cx="236" cy="393" rx="12" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <ellipse cx="276" cy="393" rx="12" ry="5" fill="#1a2b4a" fillOpacity="0.6" />
    <rect x="240" y="304" width="40" height="52" rx="8" fill="#1a2b4a" fillOpacity="0.75" />
    <rect x="256" y="304" width="8" height="52" rx="2" fill="white" fillOpacity="0.12" />
    <polygon points="260,308 256,328 260,334 264,328" fill="#2979FF" fillOpacity="0.7" />
    <circle cx="260" cy="290" r="18" fill="#f5c5a3" />
    <ellipse cx="260" cy="277" rx="18" ry="11" fill="#1a2b4a" fillOpacity="0.8" />
    <path d="M240 314 L196 262" stroke="#f5c5a3" strokeWidth="11" strokeLinecap="round" />
    <circle cx="191" cy="258" r="9" fill="#f5c5a3" />
    <path d="M280 318 L294 340" stroke="#1a2b4a" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.75" />
  </svg>
);

// ── RecoverPassword Page ──────────────────────────────────────────────────────
const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    if (!email.trim()) { setEmailError("Email is required."); return false; }
    if (!isValidEmail(email)) { setEmailError("Enter a valid email address."); return false; }
    if (!isCiplEmail(email)) { setEmailError("Email must use the @cipl.org.in domain."); return false; }
    setEmailError("");
    return true;
  };

  const handleSendCode = () => {
    if (!validateEmail()) return;
    setCodeSent(true);
  };

  const handleRecover = (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    if (!codeSent) {
      setEmailError("Please send the verification code to your email first.");
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
      <h1 style={pageStyles.heading}>
        Lost your password?
        <br />
        Enter your details to recover.
      </h1>
      <p style={pageStyles.subheading}>Enter your details to proceed further</p>

      {codeSent && (
        <div style={pageStyles.successBox}>
          A recovery code has been sent to <strong>{email}</strong>. Check your inbox.
        </div>
      )}

      <form onSubmit={handleRecover} style={{ marginTop: 28 }} noValidate>
        <div style={{ marginBottom: 32 }}>
          <div style={{ position: "relative" }}>
            <UnderlineInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                if (codeSent) setCodeSent(false);
              }}
              onBlur={validateEmail}
              placeholder="Start typing..."
              autoComplete="email"
              error={emailError}
            />
            <button
              type="button"
              onClick={handleSendCode}
              style={{ ...sendCodeBtn, color: codeSent ? "#1D9E75" : "#2979FF" }}
            >
              {codeSent ? "Code Sent ✓" : "Send Code"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ ...pageStyles.btnPrimaryFull, opacity: loading ? 0.75 : 1 }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1565C0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2979FF"; }}
        >
          {loading ? "Recovering…" : "Recover"}
        </button>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={pageStyles.linkButton}
          >
            ← Back to Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

const sendCodeBtn = {
  position: "absolute",
  right: 0,
  top: 24,
  background: "none",
  border: "none",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  padding: 0,
  whiteSpace: "nowrap",
  fontFamily: "inherit",
};

export default RecoverPassword;
