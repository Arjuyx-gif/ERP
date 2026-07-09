import { useState } from "react";
import { Eye, Upload, Edit, CheckCircle, FileText, HelpCircle, Send, Clock, AlertCircle, Bell as BellIcon, ExternalLink, ChevronDown, AlertTriangle } from "lucide-react";
import { TASK_TABLE_B_ROWS, TASK_DASHBOARD_PS_DEADLINES, TASK_DASHBOARD_PS_QUICK_ACTIONS, TASK_DASHBOARD_PS_TIMELINE } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

/* ── Columns (17 cols, shown inline and in fullscreen) ──────────────────────── */
const COLUMNS = [
  { key: "id",                label: "Tender ID",            width: 120 },
  { key: "firm",              label: "Firm Name",            width: 110 },
  { key: "title",             label: "Tender Title",         width: 120 },
  { key: "customer",          label: "Customer",             width: 130 },
  { key: "type",              label: "Type",                 width: 100 },
  { key: "presalesChecklist", label: "Pre-sales\nChecklist", width: 100 },
  { key: "alertNotify",       label: "Alert & Notify",       width: 140 },
  { key: "preBidQueries",     label: "Pre-Bid Queries",      width: 120 },
  { key: "oemStatus",         label: "OEM Status",           width: 130 },
  { key: "bidStatus",         label: "Bid Status",           width: 110 },
  { key: "postBidQueries",    label: "Post-Bid Queries",     width: 130 },
  { key: "compSheet1",        label: "Comparison Sheet",     width: 120 },
  { key: "compSheet2",        label: "Comparison Sheet",     width: 180 },
  { key: "stage",             label: "Stage",                width: 150 },
  { key: "deadline",          label: "Deadline",             width: 100 },
  { key: "approvedByManager", label: "Approved By\nManager", width: 100 },
  { key: "actions",           label: "Actions",              width: 160 },
];

/* ── Status colors ──────────────────────────────────────────────────────────── */
const STATUS_COLOR = (status) => {
  if (!status || status === "-" || status === "NA") return { color: "#6B7280" };
  const lower = status.toLowerCase();
  if (lower.includes("completed") || lower === "won" || lower === "complete") return { color: "#16A34A" };
  if (lower.includes("pending") || lower.includes("awaiting")) return { color: "#F59E0B" };
  if (lower.includes("in progress") || lower.includes("transited") || lower.includes("transition")) return { color: "#2563EB" };
  if (lower === "lost" || lower.includes("not submitted")) return { color: "#EF4444" };
  return { color: "#374151" };
};

const BID_STATUS_BADGE = (status) => {
  if (!status || status === "-") return null;
  const lower = status.toLowerCase();
  if (lower === "won") return { bg: "#ECFDF5", color: "#10B981", border: "#A7F3D0" };
  if (lower === "lost") return { bg: "#FEF2F2", color: "#EF4444", border: "#FECACA" };
  return null; // plain text
};

/* ── Deadline dot color ─────────────────────────────────────────────────────── */
const DEADLINE_DOT = {
  red: "#EF4444",
  orange: "#F97316",
  blue: "#3B82F6",
  green: "#10B981",
};

const ActionButton = ({ type, onClick }) => {
  const configs = {
    checkOEM:   { label: "Complete OEM Doc",               Icon: Edit,   color: "#374151", borderColor: "#E5E7EB", bg: "#fff" },
    upload:     { label: "Upload",                         Icon: Upload, color: "#374151", borderColor: "#E5E7EB", bg: "#fff" },
    view:       { label: "View",                           Icon: Eye,    color: "#374151", borderColor: "#E5E7EB", bg: "#fff" },
    checkQuery: { label: "Check Query",                    Icon: Edit,   color: "#374151", borderColor: "#E5E7EB", bg: "#fff" },
    start:      { label: "Start",                          Icon: Edit,   color: "#374151", borderColor: "#E5E7EB", bg: "#fff" },
  };
  const cfg = configs[type] || configs.view;
  const { label, Icon, color, borderColor, bg } = cfg;
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 12px", border: `1px solid ${borderColor}`, borderRadius: 6,
        background: bg, fontSize: 12, fontWeight: 500, color,
        cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
        transition: "background 0.15s, border-color 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
      onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = borderColor; }}
    >
      <Icon size={14} color="#4B5563" />
      {label}
    </button>
  );
};

