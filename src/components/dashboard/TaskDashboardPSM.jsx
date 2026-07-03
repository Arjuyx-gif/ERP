import { useState, useEffect } from "react";
import { Search, Eye, Filter, ArrowUpDown, ChevronDown, Bell, AlertTriangle, RefreshCw, Trash2, UserPlus, ClipboardList, Download, Minimize2, X } from "lucide-react";
import AssignTenderModal from "./AssignTenderModal";
import ReassignModal from "./ReassignModal";
import ReviewModal from "./ReviewModal";
import ViewTenderModal from "./ViewTenderModal";
import DocumentsModal from "./DocumentsModal";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TABLE_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales\npersons Name", checklist: "-",         preBid: "-",         oemStatus: "-",         reviewed: "-",   postBid: "-",               bidStatus: "-",            stage: "Assign Member",                       deadline: "Date", highlight: null     },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales\npersons Name", checklist: "Completed", preBid: "Completed", oemStatus: "Pending",      reviewed: "-",   postBid: "-",               bidStatus: "-",            stage: "OEM Docs Pending",                    deadline: "Date", highlight: null     },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales\npersons Name", checklist: "Completed", preBid: "Completed", oemStatus: "Completed",    reviewed: "Yes", postBid: "-",               bidStatus: "Won (L1)",     stage: "-",                                   deadline: "Date", highlight: null     },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Reactive",  assignedTo: "Pre Sales\npersons Name", checklist: "Completed", preBid: "Completed", oemStatus: "Completed",    reviewed: "Yes", postBid: "Completed\nRound 2", bidStatus: "Won (L1)",  stage: "Project Transited to -\nPurchase & SITC", deadline: "Date", highlight: "green"  },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales\npersons Name", checklist: "Completed", preBid: "Completed", oemStatus: "Completed",    reviewed: "No",  postBid: "-",               bidStatus: "Not Submitted", stage: "-",                                  deadline: "Date", highlight: null     },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Reactive",  assignedTo: "Pre Sales\npersons Name", checklist: "Completed", preBid: "Completed", oemStatus: "Completed",    reviewed: "Yes", postBid: "Completed\nRound 3", bidStatus: "Won (L1)",  stage: "Awaiting Project\nTransited",         deadline: "Date", highlight: "yellow" },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales\npersons Name", checklist: "Completed", preBid: "Completed", oemStatus: "Completed",    reviewed: "Yes", postBid: "Completed",        bidStatus: "Lost",         stage: "-",                                   deadline: "Date", highlight: null     },
];

const ROW_BG    = { green: "#E8F5E9", yellow: "#FFFDE7", red: "#FFF0F0" };
const TYPE_PILL = { Proactive: { bg: "#EFF6FF", color: "#1D4ED8" }, Reactive: { bg: "#FEF3C7", color: "#92400E" } };

const TEAM_MEMBERS = [
  { id: 1, name: "Pre - Sales Member Name", status: "Busy",       statusColor: "#F97316", active: 6, pending: 5, done: 8, workload: 80 },
  { id: 2, name: "Pre - Sales Member Name", status: "Overloaded", statusColor: "#DC2626", active: 6, pending: 5, done: 8, workload: 95 },
  { id: 3, name: "Pre - Sales Member Name", status: "Available",  statusColor: "#16A34A", active: 6, pending: 5, done: 8, workload: 40 },
  { id: 4, name: "Pre - Sales Member Name", status: "Normal",     statusColor: "#2563EB", active: 6, pending: 5, done: 8, workload: 65 },
  { id: 5, name: "Pre - Sales Member Name", status: "Busy",       statusColor: "#F97316", active: 6, pending: 5, done: 8, workload: 80 },
];
const BAR_COLOR = { Overloaded: "#DC2626", Busy: "#F97316", Available: "#16A34A", Normal: "#2563EB" };

