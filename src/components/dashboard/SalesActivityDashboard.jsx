import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar, Filter, Download, Eye, Plus, RefreshCw, FileText, TrendingUp,
  Phone, Mail, CheckCircle2, Clock, Edit3, ChevronDown, ArrowUpDown, Upload, MapPin, ChevronLeft,
} from "lucide-react";
import LogCustomerVisitModal from "./LogCustomerVisitModal";
import AddOpportunityModal from "./AddOpportunityModal";
import ScheduleMeetingModal from "./ScheduleMeetingModal";
import MeetingDoneModal from "./MeetingDoneModal";
import MarkFollowupCompleteModal from "./MarkFollowupCompleteModal";
import RescheduleMeetingModal from "./RescheduleMeetingModal";
import ComposeEmailModal from "./ComposeEmailModal";
import LogCallModal from "./LogCallModal";
import MeetingDetailsPanel from "./MeetingDetailsPanel";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const VISIT_HISTORY = [
  { date: "27/06/2026", org: "Organization/\nMinistry Name", contact: "Contact Person Name", purpose: "Tender Discussion", outcome: "Detailed meeting outcome.", oppCreated: "Yes", followUpDate: "30/06/2026", updated: "2 hrs ago" },
  { date: "27/06/2026", org: "Organization/\nMinistry Name", contact: "Contact Person Name", purpose: "Follow-Up",         outcome: "Detailed meeting outcome.", oppCreated: "No",  followUpDate: "30/06/2026", updated: "2 hrs ago" },
  { date: "27/06/2026", org: "Organization/\nMinistry Name", contact: "Contact Person Name", purpose: "Follow-Up",         outcome: "Detailed meeting outcome.", oppCreated: "No",  followUpDate: "-",          updated: "2 hrs ago" },
  { date: "27/06/2026", org: "Organization/\nMinistry Name", contact: "Contact Person Name", purpose: "Tender Discussion", outcome: "Detailed meeting outcome.", oppCreated: "Yes", followUpDate: "30/06/2026", updated: "2 hrs ago" },
];

const SALES_TARGET = { annualTarget: "₹100 Cr", achieved: "₹62 Cr", achievedPct: 62, remaining: "₹38 Cr", pipelineValue: "₹28 Cr" };

const BUSINESS_CATEGORY = [
  { label: "Cloud Computing",     value: "₹18.5 Cr", pct: 24, color: "#2563EB" },
  { label: "DTSS",                value: "₹14.2 Cr", pct: 18, color: "#06B6D4" },
  { label: "Microsoft",           value: "₹9.8 Cr",  pct: 13, color: "#8B5CF6" },
  { label: "Networking",          value: "₹8.1 Cr",  pct: 10, color: "#F59E0B" },
  { label: "Personal Computing",  value: "₹7.4 Cr",  pct: 9,  color: "#10B981" },
  { label: "Security",            value: "₹6.3 Cr",  pct: 8,  color: "#EF4444" },
  { label: "Server",              value: "₹5.2 Cr",  pct: 7,  color: "#EC4899" },
  { label: "IT Infra Services",   value: "₹4.6 Cr",  pct: 6,  color: "#84CC16" },
  { label: "Software",            value: "₹3.9 Cr",  pct: 5,  color: "#6366F1" },
  { label: "Storage",             value: "₹3.9 Cr",  pct: 5,  color: "#F97316" },
  { label: "Surveillance",        value: "₹3.9 Cr",  pct: 5,  color: "#14B8A6" },
  { label: "Enterprise",          value: "₹3.9 Cr",  pct: 5,  color: "#A855F7" },
  { label: "MISC",                value: "₹3.9 Cr",  pct: 5,  color: "#64748B" },
  { label: "Other",               value: "₹3.9 Cr",  pct: 5,  color: "#9CA3AF" },
];

const OPPORTUNITY_FUNNEL = [
  { label: "Lead",                  value: 24 },
  { label: "Meeting Scheduled",     value: 18 },
  { label: "Opportunity Identified", value: 14 },
  { label: "Tender Expected",       value: 10 },
  { label: "RFP Created",           value: 7 },
  { label: "Awaiting Approval",     value: 4 },
  { label: "Submitted",             value: 3 },
  { label: "L1",                    value: 2 },
  { label: "PO Received",           value: 1 },
];

