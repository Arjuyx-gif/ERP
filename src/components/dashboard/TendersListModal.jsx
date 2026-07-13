import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const TENDERS_DATA = [
  { id: "TND-2026-045", customer: "Customer Name", value: "₹2.4 Cr.", salesperson: "Salesperson Name", status: "Approval Waiting", statusColor: "#B45309", statusBg: "#FEF3C7" },
  { id: "TND-2026-053", customer: "Customer Name", value: "₹4.5 Cr.", salesperson: "Salesperson Name", status: "Forward to MD", statusColor: "#1D4ED8", statusBg: "#DBEAFE" },
];

const TendersListModal = ({ title, subtitle, onClose }) => {
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
        width: 800, background: "#fff", borderRadius: 12, zIndex: 1001,
        fontFamily: FONT, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        maxHeight: "90vh", display: "flex", flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid #E2E8F0", flexShrink: 0
        }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex"
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="thin-scrollbar" style={{ padding: "20px", overflowY: "auto" }}>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
            {subtitle}
          </div>

          <div style={{ border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0" }}>Tender ID</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0" }}>Customer</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0" }}>Value</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0" }}>Salesperson</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#475569", borderBottom: "1px solid #E2E8F0" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {TENDERS_DATA.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < TENDERS_DATA.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#2563EB" }}>{row.id}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#111827" }}>{row.customer}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#16A34A", textAlign: "center" }}>{row.value}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{row.salesperson}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{
                        display: "inline-block", padding: "4px 12px", borderRadius: 12,
                        fontSize: 12, fontWeight: 600, color: row.statusColor, background: row.statusBg
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TendersListModal;
