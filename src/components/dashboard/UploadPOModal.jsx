import { X, FileText } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const UploadPOModal = ({ card, onClose }) => {
  return (
    <div style={{
      position: "fixed", top: 0, left: 60, bottom: 0, width: "100%",
      zIndex: 975,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.30)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 12, width: 500,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", position: "relative" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "#111827" }}>
            Order ID -View PO
          </h2>
          <div style={{ fontSize: 14, color: "#6B7280", display: "flex", gap: 16 }}>
            <span>Tender ID: {card.id || "ORD-2024-1523"}</span>
            <span>Firm Name: {card.tags?.[0] || "CIPL"}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "none", border: "none", cursor: "pointer", color: "#6B7280",
              padding: 4, display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ borderTop: "1px solid #E5E7EB" }} />

        {/* Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* PO Document Section */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 12 }}>
              PO Document
            </div>

            <div style={{
              background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: "16px", display: "flex", alignItems: "flex-start", gap: 14,
              cursor: "pointer", transition: "background 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#F1F5F9"}
              onMouseLeave={e => e.currentTarget.style.background = "#F8FAFC"}
            >
              <FileText size={28} color="#2563EB" strokeWidth={1.5} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0F172A", marginBottom: 4 }}>
                  PO.pdf
                </div>
                <div style={{ fontSize: 13, color: "#475569" }}>
                  Download Document
                </div>
              </div>
            </div>
          </div>

          {/* Alert Box */}
          <div style={{
            background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8,
            padding: "16px", display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#9A3412" }}>
              Alert Send on SOF
            </div>
            <div style={{ fontSize: 14, color: "#C2410C" }}>
              Bid Value: ₹50,000
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #E5E7EB" }} />

        {/* Footer */}
        <div style={{ padding: "16px 24px 24px" }}>
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "12px 0", border: "1px solid #D1D5DB", borderRadius: 8,
              background: "#fff", fontSize: 15, fontWeight: 600, color: "#111827",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadPOModal;
