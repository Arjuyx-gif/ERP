import { useState } from "react";
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

const TaskTableS2 = ({ fullscreen = false }) => {
  const [showSOFModal, setShowSOFModal] = useState(false);

  return (
  <>
  {showSOFModal && (
    <div
      onClick={() => setShowSOFModal(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 12,
          padding: "32px 28px 24px", width: 300,
          boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
          fontFamily: FONT, textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#2563EB", margin: "0 0 14px" }}>
          Complete Pending SOFs
        </h2>
        <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: "0 0 24px" }}>
          Please complete the current SOF before creating a new RFP.<br />
          Finish all mandatory SOF details and submit/save the form to continue.
        </p>
        <button
          onClick={() => setShowSOFModal(false)}
          style={{
            padding: "10px 40px", background: "#2563EB", color: "#fff",
            border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: FONT,
          }}
        >
          OK
        </button>
      </div>
    </div>
  )}
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
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, whiteSpace: "nowrap" }}>
                {row.id}
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054" }}>{row.firm}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054" }}>{row.title}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054" }}>{row.customer}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap" }}>{row.value}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap" }}>{row.deadline}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: row.statusColor, fontWeight: 500 }}>{row.status}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#667085", whiteSpace: "nowrap" }}>{row.updated}</td>
              <td style={{ padding: "14px 14px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: row.completion === 100 ? "#16A34A" : "#344054" }}>
                  {row.completion}%
                </span>
              </td>
              <td style={{ padding: "14px 14px" }}>
                {row.actionLabel && (
                  <button
                    onClick={() => { if (row.actionLabel === "Start SOF") setShowSOFModal(true); }}
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
  </>
  );
};

export default TaskTableS2;
