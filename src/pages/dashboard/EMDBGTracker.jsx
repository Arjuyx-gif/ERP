import { useState } from "react";
import { Search, Filter, ChevronDown, Eye, Download, X, Plus } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import DynamicIcon from "../../components/ui/DynamicIcon";

const FONT = "'Inter','Segoe UI',sans-serif";

const KPI_CARDS = [
  { label: "Total Entries",      value: 3, iconName: "document", color: "#2563EB", iconBg: "#EFF6FF" },
  { label: "Pending Submission", value: 1, iconName: "clock",    color: "#F97316", iconBg: "#FFF7ED" },
  { label: "Submitted",          value: 1, iconName: "check-circle", color: "#16A34A", iconBg: "#F0FDF4" },
  { label: "Expiring Soon",      value: "-", iconName: "alert",  color: "#DC2626", iconBg: "#FEF2F2" },
  { label: "Delayed Orders",     value: 0, iconName: "refresh",  color: "#6B7280", iconBg: "#F3F4F6" },
];

const TYPE_PILL = { BG: { bg: "#F3E8FF", color: "#7C3AED" }, EMD: { bg: "#F3E8FF", color: "#7C3AED" } };
const EXPIRY_PILL = { "On Track": { bg: "#DCFCE7", color: "#16A34A" }, "Expired": { bg: "#FEE2E2", color: "#DC2626" } };
const RETURN_PILL = { Pending: { bg: "#FFF7ED", color: "#EA580C" }, Completed: { bg: "#DCFCE7", color: "#16A34A" } };
const SUBMISSION_PILL = { Submitted: { bg: "#DBEAFE", color: "#1D4ED8" }, "Not Submitted": { bg: "#F3F4F6", color: "#6B7280" } };

const ROWS = [
  {
    sr: 1, orderNo: "ORD-2026-001", requestDate: "05-02-2026", type: "BG", salesPerson: "Person Name", teamLeader: "Name", firm: "FIRM Name", bidDueDate: "25-01-2026",
    description: "Full Description of the order", customerDept: "Customer/Dept Name", beneficiary: "Details", inFormOf: "Bank Guarantee", bank: "Bank Name", status: "Status",
    ddBgNo: "BG2025AX009676", ddBgDate: "01-02-2026", amount: "Amount",
    expiryDt: "31-05-2026", expiryStatus: "On Track", amendmentDate: "-", finalExpiryDt: "31-05-2026", claimExpiry: "15-06-2026",
    bgReturnStatus: "Pending", previousAmount: "-", pid: "PID Number", bgSubmissionStatus: "Submitted", bgSubmissionRemarks: "Remarks.......",
    bgReceiving: "-", bgReturnDate: "-", bgReturnRemarks: "-", letterToDeptDated: "-",
    amendments: 1,
  },
  {
    sr: 2, orderNo: "BID-2026-045", requestDate: "10-02-2026", type: "EMD", salesPerson: "Person Name", teamLeader: "Name", firm: "FIRM Name", bidDueDate: "20-02-2026",
    description: "Full Description of the order", customerDept: "Customer/Dept Name", beneficiary: "Details", inFormOf: "Bank Guarantee", bank: "Bank Name", status: "Status",
    ddBgNo: "BG2025AX009676", ddBgDate: "12-02-2026", amount: "Amount",
    expiryDt: "20-06-2026", expiryStatus: "On Track", amendmentDate: "-", finalExpiryDt: "20-06-2026", claimExpiry: "15-05-2026",
    bgReturnStatus: "Pending", previousAmount: "-", pid: "PID Number", bgSubmissionStatus: "Submitted", bgSubmissionRemarks: "Remarks.......",
    bgReceiving: "-", bgReturnDate: "-", bgReturnRemarks: "-", letterToDeptDated: "-",
    amendments: 1,
  },
  {
    sr: 3, orderNo: "ORD-2026-078", requestDate: "10-12-2026", type: "BG", salesPerson: "Person Name", teamLeader: "Name", firm: "FIRM Name", bidDueDate: "25-11-2025",
    description: "Full Description of the order", customerDept: "Customer/Dept Name", beneficiary: "Details", inFormOf: "Bank Guarantee", bank: "Bank Name", status: "Status",
    ddBgNo: "BG2025AX009676", ddBgDate: "05-12-2025", amount: "Amount",
    expiryDt: "28-02-2026", expiryStatus: "Expired", amendmentDate: "-", finalExpiryDt: "28-02-2026", claimExpiry: "15-03-2026",
    bgReturnStatus: "Completed", previousAmount: "-", pid: "PID Number", bgSubmissionStatus: "Submitted", bgSubmissionRemarks: "Remarks.......",
    bgReceiving: "Received from client", bgReturnDate: "20-03-2026", bgReturnRemarks: "BG returned after project completion", letterToDeptDated: "20-03-2026",
    amendments: 1,
  },
  {
    sr: 4, orderNo: "BID-2025-234", requestDate: "18-02-2026", type: "EMD", salesPerson: "Person Name", teamLeader: "Name", firm: "FIRM Name", bidDueDate: "28-02-2026",
    description: "Full Description of the order", customerDept: "Customer/Dept Name", beneficiary: "Details", inFormOf: "Bank Guarantee", bank: "Bank Name", status: "Status",
    ddBgNo: "BG2025AX009676", ddBgDate: "-", amount: "Amount",
    expiryDt: "30-03-2026", expiryStatus: "Expired", amendmentDate: "-", finalExpiryDt: "30-03-2026", claimExpiry: "10-04-2026",
    bgReturnStatus: "-", previousAmount: "-", pid: "PID Number", bgSubmissionStatus: "Not Submitted", bgSubmissionRemarks: "Remarks.......",
    bgReceiving: "-", bgReturnDate: "-", bgReturnRemarks: "-", letterToDeptDated: "-",
    amendments: 0,
  },
];

