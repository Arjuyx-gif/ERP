// src/pages/auth/AuthLayout.jsx
// Shared split-panel layout used by SignIn, SignUp, and RecoverPassword.
// Left side: white form area. Right side: blue illustration panel.

const AuthLayout = ({ illustration, children }) => {
  return (
    <div style={styles.root}>
      {/* ── Left: form panel ── */}
      <div style={styles.leftPanel}>
        <div style={styles.formContainer}>
          {children}
        </div>
      </div>

      {/* ── Right: blue illustration panel ── */}
      <div style={styles.rightPanel}>
        {/* Decorative background circles */}
        <div style={styles.circle1} />
        <div style={styles.circle2} />
        <div style={styles.circle3} />

        {/* Illustration passed from each page */}
        <div style={styles.illustrationWrapper}>
          {illustration}
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    backgroundColor: "#ffffff",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: "60px 230px 60px 48px",
    backgroundColor: "#ffffff",
    minWidth: 0,
  },
  formContainer: {
    width: "100%",
    maxWidth: 420,
  },
  rightPanel: {
    width: "38%",
    flexShrink: 0,
    backgroundColor: "#2979FF",
    backgroundImage: "radial-gradient(ellipse at 80% 20%, #448AFF 0%, #2979FF 50%, #1565C0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  circle1: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    top: "-80px",
    right: "-100px",
  },
  circle2: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.08)",
    bottom: "40px",
    left: "-80px",
  },
  circle3: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.04)",
    top: "40%",
    left: "10%",
  },
  illustrationWrapper: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    maxWidth: 340,
  },
};

export default AuthLayout;
