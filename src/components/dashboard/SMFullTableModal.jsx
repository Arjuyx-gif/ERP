import { X, Edit, Send, Eye } from "lucide-react";

const FULL_TABLE_DATA = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approval Waiting", completion: "100%", actionLabel: "Approve RFP", actionIcon: Edit, bg: "#FEF3C7" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approved", completion: "100%", actionLabel: "Send to MD Sir", actionIcon: Send, bg: "#fff" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approved", completion: "100%", actionLabel: "Send to MD Sir", actionIcon: Send, bg: "#fff" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approved", completion: "100%", actionLabel: "Forwarded to MD Sir", actionIcon: Send, bg: "#DCFCE7" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Rejected", completion: "0%", actionLabel: "View RFP", actionIcon: Eye, bg: "#FEF3C7" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Won - PO Awaiting", completion: "100%", actionLabel: "View RFP", actionIcon: Eye, bg: "#fff" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "PO Updated", completion: "100%", actionLabel: "View PO", actionIcon: Eye, bg: "#fff" },
];

const SMFullTableModal = ({ onClose, onViewRFP }) => {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1100,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      background: "rgba(0,0,0,0.28)",
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0 }} />

      <div style={{
        position: "relative", background: "#fff", borderRadius: 12,
        width: "min(96vw, 1300px)", maxHeight: "90vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(0,0,0,0.20)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px", borderBottom: "1px solid #E2E8F0",
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#6B7280", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={24} />
          </button>
        </div>

        {/* Table wrapper */}
        <div className="thin-scrollbar" style={{ overflow: "auto", flex: 1, padding: "24px" }}>
          <div style={{ border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  {["Tender/ Order ID", "Firm Name", "Tender Title", "Sales Person", "Value", "Deadline", "Status", "Completion", "Actions"].map(col => (
                    <th key={col} style={{ padding: "16px 12px", fontSize: 13, fontWeight: 600, color: "#64748B", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FULL_TABLE_DATA.map((row, i) => {
                  const Icon = row.actionIcon;
                  return (
                    <tr key={i} style={{ 
                      borderBottom: i < FULL_TABLE_DATA.length - 1 ? "1px solid #E2E8F0" : "none",
                      background: row.bg,
                    }}>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.id}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.firm}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.title}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.salesPerson}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.value}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.deadline}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.status}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#475569", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>{row.completion}</td>
                      <td style={{ padding: "16px 12px", fontSize: 13, color: "#111827", textAlign: "center", borderRight: "1px solid #E2E8F0", borderLeft: "1px solid #E2E8F0" }}>
                        <button 
                          onClick={() => {
                            if (onViewRFP) {
                              onViewRFP({
                                id: row.id,
                                tender: row.title,
                                customer: row.firm,
                                amount: row.value,
                                action: row.actionLabel,
                                isQuery: false,
                                status: row.status,
                                rejectionRemark: 
                                  row.actionLabel === "Forwarded to MD Sir" ? "Rejected by MD Sir due to timeline constraints." 
                                  : row.status === "Rejected" ? "Rejected during internal review. Missing mandatory documents." 
                                  : undefined,
                              });
                            }
                            onClose();
                          }}
                          style={{
                          background: "none", border: "none", color: "#111827", fontSize: 13, fontWeight: 600,
                          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                          fontFamily: "inherit"
                        }}>
                          <Icon size={14} /> {row.actionLabel}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMFullTableModal;
