import { X, Paperclip } from "lucide-react";

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
            Order ID -
          </h2>
          <div style={{ fontSize: 14, color: "#475569", display: "flex", gap: 16 }}>
            <span>Tender ID: {card?.id || "TND-2026-045"}</span>
            <span>Firm Name: {card?.tags?.[0] || ""}</span>
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
          
          {/* Upload PO Received Section */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#111827", marginBottom: 12 }}>
              Upload PO Received
            </div>
            
            <div style={{
              background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: 8,
              padding: "16px", display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", transition: "background 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#E5E7EB"}
              onMouseLeave={e => e.currentTarget.style.background = "#F3F4F6"}
            >
              <Paperclip size={20} color="#4B5563" />
              <div style={{ fontSize: 14, color: "#4B5563" }}>
                Upload PO doc
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#111827", marginBottom: 12 }}>
              Remarks
            </div>
            <textarea 
              placeholder="Add your remark here........"
              style={{
                width: "100%", boxSizing: "border-box", minHeight: 80,
                background: "#F3F4F6", border: "1px solid #D1D5DB", borderRadius: 8,
                padding: "12px 16px", fontSize: 14, color: "#111827",
                fontFamily: FONT, resize: "none", outline: "none"
              }}
              onFocus={e => e.currentTarget.style.borderColor = "#3B82F6"}
              onBlur={e => e.currentTarget.style.borderColor = "#D1D5DB"}
            />
          </div>

          {/* Alert Box */}
          <div style={{
            background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8,
            padding: "16px", display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#9A3412" }}>
              Send Alert on SOF
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
              width: "100%", padding: "12px 0", border: "none", borderRadius: 8,
              background: "#0044FF", fontSize: 15, fontWeight: 500, color: "#fff",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#0033CC"}
            onMouseLeave={e => e.currentTarget.style.background = "#0044FF"}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadPOModal;
