import { CheckCircle2 } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const MarkFollowupCompleteModal = ({ open, onClose, onConfirm, subject }) => {
  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes markCompleteBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes markCompleteIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        animation: "markCompleteBackdropIn 0.25s ease-out both",
      }} />

      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 460,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden", padding: "32px 28px 24px", textAlign: "center",
        animation: "markCompleteIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", background: "#DCFCE7",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <CheckCircle2 size={26} color="#16A34A" />
        </div>
        <h2 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "#111827" }}>Mark Follow-up Complete?</h2>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
          This will mark the follow-up for <strong style={{ color: "#374151" }}>{subject || "Contact Person Name · Ministry/Organization Name"}</strong> as completed, update customer history, and refresh dashboard counters.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px 0", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563", cursor: "pointer", fontFamily: FONT }}>Cancel</button>
          <button onClick={() => { onConfirm?.(); onClose?.(); }} style={{ flex: 1, padding: "11px 0", border: "none", borderRadius: 8, background: "#16A34A", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: FONT }}>Complete</button>
        </div>
      </div>
    </>
  );
};

export default MarkFollowupCompleteModal;
