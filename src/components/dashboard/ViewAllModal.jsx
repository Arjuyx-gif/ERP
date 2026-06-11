// src/pages/dashboard/ViewAllModal.jsx
import { useState, useEffect } from "react";

// ─── Mock row generator (replace with real service call) ──────────────────────
const MOCK_ROWS = {
  rfp_analysis: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", preBidDate:"Today",  preBidTime:"2:00 P.M", venue:"Venue", venueLink:"#", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", preBidDate:"Date",   preBidTime:"Time",     venue:"Venue", venueLink:"#" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", preBidDate:"Date",   preBidTime:"Time",     venue:"Venue", venueLink:"#" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", preBidDate:"Date",   preBidTime:"Time",     venue:"Venue", venueLink:"#" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", preBidDate:"Date",   preBidTime:"Time",     venue:"Venue", venueLink:"#" },
  ],
  awaiting_approval: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"MD Office - Approval Waiting", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"Approval Pending" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"Approval Pending" },
  ],
  alert_notify: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", notifiedTeams:"Pre-sales, Accounts", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", notifiedTeams:"Pre-sales, Sales-coordinator, Accounts" },
  ],
  approved: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"In Progress", documents:"OEM Docs Pending", actionIcon:"✅", actionLabel:"Complete Tasks", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"In Progress", documents:"EMD Pending",      actionIcon:"✅", actionLabel:"Complete Tasks" },
  ],
  bid_submitted: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"Bid Submitted", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", deadline:"25/04/2026", firm:"Firm Name", status:"Bid Submitted" },
  ],
  query_response: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", dueDate:"25/04/2026", dueTime:"2:00 PM", firm:"Firm Name", status:"Docs Pending", actionLabel:"Complete Tasks", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", dueDate:"25/04/2026", dueTime:"Time",    firm:"Firm Name", status:"Docs Pending", actionLabel:"Complete Tasks" },
  ],
  result_awaited: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", dateSubmitted:"25/04/2026", firm:"Firm Name", status:"Result Awaited", resultType:"confirm", variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", dateSubmitted:"25/04/2026", firm:"Firm Name", status:"Result Awaited", resultType:"won",     variant:"success" },
  ],
  won: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", firm:"Firm Name", status:"PO Awaiting",  actionLabel:"PO Received",  variant:"warning" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", firm:"Firm Name", status:"Bid Cancelled",actionLabel:"View Details",  variant:"error" },
  ],
  po_received: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", firm:"Firm Name", status:"PO Received", actionIcon:"📤", actionLabel:"Upload PO", variant:"success" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", firm:"Firm Name", status:"PO Received", actionIcon:"📤", actionLabel:"Upload PO" },
  ],
  lost: [
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", firm:"Firm Name", status:"Lost", action1:"Notify for EMD Return", action1Icon:"🔔", action2:"View Comparison Sheet", action2Icon:"👁", variant:"error" },
    { id:"TND-2026-045", title:"Tender Title", customer:"Customer Name", value:"₹2 Cr.", firm:"Firm Name", status:"Lost", action1:"Notify for EMD Return", action1Icon:"🔔", action2:"View Comparison Sheet", action2Icon:"👁" },
  ],
};

const getRows = (colId) => Promise.resolve(MOCK_ROWS[colId] ?? []);

// ─── Row highlight colours ─────────────────────────────────────────────────────
const ROW_BG = {
  warning: "#FDF3E7",   // warm beige  — today / urgent
  success: "#F1FDF4",   // soft green  — won
  error:   "#FFF0F0",   // soft red    — lost / cancelled
  default: "#ffffff",
};

// ─── Shared style tokens ───────────────────────────────────────────────────────
const TH = {
  padding: "13px 16px",
  fontSize: 13,
  fontWeight: 600,
  color: "#444",
  background: "#fff",
  borderBottom: "1.5px solid #E2E8F0",
  borderRight: "1px solid #E2E8F0",
  textAlign: "center",
  whiteSpace: "nowrap",
};
const TD = (highlight) => ({
  padding: "12px 16px",
  fontSize: 13,
  color: "#333",
  borderBottom: "1px solid #EAECF0",
  borderRight: "1px solid #EAECF0",
  textAlign: "center",
  background: ROW_BG[highlight] ?? ROW_BG.default,
  whiteSpace: "nowrap",
});

// ─── Tiny reusable bits ────────────────────────────────────────────────────────
const LinkText = ({ href = "#", children }) => (
  <a href={href} style={{ color: "#2979FF", fontWeight: 600, textDecoration: "none" }}
    onClick={e => e.preventDefault()}>{children}</a>
);

const ActionBtn = ({ icon = "👁", label, color = "#2979FF" }) => (
  <button style={{
    background: "none", border: "none", color, fontSize: 13, fontWeight: 600,
    cursor: "pointer", padding: 0, fontFamily: "inherit",
    display: "inline-flex", alignItems: "center", gap: 5,
  }}>
    <span>{icon}</span>{label}
  </button>
);

