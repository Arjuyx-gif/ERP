import { X, FileText } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const DocItem = ({ name }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff",
  }}>
    <div style={{ width: 34, height: 34, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <FileText size={16} color="#2563EB" />
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{name}</div>
      <div style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", marginTop: 2 }}>View Document</div>
    </div>
  </div>
);

const DocumentsModal = ({ row, onClose }) => {
  if (!row) return null;
  return (
    <>
      {/* Backdrop — semi-transparent so the RFP form is visible behind */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 980, background: "rgba(0,0,0,0.15)" }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "58%", transform: "translate(-50%, -50%)",
        zIndex: 981, background: "#fff", borderRadius: 12, width: 440,
        maxHeight: "85vh", overflowY: "auto",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)", fontFamily: FONT,
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 22px 16px", borderBottom: "1px solid #E5E7EB" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Documents</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
              Tender ID: <span style={{ fontWeight: 600, color: "#374151" }}>{row.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex", marginTop: 2 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Pre-Sales Checklist</div>
            <DocItem name="Pre-Sales Checklist" />
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Alert &amp; Notify</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff",
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={16} color="#2563EB" />
              </div>
              <div style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, cursor: "pointer" }}>View List</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>OEM Document</div>
            <DocItem name="OEM Document" />
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Query &amp; Response</div>
            <DocItem name="Query &amp; Response" />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 22px 20px", borderTop: "1px solid #E5E7EB" }}>
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "11px 0", border: "1px solid #E5E7EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
              cursor: "pointer", fontFamily: FONT,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default DocumentsModal;
