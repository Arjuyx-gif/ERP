import { X, FileText } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const ViewTaskModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 990,
          background: "rgba(0,0,0,0.30)",
        }}
      />

      <div style={{
        position: "fixed", top: "50%", left: "60%", transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: 12, width: 500,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden", zIndex: 991,
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", position: "relative" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "#111827" }}>
            Documents
          </h2>
          <div style={{ fontSize: 14, color: "#6B7280", display: "flex", gap: 16 }}>
            <span>Tender ID: {card.id || "ORD-2024-1523"}</span>
            <span>Customer: {card.customer || "Customer Name"}</span>
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

          {/* EMD Document Section */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 12 }}>
              EMD Document
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
                  EMD Document.pdf
                </div>
                <div style={{ fontSize: 13, color: "#475569" }}>
                  Download Document
                </div>
              </div>
            </div>
          </div>

          {/* OEM Document Section */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 12 }}>
              OEM Document
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
                  OEM Document.pdf
                </div>
                <div style={{ fontSize: 13, color: "#475569" }}>
                  Download Document
                </div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 12 }}>
              Remarks
            </div>
            <textarea
              readOnly
              placeholder="Add your remarks here..."
              style={{
                width: "100%", border: "1px solid #E2E8F0", borderRadius: 8,
                padding: "12px 14px", fontSize: 14, color: "#334155", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F8FAFC",
                resize: "none", lineHeight: 1.6, minHeight: 100
              }}
            />
          </div>

        </div>

        <div style={{ borderTop: "1px solid #E5E7EB" }} />

        {/* Footer */}
        <div style={{ padding: "16px 24px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 24px", border: "1px solid #D1D5DB", borderRadius: 8,
              background: "#fff", fontSize: 14, fontWeight: 600, color: "#111827",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
};

export default ViewTaskModal;
