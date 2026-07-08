import { useState } from "react";
import { X, Paperclip, Send, ChevronDown } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8,
  fontSize: 13, color: "#374151", outline: "none", fontFamily: FONT, boxSizing: "border-box", background: "#fff",
};

const labelStyle = { display: "block", fontSize: 12, color: "#6B7280", marginBottom: 6, fontWeight: 500 };

const SectionHeading = ({ children }) => (
  <div style={{
    fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: 0.4,
    textTransform: "uppercase", margin: "22px 0 14px", paddingBottom: 8,
    borderBottom: "1px solid #F3F4F6",
  }}>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const AttachmentButton = ({ label }) => (
  <button type="button" style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
    background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer",
    fontFamily: FONT, width: "100%",
  }}>
    <Paperclip size={14} color="#6B7280" /> {label}
  </button>
);

const PURPOSE_OPTIONS = ["New Call", "Courtesy Call", "Upcoming Opportunity", "Payment Collection", "Document Submission", "Follow - Up", "Training", "In Office", "Leave", "Holiday"];
const DOCUMENT_FOR_OPTIONS = ["Tender Submission", "Comparison Sheet", "OEM Documents", "Other"];
const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onMouseLeave={() => setIsOpen(false)}>
      <div
        onClick={() => setIsOpen(v => !v)}
        style={{ ...inputStyle, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}
      >
        <span>{value || "Select..."}</span>
        <ChevronDown size={14} color="#6B7280" />
      </div>
      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: 4,
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 1002,
          width: "100%", maxHeight: 260, overflowY: "auto",
        }}>
          {options.map(opt => {
            const isSelected = value === opt;
            return (
              <div
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{
                  padding: "9px 12px", fontSize: 13, cursor: "pointer",
                  background: isSelected ? "#93C5FD" : "#fff",
                  color: isSelected ? "#fff" : "#374151",
                  borderBottom: "1px solid #F3F4F6",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#F3F4F6"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#fff"; }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const LogCustomerVisitModal = ({ open, onClose }) => {
  const [purpose, setPurpose] = useState("New Call");
  const [documentFor, setDocumentFor] = useState("");

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes logVisitBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes logVisitIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
          animation: "logVisitBackdropIn 0.25s ease-out both",
        }}
      />

      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 560,
        maxHeight: "88vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "logVisitIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* Header */}
        <div style={{
          padding: "18px 24px 14px", borderBottom: "1px solid #F3F4F6",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0,
        }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Log Customer Visit</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"}
            onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>

          <SectionHeading>Visit Information</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <Field label="Date"><input type="date" style={inputStyle} /></Field>
              <Field label="Sales Person"><input type="text" defaultValue="John Doe" style={inputStyle} /></Field>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <Field label="Team Leader"><input type="text" defaultValue="Ramesh Kumar" style={inputStyle} /></Field>
              <Field label="Ministry / Organization"><input type="text" placeholder="e.g. Ministry of Finance" style={inputStyle} /></Field>
            </div>
            <Field label="Address"><input type="text" placeholder="Office address" style={inputStyle} /></Field>
            <div style={{ display: "flex", gap: 16 }}>
              <Field label="Contact Person"><input type="text" placeholder="Name" style={inputStyle} /></Field>
              <Field label="Designation"><input type="text" placeholder="Designation" style={inputStyle} /></Field>
            </div>
            <Field label="Department"><input type="text" placeholder="Department / Division" style={inputStyle} /></Field>
          </div>

          <SectionHeading>Meeting Outcome</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Discussion Summary"><textarea rows={3} placeholder="What was discussed?" style={{ ...inputStyle, resize: "vertical", fontFamily: FONT }} /></Field>
            <Field label="Customer Feedback"><textarea rows={3} placeholder="Customer's feedback or concerns..." style={{ ...inputStyle, resize: "vertical", fontFamily: FONT }} /></Field>
            <Field label="Next Action"><textarea rows={2} placeholder="What needs to happen next?" style={{ ...inputStyle, resize: "vertical", fontFamily: FONT }} /></Field>
          </div>

          <SectionHeading>Purpose of Visit</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Select Purpose">
              <Dropdown options={PURPOSE_OPTIONS} value={purpose} onChange={setPurpose} />
            </Field>

            {purpose === "Upcoming Opportunity" && (
              <Field label="If you select upcoming opportunity, then write the details.">
                <input type="text" style={inputStyle} />
              </Field>
            )}

            {purpose === "Document Submission" && (
              <Field label="If you select Document submission, Then for?">
                <select value={documentFor} onChange={e => setDocumentFor(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select...</option>
                  {DOCUMENT_FOR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            )}
          </div>

          <SectionHeading>Attachments</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AttachmentButton label="Photo Upload" />
            <AttachmentButton label="Visiting Card" />
            <AttachmentButton label="Meeting Images" />
            <AttachmentButton label="Supporting Documents" />
          </div>

          <SectionHeading>Follow-up</SectionHeading>
          <div style={{ display: "flex", gap: 16 }}>
            <Field label="Next Follow-up Date"><input type="date" style={inputStyle} /></Field>
            <Field label="Time"><input type="time" style={inputStyle} /></Field>
            <Field label="Priority">
              <select defaultValue="" style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Select...</option>
                {PRIORITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
          <button onClick={onClose} style={{
            padding: "10px 18px", border: "1px solid #E5E7EB", borderRadius: 8,
            background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
            cursor: "pointer", fontFamily: FONT,
          }}>Save Draft</button>
          <button onClick={onClose} style={{
            padding: "10px 18px", border: "1px solid #2563EB", borderRadius: 8,
            background: "#fff", fontSize: 13, fontWeight: 600, color: "#2563EB",
            cursor: "pointer", fontFamily: FONT,
          }}>Submit Visit</button>
          <button onClick={onClose} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "10px 18px", border: "none", borderRadius: 8,
            background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff",
            cursor: "pointer", fontFamily: FONT,
          }}>
            <Send size={14} /> Submit & Add to Opportunity
          </button>
        </div>
      </div>
    </>
  );
};

export default LogCustomerVisitModal;
