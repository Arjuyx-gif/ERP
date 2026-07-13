import { useState } from "react";
import { X, Phone, MessageCircle, Mail, Calendar, MapPin } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const FOLLOW_UP_TYPES = [
  { id: "call",     label: "Call",     icon: Phone },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "email",    label: "Email",    icon: Mail },
  { id: "meeting",  label: "Meeting",  icon: Calendar },
  { id: "visit",    label: "Visit",    icon: MapPin },
];

const inputStyle = {
  width: "100%", padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: 8,
  fontSize: 13, color: "#374151", outline: "none", fontFamily: FONT,
  boxSizing: "border-box", background: "#fff",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const labelStyle = {
  display: "block", fontSize: 13, color: "#111827", marginBottom: 6, fontWeight: 600,
};

const AddFollowUpModal = ({ open, onClose }) => {
  const [selectedType, setSelectedType] = useState("call");
  const [emailReminder, setEmailReminder] = useState(false);

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes followUpBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes followUpModalIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
          animation: "followUpBackdropIn 0.25s ease-out both",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 14, width: 520,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
        fontFamily: FONT, overflow: "hidden",
        animation: "followUpModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* Header */}
        <div style={{
          padding: "22px 28px 16px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#111827" }}>Add Follow-Up</h2>
            <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>Schedule a reminder and log the action type</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer", color: "#9CA3AF",
              padding: 4, borderRadius: 6, display: "flex",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"}
            onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "22px 28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Follow-up Type */}
          <div>
            <label style={labelStyle}>Follow-up Type</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FOLLOW_UP_TYPES.map(type => {
                const Icon = type.icon;
                const isActive = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "7px 16px", borderRadius: 20,
                      border: isActive ? "none" : "1px solid #E5E7EB",
                      background: isActive ? "#2563EB" : "#fff",
                      color: isActive ? "#fff" : "#374151",
                      fontSize: 13, fontWeight: 500,
                      cursor: "pointer", fontFamily: FONT,
                      transition: "all 0.15s",
                    }}
                  >
                    <Icon size={14} />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer/Organization */}
          <div>
            <label style={labelStyle}>Customer/Organization</label>
            <input
              type="text"
              placeholder="Venue/Address"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Contact Person + Priority */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Contact Person</label>
              <input
                type="text"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Priority</label>
              <input
                type="text"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Follow Up Date + Time */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Follow Up Date</label>
              <input
                type="date"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Time</label>
              <input
                type="time"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label style={labelStyle}>Remarks</label>
            <textarea
              rows={4}
              placeholder="Any additional notes..."
              style={{
                ...inputStyle, resize: "vertical",
              }}
              onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Email reminder checkbox */}
          <div
            onClick={() => setEmailReminder(!emailReminder)}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 4,
              border: emailReminder ? "none" : "1.5px solid #D1D5DB",
              background: emailReminder ? "#2563EB" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s", flexShrink: 0,
            }}>
              {emailReminder && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: "#374151" }}>Send me an email reminder before this follow-up</span>
          </div>

        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 28px 22px",
          borderTop: "1px solid #F3F4F6",
          display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px", border: "1px solid #E5E7EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px", border: "1px solid #2563EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 600, color: "#2563EB",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#EFF6FF"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            Save Call Log
          </button>
          <button
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 20px", border: "none", borderRadius: 8,
              background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff",
              cursor: "pointer", fontFamily: FONT,
              boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(37,99,235,0.25)"; }}
          >
            <Calendar size={14} />
            Save & Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default AddFollowUpModal;
