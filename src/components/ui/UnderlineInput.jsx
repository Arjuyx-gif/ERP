import { useState } from "react";

const UnderlineInput = ({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  showToggle = false,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showToggle ? (visible ? "text" : "password") : type;

  const underlineColor = error ? "#cc0000" : focused ? "#2979FF" : "#d0d0d0";
  const boxShadow = error
    ? "0 1px 0 0 #cc0000"
    : focused
    ? "0 1px 0 0 #2979FF"
    : "none";

  return (
    <div style={{ marginBottom: error ? 6 : 22 }}>
      <label style={styles.label}>{label}</label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          style={{
            ...styles.input,
            paddingRight: showToggle ? 52 : 0,
            borderBottomColor: underlineColor,
            boxShadow,
          }}
        />
        {isPassword && showToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            style={styles.toggleBtn}
          >
            {visible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

const styles = {
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
    boxSizing: "border-box",
  },
  toggleBtn: {
    position: "absolute",
    right: 0,
    background: "none",
    border: "none",
    color: "#2979FF",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    padding: "0 0 2px",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  errorText: {
    display: "block",
    fontSize: 11,
    color: "#cc0000",
    marginTop: 4,
    marginBottom: 10,
  },
};

export default UnderlineInput;
