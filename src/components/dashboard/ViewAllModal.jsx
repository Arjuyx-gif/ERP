// ─── ViewAllModal ──────────────────────────────────────────────────────────────
// Renders a blurred-backdrop modal with a per-column table.
// Row data is fetched through the service layer — no direct mockData imports.

import { useState, useEffect } from "react";
import { getViewAllRows } from "../../services/dashboardService";

// ─── Variant → visual style map ───────────────────────────────────────────────
// Colour decisions stay in the UI layer; data only carries semantic intent.
const VARIANT = {
  success: { rowBg: "#F1FDF4", textColor: "#2E7D32" },
  error:   { rowBg: "#FFF0F0", textColor: "#C62828" },
  warning: { rowBg: "#FFFDE7", textColor: "#F57F17" },
  default: { rowBg: "#ffffff", textColor: "#333333" },
};
const v = variant => VARIANT[variant] ?? VARIANT.default;

// ─── Shared table micro-styles ────────────────────────────────────────────────
const cellS = {
  padding: "10px 14px", fontSize: 12.5, color: "#333",
  borderBottom: "1px solid #EAECF0", whiteSpace: "nowrap",
};
const headS = {
  padding: "10px 14px", fontSize: 11.5, fontWeight: 600, color: "#888",
  background: "#F8FAFC", borderBottom: "1px solid #E2E8F0",
  textAlign: "left", whiteSpace: "nowrap",
};

// ─── Reusable sub-components ──────────────────────────────────────────────────
const ActionBtn = ({ icon = "👁", label, color = "#2979FF" }) => (
  <button style={{
    background: "none", border: "none", color, fontSize: 12, fontWeight: 600,
    cursor: "pointer", padding: 0, fontFamily: "inherit",
    display: "inline-flex", alignItems: "center", gap: 4,
  }}>
    {icon} {label}
  </button>
);

const Table = ({ headers, children }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>{headers.map(h => <th key={h} style={headS}>{h}</th>)}</tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

// ─── Per-column table renderers ───────────────────────────────────────────────
// Each renderer accepts `rows` from the service layer. Shape details are in
// VIEW_ALL_ROWS (mockData.js) — swap the source without touching these renderers.

const RfpAnalysisTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Pre-Bid Date","Pre-Bid Time","Pre-Bid Venue","Actions"]}>
    {rows.map((r, i) => (
      <tr key={i} style={{ background: v(r.variant).rowBg }}>
        <td style={cellS}>{r.id}</td>
        <td style={cellS}>{r.title}</td>
        <td style={cellS}>{r.customer}</td>
        <td style={cellS}>{r.value}</td>
        <td style={cellS}>{r.deadline}</td>
        <td style={cellS}>{r.firm}</td>
        <td style={cellS}>{r.preBidDate}</td>
        <td style={cellS}>{r.preBidTime}</td>
        <td style={cellS}><span style={{ color: "#2979FF" }}>{r.venue}</span></td>
        <td style={cellS}><ActionBtn label="View RFP Form" /></td>
      </tr>
    ))}
  </Table>
);

const AwaitingApprovalTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Actions"]}>
    {rows.map((r, i) => {
      const { rowBg, textColor } = v(r.variant);
      const cs = { ...cellS, color: r.variant !== "default" && r.variant ? textColor : cellS.color };
      return (
        <tr key={i} style={{ background: rowBg }}>
          <td style={cs}>{r.id}</td>
          <td style={cs}>{r.title}</td>
          <td style={cs}>{r.customer}</td>
          <td style={cs}>{r.value}</td>
          <td style={cs}>{r.deadline}</td>
          <td style={cs}>{r.firm}</td>
          <td style={{ ...cs, fontWeight: 600 }}>{r.status}</td>
          <td style={cellS}><ActionBtn label="View RFP Form" /></td>
        </tr>
      );
    })}
  </Table>
);

const AlertNotifyTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Notified Teams","View Remarks","Actions"]}>
    {rows.map((r, i) => (
      <tr key={i} style={{ background: "#fff" }}>
        <td style={cellS}>{r.id}</td>
        <td style={cellS}>{r.title}</td>
        <td style={cellS}>{r.customer}</td>
        <td style={cellS}>{r.value}</td>
        <td style={cellS}>{r.deadline}</td>
        <td style={cellS}>{r.firm}</td>
        <td style={cellS}>{r.notifiedTeams}</td>
        <td style={cellS}><ActionBtn label="View Remarks" /></td>
        <td style={cellS}><ActionBtn label="View RFP Form" /></td>
      </tr>
    ))}
  </Table>
);

const ApprovedPreBidTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Documents","Actions"]}>
    {rows.map((r, i) => (
      <tr key={i} style={{ background: "#fff" }}>
        <td style={cellS}>{r.id}</td>
        <td style={cellS}>{r.title}</td>
        <td style={cellS}>{r.customer}</td>
        <td style={cellS}>{r.value}</td>
        <td style={cellS}>{r.deadline}</td>
        <td style={cellS}>{r.firm}</td>
        <td style={cellS}>{r.status}</td>
        <td style={cellS}>{r.documents}</td>
        <td style={cellS}><ActionBtn icon={r.actionIcon} label={r.actionLabel} /></td>
      </tr>
    ))}
  </Table>
);

const BidSubmittedTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Actions"]}>
    {rows.map((r, i) => (
      <tr key={i} style={{ background: "#fff" }}>
        <td style={cellS}>{r.id}</td>
        <td style={cellS}>{r.title}</td>
        <td style={cellS}>{r.customer}</td>
        <td style={cellS}>{r.value}</td>
        <td style={cellS}>{r.deadline}</td>
        <td style={cellS}>{r.firm}</td>
        <td style={cellS}>{r.status}</td>
        <td style={cellS}><ActionBtn icon="📄" label="View Docs" /></td>
      </tr>
    ))}
  </Table>
);

const QueryResponseTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Due Date","Due Time","Firm Name","Query & Response","Status","Actions"]}>
    {rows.map((r, i) => (
      <tr key={i} style={{ background: "#fff" }}>
        <td style={cellS}>{r.id}</td>
        <td style={cellS}>{r.title}</td>
        <td style={cellS}>{r.customer}</td>
        <td style={cellS}>{r.value}</td>
        <td style={cellS}>{r.dueDate}</td>
        <td style={cellS}>{r.dueTime}</td>
        <td style={cellS}>{r.firm}</td>
        <td style={cellS}><ActionBtn label="View PDF" /></td>
        <td style={cellS}>{r.status}</td>
        <td style={cellS}><ActionBtn icon="📄" label={r.actionLabel} /></td>
      </tr>
    ))}
  </Table>
);

const ConfirmStatusBtn = () => (
  <button style={{
    padding: "4px 10px", border: "1px solid #E2E8F0", borderRadius: 6,
    background: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: "#333",
  }}>
    Confirm Status
  </button>
);

const ResultAwaitedTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Date Submitted","Firm Name","Status","Result"]}>
    {rows.map((r, i) => {
      const { rowBg, textColor } = v(r.variant);
      const cs = r.variant === "success" ? { ...cellS, color: textColor } : cellS;
      return (
        <tr key={i} style={{ background: rowBg }}>
          <td style={cs}>{r.id}</td>
          <td style={cs}>{r.title}</td>
          <td style={cs}>{r.customer}</td>
          <td style={cs}>{r.value}</td>
          <td style={cellS}>{r.dateSubmitted}</td>
          <td style={cs}>{r.firm}</td>
          <td style={cellS}>{r.status}</td>
          <td style={{ ...cellS, fontWeight: r.resultType === "won" ? 700 : 400, color: r.resultType === "won" ? textColor : cellS.color }}>
            {r.resultType === "confirm" ? <ConfirmStatusBtn /> : "Won"}
          </td>
        </tr>
      );
    })}
  </Table>
);

const WonTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action"]}>
    {rows.map((r, i) => {
      const { rowBg, textColor } = v(r.variant);
      const colored = r.variant === "success";
      const cs = { ...cellS, color: colored ? textColor : cellS.color };
      return (
        <tr key={i} style={{ background: rowBg }}>
          <td style={cs}>{r.id}</td>
          <td style={cs}>{r.title}</td>
          <td style={cs}>{r.customer}</td>
          <td style={cs}>{r.value}</td>
          <td style={cs}>{r.firm}</td>
          <td style={{ ...cs, fontWeight: 500 }}>{r.status}</td>
          <td style={cellS}>{r.actionLabel ? <ActionBtn label={r.actionLabel} /> : "—"}</td>
        </tr>
      );
    })}
  </Table>
);

const PoReceivedTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action"]}>
    {rows.map((r, i) => {
      const { rowBg, textColor } = v(r.variant);
      const colored = r.variant === "success";
      const cs = { ...cellS, color: colored ? textColor : cellS.color };
      return (
        <tr key={i} style={{ background: rowBg }}>
          <td style={cs}>{r.id}</td>
          <td style={cs}>{r.title}</td>
          <td style={cs}>{r.customer}</td>
          <td style={cs}>{r.value}</td>
          <td style={cs}>{r.firm}</td>
          <td style={{ ...cs, fontWeight: 500 }}>{r.status}</td>
          <td style={cellS}>
            <ActionBtn icon={r.actionIcon} label={r.actionLabel} color={colored ? textColor : "#2979FF"} />
          </td>
        </tr>
      );
    })}
  </Table>
);

const LostTable = ({ rows }) => (
  <Table headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action","Action"]}>
    {rows.map((r, i) => (
      <tr key={i} style={{ background: "#fff" }}>
        <td style={cellS}>{r.id}</td>
        <td style={cellS}>{r.title}</td>
        <td style={cellS}>{r.customer}</td>
        <td style={cellS}>{r.value}</td>
        <td style={cellS}>{r.firm}</td>
        <td style={cellS}>{r.status}</td>
        <td style={cellS}><ActionBtn icon={r.action1Icon} label={r.action1} /></td>
        <td style={cellS}><ActionBtn icon={r.action2Icon} label={r.action2} /></td>
      </tr>
    ))}
  </Table>
);

// ─── Column id → table renderer map ──────────────────────────────────────────
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

// ─── Modal shell ──────────────────────────────────────────────────────────────
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
      {/* Click-outside backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0 }} />

      <div style={{
        position: "relative", background: "#fff", borderRadius: 12,
        width: "min(92vw, 1140px)", maxHeight: "80vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px 14px", borderBottom: "1px solid #EAECF0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{col.title}</span>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 22,
            color: "#888", cursor: "pointer", lineHeight: 1, padding: 0,
          }}>×</button>
        </div>

        {/* Scrollable table */}
        <div style={{ overflowX: "auto", overflowY: "auto", flex: 1 }}>
          {Content
            ? <Content rows={rows} />
            : <p style={{ padding: 20, color: "#888", fontSize: 13 }}>No table defined for this column.</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewAllModal;
