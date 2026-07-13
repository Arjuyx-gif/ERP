import { useState } from "react";
import { Search, Filter, ChevronDown, Eye, Download, X, ArrowUpDown } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const STATUS_PILL = {
  "Documents Pending": { bg: "#FFF1F0", color: "#DC2626" },
  "Awaiting Approval": { bg: "#FEF3C7", color: "#B45309" },
  "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
};
const EMD_PILL = {
  Pending: { bg: "#FEF3C7", color: "#B45309" },
  Submitted: { bg: "#DCFCE7", color: "#16A34A" },
};
const RESULT_PILL = {
  "Result Awaited": { bg: "#FEF3C7", color: "#B45309" },
  "Won (L1)": { bg: "#DCFCE7", color: "#16A34A" },
  Lost: { bg: "#FEE2E2", color: "#DC2626" },
  Cancelled: { bg: "#F3F4F6", color: "#6B7280" },
};

const PIPELINE_ROWS = [
  {
    id: 1, customer: "Customers Name", status: "Documents Pending", tenderId: "TDR-2026-001", tenderTitle: "Tender name/ Title",
    bidMgr: "Manager Name", emd: "₹4.2L", tenderFee: "₹8,000", processingFee: "₹3,000", dueDate: "22-04-2026", dueTime: "3:00 PM",
    firm: "Firm Name", emdRequest: "Pending", am: "Name", tl: "Team Leader Name", remarks: "EMD Document Incomplete", estimateBidValue: "₹4.2 Cr",
  },
  {
    id: 2, customer: "Customers Name", status: "Awaiting Approval", tenderId: "TDR-2026-001", tenderTitle: "Tender name/ Title",
    bidMgr: "Manager Name", emd: "₹1.8L", tenderFee: "₹4,500", processingFee: "₹1,500", dueDate: "25-04-2026", dueTime: "11:00 AM",
    firm: "Firm Name", emdRequest: "Pending", am: "Name", tl: "Team Leader Name", remarks: "-", estimateBidValue: "₹1.8 Cr",
  },
  {
    id: 3, customer: "Customers Name", status: "In Progress", tenderId: "TDR-2026-001", tenderTitle: "Tender name/ Title",
    bidMgr: "Manager Name", emd: "₹3L", tenderFee: "₹5,000", processingFee: "₹2,000", dueDate: "02-05-2026", dueTime: "4:00 PM",
    firm: "Firm Name", emdRequest: "Submitted", am: "Name", tl: "Team Leader Name", remarks: "Technical Evaluation Ongoing", estimateBidValue: "₹3 Cr",
  },
];

const PARTICIPATED_ROWS = [
  {
    id: 1, lob: "Name - Line of Business", customer: "Customers Name", refNo: "GeM/2026/B/001", description: "Tender name/ Title", category: "Manager Name",
    dueDate: "30-04-2026", bidValue: "₹5.2 Cr", salesRep: "Name", teamLead: "Team Leader Name", status: "Result Awaited", remarks: "Full Remark",
    bidMgr: "Manager Name", noOfBids: 1, additionalRemarks: "Team Leader Name",
  },
  {
    id: 2, lob: "Name - Line of Business", customer: "Customers Name", refNo: "GeM/2026/B/001", description: "Tender name/ Title", category: "Manager Name",
    dueDate: "15-04-2026", bidValue: "₹3 Cr", salesRep: "Name", teamLead: "Team Leader Name", status: "Won (L1)", remarks: "Full Remark",
    bidMgr: "Manager Name", noOfBids: 1, additionalRemarks: "Team Leader Name",
  },
  {
    id: 3, lob: "Name - Line of Business", customer: "Customers Name", refNo: "GeM/2026/B/001", description: "Tender name/ Title", category: "Manager Name",
    dueDate: "10-04-2026", bidValue: "₹1.2 Cr", salesRep: "Name", teamLead: "Team Leader Name", status: "Lost", remarks: "Full Remark",
    bidMgr: "Manager Name", noOfBids: 2, additionalRemarks: "Team Leader Name",
  },
  {
    id: 4, lob: "Name - Line of Business", customer: "Customers Name", refNo: "GeM/2026/B/001", description: "Tender name/ Title", category: "Manager Name",
    dueDate: "05-05-2026", bidValue: "₹4.5 Cr", salesRep: "Name", teamLead: "Team Leader Name", status: "Won (L1)", remarks: "Full Remark",
    bidMgr: "Manager Name", noOfBids: 2, additionalRemarks: "Team Leader Name",
  },
];

const Pill = ({ text, map }) => {
  const p = map[text];
  if (!p) return <span style={{ color: "#9CA3AF" }}>{text}</span>;
  return <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: p.bg, color: p.color, whiteSpace: "nowrap" }}>{text}</span>;
};

