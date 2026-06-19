import React from "react";
import logo from "../../assets/logo.png";

const GlobalHeader = () => {
  return (
    <div style={{
      height: 60,
      background: "#04060A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontFamily: "'Inter','Segoe UI',sans-serif",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      zIndex: 900,
      gap: 12,
    }}>
      <img src={logo} alt="cipl logo" style={{ height: 36, objectFit: "contain" }} />
      <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: 0.5, color: "#fff" }}>ERP PORTAL</span>
    </div>
  );
};

export default GlobalHeader;
