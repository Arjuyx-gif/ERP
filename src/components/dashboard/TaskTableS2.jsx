import { Eye, Upload, Edit3 } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const COLUMNS = [
  { key: "id",         label: "Tender/ Order ID", width: 140 },
  { key: "firm",       label: "Firm Name",         width: 120 },
  { key: "title",      label: "Tender Title",      width: 130 },
  { key: "customer",   label: "Customer",          width: 140 },
  { key: "value",      label: "Value",             width: 90  },
  { key: "deadline",   label: "Deadline",          width: 110 },
  { key: "status",     label: "Status",            width: 190 },
  { key: "updated",    label: "Updated",           width: 110 },
  { key: "completion", label: "Completion",        width: 100 },
  { key: "actions",    label: "Actions",           width: 160 },
];

const ROW_BG = {
  yellow: "#FFFDE7",
  green:  "#E8F5E9",
};

const ACTION_ICON = {
  eye:    Eye,
  upload: Upload,
  edit:   Edit3,
};

const ROWS = [
  {
    id: "ORD-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "SOF - Pending",
    statusColor: "#D97706", updated: "Yesterday", completion: 0,
    highlight: "yellow", actionIcon: "edit", actionLabel: "Start SOF",
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "Doc. Uploaded Query & Response",
    statusColor: "#D97706", updated: "Yesterday", completion: 0,
    highlight: "yellow", actionIcon: "upload", actionLabel: "Upload",
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "Submitted for Approval",
    statusColor: "#16A34A", updated: "Yesterday", completion: 100,
    highlight: "green", actionIcon: "eye", actionLabel: "View",
  },
  {
    id: "ORD-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "Order Placed",
    statusColor: "#2563EB", updated: "Today", completion: 80,
    highlight: null, actionIcon: "eye", actionLabel: "View SOF",
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "Draft",
    statusColor: "#6B7280", updated: "Today", completion: 0,
    highlight: null, actionIcon: "edit", actionLabel: "Continue",
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "In Progress",
    statusColor: "#2563EB", updated: "2 hrs ago", completion: 60,
    highlight: null, actionIcon: "edit", actionLabel: "Continue RFP",
  },
  {
    id: "ORD-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name",
    value: "₹2 Cr.", deadline: "25/04/2026", status: "EMD Completed & Uploaded",
    statusColor: "#16A34A", updated: "Today", completion: 80,
    highlight: null, actionIcon: "eye", actionLabel: "View SOF",
  },
];

const TaskTableS2 = ({ fullscreen = false }) => (
  <div style={{
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #E2E8F0",
    overflow: "auto",
    maxHeight: fullscreen ? "calc(100vh - 80px)" : "calc(100vh - 360px)",
  }}>
    <table style={{ width: "100%", minWidth: 1200, borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", position: "sticky", top: 0, zIndex: 2 }}>
          {COLUMNS.map(col => (
            <th
              key={col.key}
              style={{
                padding: "12px 14px",
                fontSize: 12, fontWeight: 600, color: "#667085",
                textAlign: "center", whiteSpace: "nowrap",
                width: col.width, minWidth: col.width,
                background: "#F8FAFC",
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row, i) => {
          const Icon = ACTION_ICON[row.actionIcon] || Edit3;
          return (
            <tr
              key={i}
              style={{
                background: ROW_BG[row.highlight] ?? "#fff",
                borderBottom: i < ROWS.length - 1 ? "1px solid #F2F4F7" : "none",
                transition: "background 0.1s",
              }}
            >
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, whiteSpace: "nowrap", textAlign: "center" }}>
                {row.id}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.firm}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.title}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.customer}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.value}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.deadline}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: row.statusColor, fontWeight: 500, textAlign: "center" }}>{row.status}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#667085", whiteSpace: "nowrap", textAlign: "center" }}>{row.updated}</td>
              <td style={{ padding: "14px 14px", textAlign: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: row.completion === 100 ? "#16A34A" : "#344054" }}>
                  {row.completion}%
                </span>
              </td>
              <td style={{ padding: "14px 14px", textAlign: "center" }}>
                {row.actionLabel && (
                  <button
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "6px 12px", border: "1px solid #E2E8F0", borderRadius: 6,
                      background: "#fff", fontSize: 12, fontWeight: 500, color: "#344054",
                      cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#F8FAFC";
                      e.currentTarget.style.borderColor = "#2563EB";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "#E2E8F0";
                    }}
                  >
                    <Icon size={14} color="#2563EB" />
                    {row.actionLabel}
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default TaskTableS2;