// category maps each row to one of the Status-filter buckets below
const TENDER_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Proactive", value: "₹2 Cr.", deadline: "25/04/2026", status: "In Progress",                 statusColor: "#1565C0", updated: "2 hrs ago",  completion: 65,  category: "In Progress",     actions: [{ label: "Continue", icon: "edit" }], highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Reactive",  value: "₹2 Cr.", deadline: "25/04/2026", status: "Doc. Uploaded\nQuery & Response", statusColor: "#B45309", updated: "Yesterday",  completion: 0,   category: "Pending",         actions: [{ label: "Upload", icon: "upload" }], highlight: "yellow" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Reactive",  value: "₹2 Cr.", deadline: "25/04/2026", status: "Submitted",                     statusColor: "#16A34A", updated: "Yesterday",  completion: 100, category: "Completed",       actions: [{ label: "View", icon: "eye" }], highlight: "green"  },
  { id: "ORD-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Reactive",  value: "₹2 Cr.", deadline: "25/04/2026", status: "Order Placed",                  statusColor: "#374151", updated: "Today",      completion: 80,  category: "Completed",       actions: [{ label: "View SOF", icon: "eye" }], highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Proactive", value: "₹2 Cr.", deadline: "25/04/2026", status: "Rework",                        statusColor: "#DC2626", updated: "Today",      completion: 80,  category: "Pending",         actions: [{ label: "Edit & Resubmit", icon: "edit" }], highlight: "red" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Proactive", value: "₹2 Cr.", deadline: "25/04/2026", status: "Rejected",                      statusColor: "#DC2626", updated: "Yesterday",  completion: 0,   category: "Rejected",        actions: [{ label: "Edit", icon: "edit" }], highlight: "red"    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Proactive", value: "₹2 Cr.", deadline: "25/04/2026", status: "Lost",                          statusColor: "#DC2626", updated: "Yesterday",  completion: 0,   category: "Rejected",        actions: [{ label: "Edit Result", icon: "edit" }, { label: "View RFP", icon: "eye" }], highlight: "red" },
  { id: "ORD-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Proactive", value: "₹2 Cr.", deadline: "25/04/2026", status: "EMD Completed\n& Uploaded",     statusColor: "#16A34A", updated: "Today",      completion: 80,  category: "Completed",       actions: [{ label: "View SOF", icon: "eye" }], highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Proactive", value: "₹2 Cr.", deadline: "25/04/2026", status: "Revised L2",                    statusColor: "#B45309", updated: "Yesterday",  completion: 0,   category: "Pending",         actions: [{ label: "Upload PO", icon: "upload" }], highlight: "yellow" },
];
const ROW_BG = { yellow: "#FFFDE7", green: "#E8F5E9", red: "#FEE2E2" };
const TYPE_PILL = { Proactive: { bg: "#EFF6FF", color: "#1D4ED8" }, Reactive: { bg: "#FEF3C7", color: "#92400E" } };
const ROW_ACTION_ICON = { eye: Eye, upload: Upload, edit: Edit3 };

const STATUS_FILTER_OPTIONS = ["All Status", "Completed", "Pending", "In Progress", "Under Review", "Approval Pending", "Rejected"];
const DEADLINE_FILTER_OPTIONS = ["By Deadline", "Priority", "Newest First", "Oldest First", "Tender Value", "Last Updated"];

const MEETINGS_FILTER_TABS = ["All", "Today", "Tomorrow", "This Week", "High Priority", "Scheduled", "Rescheduled", "Completed", "Cancelled"];
const FOLLOWUP_FILTER_TABS = ["All", "Pending", "In Progress", "Completed", "Overdue", "Today", "This Week", "High Priority"];

const UPCOMING_MEETINGS = [
  { meetingId: "MTG-2026-001", subject: "Tender Discussion",   date: "28/06/2026", time: "10:00 AM", priority: "High",   relatedOpportunity: "OPP-2026-012", relatedTender: "TND-2026-012" },
  { meetingId: "MTG-2026-002", subject: "Follow-up Meeting",   date: "29/06/2026", time: "02:30 PM", priority: "High",   relatedOpportunity: "OPP-2026-012", relatedTender: "-" },
  { meetingId: "MTG-2026-003", subject: "Opportunity Meeting", date: "30/06/2026", time: "11:00 AM", priority: "Medium", relatedOpportunity: "OPP-2026-012", relatedTender: "-" },
  { meetingId: "MTG-2026-004", subject: "Cold Call",           date: "01/07/2026", time: "03:00 PM", priority: null,    relatedOpportunity: "OPP-2026-012", relatedTender: "-" },
];

const FOLLOWUP_TRACKER = [
  { followupType: "Call", purpose: "Tender Discussion", date: "28/06/2026", priority: "High",   lastActivity: "Meeting\n25/06/2026", nextFollowUp: "28/06/2026", relatedOpportunity: "OPP-2026-012" },
  { followupType: "Call", purpose: "Tender Discussion", date: "29/06/2026", priority: "High",   lastActivity: "Meeting\n25/06/2026", nextFollowUp: "28/06/2026", relatedOpportunity: "OPP-2026-012" },
  { followupType: "Call", purpose: "Tender Discussion", date: "30/06/2026", priority: "Medium", lastActivity: "Meeting\n25/06/2026", nextFollowUp: "28/06/2026", relatedOpportunity: "OPP-2026-012" },
];

const DAILY_ACTIVITY = [
  { icon: "visit",    title: "Customer Visit Logged",     tenderId: "TND-2026-045", time: "09:30 AM" },
  { icon: "followup", title: "Follow-up Completed",       tenderId: "TND-2026-046", time: "11:15 AM" },
  { icon: "opp",      title: "Opportunity Added",         tenderId: null,           time: "01:00 PM" },
  { icon: "rfp",      title: "RFP Created",                tenderId: "TND-2026-047", time: "02:30 PM" },
  { icon: "meeting",  title: "Meeting Scheduled",           tenderId: null,           time: "04:00 PM" },
  { icon: "response", title: "Customer Response Received",  tenderId: "TND-2026-048", time: "05:00 PM" },
];

const PRIORITY_PILL = { High: { bg: "#FEE2E2", color: "#DC2626" }, Medium: { bg: "#FEF3C7", color: "#D97706" } };

const ACTIVITY_ICON = { visit: Calendar, followup: RefreshCw, opp: Plus, rfp: FileText, meeting: Calendar, response: CheckCircle2 };

const ROW_ACTION_MAP = {
  "Continue":         row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "View RFP Form" }),
  "Upload":           row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "Complete Tasks", isQuery: true, showQueryUploadZone: true, isPostBidQueryPending: true }),
  "View":             row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "View RFP Form" }),
  "View RFP":         row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "View RFP Form" }),
  "Edit & Resubmit":  row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "Edit & Resubmit", rejectionRemark: "Please correct the EMD amount according to the revised guidelines." }),
  "Edit":             row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "Edit & Resubmit", rejectionRemark: "Sent back for rework due to incomplete documentation." }),
  "Edit Result":      row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "Update Result", tags: [row.firm], tagColors: { [row.firm]: "#E3F0FB" }, status: row.status }),
  "Upload PO":        row => ({ id: row.id, tender: row.title, customer: row.customer, amount: row.value, action: "View PO" }),
};

const ACTION_BUTTONS = [
  { icon: Calendar,     label: "Log Customer Visit" },
  { icon: Plus,         label: "Add Opportunity" },
  { icon: Calendar,     label: "Schedule Meeting" },
  { icon: FileText,     label: "Create RFP" },
  { icon: RefreshCw,    label: "Add Follow-up" },
  { icon: Download,     label: "Generate Visit Report" },
  { icon: TrendingUp,   label: "View Sales Pipeline" },
];

// ─── Small shared pieces ──────────────────────────────────────────────────────

const Card = ({ title, action, children }) => (
  <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "18px 20px" }}>
    {title && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>{title}</h3>
        {action}
      </div>
    )}
    {children}
  </div>
);

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onMouseLeave={() => setIsOpen(false)}>
      <div
        onClick={() => setIsOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 12px", border: "1px solid #E2E8F0", borderRadius: 8,
          fontSize: 13, color: "#333", background: "#F8FAFC",
          cursor: "pointer", fontFamily: FONT, minWidth: 130, justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <span>{value}</span>
        <ChevronDown size={14} color="#6B7280" />
      </div>
      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: 4,
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 100,
          width: "100%", minWidth: 160, overflow: "hidden",
        }}>
          {options.map(opt => {
            const isSelected = value === opt;
            return (
              <div
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{
                  padding: "8px 12px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
                  background: isSelected ? "#93C5FD" : "#fff",
                  color: isSelected ? "#fff" : "#374151",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#F3F4F6"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#fff"; }}
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

const VISIT_HISTORY_COLUMNS = ["Date", "Name of Ministry/ Organization", "Contact Person", "Purpose", "Meeting Outcome", "Opportunity Created", "Follow up Date", "Updated", "Actions"];

const VisitHistoryTable = ({ rows, maxHeight }) => (
  <div style={{
    width: "100%", maxWidth: "100%", border: "1px solid #E5E7EB", borderRadius: 8,
    overflowX: "auto", overflowY: maxHeight ? "auto" : "hidden",
    ...(maxHeight ? { maxHeight } : {}),
  }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
      <thead>
        <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 2 }}>
          {VISIT_HISTORY_COLUMNS.map(col => (
            <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", whiteSpace: "nowrap", background: "#F9FAFB" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((v, i) => (
          <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none" }}>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", whiteSpace: "nowrap" }}>{v.date}</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", whiteSpace: "pre-line" }}>{v.org}</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{v.contact}</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{v.purpose}</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{v.outcome}</td>
            <td style={{ padding: "13px 14px", textAlign: "center" }}>
              {v.oppCreated === "Yes"
                ? <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#DCFCE7", color: "#16A34A" }}>Yes</span>
                : <span style={{ fontSize: 13, color: "#9CA3AF" }}>No</span>}
            </td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center", whiteSpace: "nowrap" }}>{v.followUpDate}</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#667085", textAlign: "center", whiteSpace: "nowrap" }}>{v.updated}</td>
            <td style={{ padding: "13px 14px", textAlign: "center" }}>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
                  <Edit3 size={13} color="#6B7280" /> Edit
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TENDER_TABLE_COLUMNS = ["Tender/ Order ID", "Firm Name", "Tender Title", "Customer", "Type", "Value", "Deadline", "Status", "Updated", "Completion", "Actions"];

const TenderTable = ({ rows, onRowAction, maxHeight }) => (
  <div style={{
    width: "100%", maxWidth: "100%",
    background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0",
    overflowX: "auto", overflowY: "auto",
    ...(maxHeight ? { maxHeight } : {}),
  }}>
    <table style={{ width: "100%", minWidth: 1300, borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", position: "sticky", top: 0, zIndex: 2 }}>
          {TENDER_TABLE_COLUMNS.map(col => (
            <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#667085", textAlign: "center", whiteSpace: "nowrap", background: "#F8FAFC" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const pill = TYPE_PILL[row.type] || {};
          return (
            <tr key={i} style={{ background: ROW_BG[row.highlight] ?? "#fff", borderBottom: i < rows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{row.id}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.firm}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.title}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.customer}</td>
              <td style={{ padding: "14px 14px", textAlign: "center" }}>
                <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: pill.bg, color: pill.color }}>{row.type}</span>
              </td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.value}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.deadline}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: row.statusColor, fontWeight: 500, textAlign: "center", whiteSpace: "pre-line" }}>{row.status}</td>
              <td style={{ padding: "14px 14px", fontSize: 13, color: "#667085", whiteSpace: "nowrap", textAlign: "center" }}>{row.updated}</td>
              <td style={{ padding: "14px 14px", textAlign: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: row.completion === 100 ? "#16A34A" : "#344054" }}>{row.completion}%</span>
              </td>
              <td style={{ padding: "14px 14px", textAlign: "center" }}>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {row.actions.map(a => {
                    const Icon = ROW_ACTION_ICON[a.icon] || Edit3;
                    return (
                      <button
                        key={a.label}
                        onClick={() => onRowAction?.(a.label, row)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "6px 12px", border: "1px solid #E2E8F0", borderRadius: 6,
                          background: "#fff", fontSize: 12, fontWeight: 500, color: "#344054",
                          cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
                        }}
                      >
                        <Icon size={13} color="#2563EB" /> {a.label}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const PillButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
      background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer",
      fontFamily: FONT, fontWeight: 500, whiteSpace: "nowrap",
    }}
  >
    <Icon size={14} color="#6B7280" /> {label}
  </button>
);

const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontFamily: FONT,
      fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
      border: active ? "none" : "1px solid #E5E7EB",
      background: active ? "#2563EB" : "#fff",
      color: active ? "#fff" : "#374151",
    }}
  >
    {label}
  </button>
);

const FullscreenTableHeader = ({ title, onBack }) => (
  <div style={{
    padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
    display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 13, fontFamily: FONT, padding: 4 }}>
        <ChevronLeft size={16} /> Back to Dashboard
      </button>
      <div style={{ width: 1, height: 18, background: "#E2E8F0" }} />
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>{title}</h2>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative" }}>
        <input placeholder="Search meetings..." style={{ padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, color: "#374151", outline: "none", fontFamily: FONT, width: 220 }} />
      </div>
      <PillButton icon={Download} label="Export" />
    </div>
  </div>
);

const AllMeetingsView = ({ rows, onBack, onView, onReschedule, onDone }) => {
  const [filter, setFilter] = useState("All");
  const filteredRows = filter === "High Priority" ? rows.filter(r => r.priority === "High") : rows;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA", display: "flex", flexDirection: "column", fontFamily: FONT }}>
      <FullscreenTableHeader title="All Upcoming Meetings" onBack={onBack} />
      <div style={{ padding: "14px 28px 0", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
        {MEETINGS_FILTER_TABS.map(tab => (
          <FilterPill key={tab} label={tab} active={filter === tab} onClick={() => setFilter(tab)} />
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 28px 28px" }}>
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "auto" }}>
          <table style={{ width: "100%", minWidth: 1100, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", position: "sticky", top: 0, zIndex: 2 }}>
                {["Meeting ID", "Organization", "Contact Person", "Date", "Time", "Purpose", "Priority", "Related Opportunity", "Related Tender", "Actions"].map(col => (
                  <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#667085", textAlign: "center", whiteSpace: "nowrap" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => {
                const pill = PRIORITY_PILL[row.priority];
                return (
                  <tr key={i} style={{ borderBottom: i < filteredRows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{row.meetingId}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>Name of Ministry / Organization</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>Contact Person Name</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.date}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.time}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.subject}</td>
                    <td style={{ padding: "14px 14px", textAlign: "center" }}>
                      {pill ? <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: pill.bg, color: pill.color }}>{row.priority}</span> : <span style={{ color: "#9CA3AF" }}>-</span>}
                    </td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#16A34A", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{row.relatedOpportunity}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: row.relatedTender === "-" ? "#9CA3AF" : "#2563EB", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{row.relatedTender}</td>
                    <td style={{ padding: "14px 14px", textAlign: "center" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: 168, margin: "0 auto" }}>
                        <button onClick={() => onView(row)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>View</button>
                        <button onClick={() => onReschedule(row)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0", border: "1px solid #FDE68A", borderRadius: 6, background: "#FEFCE8", fontSize: 12, fontWeight: 500, color: "#B45309", cursor: "pointer", fontFamily: FONT }}>Reschedule</button>
                        <button onClick={() => onDone(row)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0", border: "1px solid #BBF7D0", borderRadius: 6, background: "#F0FDF4", fontSize: 12, fontWeight: 500, color: "#16A34A", cursor: "pointer", fontFamily: FONT }}>Done</button>
                        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0", border: "1px solid #FECACA", borderRadius: 6, background: "#FEF2F2", fontSize: 12, fontWeight: 500, color: "#DC2626", cursor: "pointer", fontFamily: FONT }}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FollowUpManagementView = ({ rows, onBack, onCall, onEmail, onDone, onComplete }) => {
  const [filter, setFilter] = useState("All");
  const filteredRows = filter === "High Priority" ? rows.filter(r => r.priority === "High") : rows;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA", display: "flex", flexDirection: "column", fontFamily: FONT }}>
      <FullscreenTableHeader title="Follow - Up Management" onBack={onBack} />
      <div style={{ padding: "14px 28px 0", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
        {FOLLOWUP_FILTER_TABS.map(tab => (
          <FilterPill key={tab} label={tab} active={filter === tab} onClick={() => setFilter(tab)} />
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "16px 28px 28px" }}>
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "auto" }}>
          <table style={{ width: "100%", minWidth: 1200, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", position: "sticky", top: 0, zIndex: 2 }}>
                {["Follow-up Type", "Organization", "Contact Person", "Purpose", "Date", "Priority", "Last Activity", "Next Follow - up", "Related Opportunity", "Actions"].map(col => (
                  <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#667085", textAlign: "center", whiteSpace: "nowrap" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => {
                const pill = PRIORITY_PILL[row.priority];
                return (
                  <tr key={i} style={{ borderBottom: i < filteredRows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.followupType}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>Name of Ministry / Organization</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>Contact Person Name</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.purpose}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.date}</td>
                    <td style={{ padding: "14px 14px", textAlign: "center" }}>
                      {pill ? <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: pill.bg, color: pill.color }}>{row.priority}</span> : <span style={{ color: "#9CA3AF" }}>-</span>}
                    </td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", textAlign: "center", whiteSpace: "pre-line" }}>{row.lastActivity}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.nextFollowUp}</td>
                    <td style={{ padding: "14px 14px", fontSize: 13, color: "#16A34A", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{row.relatedOpportunity}</td>
                    <td style={{ padding: "14px 14px", textAlign: "center" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: 168, margin: "0 auto" }}>
                        <button onClick={() => onCall(row)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}><Phone size={11} /> Call</button>
                        <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", border: "1px solid #BBF7D0", borderRadius: 6, background: "#F0FDF4", fontSize: 12, fontWeight: 500, color: "#16A34A", cursor: "pointer", fontFamily: FONT }}>WA</button>
                        <button onClick={() => onEmail(row)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", border: "1px solid #BFDBFE", borderRadius: 6, background: "#EFF6FF", fontSize: 12, fontWeight: 500, color: "#2563EB", cursor: "pointer", fontFamily: FONT }}><Mail size={11} /> Email</button>
                        <button onClick={() => onDone(row)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 0", border: "1px solid #BBF7D0", borderRadius: 6, background: "#F0FDF4", fontSize: 12, fontWeight: 500, color: "#16A34A", cursor: "pointer", fontFamily: FONT }}>Done</button>
                        <button onClick={() => onComplete(row)} style={{ gridColumn: "1 / -1", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>Complete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const SalesActivityDashboard = ({ fullscreen = false, onViewRFP }) => {
  const navigate = useNavigate();
  const [showAllVisits, setShowAllVisits] = useState(false);
  const [showTenderFullscreen, setShowTenderFullscreen] = useState(false);
  const [showLogVisit, setShowLogVisit] = useState(false);
  const [showAddOpportunity, setShowAddOpportunity] = useState(false);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [meetingDoneTarget, setMeetingDoneTarget] = useState(null);
  const [logCallTarget, setLogCallTarget] = useState(null);
  const [composeEmailTarget, setComposeEmailTarget] = useState(null);
  const [markCompleteTarget, setMarkCompleteTarget] = useState(null);
  const [meetingDetailsTarget, setMeetingDetailsTarget] = useState(null);
  const [showAllMeetings, setShowAllMeetings] = useState(false);
  const [showFollowUpManagement, setShowFollowUpManagement] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deadlineFilter, setDeadlineFilter] = useState("By Deadline");

  const filteredRows = TENDER_ROWS
    .filter(row => statusFilter === "All Status" || row.category === statusFilter)
    .slice()
    .sort((a, b) => {
      if (deadlineFilter === "Newest First") return TENDER_ROWS.indexOf(b) - TENDER_ROWS.indexOf(a);
      if (deadlineFilter === "Oldest First") return TENDER_ROWS.indexOf(a) - TENDER_ROWS.indexOf(b);
      if (deadlineFilter === "Tender Value") return parseFloat(b.value.replace(/[^\d.]/g, "")) - parseFloat(a.value.replace(/[^\d.]/g, ""));
      return 0;
    });

  const handleRowAction = (label, row) => {
    if (label === "View SOF") {
      navigate("/sales-order-form", { state: { step: 10, showUploadModal: false, fromSC: true } });
      return;
    }
    const builder = ROW_ACTION_MAP[label];
    if (builder) onViewRFP?.(builder(row));
  };

  return (
    <div style={{ fontFamily: FONT, paddingBottom: 8 }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
        background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "16px 20px",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Customer Visit & Activity Tracker</h2>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Replaces the existing Google Form process</p>
        </div>
        <button onClick={() => setShowLogVisit(true)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "10px 18px", border: "none", borderRadius: 8,
          background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
        }}>
          <MapPin size={15} /> Log Customer Visit
        </button>
      </div>

      {/* Visit History */}
      <div style={{ marginBottom: 20 }}>
        <Card
          title="Visit History"
          action={
            <div style={{ display: "flex", gap: 8 }}>
              <PillButton icon={Filter} label="Filter" />
              <PillButton icon={Download} label="Export" />
              <PillButton icon={Eye} label="View All" onClick={() => setShowAllVisits(true)} />
            </div>
          }
        >
          <VisitHistoryTable rows={VISIT_HISTORY} maxHeight={340} />
        </Card>
      </div>

      {/* Sales Target / Business Category / Opportunity Funnel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>

        <Card title="Sales Target Analytics">
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
            <div style={{
              width: 84, height: 84, borderRadius: "50%", flexShrink: 0,
              background: `conic-gradient(#2563EB ${SALES_TARGET.achievedPct * 3.6}deg, #E5E7EB 0deg)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 62, height: 62, borderRadius: "50%", background: "#fff",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#2563EB" }}>{SALES_TARGET.achievedPct}%</span>
                <span style={{ fontSize: 9, color: "#9CA3AF" }}>Done</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#9CA3AF" }}>Annual Target</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{SALES_TARGET.annualTarget}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#9CA3AF" }}>Achieved</span>
                <span style={{ fontWeight: 600, color: "#2563EB" }}>{SALES_TARGET.achieved} {SALES_TARGET.achievedPct}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#9CA3AF" }}>Remaining</span>
                <span style={{ fontWeight: 600, color: "#F59E0B" }}>{SALES_TARGET.remaining} {100 - SALES_TARGET.achievedPct}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#9CA3AF" }}>Pipeline Value</span>
                <span style={{ fontWeight: 600, color: "#7C3AED" }}>{SALES_TARGET.pipelineValue}</span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
              <span style={{ color: "#6B7280" }}>Progress</span>
              <span style={{ fontWeight: 600, color: "#374151" }}>{SALES_TARGET.achievedPct}%</span>
            </div>
            <div style={{ height: 7, borderRadius: 4, background: "#F3F4F6", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${SALES_TARGET.achievedPct}%`, background: "#2563EB", borderRadius: 4 }} />
            </div>
          </div>
        </Card>

        <Card title="Business Category Performance">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 230, overflowY: "auto" }}>
            {BUSINESS_CATEGORY.map(c => (
              <div key={c.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#374151", fontWeight: 500 }}>{c.label}</span>
                  <span style={{ color: "#9CA3AF" }}>{c.value} · {c.pct}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "#F3F4F6", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Opportunity Funnel">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {OPPORTUNITY_FUNNEL.map((f, i) => {
              const widthPct = 100 - i * (60 / OPPORTUNITY_FUNNEL.length);
              return (
                <div key={f.label} style={{
                  width: `${widthPct}%`, background: "#2563EB", opacity: 1 - i * 0.07,
                  borderRadius: 6, padding: "8px 12px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{f.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{f.value}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Filter size={16} color="#6B7280" />
        <CustomDropdown options={STATUS_FILTER_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
        <div style={{ width: 1, height: 20, background: "#CBD5E1", margin: "0 4px" }} />
        <ArrowUpDown size={14} color="#6B7280" />
        <CustomDropdown options={DEADLINE_FILTER_OPTIONS} value={deadlineFilter} onChange={setDeadlineFilter} />
        <div style={{ flex: 1 }} />
        <button onClick={() => setShowTenderFullscreen(true)} style={{
          background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
          padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6, fontFamily: FONT,
        }}>
          <Eye size={14} /> View
        </button>
      </div>

      {/* Tender / Order table */}
      <div style={{ marginBottom: 20 }}>
        <TenderTable rows={filteredRows} onRowAction={handleRowAction} maxHeight={fullscreen ? "calc(100vh - 80px)" : 420} />
      </div>

      {/* Quick action buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {ACTION_BUTTONS.map(b => (
          <PillButton
            key={b.label}
            icon={b.icon}
            label={b.label}
            onClick={() => {
              if (b.label === "Create RFP") onViewRFP?.({ action: "View RFP Form" });
              else if (b.label === "Log Customer Visit") setShowLogVisit(true);
              else if (b.label === "Add Opportunity") setShowAddOpportunity(true);
              else if (b.label === "Schedule Meeting") setShowScheduleMeeting(true);
            }}
          />
        ))}
      </div>

      {/* Upcoming Meetings / Follow-up Tracker / Daily Activity Timeline */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>

        <Card title="Upcoming Meetings" action={<span onClick={() => setShowAllMeetings(true)} style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, cursor: "pointer" }}>View All</span>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {UPCOMING_MEETINGS.map((m, i) => {
              const pill = PRIORITY_PILL[m.priority];
              return (
                <div key={i} style={{ paddingBottom: i < UPCOMING_MEETINGS.length - 1 ? 12 : 0, borderBottom: i < UPCOMING_MEETINGS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Contact Person Name</span>
                    {pill && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20, background: pill.bg, color: pill.color }}>{m.priority}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Name of Ministry / Organization</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
                    <Calendar size={12} /> {m.date} <Clock size={12} /> {m.time}
                  </div>
                  <div style={{ fontSize: 12, color: "#374151", marginBottom: 8 }}>{m.subject}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setMeetingDetailsTarget(m)} style={{ flex: 1, padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: FONT }}>View</button>
                    <button
                      onClick={() => setRescheduleTarget(m)}
                      style={{ flex: 1, padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      <RefreshCw size={11} /> Reschedule
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Follow-up Tracker" action={<span onClick={() => setShowFollowUpManagement(true)} style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, cursor: "pointer" }}>View All</span>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FOLLOWUP_TRACKER.map((f, i) => {
              const pill = PRIORITY_PILL[f.priority];
              return (
                <div key={i} style={{ paddingBottom: i < FOLLOWUP_TRACKER.length - 1 ? 12 : 0, borderBottom: i < FOLLOWUP_TRACKER.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Contact Person Name</span>
                    {pill && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20, background: pill.bg, color: pill.color }}>{f.priority}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Name of Ministry / Organization</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
                    <Calendar size={12} /> {f.date}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setLogCallTarget(f)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: FONT }}><Phone size={11} /> Call</button>
                    <button onClick={() => setMeetingDoneTarget(f)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: FONT }}><Calendar size={11} /> Meeting Done</button>
                    <button onClick={() => setComposeEmailTarget(f)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: FONT }}><Mail size={11} /> Email</button>
                  </div>
                  <button onClick={() => setMarkCompleteTarget(f)} style={{ width: "100%", marginTop: 8, padding: "6px 0", border: "none", borderRadius: 6, background: "#EFF6FF", color: "#2563EB", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <CheckCircle2 size={12} /> Complete
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Daily Activity Timeline">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {DAILY_ACTIVITY.map((a, i) => {
              const Icon = ACTIVITY_ICON[a.icon] || CheckCircle2;
              return (
                <div key={i} style={{ display: "flex", gap: 10, paddingTop: i === 0 ? 0 : 12, paddingBottom: 12, borderBottom: i < DAILY_ACTIVITY.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB", marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", margin: "2px 0" }}>
                      Customer Name{a.tenderId ? ` · ${a.tenderId}` : ""}
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── Visit History Fullscreen Overlay ── */}
      {showAllVisits && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
          display: "flex", flexDirection: "column", fontFamily: FONT,
        }}>
          <div style={{
            padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Visit History</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>All logged customer visits</p>
            </div>
            <button onClick={() => setShowAllVisits(false)} style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontFamily: FONT,
            }}>
              Close
            </button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "20px 28px 28px" }}>
            <VisitHistoryTable rows={VISIT_HISTORY} />
          </div>
        </div>
      )}

      {/* ── Tender / Order Fullscreen Overlay ── */}
      {showTenderFullscreen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
          display: "flex", flexDirection: "column", fontFamily: FONT,
        }}>
          <div style={{
            padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Tender / Order Pipeline</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>Fullscreen view</p>
            </div>
            <button onClick={() => setShowTenderFullscreen(false)} style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontFamily: FONT,
            }}>
              Close
            </button>
          </div>

          <div style={{ padding: "16px 28px", display: "flex", alignItems: "center", gap: 10, background: "#F7F8FA", flexShrink: 0 }}>
            <Filter size={16} color="#6B7280" />
            <CustomDropdown options={STATUS_FILTER_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
            <div style={{ width: 1, height: 20, background: "#CBD5E1", margin: "0 4px" }} />
            <ArrowUpDown size={14} color="#6B7280" />
            <CustomDropdown options={DEADLINE_FILTER_OPTIONS} value={deadlineFilter} onChange={setDeadlineFilter} />
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "0 28px 28px" }}>
            <TenderTable rows={filteredRows} onRowAction={handleRowAction} />
          </div>
        </div>
      )}

      <LogCustomerVisitModal open={showLogVisit} onClose={() => setShowLogVisit(false)} />
      <AddOpportunityModal open={showAddOpportunity} onClose={() => setShowAddOpportunity(false)} />
      <ScheduleMeetingModal open={showScheduleMeeting} onClose={() => setShowScheduleMeeting(false)} />
      <RescheduleMeetingModal
        open={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        currentDate={rescheduleTarget?.date}
        currentTime={rescheduleTarget?.time}
      />
      <MeetingDoneModal open={!!meetingDoneTarget} onClose={() => setMeetingDoneTarget(null)} />
      <LogCallModal open={!!logCallTarget} onClose={() => setLogCallTarget(null)} />
      <ComposeEmailModal open={!!composeEmailTarget} onClose={() => setComposeEmailTarget(null)} />
      <MarkFollowupCompleteModal
        open={!!markCompleteTarget}
        onClose={() => setMarkCompleteTarget(null)}
      />
      <MeetingDetailsPanel
        open={!!meetingDetailsTarget}
        meeting={meetingDetailsTarget}
        onClose={() => setMeetingDetailsTarget(null)}
        onReschedule={(m) => { setMeetingDetailsTarget(null); setRescheduleTarget(m); }}
        onMeetingDone={(m) => { setMeetingDetailsTarget(null); setMeetingDoneTarget(m); }}
      />

      {showAllMeetings && (
        <AllMeetingsView
          rows={UPCOMING_MEETINGS}
          onBack={() => setShowAllMeetings(false)}
          onView={setMeetingDetailsTarget}
          onReschedule={setRescheduleTarget}
          onDone={setMeetingDoneTarget}
        />
      )}

      {showFollowUpManagement && (
        <FollowUpManagementView
          rows={FOLLOWUP_TRACKER}
          onBack={() => setShowFollowUpManagement(false)}
          onCall={setLogCallTarget}
          onEmail={setComposeEmailTarget}
          onDone={setMeetingDoneTarget}
          onComplete={setMarkCompleteTarget}
        />
      )}
    </div>
  );
};

export default SalesActivityDashboard;
