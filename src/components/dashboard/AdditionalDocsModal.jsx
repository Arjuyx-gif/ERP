import { useState, useRef } from "react";
import { X, Paperclip, FileText } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const AdditionalDocsModal = ({ card, onClose }) => {
  const [gemCharges, setGemCharges] = useState("");
  const [remarks, setRemarks]       = useState("");
  const [fileName, setFileName]     = useState(null);
  const fileRef = useRef(null);

  const handleFile = e => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
      zIndex: 975,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.30)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: 480,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden",
        maxHeight: "92vh", display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#101828" }}>
              Order ID - Upload Additional Doc.
            </div>
            <div style={{ fontSize: 12, color: "#667085", marginTop: 3 }}>
              Tender ID: {card.id}&nbsp;&nbsp;&nbsp;Firm Name: {card.tags?.[0] || ""}
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

          {/* Info box */}
          <div style={{
            background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10,
            padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#C2410C" }}>Send Alert on SOF</div>
            <div style={{ fontSize: 12, color: "#9A3412" }}>Bid Value: ₹50,000</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#C2410C" }}>Send Alert on Accounts</div>
            <div style={{ fontSize: 12, color: "#9A3412" }}>GeM Charges: Amount</div>
          </div>

          {/* PO Document */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>PO Document</div>
            <div style={{
              border: "1.5px solid #E5E7EB", borderRadius: 10,
              padding: "12px 14px", background: "#F9FAFB",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <FileText size={20} color="#2979FF" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#101828" }}>PO.pdf</div>
                <div style={{ fontSize: 11, color: "#2979FF", cursor: "pointer", marginTop: 1 }}>Download Document</div>
              </div>
            </div>
          </div>

          {/* Enter GeM Charges */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Enter GeM Charges</div>
            <input
              type="text"
              value={gemCharges}
              onChange={e => setGemCharges(e.target.value)}
              placeholder="Enter GeM Charges"
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F9FAFB",
              }}
            />
          </div>

          {/* Upload Additional Doc */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Upload Additional Doc.</div>
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
              {fileName || "Upload Additional doc"}
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
              placeholder="Add your remark here........"
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F9FAFB",
                resize: "none", lineHeight: 1.6,
              }}
            />
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

export default AdditionalDocsModal;