const ConfirmBtn = () => (
  <button style={{
    padding: "5px 12px", border: "1px solid #E2E8F0", borderRadius: 6,
    background: "#fff", fontSize: 12, cursor: "pointer",
    fontFamily: "inherit", color: "#333",
  }}>Confirm Status</button>
);

// ─── Column-specific tables ────────────────────────────────────────────────────

const StyledTable = ({ headers, rows, renderRow }) => (
  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
    <thead>
      <tr style={{ background: "#fff" }}>
        {headers.map((h, i) => (
          <th key={i} style={{ ...TH, borderLeft: i === 0 ? "1px solid #E2E8F0" : "none" }}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => renderRow(r, i))}
    </tbody>
  </table>
);

const RfpAnalysisTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Pre-Bid Date","Pre-Bid Time","Pre-Bid Venue","Actions"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","deadline","firm","preBidDate","preBidTime"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}>
          {r.venue}/ <LinkText href={r.venueLink}>(Link)</LinkText>
        </td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}>
          <ActionBtn label="View RFP Form" />
        </td>
      </tr>
    )}
  />
);

const AwaitingApprovalTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Actions"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","deadline","firm"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), fontWeight: 600, borderLeft: "none" }}>{r.status}</td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn label="View RFP Form" /></td>
      </tr>
    )}
  />
);

const AlertNotifyTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Notified Teams","Remarks","Actions"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","deadline","firm","notifiedTeams"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn label="View Remarks" /></td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn label="View RFP Form" /></td>
      </tr>
    )}
  />
);

const ApprovedPreBidTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Documents","Actions"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","deadline","firm","status","documents"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}>
          <ActionBtn icon={r.actionIcon} label={r.actionLabel} />
        </td>
      </tr>
    )}
  />
);

const BidSubmittedTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Deadline","Firm Name","Status","Actions"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","deadline","firm","status"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn icon="📄" label="View Docs" /></td>
      </tr>
    )}
  />
);

const QueryResponseTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Due Date","Due Time","Firm Name","Query PDF","Status","Actions"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","dueDate","dueTime","firm"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn label="View PDF" /></td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}>{r.status}</td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn label={r.actionLabel} /></td>
      </tr>
    )}
  />
);

const ResultAwaitedTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Date Submitted","Firm Name","Status","Result"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","dateSubmitted","firm","status"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), fontWeight: 600, borderLeft: "none" }}>
          {r.resultType === "confirm" ? <ConfirmBtn /> : <span style={{ color: "#2E7D32" }}>Won</span>}
        </td>
      </tr>
    )}
  />
);

const WonTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","firm","status"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}>
          {r.actionLabel ? <ActionBtn label={r.actionLabel} /> : "—"}
        </td>
      </tr>
    )}
  />
);

const PoReceivedTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","firm"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), fontWeight: 500, borderLeft: "none" }}>{r.status}</td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}>
          <ActionBtn icon={r.actionIcon} label={r.actionLabel} color={r.variant === "success" ? "#2E7D32" : "#2979FF"} />
        </td>
      </tr>
    )}
  />
);

const LostTable = ({ rows }) => (
  <StyledTable
    headers={["Tender ID","Tender Title","Customer","Value","Firm Name","Status","Action 1","Action 2"]}
    rows={rows}
    renderRow={(r, i) => (
      <tr key={i}>
        {["id","title","customer","value","firm","status"].map((k, ci) => (
          <td key={k} style={{ ...TD(r.variant), borderLeft: ci === 0 ? "1px solid #EAECF0" : "none" }}>{r[k]}</td>
        ))}
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn icon={r.action1Icon} label={r.action1} /></td>
        <td style={{ ...TD(r.variant), borderLeft: "none" }}><ActionBtn icon={r.action2Icon} label={r.action2} /></td>
      </tr>
    )}
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
    getRows(col.id).then(setRows);
  }, [col?.id]);

  if (!col) return null;
  const Content = TABLE_MAP[col.id];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1100,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      background: "rgba(0,0,0,0.25)",
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      {/* Click-outside */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0 }} />

      <div style={{
        position: "relative", background: "#f5f6fa", borderRadius: 14,
        width: "min(94vw, 1200px)", maxHeight: "82vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        overflow: "hidden",
      }}>
        {/* Modal header */}
        <div style={{
          padding: "18px 24px 16px", borderBottom: "1px solid #E2E8F0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#fff", flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>
            List layout tender list
          </span>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 24,
            color: "#555", cursor: "pointer", lineHeight: 1, padding: 0,
          }}>×</button>
        </div>

        {/* Table area */}
        <div style={{
          overflowX: "auto", overflowY: "auto", flex: 1,
          background: "#fff", margin: 16, borderRadius: 10,
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        }}>
          {Content
            ? <Content rows={rows} />
            : <p style={{ padding: 24, color: "#888", fontSize: 13 }}>No table defined for this column.</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewAllModal;