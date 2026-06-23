export const FONT = "'Inter','Segoe UI',sans-serif";

export const COLORS = {
  // Primary
  primary:        "#2563EB",
  primaryDark:    "#1D4ED8",
  primaryDeep:    "#1E40AF",
  primaryLight:   "#EFF6FF",
  primaryBorder:  "#BFDBFE",
  primaryMid:     "#DBEAFE",
  // Success
  success:        "#16A34A",
  successDark:    "#15803D",
  successLight:   "#F0FDF4",
  successBorder:  "#BBF7D0",
  successMid:     "#D1FAE5",
  // Danger
  danger:         "#DC2626",
  dangerAlt:      "#E11D48",
  dangerLight:    "#FEF2F2",
  dangerBorder:   "#FECACA",
  dangerMid:      "#FEE2E2",
  dangerPink:     "#FFF1F2",
  dangerPinkBorder:"#FECDD3",
  // Warning
  warning:        "#F59E0B",
  warningLight:   "#FEF3C7",
  // Text
  text:           "#111827",
  textSecondary:  "#374151",
  textMuted:      "#6B7280",
  textSubtle:     "#9CA3AF",
  textLabel:      "#64748B",
  // Borders & backgrounds
  border:         "#E5E7EB",
  borderLight:    "#F3F4F6",
  bg:             "#F9FAFB",
  bgPage:         "#F8F9FB",
  bgWhite:        "#fff",
  // Dark (sidebar etc.)
  dark:           "#111827",
};

export const Z = {
  backdrop:      960,
  panel:         961,
  modalBackdrop: 962,
  modal:         963,
  dropdown:      50,
};

export const SHADOWS = {
  card:   "0 1px 4px rgba(0,0,0,0.06)",
  md:     "0 4px 12px rgba(0,0,0,0.1)",
  panel:  "-8px 0 40px rgba(0,0,0,0.14)",
  actionBar: "0 -2px 8px rgba(0,0,0,0.06)",
};

export const inputStyle = {
  width: "100%",
  padding: "8px 11px",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  fontSize: 13,
  color: "#374151",
  fontFamily: FONT,
  outline: "none",
  boxSizing: "border-box",
  background: "#F9FAFB",
};

export const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "#374151",
  marginBottom: 4,
};

export const cellInputStyle = {
  width: "100%",
  border: "1px solid #E5E7EB",
  borderRadius: 5,
  padding: "5px 8px",
  fontSize: 12,
  fontFamily: FONT,
  outline: "none",
  boxSizing: "border-box",
  background: "#F9FAFB",
};

export const btnPrimary = {
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: FONT,
  display: "flex",
  alignItems: "center",
  gap: 6,
};

export const btnOutline = {
  background: "#fff",
  color: "#374151",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: FONT,
  display: "flex",
  alignItems: "center",
  gap: 6,
};
