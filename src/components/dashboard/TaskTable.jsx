import { Eye, Upload, Edit3, Send } from "lucide-react";
import { TASK_TABLE_ROWS } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

const COLUMNS = [
  { key: "id",          label: "Tender/ Order ID", width: 140 },
  { key: "firm",        label: "Firm Name",         width: 120 },
  { key: "title",       label: "Tender Title",      width: 130 },
  { key: "salesPerson", label: "Sales Person",      width: 150 },
  { key: "value",       label: "Value",             width: 90  },
  { key: "deadline",    label: "Deadline",          width: 110 },
  { key: "status",      label: "Status",            width: 150 },
  { key: "completion",  label: "Completion",        width: 100 },
  { key: "actions",     label: "Actions",           width: 160 },
];

const ROW_BG = {
  yellow: "#FFFDE7",
  green:  "#E8F5E9",
  orange: "#FFF3E0",
};

const ACTION_ICON = {
  eye:    Eye,
  upload: Upload,
  edit:   Edit3,
  send:   Send,
};

const TaskTable = ({ fullscreen = false, onViewRFP }) => (
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
                textAlign: "left", whiteSpace: "nowrap",
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
        {TASK_TABLE_ROWS.map((row, i) => {
          const Icon = ACTION_ICON[row.actionIcon] || Edit3;
          return (
            <tr
              key={i}
              style={{
                background: ROW_BG[row.highlight] ?? "#fff",
                borderBottom: i < TASK_TABLE_ROWS.length - 1 ? "1px solid #F2F4F7" : "none",
                transition: "background 0.1s",
              }}
            >
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, whiteSpace: "nowrap" }}>
                {row.id}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054" }}>
                {row.firm}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054" }}>
                {row.title}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054" }}>
                {row.salesPerson}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap" }}>
                {row.value}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap" }}>
                {row.deadline}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: row.statusColor, fontWeight: 500 }}>
                {row.status}
              </td>
              <td style={{ padding: "14px 14px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: row.completion === 100 ? "#16A34A" : "#344054" }}>
                  {row.completion}%
                </span>
              </td>
              <td style={{ padding: "14px 14px" }}>
                {row.actionLabel && (
                  <button
                    onClick={() => {
                      if (row.actionLabel === "Approve RFP") {
                        onViewRFP?.({ id: row.id, tender: row.title, customer: row.salesPerson, amount: row.value, action: "Approve RFP" });
                      } else if (row.actionLabel === "View RFP") {
                        onViewRFP?.({ id: row.id, tender: row.title, customer: row.salesPerson, amount: row.value, action: "View RFP Form" });
                      } else if (row.actionLabel === "Send to MD Sir") {
                        onViewRFP?.({ id: row.id, tender: row.title, customer: row.salesPerson, amount: row.value, action: "Approved View" });
                      } else if (row.actionLabel === "Forwarded to MD Sir" || row.actionLabel === "View PO") {
                        onViewRFP?.({ id: row.id, tender: row.title, customer: row.salesPerson, amount: row.value, action: "View RFP Form" });
                      }
                    }}
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

export default TaskTable;
