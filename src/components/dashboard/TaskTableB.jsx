// src/components/dashboard/TaskTableB.jsx
import { Eye, Upload, Edit } from "lucide-react";
import { TASK_TABLE_B_ROWS } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

const COLUMNS = [
  { key: "id",                label: "Tender ID",            width: 130 },
  { key: "firm",              label: "Firm Name",            width: 110 },
  { key: "title",             label: "Tender Title",         width: 120 },
  { key: "customer",          label: "Customer",             width: 130 },
  { key: "presalesChecklist", label: "Pre-sales Checklist",  width: 140 },
  { key: "alertNotify",       label: "Alert & Notify",       width: 155 },
  { key: "oemStatus",         label: "OEM Status",           width: 140 },
  { key: "queryResponse",     label: "Query & Response",     width: 185 },
  { key: "deadline",          label: "Deadline",             width: 105 },
  { key: "updated",           label: "Updated",              width: 100 },
  { key: "actions",           label: "Actions",              width: 195 },
];

const ROW_BG = {
  green: "#E8F5E9",
};

// Map OEM status text → colour
const OEM_STATUS_COLOR = (status) => {
  if (!status || status === "-") return { color: "#6B7280" };
  if (status.toLowerCase().includes("pending")) return { color: "#F59E0B" };
  if (status.toLowerCase() === "completed") return { color: "#16A34A" };
  return { color: "#374151" };
};

// Map Query & Response text → colour
const QR_STATUS_COLOR = (status) => {
  if (!status || status === "-") return { color: "#6B7280" };
  if (status.toLowerCase().includes("completed")) return { color: "#16A34A" };
  if (status.toLowerCase().includes("pending")) return { color: "#F59E0B" };
  if (status.toLowerCase().includes("in progress")) return { color: "#2563EB" };
  if (status.toLowerCase().includes("awaiting")) return { color: "#F59E0B" };
  return { color: "#374151" };
};

// Render action button based on actionType
const ActionButton = ({ type, onClick }) => {
  const configs = {
    checkOEM: {
      label: "Check OEM Docs.",
      Icon: Edit,
      color: "#344054",
      borderColor: "#E2E8F0",
      bg: "#fff",
    },
    upload: {
      label: "Upload",
      Icon: Upload,
      color: "#344054",
      borderColor: "#E2E8F0",
      bg: "#fff",
    },
    view: {
      label: "View",
      Icon: Eye,
      color: "#344054",
      borderColor: "#E2E8F0",
      bg: "#fff",
    },
    checkQuery: {
      label: "Check Query & Response Docs.",
      Icon: Edit,
      color: "#344054",
      borderColor: "#E2E8F0",
      bg: "#fff",
    },
    start: {
      label: "Start",
      Icon: Edit,
      color: "#344054",
      borderColor: "#E2E8F0",
      bg: "#fff",
    },
  };

  const cfg = configs[type] || configs.view;
  const { label, Icon, color, borderColor, bg } = cfg;

  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        border: `1px solid ${borderColor}`,
        borderRadius: 6,
        background: bg,
        fontSize: 12,
        fontWeight: 500,
        color,
        cursor: "pointer",
        fontFamily: FONT,
        whiteSpace: "nowrap",
        transition: "background 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#F8FAFC";
        e.currentTarget.style.borderColor = "#2563EB";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
        e.currentTarget.style.borderColor = borderColor;
      }}
    >
      <Icon size={14} color="#2563EB" />
      {label}
    </button>
  );
};

// ─── Alert & Notify link cell ──────────────────────────────────────────────────────────
const AlertNotifyCell = ({ text, onClick }) => (
  <span
    onClick={onClick}
    style={{
      fontSize: 12,
      color: "#2563EB",
      fontWeight: 500,
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 2,
    }}
  >
    {text}
  </span>
);

// ─── TaskTableB ────────────────────────────────────────────────────────────────
const TaskTableB = ({ fullscreen = false, onAction, onAlertNotifyClick }) => (
  <div>
    {/* Section heading */}
    <p
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "#374151",
        margin: "0 0 10px",
        fontFamily: FONT,
      }}
    >
      Pre sales
    </p>

    {/* Table card */}
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        overflow: "auto",
        maxHeight: fullscreen ? "calc(100vh - 80px)" : "calc(100vh - 360px)",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: 1380,
          borderCollapse: "collapse",
          fontFamily: FONT,
        }}
      >
        {/* ── Head ── */}
        <thead>
          <tr
            style={{
              background: "#F9FAFB",
              borderBottom: "1px solid #E5E7EB",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: "11px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6B7280",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  width: col.width,
                  minWidth: col.width,
                  background: "#F9FAFB",
                  letterSpacing: "0.01em",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {TASK_TABLE_B_ROWS.map((row, i) => {
            const bg = ROW_BG[row.highlight] ?? "#fff";
            const isLast = i === TASK_TABLE_B_ROWS.length - 1;
            return (
              <tr
                key={i}
                style={{
                  background: bg,
                  borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (!row.highlight)
                    e.currentTarget.style.background = "#F9FAFB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = bg;
                }}
              >
                {/* Tender ID */}
                <td
                  style={{
                    padding: "13px 14px",
                    fontSize: 13,
                    color: "#2563EB",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {row.id}
                </td>

                {/* Firm Name */}
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                  {row.firm}
                </td>

                {/* Tender Title */}
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                  {row.title}
                </td>

                {/* Customer */}
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                  {row.customer}
                </td>

                {/* Pre-sales Checklist */}
                <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                  {row.presalesChecklist}
                </td>

                {/* Alert & Notify */}
                <td style={{ padding: "13px 14px", textAlign: "center" }}>
                  <AlertNotifyCell text={row.alertNotify} onClick={() => onAlertNotifyClick?.(row)} />
                </td>

                {/* OEM Status */}
                <td
                  style={{
                    padding: "13px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    ...OEM_STATUS_COLOR(row.oemStatus),
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {row.oemStatus}
                </td>

                {/* Query & Response */}
                <td
                  style={{
                    padding: "13px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    ...QR_STATUS_COLOR(row.queryResponse),
                    textAlign: "center",
                  }}
                >
                  {row.queryResponse}
                </td>

                {/* Deadline */}
                <td
                  style={{
                    padding: "13px 14px",
                    fontSize: 13,
                    color: "#374151",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {row.deadline}
                </td>

                {/* Updated */}
                <td
                  style={{
                    padding: "13px 14px",
                    fontSize: 13,
                    color: "#6B7280",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {row.updated}
                </td>

                {/* Actions */}
                <td style={{ padding: "13px 14px", textAlign: "center" }}>
                  <ActionButton
                    type={row.actionType}
                    onClick={() => onAction?.(row)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default TaskTableB;
