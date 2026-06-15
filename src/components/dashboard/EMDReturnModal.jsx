import { useState, useRef } from "react";
import { X, Paperclip } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const EMDReturnModal = ({ card, onClose }) => {
  const firms = card.tags?.filter(t => t !== "Lost") || [];

  const [refundDetails, setRefundDetails] = useState("");
  const [remarks, setRemarks]             = useState("");
  const [fileName, setFileName]           = useState(null);
  const fileRef = useRef(null);

  const handleFile = e => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const warningText = firms.length > 1
    ? `Bid marked as Lost. Proceed with EMD Return for both.`
    : `${firms[0] || "Firm"} bid marked as Lost. Proceed with EMD Return.`;

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
      zIndex: 975,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.30)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: 500,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden",
        maxHeight: "92vh", display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#101828" }}>
              Tender ID - {card.id} -
            </div>
            <div style={{ fontSize: 12, color: "#667085", marginTop: 3 }}>
              {card.customer || "Customer Name"}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#667085", padding: 4, borderRadius: 6, display: "flex", marginLeft: 12, flexShrink: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ borderTop: "1px solid #EAECF0", flexShrink: 0 }} />

        {/* Body */}
        <div style={{ overflowY: "auto", flex: 1, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Firm-Wise Result table */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#101828", marginBottom: 10 }}>
              Firm - Wise Result
            </div>
            <div style={{ border: "1px solid #EAECF0", borderRadius: 10, overflow: "hidden" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr",
                background: "#F9FAFB", padding: "9px 14px", borderBottom: "1px solid #EAECF0",
              }}>
                {["Firm", "Result", "EMD Return"].map(h => (
                  <span key={h} style={{ fontSize: 12, fontWeight: 600, color: "#667085" }}>{h}</span>
                ))}
              </div>
              {firms.map((firm, i) => (
                <div key={firm} style={{
                  display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr",
                  padding: "12px 14px", alignItems: "center",
                  borderBottom: i < firms.length - 1 ? "1px solid #EAECF0" : "none",
                  background: "#fff",
                }}>
                  <span style={{
                    display: "inline-block", width: "fit-content",
                    fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                    background: card.tagColors?.[firm] || "#E3F0FB", color: "#344054",
                  }}>
                    {firm}
                  </span>
                  <span style={{
                    display: "inline-block", width: "fit-content",
                    fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 8,
                    background: "#FEE2E2", color: "#DC2626",
                  }}>
                    Lost
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", cursor: "pointer" }}>
                    Initiate Refund
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EMD Refund Request */}
          <div style={{
            background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10,
            padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#C2410C" }}>EMD Refund Request</div>
            {firms.map(firm => (
              <div key={firm} style={{ fontSize: 12, color: "#9A3412" }}>
                EMD Amount: ₹50,000 ({firm})
              </div>
            ))}
          </div>

          {/* Warning */}
          <div style={{
            background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10,
            padding: "12px 14px", fontSize: 12, color: "#92400E",
          }}>
            {warningText}
          </div>

          {/* Refund Request Details */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>
              Refund Request Details
            </div>
            <textarea
              rows={3}
              value={refundDetails}
              onChange={e => setRefundDetails(e.target.value)}
              placeholder="Add refund details here..."
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F9FAFB",
                resize: "none", lineHeight: 1.6,
              }}
            />
          </div>

          {/* Supporting Documents */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>
              Supporting Documents
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "12px 14px", background: "#F9FAFB",
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 13, color: fileName ? "#374151" : "#9CA3AF",
                fontFamily: FONT, cursor: "pointer", textAlign: "left",
              }}
            >
              <Paperclip size={14} color={fileName ? "#374151" : "#9CA3AF"} />
              {fileName || "EMD for Tender ID"}
            </button>
            <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFile} />
          </div>

          {/* Remarks */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Remarks</div>
            <textarea
              rows={4}
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              placeholder="Add your remarks here..."
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F9FAFB",
                resize: "none", lineHeight: 1.6,
              }}
            />
          </div>

          {/* Notification info */}
          <div style={{
            border: "1px solid #E5E7EB", borderRadius: 10,
            padding: "14px 16px", background: "#F9FAFB",
            fontSize: 12, color: "#667085", lineHeight: 2,
          }}>
            <div style={{ fontWeight: 600, color: "#344054", marginBottom: 4 }}>
              Notification will be sent to:
            </div>
            <div>Sales Person</div>
            <div>Sales Coordinator</div>
            <div>Accounts Department</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 22px 20px", borderTop: "1px solid #EAECF0", flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "13px 0", border: "none", borderRadius: 12,
              background: "#2979FF", fontSize: 14, fontWeight: 700, color: "#fff",
              cursor: "pointer", fontFamily: FONT,
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMDReturnModal;