const DEADLINES = [
  { type: "Bid Submission",    id: "TND-2026-050", customer: "Customer Name", date: "Jun 29, 2026", urgency: "red"    },
  { type: "OEM Response Due",  id: "TND-2026-048", customer: "Customer Name", date: "Jun 25, 2026", urgency: "red"    },
  { type: "OEM Response Due",  id: "TND-2026-046", customer: "Customer Name", date: "Jun 27, 2026", urgency: "red"    },
  { type: "OEM Response Due",  id: "TND-2026-045", customer: "Customer Name", date: "Jun 28, 2026", urgency: "red"    },
  { type: "Pre-Bid Meeting",   id: "TND-2026-049", customer: "Customer Name", date: "Jul 2, 2026",  urgency: "yellow" },
  { type: "Pre-Bid Query Due", id: "TND-2026-048", customer: "Customer Name", date: "Jul 4, 2026",  urgency: "yellow" },
  { type: "Bid Submission",    id: "TND-2026-046", customer: "Customer Name", date: "Jul 5, 2026",  urgency: "green"  },
  { type: "Post-Bid Queries",  id: "TND-2026-051", customer: "Customer Name", date: "Jul 5, 2026",  urgency: "green"  },
];
const DOT_COLOR   = { red: "#EF4444",  yellow: "#F59E0B", green: "#10B981" };
const TYPE_COLOR  = { red: "#DC2626",  yellow: "#D97706", green: "#16A34A" };
const DATE_COLOR  = { red: "#DC2626",  yellow: "#D97706", green: "#16A34A" };
const CARD_BG     = { red: "#FEF2F2",  yellow: "#FEFCE8", green: "#F0FDF4" };
const CARD_BORDER = { red: "#FECACA",  yellow: "#FEF08A", green: "#BBF7D0" };
const PILL_BORDER = { red: "#FCA5A5",  yellow: "#FDE68A", green: "#6EE7B7" };

const ACTIVITY = [
  { id: "TND-2026-050", action: "uploaded OEM documents for",           time: "32 min ago" },
  { id: "TND-2026-051", action: "submitted Pre-Bid Query response for",  time: "30 min ago" },
  { id: "TND-2026-047", action: "completed checklist review for",        time: "20 min ago" },
  { id: "TND-2026-048", action: "updated comparison sheet for",          time: "38 min ago" },
  { id: "TND-2026-052", action: "was assigned to new tender",            time: "38 min ago" },
];

const HISTORY_ROWS = [
  {
    id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", category: "Tender Title", year: "2026",
    assignedTo: "Pre Sales\npersons Name", result: "Won",
    documents: ["Checklist", "OEM Docs."],
  },
  {
    id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", category: "Tender Title", year: "2026",
    assignedTo: "Pre Sales\npersons Name", result: "Lost",
    documents: ["Checklist", "OEM Docs.", "Comparison Sheet"],
  },
];

const RESULT_PILL = {
  Won:  { bg: "#DCFCE7", color: "#16A34A", border: "#86EFAC" },
  Lost: { bg: "#FEE2E2", color: "#DC2626", border: "#FCA5A5" },
};

// ─── Custom Dropdown ─────────────────────────────────────────────────────────

const CustomDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = import("react").then(m => m.useRef).catch(() => ({ current: null })); 
  // We already imported useState, useEffect. We need useRef. Let's assume we can just use React.useRef if not imported.
  // Actually, I can just use a simple state to close on mouse leave.
  return (
    <div 
      style={{ position: "relative" }} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 8,
          fontSize: 13, color: "#374151", background: "#fff",
          cursor: "pointer", fontFamily: FONT, minWidth: 100, justifyContent: "space-between",
          userSelect: "none"
        }}
      >
        <span>{label}</span>
        <ChevronDown size={14} color="#6B7280" />
      </div>
      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: 4,
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 100,
          width: "100%", overflow: "hidden"
        }}>
          {options.map(opt => {
            const isSelected = value === opt;
            return (
              <div
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{
                  padding: "8px 12px", fontSize: 13, cursor: "pointer",
                  background: isSelected ? "#93C5FD" : "#fff",
                  color: isSelected ? "#fff" : "#374151",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => { if (!isSelected) e.target.style.background = "#F3F4F6"; }}
                onMouseLeave={(e) => { if (!isSelected) e.target.style.background = "#fff"; }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── History Full Table (used inline and in fullscreen overlay) ───────────────

const HistoryTable = ({ rows }) => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, minWidth: 900 }}>
      <thead>
        <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 2 }}>
          {["Tender ID", "Firm Name", "Customer", "Category", "Year", "Assigned To", "Results", "Documents Available", "Actions"].map(col => (
            <th key={col} style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", whiteSpace: "nowrap", background: "#F9FAFB", borderRight: "1px solid #F3F4F6" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const pill = RESULT_PILL[row.result] ?? {};
          return (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none", background: "#fff" }}>
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F3F4F6" }}>{row.id}</td>
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.firm}</td>
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.customer}</td>
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.category}</td>
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.year}</td>
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", whiteSpace: "pre-line", borderRight: "1px solid #F3F4F6" }}>{row.assignedTo}</td>
              {/* Results pill */}
              <td style={{ padding: "13px 14px", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>
                <span style={{
                  display: "inline-block", padding: "3px 14px", borderRadius: 20,
                  fontSize: 12, fontWeight: 700,
                  background: pill.bg, color: pill.color,
                  border: `1px solid ${pill.border}`,
                }}>{row.result}</span>
              </td>
              {/* Documents Available */}
              <td style={{ padding: "10px 14px", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
                  {row.documents.map(doc => (
                    <span key={doc} style={{
                      padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                      background: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB",
                      whiteSpace: "nowrap",
                    }}>{doc}</span>
                  ))}
                </div>
              </td>
              {/* Actions */}
              <td style={{ padding: "13px 14px", textAlign: "center" }}>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer",
                  fontFamily: FONT, fontWeight: 500,
                }}>
                  <Download size={13} color="#6B7280" /> Download Files
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ─── Member Card (shared between inline and fullscreen) ─────────────────────

const MemberCard = ({ m, onAssign }) => (
  <div style={{
    background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB",
    padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    display: "flex", flexDirection: "column",
  }}>
    {/* Avatar + status badge */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, background: "#EFF6FF",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700, color: "#2563EB", flexShrink: 0,
      }}>PS</div>
      <span style={{
        fontSize: 12, fontWeight: 600, color: m.statusColor,
        border: `1.5px solid ${m.statusColor}`, borderRadius: 20,
        padding: "2px 12px", background: "#fff",
      }}>{m.status}</span>
    </div>
    {/* Name */}
    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 16 }}>{m.name}</div>
    {/* Active / Pending / Done */}
    <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#2563EB" }}>{m.active}</div>
        <div style={{ fontSize: 11, color: "#9CA3AF" }}>Active</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#F97316" }}>{m.pending}</div>
        <div style={{ fontSize: 11, color: "#9CA3AF" }}>Pending</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#16A34A" }}>{m.done}</div>
        <div style={{ fontSize: 11, color: "#9CA3AF" }}>Done</div>
      </div>
    </div>
    {/* Workload bar */}
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>Workload</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{m.workload}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${m.workload}%`, background: BAR_COLOR[m.status] ?? "#2563EB", borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
    </div>
    {/* Buttons */}
    <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
      <button
        onClick={() => onAssign?.(m)}
        style={{ flex: 1, padding: "9px 0", border: "none", borderRadius: 8, background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}
      >Assign</button>
      <button style={{ flex: 1, padding: "9px 0", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>View</button>
    </div>
  </div>
);

// Full column set — used in both normal and fullscreen table
const TABLE_COLS = ["Tender ID", "Firm Name", "Customer", "Tender Title", "Type", "Assigned To", "Pre sales Checklist", "Pre Bid Queries", "OEM Status", "Reviewed", "Post Bid Quires", "Bid Status", "Stage", "Deadline", "Actions"];

// ─── Shared Full Table ────────────────────────────────────────────────────────

const FullTable = ({ openAssignModal, openReassignModal, openReviewModal, openViewTenderModal, openDocumentsModal }) => (
  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", overflow: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, minWidth: 1400 }}>
      <thead>
        <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 2 }}>
          {TABLE_COLS.map(col => (
            <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", whiteSpace: "nowrap", background: "#F9FAFB", borderRight: "1px solid #F3F4F6" }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map((row, i) => {
          const pill = TYPE_PILL[row.type] || {};
          return (
            <tr key={i} style={{ background: ROW_BG[row.highlight] ?? "#fff", borderBottom: "1px solid #F3F4F6" }}>
              {/* Tender ID */}
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F3F4F6" }}>{row.id}</td>
              {/* Firm Name */}
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.firm}</td>
              {/* Customer */}
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.customer}</td>
              {/* Tender Title */}
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>{row.title}</td>
              {/* Type pill */}
              <td style={{ padding: "13px 14px", textAlign: "center", borderRight: "1px solid #F3F4F6" }}>
                <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: pill.bg, color: pill.color }}>{row.type}</span>
              </td>
              {/* Assigned To */}
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6", whiteSpace: "pre-line" }}>{row.assignedTo}</td>
              {/* checklist, preBid, oemStatus, reviewed, postBid, bidStatus, stage */}
              {[row.checklist, row.preBid, row.oemStatus, row.reviewed, row.postBid, row.bidStatus, row.stage].map((val, j) => (
                <td key={j} style={{ padding: "13px 14px", fontSize: 13, color: val === "-" ? "#9CA3AF" : "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6", whiteSpace: "pre-line" }}>{val}</td>
              ))}
              {/* Deadline */}
              <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", borderRight: "1px solid #F3F4F6", whiteSpace: "nowrap" }}>{row.deadline}</td>
              {/* Actions */}
              <td style={{ padding: "13px 14px", textAlign: "center" }}>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
                  {i !== 0 && (
                    <button onClick={() => row.stage === "-" ? openDocumentsModal(row) : openViewTenderModal(row)} title="View" style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><Eye size={15} color="#6B7280" /></button>
                  )}
                  <button onClick={() => openAssignModal(row)} title="Assign" style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><UserPlus size={15} color="#6B7280" /></button>
                  <button onClick={() => openReassignModal(row)} title="Reassign" style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><RefreshCw size={15} color="#6B7280" /></button>
                  <button onClick={() => row.bidStatus === "Not Submitted" ? openReviewModal(row) : openDocumentsModal(row)} title="Review / Docs" style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><ClipboardList size={15} color="#6B7280" /></button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const TaskDashboardPSM = ({ fullscreen = false, onExpandTable, onAssign, initialAssignData, onReassign, initialReassignData, onReview, initialReviewData, onViewTender, initialViewTenderData, onDocuments, initialDocumentsData }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignPrefill, setAssignPrefill] = useState(null);

  const [showReassignModal, setShowReassignModal] = useState(false);
  const [reassignPrefill, setReassignPrefill] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewPrefill, setReviewPrefill] = useState(null);

  const [showViewTenderModal, setShowViewTenderModal] = useState(false);
  const [viewTenderPrefill, setViewTenderPrefill] = useState(null);

  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [documentsPrefill, setDocumentsPrefill] = useState(null);

  const [showHistoryFullscreen, setShowHistoryFullscreen] = useState(false);
  const [showWorkloadFullscreen, setShowWorkloadFullscreen] = useState(false);
  
  const [historyResultFilter, setHistoryResultFilter] = useState("All");
  const [historyYearFilter, setHistoryYearFilter] = useState("All");
  
  const [tableStatusFilter, setTableStatusFilter] = useState("All Status");
  const [tableDeadlineFilter, setTableDeadlineFilter] = useState("By Deadline");

  const filteredHistory = HISTORY_ROWS.filter(r => 
    (historyResultFilter === "All" || r.result === historyResultFilter) &&
    (historyYearFilter === "All" || r.year === historyYearFilter)
  );

  // Auto-open modal when parent passes initialAssignData (after exiting fullscreen)
  useEffect(() => {
    if (initialAssignData) {
      const timer = setTimeout(() => {
        setAssignPrefill(initialAssignData);
        setShowAssignModal(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialAssignData]);

  // Auto-open Reassign modal when parent passes initialReassignData (after exiting fullscreen)
  useEffect(() => {
    if (initialReassignData) {
      const timer = setTimeout(() => {
        setReassignPrefill(initialReassignData);
        setShowReassignModal(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialReassignData]);

  // Auto-open Review modal when parent passes initialReviewData
  useEffect(() => {
    if (initialReviewData) {
      const timer = setTimeout(() => {
        setReviewPrefill(initialReviewData);
        setShowReviewModal(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialReviewData]);

  // Auto-open View Tender modal when parent passes initialViewTenderData
  useEffect(() => {
    if (initialViewTenderData) {
      const timer = setTimeout(() => {
        setViewTenderPrefill(initialViewTenderData);
        setShowViewTenderModal(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialViewTenderData]);

  // Auto-open Documents modal when parent passes initialDocumentsData
  useEffect(() => {
    if (initialDocumentsData) {
      const timer = setTimeout(() => {
        setDocumentsPrefill(initialDocumentsData);
        setShowDocumentsModal(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialDocumentsData]);

  const openAssignModal = (rowData) => {
    if (fullscreen && onAssign) { onAssign(rowData); return; }
    setAssignPrefill(rowData || null);
    setShowAssignModal(true);
  };

  const openReassignModal = (rowData) => {
    if (fullscreen && onReassign) { onReassign(rowData); return; }
    setReassignPrefill(rowData || null);
    setShowReassignModal(true);
  };

  const openReviewModal = (rowData) => {
    if (fullscreen && onReview) { onReview(rowData); return; }
    setReviewPrefill(rowData || null);
    setShowReviewModal(true);
  };

  const openViewTenderModal = (rowData) => {
    if (fullscreen && onViewTender) { onViewTender(rowData); return; }
    setViewTenderPrefill(rowData || null);
    setShowViewTenderModal(true);
  };

  const openDocumentsModal = (rowData) => {
    if (fullscreen && onDocuments) { onDocuments(rowData); return; }
    setDocumentsPrefill(rowData || null);
    setShowDocumentsModal(true);
  };

  // ── Fullscreen: show only the table ──────────────────────────────────────────
  if (fullscreen) {
    return (
      <div style={{ fontFamily: FONT }}>
        <FullTable
          openAssignModal={openAssignModal}
          openReassignModal={openReassignModal}
          openReviewModal={openReviewModal}
          openViewTenderModal={openViewTenderModal}
          openDocumentsModal={openDocumentsModal}
        />
      </div>
    );
  }

  // ── Normal view ──────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: FONT }}>

      {/* Table filter row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "16px 0 20px" }}>
        <Filter size={16} color="#6B7280" />
        <CustomDropdown 
          label="Status" 
          options={["All Status", "Active", "Pending", "Completed"]} 
          value={tableStatusFilter} 
          onChange={setTableStatusFilter} 
        />
        
        <div style={{ width: 1, height: 20, background: "#E5E7EB", margin: "0 4px" }} />
        
        <ArrowUpDown size={16} color="#6B7280" />
        <CustomDropdown 
          label="Deadline" 
          options={["By Deadline", "This Week", "This Month"]} 
          value={tableDeadlineFilter} 
          onChange={setTableDeadlineFilter} 
        />
        <div style={{ flex: 1 }} />
        <button
          onClick={() => onExpandTable?.()}
          style={{
            display: "flex", alignItems: "center", gap: 6, border: "1px solid #E5E7EB", borderRadius: 8,
            padding: "7px 14px", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: FONT,
          }}
        >
          <Eye size={14} /> View
        </button>
      </div>

      {/* Full table */}
      <div style={{ marginBottom: 28 }}>
        <FullTable
          openAssignModal={openAssignModal}
          openReassignModal={openReassignModal}
          openReviewModal={openReviewModal}
          openViewTenderModal={openViewTenderModal}
          openDocumentsModal={openDocumentsModal}
        />
      </div>

      {/* Team Workload */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Team Workload</h3>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Pre-Sales team capacity and current assignment status</p>
          </div>
          <button
            onClick={() => setShowWorkloadFullscreen(true)}
            style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}
          >View All</button>
        </div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 6 }}>
          {TEAM_MEMBERS.map(m => (
            <div key={m.id} style={{ minWidth: 200, flexShrink: 0 }}>
              <MemberCard m={m} onAssign={openAssignModal} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Team Workload Fullscreen Overlay ── */}
      {showWorkloadFullscreen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
          display: "flex", flexDirection: "column", fontFamily: FONT,
        }}>
          {/* Header bar */}
          <div style={{
            padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Team Workload</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>Pre-Sales team capacity and current assignment status</p>
            </div>
            <button
              onClick={() => setShowWorkloadFullscreen(false)}
              style={{
                background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
                padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, fontFamily: FONT,
              }}
            >
              <Minimize2 size={14} /> Exit Fullscreen
            </button>
          </div>

          {/* Cards grid */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 18,
            }}>
              {TEAM_MEMBERS.map(m => (
                <MemberCard key={m.id} m={m} onAssign={openAssignModal} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Deadlines + Team Activity Feed */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>

        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px 22px" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Upcoming Deadlines</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DEADLINES.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: CARD_BG[d.urgency], border: `1px solid ${CARD_BORDER[d.urgency]}`,
                borderRadius: 10, padding: "12px 16px",
              }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: DOT_COLOR[d.urgency], flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TYPE_COLOR[d.urgency] }}>{d.type}</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF" }}>·</span>
                  <span style={{ fontSize: 13, color: "#2563EB", fontWeight: 600 }}>{d.id}</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF" }}>{d.customer}</span>
                </div>
                <div style={{
                  padding: "4px 12px", borderRadius: 20, border: `1px solid ${PILL_BORDER[d.urgency]}`,
                  background: d.urgency === "green" ? "#F0FDF4" : d.urgency === "yellow" ? "#FEFCE8" : "#FEF2F2",
                  fontSize: 12, fontWeight: 700, color: DATE_COLOR[d.urgency], whiteSpace: "nowrap",
                }}>
                  {d.date}
                </div>
                {d.urgency === "red" && <AlertTriangle size={15} color="#EF4444" style={{ flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px 22px" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Team Activity Feed</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, paddingTop: i === 0 ? 0 : 12, paddingBottom: 12, borderBottom: i < ACTIVITY.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>PS</div>
                <div>
                  <div style={{ fontSize: 12, color: "#374151" }}>
                    <span style={{ color: "#6B7280" }}>PS Member Name </span>{a.action}
                  </div>
                  <div style={{ fontSize: 12, color: "#2563EB", fontWeight: 600, margin: "3px 0 2px" }}>{a.id}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Repository */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Historical Repository</h3>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Quick access to previous tender documents, OEM docs, and comparison sheets</p>
          </div>
          <button
            onClick={() => setShowHistoryFullscreen(true)}
            style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}
          >View All</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "24px 0 20px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid #E5E7EB", borderRadius: 8, padding: "9px 14px", background: "#fff" }}>
            <Search size={14} color="#9CA3AF" />
            <input type="text" placeholder="Search by Tender ID, Customer, Category..." style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", width: "100%", fontFamily: FONT, background: "transparent" }} />
          </div>
          
          <Filter size={16} color="#6B7280" />
          <CustomDropdown 
            label="Result" 
            options={["All", "Won", "Lost"]} 
            value={historyResultFilter} 
            onChange={setHistoryResultFilter} 
          />

          <div style={{ width: 1, height: 20, background: "#E5E7EB", margin: "0 4px" }} />

          <ArrowUpDown size={16} color="#6B7280" />
          <CustomDropdown 
            label="By Years" 
            options={["All", "2026", "2025", "2024"]} 
            value={historyYearFilter} 
            onChange={setHistoryYearFilter} 
          />
        </div>
        {/* Inline preview table with full columns */}
        <HistoryTable rows={filteredHistory} />
      </div>

      {/* ── Historical Repository Fullscreen Overlay ── */}
      {showHistoryFullscreen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
          display: "flex", flexDirection: "column", fontFamily: FONT,
        }}>
          {/* Header bar */}
          <div style={{
            padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Historical Repository</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>All previous tender records</p>
            </div>
            <button
              onClick={() => setShowHistoryFullscreen(false)}
              style={{
                background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
                padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, fontFamily: FONT,
              }}
            >
              <Minimize2 size={14} /> Exit Fullscreen
            </button>
          </div>

          {/* Filter bar */}
          <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", gap: 14, background: "#F7F8FA", flexShrink: 0 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid #E5E7EB", borderRadius: 8, padding: "9px 14px", background: "#fff" }}>
              <Search size={14} color="#9CA3AF" />
              <input type="text" placeholder="Search by Tender ID, Customer, Category..." style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", width: "100%", fontFamily: FONT, background: "transparent" }} />
            </div>

            <Filter size={16} color="#6B7280" />
            <CustomDropdown 
              label="Result" 
              options={["All", "Won", "Lost"]} 
              value={historyResultFilter} 
              onChange={setHistoryResultFilter} 
            />

            <div style={{ width: 1, height: 20, background: "#E5E7EB", margin: "0 4px" }} />

            <ArrowUpDown size={16} color="#6B7280" />
            <CustomDropdown 
              label="By Years" 
              options={["All", "2026", "2025", "2024"]} 
              value={historyYearFilter} 
              onChange={setHistoryYearFilter} 
            />
          </div>

          {/* Table */}
          <div style={{ flex: 1, overflowX: "auto", overflowY: "auto", padding: "0 28px 28px" }}>
            <HistoryTable rows={filteredHistory} />
          </div>
        </div>
      )}

      {/* Assign Tender Modal */}
      <AssignTenderModal
        open={showAssignModal}
        onClose={() => { setShowAssignModal(false); setAssignPrefill(null); }}
        prefillData={assignPrefill}
      />

      {/* Reassign Modal */}
      <ReassignModal
        open={showReassignModal}
        onClose={() => { setShowReassignModal(false); setReassignPrefill(null); }}
        prefillData={reassignPrefill}
      />

      {/* Review Modal */}
      <ReviewModal
        open={showReviewModal}
        onClose={() => { setShowReviewModal(false); setReviewPrefill(null); }}
        prefillData={reviewPrefill}
      />

      {/* View Tender Modal */}
      <ViewTenderModal
        open={showViewTenderModal}
        onClose={() => { setShowViewTenderModal(false); setViewTenderPrefill(null); }}
        prefillData={viewTenderPrefill}
      />

      {/* Documents Modal */}
      <DocumentsModal
        open={showDocumentsModal}
        onClose={() => { setShowDocumentsModal(false); setDocumentsPrefill(null); }}
        prefillData={documentsPrefill}
      />
    </div>
  );
};

export default TaskDashboardPSM;
