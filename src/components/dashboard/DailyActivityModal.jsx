import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const ACTIVITIES = [
  { time: "09:00", name: "Sales Persons Name", type: "Meeting", description: "Description" },
  { time: "10:30", name: "Sales Persons Name", type: "Call", description: "Description" },
  { time: "11:15", name: "Sales Persons Name", type: "Demo", description: "Description" },
  { time: "12:00", name: "Sales Persons Name", type: "Collection", description: "Description" },
  { time: "14:00", name: "Sales Persons Name", type: "Cold Call", description: "Description" },
  { time: "15:30", name: "Sales Persons Name", type: "Submission", description: "Description" },
  { time: "16:45", name: "Sales Persons Name", type: "Site Visit", description: "Description" },
];

const DailyActivityModal = ({ onClose }) => {
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
        width: 600, background: "#fff", borderRadius: 12, zIndex: 1001,
        fontFamily: FONT, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxHeight: "90vh", display: "flex", flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid #E2E8F0", flexShrink: 0
        }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Daily Activity Summary</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex"
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="thin-scrollbar" style={{ padding: "20px 24px", overflowY: "auto" }}>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 24, fontWeight: 500 }}>
            12 July 2026 — Full Day Summary
          </div>

          <div style={{ position: "relative", marginLeft: 48 }}>
            {/* Timeline vertical line */}
            <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, background: "#DBEAFE" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {ACTIVITIES.map((act, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
                  {/* Time */}
                  <div style={{ position: "absolute", left: -52, top: 0, width: 36, fontSize: 12, color: "#6B7280", textAlign: "right", marginTop: 2 }}>
                    {act.time}
                  </div>

                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: -4, top: 4, width: 10, height: 10, borderRadius: "50%",
                    background: "#2563EB", border: "2px solid #fff", boxSizing: "border-box"
                  }} />

                  {/* Content */}
                  <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{act.name}</span>
                      <span style={{
                        padding: "2px 8px", background: "#EFF6FF", color: "#2563EB", borderRadius: 4,
                        fontSize: 11, fontWeight: 500
                      }}>
                        {act.type}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>{act.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyActivityModal;