const Pill = ({ text, map }) => {
  const p = map[text];
  if (!p) return <span style={{ color: "#9CA3AF" }}>{text}</span>;
  return <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: p.bg, color: p.color }}>{text}</span>;
};

const FilterDropdown = ({ label, value }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "9px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
    background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
    whiteSpace: "nowrap",
  }}>
    {value ? `${label}: ${value}` : label} <ChevronDown size={14} color="#6B7280" />
  </div>
);

// ── Compact table (main page) ───────────────────────────────────────────────────
const CompactTable = () => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
    <table style={{ width: "100%", minWidth: 900, borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th colSpan={8} style={{ padding: "10px 16px", fontSize: 12, fontWeight: 700, color: "#374151", textAlign: "right", background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
            BASIC DETAILS
          </th>
        </tr>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
          {["SR NO", "ORDER NO. / BID NO.", "REQUEST DATE", "TYPE", "SALES PERSON", "TEAM LEADER", "FIRM", "BID DUE DATE"].map(col => (
            <th key={col} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#667085", textAlign: "center", whiteSpace: "nowrap" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(row => (
          <tr key={row.sr} style={{ borderBottom: "1px solid #F2F4F7" }}>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.sr}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center" }}>{row.orderNo}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#344054", textAlign: "center", whiteSpace: "nowrap" }}>{row.requestDate}</td>
            <td style={{ padding: "14px 16px", textAlign: "center" }}><Pill text={row.type} map={TYPE_PILL} /></td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.salesPerson}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.teamLeader}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.firm}</td>
            <td style={{ padding: "14px 16px", fontSize: 13, color: "#344054", textAlign: "center", whiteSpace: "nowrap" }}>{row.bidDueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Full grouped table (fullscreen "View") ─────────────────────────────────────
const GROUPS = [
  { title: "BASIC DETAILS", color: "#F8FAFC", accent: "#374151", cols: [
    ["SR NO", "sr", 60], ["ORDER NO. / BID NO.", "orderNo", 120], ["REQUEST DATE", "requestDate", 110],
    ["TYPE", "type", 70], ["SALES PERSON", "salesPerson", 110], ["TEAM LEADER", "teamLeader", 100],
    ["FIRM", "firm", 100], ["BID DUE DATE", "bidDueDate", 110],
  ]},
  { title: "BG / EMD FINANCIAL DETAILS", color: "#EFF6FF", accent: "#1D4ED8", cols: [
    ["ORDER/BID DESCRIPTION", "description", 180], ["CUSTOMER/DEPARTMENT NAME", "customerDept", 160],
    ["BENEFICIARY DETAILS", "beneficiary", 130], ["IN FORM OF", "inFormOf", 120], ["BANK", "bank", 110],
    ["STATUS", "status", 90], ["DD/BG NO.", "ddBgNo", 140], ["DD/BG DATE", "ddBgDate", 110], ["AMOUNT", "amount", 90],
  ]},
  { title: "VALIDITY & AMENDMENTS", color: "#F0FDF4", accent: "#16A34A", cols: [
    ["EXPIRY DT", "expiryDt", 130], ["AMENDMENT DATE", "amendmentDate", 130], ["FINAL EXPIRY DT", "finalExpiryDt", 130], ["CLAIM EXPIRY", "claimExpiry", 110],
  ]},
  { title: "BG TRACKING STATUS", color: "#FFF7ED", accent: "#EA580C", cols: [
    ["BG RETURN STATUS", "bgReturnStatus", 130], ["PREVIOUS AMOUNT", "previousAmount", 120], ["PID", "pid", 110],
    ["BG SUBMISSION STATUS", "bgSubmissionStatus", 140], ["BG SUBMISSION REMARKS", "bgSubmissionRemarks", 160],
  ]},
  { title: "RETURN & CLOSURE", color: "#FEF2F2", accent: "#DC2626", cols: [
    ["BG RECEIVING", "bgReceiving", 150], ["BG RETURN DATE", "bgReturnDate", 120], ["BG RETURN REMARKS", "bgReturnRemarks", 200], ["LETTER TO DEPT DATED", "letterToDeptDated", 140],
  ]},
];

const cellValue = (row, key, col) => {
  if (key === "type") return <Pill text={row.type} map={TYPE_PILL} />;
  if (key === "expiryDt") return <>{row.expiryDt} <Pill text={row.expiryStatus} map={EXPIRY_PILL} /></>;
  if (key === "bgReturnStatus") return <Pill text={row.bgReturnStatus} map={RETURN_PILL} />;
  if (key === "bgSubmissionStatus") return <Pill text={row.bgSubmissionStatus} map={SUBMISSION_PILL} />;
  return row[key];
};

const FullTable = () => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
    <table style={{ borderCollapse: "collapse", minWidth: 2400 }}>
      <thead>
        <tr>
          {GROUPS.map(g => (
            <th key={g.title} colSpan={g.cols.length} style={{
              padding: "10px 16px", fontSize: 11, fontWeight: 700, color: g.accent,
              textAlign: "center", background: g.color, borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap",
            }}>{g.title}</th>
          ))}
          <th style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#374151", textAlign: "center", background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>ACTION</th>
        </tr>
        <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
          {GROUPS.flatMap(g => g.cols).map(([label, key, width]) => (
            <th key={key} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#667085", textAlign: "center", whiteSpace: "nowrap", width, minWidth: width, background: "#fff" }}>{label}</th>
          ))}
          <th style={{ padding: "10px 14px", background: "#fff" }} />
        </tr>
      </thead>
      <tbody>
        {ROWS.map(row => (
          <tr key={row.sr} style={{ borderBottom: "1px solid #F2F4F7" }}>
            {GROUPS.flatMap(g => g.cols).map(([, key]) => (
              <td key={key} style={{ padding: "13px 14px", fontSize: 12, color: "#344054", textAlign: "center", whiteSpace: "nowrap" }}>
                {cellValue(row, key)}
              </td>
            ))}
            <td style={{ padding: "13px 14px", textAlign: "center", whiteSpace: "nowrap" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "#2563EB", fontWeight: 500 }}>
                {row.amendments > 0 && <Eye size={13} color="#6B7280" />}
                <Plus size={12} /> Amendment{row.amendments > 0 ? ` - ${row.amendments}` : ""}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EMDBGTracker = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "20px 28px 0" }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>Outstanding EMD / BG Tracker</h1>
            <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Last updated: 2 hours ago</p>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
                  <Search size={15} color="#aaa" />
                </span>
                <input
                  type="text" placeholder="Search by Order No / PID / Customer"
                  style={{
                    width: "100%", padding: "9px 14px 9px 36px",
                    border: "1px solid #E2E8F0", borderRadius: 8,
                    fontSize: 13, color: "#333", background: "#fff",
                    outline: "none", fontFamily: FONT, boxSizing: "border-box",
                  }}
                />
              </div>
              <Filter size={16} color="#6B7280" />
              <FilterDropdown label="Type" value="ALL" />
              <FilterDropdown label="Firm" value="ALL" />
              <FilterDropdown label="Submission Status" />
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ margin: "0 28px 20px", padding: 20, background: "#F1F5F9", borderRadius: 12 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {KPI_CARDS.map(kpi => (
                <div key={kpi.label} style={{
                  flex: "1 1 160px", background: "#fff", borderRadius: 12,
                  padding: "20px 18px", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", background: kpi.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <DynamicIcon name={kpi.iconName} size={20} color={kpi.color} />
                  </div>
                  <span style={{ fontSize: 13, color: "#667085" }}>{kpi.label}</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{kpi.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: "0 28px 12px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowAll(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: FONT,
              }}
            >
              <Eye size={14} /> View
            </button>
          </div>

          <div style={{ margin: "0 28px 28px" }}>
            <CompactTable />
          </div>
        </div>
      </div>

      {/* ── Fullscreen grouped table ── */}
      {showAll && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
          display: "flex", flexDirection: "column", fontFamily: FONT,
        }}>
          <div style={{
            padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Outstanding EMD / BG Tracker</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>Full record view</p>
            </div>
            <button onClick={() => setShowAll(false)} style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: 8, cursor: "pointer", display: "flex",
            }}>
              <X size={16} color="#555" />
            </button>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "20px 28px 8px" }}>
            <FullTable />
          </div>

          <div style={{ padding: "12px 28px 20px", display: "flex", justifyContent: "flex-end", gap: 16, flexShrink: 0 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#2563EB", cursor: "pointer", fontFamily: FONT }}>
              <Download size={14} /> Download
            </button>
            <button onClick={() => setShowAll(false)} style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#6B7280", cursor: "pointer", fontFamily: FONT }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMDBGTracker;
