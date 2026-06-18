import { Eye, Upload, Edit3 } from "lucide-react";
import { TASK_DASHBOARD_C_TABLE_ROWS } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

const COLUMNS = [
  { key: "id",         label: "Tender/ Order ID", width: 140 },
  { key: "firm",       label: "Firm Name",         width: 120 },
  { key: "title",      label: "Tender Title",      width: 130 },
  { key: "customer",   label: "Customer",          width: 140 },
  { key: "value",      label: "Value",             width: 90  },
  { key: "deadline",   label: "Deadline",          width: 110 },
  { key: "status",     label: "Status",            width: 180 },
  { key: "updated",    label: "Updated",           width: 110 },
  { key: "completion", label: "Completion",        width: 100 },
  { key: "actions",    label: "Actions",           width: 160 },
];

const ROW_BG = {
  yellow: "#FFFDE7",
  green:  "#E8F5E9",
  red:    "#FEE2E2",
};

const ACTION_ICON = {
  eye:    Eye,
  upload: Upload,
  edit:   Edit3,
};

const TaskTableC = ({ fullscreen = false }) => (
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
        {TASK_DASHBOARD_C_TABLE_ROWS.map((row, i) => {
          const Icon = ACTION_ICON[row.actionIcon] || Edit3;
          return (
            <tr
              key={i}
              style={{
                background: ROW_BG[row.highlight] ?? "#fff",
                borderBottom: i < TASK_DASHBOARD_C_TABLE_ROWS.length - 1 ? "1px solid #F2F4F7" : "none",
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
                {row.customer}
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
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#667085", whiteSpace: "nowrap" }}>
                {row.updated}
              </td>
              <td style={{ padding: "14px 14px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: row.completion === 100 ? "#16A34A" : "#344054" }}>
                  {row.completion}%
                </span>
              </td>
              <td style={{ padding: "14px 14px" }}>
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

export default TaskTableC;
