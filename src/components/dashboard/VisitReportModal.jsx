import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const VISIT_DATA = [
  { name: "Salesperson Name", total: 7, meetings: 7, cold: 7, upcoming: 7 },
  { name: "Salesperson Name", total: 3, meetings: 2, cold: 1, upcoming: 0 },
  { name: "Salesperson Name", total: 3, meetings: 3, cold: 0, upcoming: 3 },
  { name: "Salesperson Name", total: 1, meetings: 3, cold: 0, upcoming: 3 },
  { name: "Salesperson Name", total: 1, meetings: 0, cold: 3, upcoming: 3 },
];

const VisitReportModal = ({ onClose }) => {
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
        width: 700, background: "#fff", borderRadius: 12, zIndex: 1001,
        fontFamily: FONT, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxHeight: "90vh", display: "flex", flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid #E2E8F0", flexShrink: 0
        }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Visit Report : Today</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex"
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="thin-scrollbar" style={{ padding: "20px", overflowY: "auto" }}>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>
            Today - <strong style={{ color: "#374151" }}>12 July 2026</strong>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "12px 8px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>Salesperson</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>Total Visits</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>Meetings</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>Cold Calls</th>
                <th style={{ padding: "12px 8px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>Upcoming Meetings</th>
              </tr>
            </thead>
            <tbody>
              {VISIT_DATA.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: "16px 8px", fontSize: 13, fontWeight: 600, color: "#111827", borderBottom: "1px solid #F1F5F9" }}>{row.name}</td>
                  <td style={{ padding: "16px 8px", fontSize: 13, fontWeight: 700, color: "#111827", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{row.total}</td>
                  <td style={{ padding: "16px 8px", fontSize: 13, fontWeight: 700, color: "#111827", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{row.meetings}</td>
                  <td style={{ padding: "16px 8px", fontSize: 13, fontWeight: 700, color: "#111827", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{row.cold}</td>
                  <td style={{ padding: "16px 8px", fontSize: 13, fontWeight: 700, color: "#111827", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{row.upcoming}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VisitReportModal;
