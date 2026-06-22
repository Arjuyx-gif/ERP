import { useState } from "react";
import { Eye, Upload, Edit, X, FileText } from "lucide-react";
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

const ROW_BG = { green: "#E8F5E9" };

const OEM_STATUS_COLOR = (status) => {
  if (!status || status === "-") return { color: "#6B7280" };
  if (status.toLowerCase().includes("pending")) return { color: "#F59E0B" };
  if (status.toLowerCase() === "completed") return { color: "#16A34A" };
  return { color: "#374151" };
};

const QR_STATUS_COLOR = (status) => {
  if (!status || status === "-") return { color: "#6B7280" };
  if (status.toLowerCase().includes("completed")) return { color: "#16A34A" };
  if (status.toLowerCase().includes("pending")) return { color: "#F59E0B" };
  if (status.toLowerCase().includes("in progress")) return { color: "#2563EB" };
  if (status.toLowerCase().includes("awaiting")) return { color: "#F59E0B" };
  return { color: "#374151" };
};

const ActionButton = ({ type, onClick }) => {
  const configs = {
    checkOEM:   { label: "Check OEM Docs.",               Icon: Edit,   color: "#344054", borderColor: "#E2E8F0", bg: "#fff" },
    upload:     { label: "Upload",                         Icon: Upload, color: "#344054", borderColor: "#E2E8F0", bg: "#fff" },
    view:       { label: "View",                           Icon: Eye,    color: "#344054", borderColor: "#E2E8F0", bg: "#fff" },
    checkQuery: { label: "Check Query & Response Docs.",   Icon: Edit,   color: "#344054", borderColor: "#E2E8F0", bg: "#fff" },
    start:      { label: "Start",                          Icon: Edit,   color: "#344054", borderColor: "#E2E8F0", bg: "#fff" },
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
      onMouseEnter={e => { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.borderColor = "#2563EB"; }}
      onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = borderColor; }}
    >
      <Icon size={14} color="#2563EB" />
      {label}
    </button>
  );
};

const AlertNotifyCell = ({ text, onClick }) => (
  <span
    onClick={onClick}
    style={{ fontSize: 12, color: "#2563EB", fontWeight: 500, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}
  >
    {text}
  </span>
);

// ─── Documents Modal ───────────────────────────────────────────────────────────
const DocItem = ({ name }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff",
  }}>
    <div style={{ width: 34, height: 34, borderRadius: 6, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <FileText size={16} color="#6B7280" />
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{name}</div>
      <div style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", marginTop: 2 }}>View Document</div>
    </div>
  </div>
);

const DocumentsModal = ({ row, onClose }) => (
  <>
    {/* Light backdrop — keeps the RFP form visible behind the modal */}
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1060, background: "rgba(0,0,0,0.15)" }}
    />

    {/* Modal */}
    <div style={{
      position: "fixed", top: "50%", left: "58%", transform: "translate(-50%, -50%)",
      zIndex: 1061, background: "#fff", borderRadius: 12, width: 420,
      maxHeight: "85vh", overflowY: "auto",
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)", fontFamily: FONT,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid #E5E7EB" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Documents</div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>Tender ID: {row.id}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex" }}>
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Pre-Sales Checklist */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Pre-Sales Checklist</div>
          <DocItem name="Pre-Sales Checklist" />
        </div>

        {/* Alert & Notify */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Alert &amp; Notify</div>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff",
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 6, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FileText size={16} color="#6B7280" />
            </div>
            <div style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, cursor: "pointer" }}>View List</div>
          </div>
        </div>

        {/* OEM Document */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>OEM Document</div>
          <DocItem name="OEM Document" />
        </div>

        {/* Query & Response */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Query &amp; Response</div>
          <DocItem name="Query &amp; Response" />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "14px 20px", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "center" }}>
        <button
          onClick={onClose}
          style={{
            width: "100%", padding: "10px 0", border: "1px solid #E5E7EB", borderRadius: 8,
            background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
            cursor: "pointer", fontFamily: FONT,
          }}
        >
          Close
        </button>
      </div>
    </div>
  </>
);

// ─── TaskTableB ────────────────────────────────────────────────────────────────
const TaskTableB = ({ fullscreen = false, onAction, onAlertNotifyClick }) => {
  const [docsRow, setDocsRow] = useState(null);

  return (
    <>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: "0 0 10px", fontFamily: FONT }}>
          Pre sales
        </p>

        <div style={{
          background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "auto",
          maxHeight: fullscreen ? "calc(100vh - 80px)" : "calc(100vh - 360px)",
        }}>
          <table style={{ width: "100%", minWidth: 1380, borderCollapse: "collapse", fontFamily: FONT }}>
            <thead>
              <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 2 }}>
                {COLUMNS.map(col => (
                  <th key={col.key} style={{
                    padding: "11px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280",
                    textAlign: "center", whiteSpace: "nowrap",
                    width: col.width, minWidth: col.width,
                    background: "#F9FAFB", letterSpacing: "0.01em",
                  }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {TASK_TABLE_B_ROWS.map((row, i) => {
                const bg = ROW_BG[row.highlight] ?? "#fff";
                const isLast = i === TASK_TABLE_B_ROWS.length - 1;
                return (
                  <tr
                    key={i}
                    style={{ background: bg, borderBottom: isLast ? "none" : "1px solid #F3F4F6", transition: "background 0.12s" }}
                    onMouseEnter={e => { if (!row.highlight) e.currentTarget.style.background = "#F9FAFB"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = bg; }}
                  >
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, whiteSpace: "nowrap", textAlign: "center" }}>{row.id}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.firm}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.title}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.customer}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.presalesChecklist}</td>
                    <td style={{ padding: "13px 14px", textAlign: "center" }}>
                      <AlertNotifyCell text={row.alertNotify} onClick={() => onAlertNotifyClick?.(row)} />
                    </td>
                    <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 500, ...OEM_STATUS_COLOR(row.oemStatus), whiteSpace: "nowrap", textAlign: "center" }}>{row.oemStatus}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 500, ...QR_STATUS_COLOR(row.queryResponse), textAlign: "center" }}>{row.queryResponse}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", whiteSpace: "nowrap", textAlign: "center" }}>{row.deadline}</td>
                    <td style={{ padding: "13px 14px", fontSize: 13, color: "#6B7280", whiteSpace: "nowrap", textAlign: "center" }}>{row.updated}</td>
                    <td style={{ padding: "13px 14px", textAlign: "center" }}>
                      <ActionButton
                        type={row.actionType}
                        onClick={() => {
                          if (row.actionType === "view") {
                            onAction?.(row);   // opens RFP form in background
                            setDocsRow(row);   // opens Documents modal on top
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
      </div>

      {docsRow && <DocumentsModal row={docsRow} onClose={() => setDocsRow(null)} />}
    </>
  );
};

export default TaskTableB;
