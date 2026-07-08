import { X, Paperclip, Send } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8,
  fontSize: 13, color: "#374151", outline: "none", fontFamily: FONT, boxSizing: "border-box", background: "#fff",
};

const labelStyle = { display: "block", fontSize: 12, color: "#6B7280", marginBottom: 6, fontWeight: 500 };

const DEFAULT_BODY = `Dear Customer Name,

Thank you for your time during our recent interaction. Please find attached the relevant documents for your reference.

Kindly let us know if you require any further information.

Warm regards,
Sales Team`;

const ComposeEmailModal = ({ open, onClose, subject }) => {
  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes composeEmailBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes composeEmailIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        animation: "composeEmailBackdropIn 0.25s ease-out both",
      }} />

      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 560, maxHeight: "88vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "composeEmailIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Compose Email</h2>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>{subject || "Contact Person Name · Ministry/Organization Name"}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>To</label>
            <input type="text" placeholder="Mail id - Contacted Person" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Subject</label>
            <input type="text" placeholder="Follow-up - ________________" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Body</label>
            <textarea rows={8} defaultValue={DEFAULT_BODY} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
          </div>
          <button type="button" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
            background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: FONT,
          }}>
            <Paperclip size={14} color="#6B7280" /> Attach Files
          </button>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "10px 18px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563", cursor: "pointer", fontFamily: FONT }}>Save Draft</button>
          <button onClick={onClose} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 18px", border: "none", borderRadius: 8, background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: FONT }}>
            <Send size={14} /> Send Email
          </button>
        </div>
      </div>
    </>
  );
};

export default ComposeEmailModal;
