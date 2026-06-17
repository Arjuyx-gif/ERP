import React from "react";

const GlobalHeader = () => {
  return (
    <div style={{
      height: 60,
      background: "#04060A",
      display: "flex",
      alignItems: "center",
      padding: "0 24px 0 0",
      color: "#fff",
      flexShrink: 0,
      position: "relative",
      fontFamily: "'Inter','Segoe UI',sans-serif",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      zIndex: 1000
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, width: 200, paddingLeft: 16, boxSizing: "border-box" }}>
        ERP System
      </div>
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="src/assets/logo.png" alt="cipl logo" style={{ height: 36, objectFit: "contain" }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: 0.5 }}>ERP PORTAL</span>
      </div>
    </div>
  );
};

export default GlobalHeader;