// ── Interactive filter dropdown ─────────────────────────────────────────────
const FilterDropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onMouseLeave={() => setIsOpen(false)}>
      <button
        onClick={() => setIsOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
          background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
          cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
        }}
      >
        {value ? `${label}: ${value}` : label} <ChevronDown size={14} color="#6B7280" />
      </button>
      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: 4,
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 20,
          minWidth: 160, overflow: "hidden",
        }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt === value ? "" : opt); setIsOpen(false); }}
              style={{
                padding: "9px 14px", fontSize: 13, cursor: "pointer",
                color: "#374151", background: opt === value ? "#EFF6FF" : "#fff",
              }}
              onMouseEnter={e => e.currentTarget.style.background = opt === value ? "#EFF6FF" : "#F3F4F6"}
              onMouseLeave={e => e.currentTarget.style.background = opt === value ? "#EFF6FF" : "#fff"}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const STATUS_FILTER_OPTIONS = ["Documents Pending", "Awaiting Approval", "In Progress"];
const EMD_FILTER_OPTIONS = ["Pending", "Submitted"];
const RESULT_FILTER_OPTIONS = ["Won", "Loss", "Cancelled"];

const resultMatches = (status, filter) => {
  if (!filter) return true;
  if (filter === "Won") return status.startsWith("Won");
  if (filter === "Loss") return status === "Lost";
  if (filter === "Cancelled") return status === "Cancelled";
  return true;
};

// ── Pipeline compact & full tables ──────────────────────────────────────────
const PIPELINE_COLS = [
  ["Name of Customer", "customer", 150], ["Status", "status", 150], ["Tender ID", "tenderId", 120], ["Tender Title", "tenderTitle", 150],
  ["BID MGR", "bidMgr", 120], ["EMD", "emd", 90], ["Tender Fee", "tenderFee", 100], ["Processing Fee", "processingFee", 110],
  ["Due Date", "dueDate", 110], ["Due Time", "dueTime", 90], ["Firm Name", "firm", 110], ["EMD Request", "emdRequest", 120],
  ["AM", "am", 90], ["TL", "tl", 130], ["Remarks", "remarks", 180], ["Estimate BID Value", "estimateBidValue", 130],
];

const pipelineCellValue = (row, key) => {
  if (key === "status") return <Pill text={row.status} map={STATUS_PILL} />;
  if (key === "emdRequest") return <Pill text={row.emdRequest} map={EMD_PILL} />;
  if (key === "tenderId") return <span style={{ color: "#2563EB", fontWeight: 600 }}>{row.tenderId}</span>;
  return row[key];
};

