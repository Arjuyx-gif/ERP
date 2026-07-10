import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8,
  fontSize: 13, color: "#374151", outline: "none", fontFamily: FONT, boxSizing: "border-box", background: "#fff",
};

const labelStyle = { display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontWeight: 600 };

const AddRemarkModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes addRemarkBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes addRemarkIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        animation: "addRemarkBackdropIn 0.25s ease-out both",
      }} />

      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 420, maxHeight: "88vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "addRemarkIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        {/* Header */}
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Add Remark</h2>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Contact Person Name · Ministry/Organization Name</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Remarks</label>
            <textarea rows={5} placeholder="Any additional notes..." style={{ ...inputStyle, resize: "vertical" }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "10px 18px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563", cursor: "pointer", fontFamily: FONT }}>Cancel</button>
          <button onClick={onClose} style={{ padding: "10px 24px", border: "none", borderRadius: 8, background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: FONT }}>Save Remark</button>
        </div>
      </div>
    </>
  );
};

export default AddRemarkModal;
