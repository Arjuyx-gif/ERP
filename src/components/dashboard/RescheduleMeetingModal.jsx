import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8,
  fontSize: 13, color: "#374151", outline: "none", fontFamily: FONT, boxSizing: "border-box", background: "#fff",
};

const labelStyle = { display: "block", fontSize: 12, color: "#6B7280", marginBottom: 6, fontWeight: 500 };

const Field = ({ label, children }) => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const RescheduleMeetingModal = ({ open, onClose, subject, currentDate, currentTime }) => {
  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes rescheduleBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rescheduleIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        animation: "rescheduleBackdropIn 0.25s ease-out both",
      }} />

      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 460, maxHeight: "88vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "rescheduleIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Reschedule Meeting</h2>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>{subject || "Contact Person Name · Ministry/Organization Name"}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            padding: "10px 14px", borderRadius: 8, background: "#FEFCE8", border: "1px solid #FEF08A",
            fontSize: 13, color: "#92400E",
          }}>
            Current: <strong>{currentDate || "28/06/2026"}</strong> at <strong>{currentTime || "10:00 AM"}</strong>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <Field label="New Date"><input type="date" style={inputStyle} /></Field>
            <Field label="New Time"><input type="time" style={inputStyle} /></Field>
          </div>
          <Field label="Venue"><input type="text" placeholder="Venue/Address" style={inputStyle} /></Field>
          <Field label="Remarks"><textarea rows={2} placeholder="Any additional notes..." style={{ ...inputStyle, resize: "vertical" }} /></Field>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "10px 18px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563", cursor: "pointer", fontFamily: FONT }}>Cancel</button>
          <button onClick={onClose} style={{ padding: "10px 24px", border: "none", borderRadius: 8, background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: FONT }}>Save</button>
        </div>
      </div>
    </>
  );
};

export default RescheduleMeetingModal;