// Same column set is used both inline on the page and in the fullscreen "View".
const PipelineTable = ({ rows }) => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
    <table style={{ borderCollapse: "collapse", minWidth: PIPELINE_COLS.length * 130 }}>
      <thead>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
          {PIPELINE_COLS.map(([label, key, width]) => (
            <th key={key} style={{ padding: "12px 14px", fontSize: 11, fontWeight: 700, color: "#667085", textAlign: "center", whiteSpace: "nowrap", width, minWidth: width }}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
            {PIPELINE_COLS.map(([, key]) => (
              <td key={key} style={{ padding: "13px 14px", fontSize: 12, color: "#344054", textAlign: "center", whiteSpace: "nowrap" }}>{pipelineCellValue(row, key)}</td>
            ))}
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={PIPELINE_COLS.length} style={{ padding: 24, textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>No tenders match the selected filters.</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

// ── Participated table ───────────────────────────────────────────────────────
const PARTICIPATED_COLS = [
  ["LOB", "lob", 160], ["Name of Customer", "customer", 140], ["GeM/Tender Ref No.", "refNo", 130], ["Description", "description", 150],
  ["Category", "category", 120], ["Due Date", "dueDate", 110], ["Bid Value", "bidValue", 100], ["Sales Representative", "salesRep", 140],
  ["Team Lead", "teamLead", 130], ["Status", "status", 130], ["Remarks", "remarks", 130], ["Bid MGR", "bidMgr", 120],
  ["No of Bids", "noOfBids", 90], ["Additional Remarks", "additionalRemarks", 150],
];

const ParticipatedTable = ({ rows, onViewRow }) => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
    <table style={{ borderCollapse: "collapse", minWidth: (PARTICIPATED_COLS.length + 1) * 130 }}>
      <thead>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
          {PARTICIPATED_COLS.map(([label, key, width]) => (
            <th key={key} style={{ padding: "12px 14px", fontSize: 11, fontWeight: 700, color: "#667085", textAlign: "center", whiteSpace: "nowrap", width, minWidth: width }}>{label}</th>
          ))}
          <th style={{ padding: "12px 14px", fontSize: 11, fontWeight: 700, color: "#667085", textAlign: "center", whiteSpace: "nowrap" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
            {PARTICIPATED_COLS.map(([, key]) => (
              <td key={key} style={{ padding: "13px 14px", fontSize: 12, color: "#344054", textAlign: "center", whiteSpace: "nowrap" }}>
                {key === "status" ? <Pill text={row.status} map={RESULT_PILL} /> : row[key]}
              </td>
            ))}
            <td style={{ padding: "13px 14px", textAlign: "center", whiteSpace: "nowrap" }}>
              <button
                onClick={() => onViewRow?.(row)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, margin: "0 auto",
                  padding: "6px 12px", border: "1px solid #E2E8F0", borderRadius: 8,
                  background: "#fff", fontSize: 12, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                <Eye size={13} /> View
              </button>
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={PARTICIPATED_COLS.length + 1} style={{ padding: 24, textAlign: "center", fontSize: 13, color: "#9CA3AF" }}>No bids match the selected filters.</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

// ── Fullscreen overlay wrapper (shared by both tabs) ────────────────────────
const FullScreenView = ({ title, subtitle, onClose, children }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
    display: "flex", flexDirection: "column", fontFamily: FONT,
  }}>
    <div style={{
      padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
    }}>
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>{title}</h2>
        <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>{subtitle}</p>
      </div>
      <button onClick={onClose} style={{
        background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
        padding: 8, cursor: "pointer", display: "flex",
      }}>
        <X size={16} color="#555" />
      </button>
    </div>

    <div style={{ flex: 1, overflow: "auto", padding: "20px 28px 8px" }}>
      {children}
    </div>

    <div style={{ padding: "12px 28px 20px", display: "flex", justifyContent: "flex-end", gap: 16, flexShrink: 0 }}>
      <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#2563EB", cursor: "pointer", fontFamily: FONT }}>
        <Download size={14} /> Download
      </button>
      <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#6B7280", cursor: "pointer", fontFamily: FONT }}>
        Close
      </button>
    </div>
  </div>
);

const TenderTracker = () => {
  const [activeTab, setActiveTab] = useState("Bids in Pipeline");
  const [showAll, setShowAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [emdFilter, setEmdFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(false);

  const pipelineRows = PIPELINE_ROWS.filter(r =>
    (!statusFilter || r.status === statusFilter) &&
    (!emdFilter || r.emdRequest === emdFilter)
  );

  const parseDate = d => {
    const [dd, mm, yyyy] = d.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`).getTime();
  };

  const participatedRows = PARTICIPATED_ROWS
    .filter(r => resultMatches(r.status, resultFilter))
    .sort((a, b) => (sortDesc ? parseDate(b.dueDate) - parseDate(a.dueDate) : parseDate(a.dueDate) - parseDate(b.dueDate)));

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Header */}
          <div style={{ padding: "20px 28px 0" }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>Tender Tracker</h1>
            <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Track all tenders from pipeline to participation</p>

            {/* Search + filters */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
              <FilterDropdown label="Status" value={statusFilter} options={STATUS_FILTER_OPTIONS} onChange={setStatusFilter} />
              <FilterDropdown label="EMD Request" value={emdFilter} options={EMD_FILTER_OPTIONS} onChange={setEmdFilter} />
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #E5E7EB" }}>
              {["Bids in Pipeline", "Participated Bids"].map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setShowAll(false); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer", fontFamily: FONT,
                    padding: "0 0 10px", fontSize: 14, fontWeight: 600,
                    color: activeTab === tab ? "#111" : "#9CA3AF",
                    borderBottom: activeTab === tab ? "2px solid #111" : "2px solid transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Bids in Pipeline" ? (
            <div style={{ padding: "20px 28px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>Bids in Pipeline ({pipelineRows.length})</h2>
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
              <PipelineTable rows={pipelineRows} />
            </div>
          ) : (
            <div style={{ padding: "20px 28px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Filter size={16} color="#6B7280" />
                  <FilterDropdown label="All Status" value={resultFilter} options={RESULT_FILTER_OPTIONS} onChange={setResultFilter} />
                  <div style={{ width: 1, height: 18, background: "#E5E7EB" }} />
                  <button
                    onClick={() => setSortDesc(v => !v)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "9px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
                      background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                      cursor: "pointer", fontFamily: FONT,
                    }}
                  >
                    <ArrowUpDown size={13} /> Due Date
                  </button>
                </div>
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
              <ParticipatedTable rows={participatedRows} />
            </div>
          )}
        </div>
      </div>

      {showAll && activeTab === "Bids in Pipeline" && (
        <FullScreenView title="Bids in Pipeline" subtitle="Full record view" onClose={() => setShowAll(false)}>
          <PipelineTable rows={pipelineRows} />
        </FullScreenView>
      )}
      {showAll && activeTab === "Participated Bids" && (
        <FullScreenView title="Participated Bids" subtitle="Full record view" onClose={() => setShowAll(false)}>
          <ParticipatedTable rows={participatedRows} />
        </FullScreenView>
      )}
    </div>
  );
};

export default TenderTracker;
