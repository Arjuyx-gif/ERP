import { X, AlertCircle, Eye } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const SMNewRFPModal = ({ onClose, onApprove }) => {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
        }}
      />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 480, background: "#fff", borderRadius: 12, zIndex: 1001,
        fontFamily: FONT, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex"
        }}>
          <X size={24} color="#374151" />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <AlertCircle size={22} color="#DC2626" />
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>New RFP Submitted</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
          <div style={{ fontSize: 15, color: "#4B5563" }}>You have 1 RFP:</div>
          <div style={{ fontSize: 15, color: "#6B7280" }}>Tender title</div>
          <div style={{ fontSize: 15, color: "#6B7280" }}>Customer Name</div>
        </div>

        <div style={{ marginTop: 4 }}>
          <div style={{ 
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 12px", borderRadius: 8, border: "1px solid #BFDBFE",
            color: "#2563EB", fontSize: 14, fontWeight: 500
          }}>
            <Eye size={16} /> Tender ID - TND-2026-001
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button 
            onClick={onApprove}
            style={{
              background: "#2563EB", color: "#fff", border: "none", borderRadius: 8,
              padding: "10px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            }}
          >
            Approve
          </button>
        </div>

      </div>
    </>
  );
};

export default SMNewRFPModal;
