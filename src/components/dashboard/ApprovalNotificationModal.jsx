import { useState } from "react";
import { X, Plus, Send, Trash2 } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const ApprovalNotificationModal = ({ card, onClose, onSend }) => {
  const [sections, setSections] = useState([{ id: 1, name: "", remark: "" }]);

  const addSection    = ()            => setSections(s => [...s, { id: Date.now(), name: "", remark: "" }]);
  const removeSection = id            => setSections(s => s.filter(x => x.id !== id));
  const update        = (id, f, val)  => setSections(s => s.map(x => x.id === id ? { ...x, [f]: val } : x));

  const handleSend = () => {
    const notified = sections.filter(s => s.remark.trim()).map(s => s.name.trim() || "General");
    onSend(notified);
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
      zIndex: 975,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.30)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: 490,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden",
        maxHeight: "88vh", display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#101828" }}>Approval Notification</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#667085", padding: 4, borderRadius: 6, display: "flex" }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Card meta */}
        <div style={{ padding: "0 22px 14px" }}>
          <div style={{ fontSize: 13, color: "#344054", marginBottom: 4 }}>
            <span style={{ color: "#667085" }}>Tender ID: </span><strong>{card.id}</strong>
            <span style={{ marginLeft: 20, color: "#667085" }}>Customer: </span><strong>{card.customer || "Customer Name"}</strong>
          </div>
          <div style={{ fontSize: 13, color: "#344054" }}>
            <span style={{ color: "#667085" }}>Firm Name: </span><strong>{card.tags?.join(" , ") || "—"}</strong>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #EAECF0" }} />

        {/* Dynamic dept sections */}
        <div style={{ padding: "16px 22px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {sections.map((s, i) => (
            <div key={s.id}>
              {/* Section header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#344054", whiteSpace: "nowrap" }}>Remarks -</span>
                  <input
                    type="text"
                    value={s.name}
                    onChange={e => update(s.id, "name", e.target.value)}
                    placeholder="dept name"
                    style={{
                      border: "none", outline: "none", background: "transparent",
                      fontSize: 13, fontWeight: 600, color: "#344054", fontFamily: FONT,
                      minWidth: 0, flex: 1,
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {/* Show + Add only on the last section */}
                  {i === sections.length - 1 && (
                    <button
                      onClick={addSection}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "6px 14px", border: "none", borderRadius: 8,
                        background: "#2979FF", color: "#fff",
                        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                      }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  )}
                  {/* Remove button when more than one section */}
                  {sections.length > 1 && (
                    <button
                      onClick={() => removeSection(s.id)}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: 6, border: "none", borderRadius: 7,
                        background: "#FEF2F2", color: "#DC2626",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Remark textarea */}
              <textarea
                rows={4}
                value={s.remark}
                onChange={e => update(s.id, "remark", e.target.value)}
                placeholder="Add your remarks here..."
                style={{
                  width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 12,
                  padding: "12px 14px", fontSize: 13, color: "#374151", fontFamily: FONT,
                  boxSizing: "border-box", outline: "none", background: "#F3F4F6",
                  resize: "none", lineHeight: 1.6,
                }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 22px 20px", borderTop: "1px solid #EAECF0",
          display: "flex", gap: 12,
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "11px 0", border: "1px solid #D1D5DB",
              borderRadius: 10, background: "#fff", fontSize: 14, fontWeight: 500,
              color: "#344054", cursor: "pointer", fontFamily: FONT,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            style={{
              flex: 2, padding: "11px 0", border: "none", borderRadius: 10,
              background: "#2979FF", fontSize: 14, fontWeight: 600, color: "#fff",
              cursor: "pointer", fontFamily: FONT,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 2px 8px rgba(41,121,255,0.3)",
            }}
          >
            <Send size={15} /> Send Notification
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApprovalNotificationModal;
