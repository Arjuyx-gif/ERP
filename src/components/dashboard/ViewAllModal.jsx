// src/components/dashboard/ViewAllModal.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getViewAllRows } from "../../services/dashboardService";
import DynamicIcon from "../ui/DynamicIcon";

// ─── Row background ────────────────────────────────────────────────────────────
const ROW_BG = { warning: "#FFFBEB", success: "#F0FDF4", error: "#FEF2F2" };
const rowBg = (variant, idx) =>
  ROW_BG[variant] ?? (idx % 2 === 0 ? "#ffffff" : "#F9FAFB");

// ─── Style tokens ──────────────────────────────────────────────────────────────
const TH = {
  padding: "10px 16px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#6B7280",
  background: "#F8FAFC",
  borderBottom: "2px solid #E5E7EB",
  whiteSpace: "nowrap",
  textAlign: "center",
  position: "sticky",
  top: 0,
  zIndex: 2,
};

// cell(bg, extra?) — base cell; extend per column
const cell = (bg, extra = {}) => ({
  padding: "11px 16px",
  fontSize: 13,
  color: "#374151",
  borderBottom: "1px solid #F3F4F6",
  verticalAlign: "middle",
  background: bg,
  whiteSpace: "nowrap",
  ...extra,
});

// ─── Typed cell helpers ────────────────────────────────────────────────────────
// ID: monospace blue bold
const TDId = ({ bg, children }) => (
  <td style={cell(bg, { fontWeight: 700, color: "#2563EB", fontSize: 12, letterSpacing: "0.02em", textAlign: "center" })}>
    {children}
  </td>
);
// Long text: centered, soft truncation
const TDText = ({ bg, children, bold }) => (
  <td style={cell(bg, { maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", fontWeight: bold ? 600 : 400, textAlign: "center" })}>
    {children}
  </td>
);
// Short / date / value: centered, muted
const TDMeta = ({ bg, children }) => (
  <td style={cell(bg, { textAlign: "center", color: "#6B7280" })}>
    {children}
  </td>
);
// Actions / status pills: centered
const TDAction = ({ bg, children }) => (
  <td style={cell(bg, { textAlign: "center" })}>
    {children}
  </td>
);

// ─── Status pill ──────────────────────────────────────────────────────────────
const TONE = {
  green: { bg: "#DCFCE7", color: "#15803D" },
  amber: { bg: "#FEF3C7", color: "#B45309" },
  red:   { bg: "#FEE2E2", color: "#DC2626" },
  blue:  { bg: "#DBEAFE", color: "#1D4ED8" },
  gray:  { bg: "#F1F5F9", color: "#475569" },
};
const toneFor = (text = "") => {
  const t = text.toLowerCase();
  if (/approv|complet|won|received|submitted/.test(t)) return TONE.green;
  if (/pending|awaiting|waiting|progress|docs/.test(t))  return TONE.amber;
  if (/reject|lost|cancel/.test(t))                      return TONE.red;
  if (/review|sent|notif|alert/.test(t))                 return TONE.blue;
  return TONE.gray;
};
const StatusPill = ({ text }) => {
  if (!text) return null;
  const { bg, color } = toneFor(text);
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px",
      borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: bg, color,
    }}>
      {text}
    </span>
  );
};

// ─── Shared tiny components ────────────────────────────────────────────────────
const LinkText = ({ href = "#", children }) => (
  <a
    href={href}
    style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}
    onClick={e => e.preventDefault()}
  >
    {children}
  </a>
);

const ActionBtn = ({ icon = "eye", label, color = "#2979FF" }) => (
  <button style={{
    background: "none", border: "none", color,
    fontSize: 12, fontWeight: 600, cursor: "pointer",
    padding: "4px 6px", fontFamily: "inherit", borderRadius: 5,
    display: "inline-flex", alignItems: "center", gap: 5,
  }}>
    <DynamicIcon name={icon} size={12} color={color} /> {label}
  </button>
);

const ConfirmBtn = () => (
  <button style={{
    padding: "4px 12px", border: "1px solid #D1D5DB", borderRadius: 6,
    background: "#fff", fontSize: 11, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", color: "#374151",
    display: "inline-flex", alignItems: "center", gap: 4,
  }}>
    Confirm Status
  </button>
);

// ─── Base table wrapper ────────────────────────────────────────────────────────
const StyledTable = ({ headers, rows, renderRow }) => (
  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
    <thead>
      <tr>{headers.map((h, i) => <th key={i} style={TH}>{h}</th>)}</tr>
    </thead>
    <tbody>{rows.map((r, i) => renderRow(r, i))}</tbody>
  </table>
);

// ─── Per-column table renderers ────────────────────────────────────────────────
const RfpAnalysisTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Pre-Bid Date","Pre-Bid Time","Pre-Bid Venue","Actions"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.deadline}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDMeta   bg={bg}>{r.preBidDate}</TDMeta>
          <TDMeta   bg={bg}>{r.preBidTime}</TDMeta>
          <td style={cell(bg)}>
            {r.venue} / <LinkText>(Link)</LinkText>
          </td>
          <TDAction bg={bg}><ActionBtn label="View RFP Form" /></TDAction>
        </tr>
      );
    }}
  />
);

const AwaitingApprovalTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Actions"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.deadline}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}><ActionBtn label="View RFP Form" /></TDAction>
        </tr>
      );
    }}
  />
);

const AlertNotifyTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Notified Teams","Remarks","Actions"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.deadline}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDText   bg={bg}>{r.notifiedTeams}</TDText>
          <TDAction bg={bg}><ActionBtn label="View Remarks" /></TDAction>
          <TDAction bg={bg}><ActionBtn label="View RFP Form" /></TDAction>
        </tr>
      );
    }}
  />
);

const ApprovedPreBidTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Documents","Actions"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.deadline}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDText   bg={bg}>{r.documents}</TDText>
          <TDAction bg={bg}><ActionBtn icon={r.actionIcon} label={r.actionLabel} /></TDAction>
        </tr>
      );
    }}
  />
);

const BidSubmittedTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Actions"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.deadline}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}><ActionBtn icon="file" label="View Docs" /></TDAction>
        </tr>
      );
    }}
  />
);

const QueryResponseTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Due Date","Due Time","Firm Name","Query PDF","Status","Actions"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.dueDate}</TDMeta>
          <TDMeta   bg={bg}>{r.dueTime}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><ActionBtn label="View PDF" /></TDAction>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}><ActionBtn label={r.actionLabel} /></TDAction>
        </tr>
      );
    }}
  />
);

const ResultAwaitedTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Date Submitted","Firm Name","Status","Result"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDMeta   bg={bg}>{r.dateSubmitted}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}>
            {r.resultType === "confirm"
              ? <ConfirmBtn />
              : <StatusPill text="Won" />}
          </TDAction>
        </tr>
      );
    }}
  />
);

const WonTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}>
            {r.actionLabel ? <ActionBtn label={r.actionLabel} /> : <span style={{ color: "#9CA3AF" }}>—</span>}
          </TDAction>
        </tr>
      );
    }}
  />
);

const PoReceivedTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      const actionColor = r.variant === "success" ? "#15803D" : "#2979FF";
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}>
            <ActionBtn icon={r.actionIcon} label={r.actionLabel} color={actionColor} />
          </TDAction>
        </tr>
      );
    }}
  />
);

const LostTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action 1","Action 2"]}
    rows={rows}
    renderRow={(r, i) => {
      const bg = rowBg(r.variant, i);
      return (
        <tr key={i}>
          <TDId     bg={bg}>{r.id}</TDId>
          <TDText   bg={bg}>{r.title}</TDText>
          <TDText   bg={bg}>{r.customer}</TDText>
          <TDMeta   bg={bg}>{r.value}</TDMeta>
          <TDText   bg={bg}>{r.firm}</TDText>
          <TDAction bg={bg}><StatusPill text={r.status} /></TDAction>
          <TDAction bg={bg}><ActionBtn icon={r.action1Icon} label={r.action1} /></TDAction>
          <TDAction bg={bg}><ActionBtn icon={r.action2Icon} label={r.action2} /></TDAction>
        </tr>
      );
    }}
  />
);

// ─── Column → renderer map ─────────────────────────────────────────────────────
const TABLE_MAP = {
  rfp_analysis:      RfpAnalysisTable,
  awaiting_approval: AwaitingApprovalTable,
  alert_notify:      AlertNotifyTable,
  approved:          ApprovedPreBidTable,
  bid_submitted:     BidSubmittedTable,
  query_response:    QueryResponseTable,
  result_awaited:    ResultAwaitedTable,
  won:               WonTable,
  po_received:       PoReceivedTable,
  lost:              LostTable,
};

// ─── Modal shell ───────────────────────────────────────────────────────────────
const ViewAllModal = ({ col, onClose }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!col?.id) { setRows([]); return; }
    getViewAllRows(col.id).then(setRows);
  }, [col?.id]);

  if (!col) return null;
  const Content = TABLE_MAP[col.id];

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
        position: "relative", background: "#F8FAFC", borderRadius: 14,
        width: "min(94vw, 1200px)", maxHeight: "82vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(0,0,0,0.20)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid #E5E7EB",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#fff", flexShrink: 0,
        }}>
          <div>
            <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              View All
            </p>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{col.title}</span>
          </div>
          <button onClick={onClose} style={{
            background: "#F3F4F6", border: "none", borderRadius: 8,
            width: 32, height: 32, color: "#6B7280", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Table card */}
        <div style={{
          overflowX: "auto", overflowY: "auto", flex: 1,
          background: "#fff", margin: 16, borderRadius: 10,
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          {Content
            ? <Content rows={rows} />
            : <p style={{ padding: 24, color: "#9CA3AF", fontSize: 13 }}>No table defined for this column.</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewAllModal;