// ─── TaskTableB (Redesigned Task Dashboard PS) ─────────────────────────────────
const TaskTableB = ({ fullscreen = false, onExpandTable, onAction, onShowDocs, onAlertNotifyClick, onViewDocs }) => {
  /* Use mock rows */
  const filteredRows = TASK_TABLE_B_ROWS;

  return (
    <div style={{ fontFamily: FONT }}>



      {/* ── Main Table ────────────────────────────────────────────────────── */}
      <div style={{
        background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "auto",
        marginBottom: fullscreen ? 0 : 24,
        maxHeight: fullscreen ? "calc(100vh - 120px)" : "auto",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 10 }}>
              {COLUMNS.map(col => (
                <th key={col.key} style={{
                  padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#6B7280",
                  textAlign: "center", whiteSpace: "pre-line",
                  width: col.width, minWidth: col.width,
                  background: "#F9FAFB", letterSpacing: "0.01em",
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row, i) => {
              const isGreen = row.highlight === "green";
              const isYellow = row.highlight === "yellow";
              const bg = isGreen ? "#E8F5E9" : isYellow ? "#FEF9C3" : "#fff";
              const isLast = i === filteredRows.length - 1;
              return (
                <tr
                  key={i}
                  style={{
                    background: bg,
                    borderBottom: isLast ? "none" : "1px solid #E5E7EB",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={e => { if (!row.highlight) e.currentTarget.style.background = "#F9FAFB"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = bg; }}
                >
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", fontWeight: 500, whiteSpace: "nowrap", textAlign: "center" }}>
                    {row.id}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                    {row.firm}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                    {row.title}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                    {row.customer}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.type) }}>
                    {row.type}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.presalesChecklist) }}>
                    {row.presalesChecklist}
                  </td>

                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#2563EB", textAlign: "center", textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }} onClick={() => onAlertNotifyClick?.(row)}>
                    {row.alertNotify}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.preBidQueries) }}>
                    {row.preBidQueries}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.oemStatus) }}>
                    {row.oemStatus}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.bidStatus) }}>
                    {BID_STATUS_BADGE(row.bidStatus) ? (
                      <span style={{
                        padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                        background: BID_STATUS_BADGE(row.bidStatus).bg,
                        color: BID_STATUS_BADGE(row.bidStatus).color,
                        border: `1px solid ${BID_STATUS_BADGE(row.bidStatus).border}`
                      }}>
                        {row.bidStatus}
                      </span>
                    ) : row.bidStatus}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.postBidQueries) }}>
                    {row.postBidQueries}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.compSheet1) }}>
                    {row.compSheet1}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.compSheet2) }}>
                    {row.compSheet2}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, textAlign: "center", ...STATUS_COLOR(row.stage) }}>
                    {row.stage}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", whiteSpace: "nowrap", textAlign: "center" }}>
                    {row.deadline}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", textAlign: "center" }}>
                    {row.approvedByManager}
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <ActionButton
                      type={row.actionType}
                      onClick={() => {
                        if (row.actionType === "view") {
                          onViewDocs?.(row);
                        } else {
                          onAction?.(row);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Bottom Grid: Upcoming Deadlines + Quick Actions (Standard only) ── */}
      {!fullscreen && (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 24,
          }}>

            {/* Upcoming Deadlines */}
            <div style={{
              background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
              padding: "20px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
                Upcoming Deadlines
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {TASK_DASHBOARD_PS_DEADLINES.map((item, i) => {
                  const styleCfg = {
                    red: { bg: "#FEF2F2", border: "#FECACA", text: "#EF4444" },
                    orange: { bg: "#FEF9C3", border: "#FEF08A", text: "#EAB308" },
                    green: { bg: "#F0FDF4", border: "#BBF7D0", text: "#10B981" },
                    blue: { bg: "#EFF6FF", border: "#BFDBFE", text: "#3B82F6" },
                  }[item.dotColor] || { bg: "#F9FAFB", border: "#E5E7EB", text: "#6B7280" };

                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px",
                      background: styleCfg.bg,
                      border: `1px solid ${styleCfg.border}`,
                      borderRadius: 8,
                    }}>
                      {/* Dot */}
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                        background: styleCfg.text,
                      }} />
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: styleCfg.text }}>{item.label}</span>
                        {" "}
                        <span style={{ fontSize: 12, color: "#2563EB", fontWeight: 600 }}>{item.tenderId}</span>
                        {" "}
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{item.customer}</span>
                      </div>
                      {/* Date + alert icon */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        <span style={{
                          fontSize: 12, fontWeight: 600,
                          background: "#fff", padding: "2px 8px", borderRadius: 12,
                          border: `1px solid ${styleCfg.border}`,
                          color: styleCfg.text,
                        }}>
                          {item.date}
                        </span>
                        {item.alert && (
                          <AlertTriangle size={14} color={styleCfg.text} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
              padding: "20px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
                Quick Actions
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TASK_DASHBOARD_PS_QUICK_ACTIONS.map((action, i) => {
                  let styleCfg = { bg: "#fff", border: "#E5E7EB", text: "#374151" };
                  if (action.icon === "checklist") styleCfg = { bg: "#EFF6FF", border: "#BFDBFE", text: "#2563EB" };
                  if (action.icon === "upload") styleCfg = { bg: "#FFF7ED", border: "#FED7AA", text: "#EA580C" };
                  if (action.icon === "query") styleCfg = { bg: "#FAF5FF", border: "#E9D5FF", text: "#9333EA" };
                  if (action.icon === "clarification") styleCfg = { bg: "#FEF2F2", border: "#FECACA", text: "#DC2626" };
                  if (action.icon === "history") styleCfg = { bg: "#F9FAFB", border: "#E5E7EB", text: "#4B5563" };
                  if (action.icon === "tender") styleCfg = { bg: "#F0FDF4", border: "#BBF7D0", text: "#16A34A" };

                  return (
                    <button
                      key={i}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 14px",
                        border: `1px solid ${styleCfg.border}`, borderRadius: 8,
                        background: styleCfg.bg, cursor: "pointer", fontFamily: FONT,
                        transition: "opacity 0.15s",
                        textAlign: "left",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                    >
                      <QuickActionIcon name={action.icon} color={styleCfg.text} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: styleCfg.text }}>{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Activity Timeline ─────────────────────────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
            padding: "20px 24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
              Activity Timeline
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TASK_DASHBOARD_PS_TIMELINE.map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, padding: "14px 0",
                  borderBottom: i < TASK_DASHBOARD_PS_TIMELINE.length - 1 ? "1px solid #F3F4F6" : "none",
                }}>
                  {/* Timeline dot + line */}
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    width: 32, flexShrink: 0,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: "#F3F4F6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <TimelineIcon type={item.icon} />
                    </div>
                    {i < TASK_DASHBOARD_PS_TIMELINE.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: "#E5E7EB", marginTop: 4 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2 }}>
                      {item.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{
                        fontSize: 12, color: "#2563EB", fontWeight: 500,
                        background: "#EFF6FF", padding: "2px 8px", borderRadius: 4,
                      }}>
                        {item.tenderId}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* ── Helper icon components ─────────────────────────────────────────────────── */

const QuickActionIcon = ({ name, color = "#2563EB" }) => {
  const iconStyle = { flexShrink: 0 };
  switch (name) {
    case "checklist": return <FileText size={16} color={color} style={iconStyle} />;
    case "upload": return <Upload size={16} color={color} style={iconStyle} />;
    case "query": return <AlertCircle size={16} color={color} style={iconStyle} />;
    case "clarification": return <FileText size={16} color={color} style={iconStyle} />;
    case "history": return <Clock size={16} color={color} style={iconStyle} />;
    case "tender": return <Eye size={16} color={color} style={iconStyle} />;
    default: return <FileText size={16} color={color} style={iconStyle} />;
  }
};

const TimelineIcon = ({ type }) => {
  switch (type) {
    case "submit": return <Send size={14} color="#6B7280" />;
    case "upload": return <Upload size={14} color="#6B7280" />;
    case "query": return <HelpCircle size={14} color="#6B7280" />;
    case "check": return <CheckCircle size={14} color="#6B7280" />;
    default: return <FileText size={14} color="#6B7280" />;
  }
};

export default TaskTableB;
