// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
// All mock values live here.
// To connect the real backend:
//   1. Replace the Promise.resolve() calls in dashboardService.js with real API calls.
//   2. This file can be kept for test/dev seeding or deleted entirely.

// ─── Shared base row (mock helper only) ───────────────────────────────────────
// In production each API response returns complete row objects; BASE_ROW is not needed.
export const BASE_ROW = {
  id: "TND-2026-045",
  title: "Tender Title",
  customer: "Customer Name",
  value: "₹2 Cr.",
  deadline: "25/04/2026",
  firm: "Firm Name",
};

// ─── KPI Cards ────────────────────────────────────────────────────────────────
// src/services/mockData.js
export const KPI_CARDS = [
  { label: "Total RFPs",      value: 5, iconName: "document", color: "#1565C0", iconBg: "#E3F0FB" },
  { label: "Awaiting Approval", value: 1, iconName: "timer",  color: "#F5A623", iconBg: "#FFF4E0" },
  { label: "Submitted",       value: 1, iconName: "tick",     color: "#4CAF50", iconBg: "#E8F5E9" },
  { label: "Won (L1)",        value: 3, iconName: "trophy",   color: "#4CAF50", iconBg: "#E8F5E9" },
  { label: "PO - Pending",    value: 1, iconName: "alert",    color: "#FF5722", iconBg: "#FBE9E7" },
];

export const TASK_DASHBOARD_A_KPI_CARDS = [
  { label: "Total RFPs",               value: 15, iconName: "document",    color: "#1565C0", iconBg: "#E3F0FB" },
  { label: "Approved & Sent to MD", value: 14, iconName: "arrow-right", color: "#2563EB", iconBg: "#DBEAFE" },
  { label: "Returned to Team",          value: 5,  iconName: "refresh",     color: "#EA580C", iconBg: "#FFF7ED" },
  { label: "Approved by MD",        value: 3,  iconName: "tick",        color: "#16A34A", iconBg: "#DCFCE7" },
  { label: "Won Tenders",               value: 7,  iconName: "trophy",      color: "#16A34A", iconBg: "#DCFCE7" },
  { label: "Lost Tender",               value: 1,  iconName: "timer",       color: "#DC2626", iconBg: "#FEE2E2" },
  { label: "PO Awaited",                value: 4,  iconName: "briefcase",   color: "#92400E", iconBg: "#FEF3C7" },
  { label: "Pending Approval",          value: 4,  iconName: "clock",       color: "#B45309", iconBg: "#FEF9C3" },
];

export const PSM_KPI_CARDS = [
  { label: "Total Tenders",        value: 5, sub: "3 assigned today",       iconName: "document",     color: "#2563EB", iconBg: "#EFF6FF" },
  { label: "Awaiting Assignment",  value: 1, sub: "Action required",        iconName: "user-plus",    color: "#F97316", iconBg: "#FFF7ED" },
  { label: "OEM Document Pending", value: 1, sub: "2 overdue",              iconName: "clock",        color: "#F97316", iconBg: "#FFF7ED" },
  { label: "Pre-Bid Queries",      value: 3, sub: "1 pending upload",       iconName: "help-circle",  color: "#7C3AED", iconBg: "#F5F3FF" },
  { label: "Post-Bid Queries",     value: 3, sub: "Due this week",          iconName: "document",     color: "#2563EB", iconBg: "#EFF6FF" },
  { label: "Project Transition",   value: 3, sub: "Submit before deadline", iconName: "check-circle", color: "#16A34A", iconBg: "#F0FDF4" },
  { label: "Won (L1)",             value: 3, sub: "This Month",             iconName: "trending-up",  color: "#16A34A", iconBg: "#F0FDF4" },
  { label: "Lost Tenders",         value: 3, sub: "Review Tenders",         iconName: "x-circle",     color: "#DC2626", iconBg: "#FEF2F2" },
];

export const S_KPI_CARDS = [
  { label: "Total RFPs",                 value: 8, iconName: "document", color: "#1565C0", iconBg: "#E3F0FB" },
  { label: "Awaiting Approval by Manager", value: 1, iconName: "clock",  color: "#D97706", iconBg: "#FEF3C7" },
  { label: "Awaiting Approval - MD",       value: 1, iconName: "clock",  color: "#D97706", iconBg: "#FEF3C7" },
  { label: "Submitted",                  value: 1, iconName: "tick",     color: "#0891B2", iconBg: "#ECFEFF" },
  { label: "Won (L1)",                   value: 3, iconName: "trophy",   color: "#16A34A", iconBg: "#E8F5E9" },
  { label: "PO - Pending",               value: 1, iconName: "alert",    color: "#EA580C", iconBg: "#FFF1E7" },
];

export const PS_KPI_CARDS = [
  { label: "Active Tenders",            value: 8, iconName: "document",     color: "#1565C0", iconBg: "#E3F0FB" },
  { label: "Pre-Bid Queries\nPending",   value: 2, iconName: "help-circle", color: "#F97316", iconBg: "#FFF7ED" },
  { label: "OEM Docs.\nPending",         value: 1, iconName: "alert",       color: "#EF4444", iconBg: "#FEF2F2" },
  { label: "Post-Bid Queries\nPending",  value: 3, iconName: "help-circle", color: "#F97316", iconBg: "#FFF7ED" },
  { label: "Completed",                  value: 2, iconName: "tick",        color: "#16A34A", iconBg: "#DCFCE7" },
];

export const PORTAL_KPI_CARDS = [
  { label: "Total Tenders",                 value: 24, sub: "On Portal",                iconName: "document",  color: "#3B82F6", iconBg: "#EFF6FF" },
  { label: "Post-Bid Queries\n& Responses", value: 3,  sub: "Awaiting Response",        iconName: "help-circle", color: "#F59E0B", iconBg: "#FEF3C7" },
  { label: "Awaiting Results",              value: 7,  sub: "Awaiting Bid Results",     iconName: "trending-up", color: "#8B5CF6", iconBg: "#F3E8FF" },
  { label: "PO Pending",                    value: 4,  sub: "Customer PO Awaited",      iconName: "upload",    color: "#6366F1", iconBg: "#EEF2FF" },
  { label: "GeM Charges\nPending",          value: 3,  sub: "Payment Due",              iconName: "rupee",     color: "#F97316", iconBg: "#FFEDD5" },
  { label: "L2 Match Case",                 value: 3,  sub: "Price Match Opportunity",  iconName: "award",     color: "#EAB308", iconBg: "#FEF9C3" },
  { label: "Won (L1)",                      value: 3,  sub: "This Month",               iconName: "tick",      color: "#10B981", iconBg: "#D1FAE5" },
  { label: "Lost Tenders",                  value: 3,  sub: "Review Tenders",           iconName: "x-circle",  color: "#EF4444", iconBg: "#FEE2E2" },
];

// ─── Kanban Columns ───────────────────────────────────────────────────────────
// `count` is intentionally omitted — dashboardService derives it from cards.length
// so the badge always reflects the true number of loaded cards.
export const KANBAN_COLUMNS = [
  {
    id: "rfp_analysis", title: "RFP Analysis",
    color: "#E3F0FB", countBg: "#4A90D9",
    cards: [
      {
        id: "TND-2026-001", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: "Customer Name", amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Result Awaited", preBidDate: "20/04/2026", preBidTime: "Time", preBidVenue: "Venue", deadline: "Apr 25, 2026" },
        action: "View RFP Form",
      },
      {
        id: "TND-2026-002", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: "Customer Name", amount: "500Cr.",
        tags: ["CIPL", "UVT", "NIPL"], tagColors: { CIPL: "#E3F0FB", UVT: "#F3E5F5", NIPL: "#E8F5E9" },
        details: { status: "Approval Awaiting", preBidDate: "20/04/2026", preBidTime: "Time", preBidVenue: "Venue", deadline: "Apr 25, 2026" },
        action: "View RFP Form",
      },
    ],
  },
  {
    id: "awaiting_approval", title: "Awaiting Approval",
    color: "#FFF8E1", countBg: "#F5A623",
    cards: [
      {
        id: "TND-2026-005", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "MD Office - Approval Waiting", deadline: "Apr 25, 2026" },
        badge: { text: "Approval Pending", color: "#F5A623", bg: "#FFF4E0" },
        action: "Review Now",
      },
    ],
  },
  {
    id: "alert_notify", title: "Alert / Notify",
    color: "#FFF3E0", countBg: "#FF9800",
    cards: [
      {
        id: "TND-2026-005", status: "Approved", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL", "UVT", "NIPL"], tagColors: { CIPL: "#E3F0FB", UVT: "#F3E5F5", NIPL: "#E8F5E9" },
        details: { status: "Send Alert", deadline: "Apr 25, 2026" },
        notifyList: ["Pre-sales", "Sales-coordinator", "Purchase", "Accounts", "HR", "Service"],
        checkedNotify: ["Pre-sales"],
        sendBy: "Sales Rep Name",
        action: "Send Notification",
      },
    ],
  },
  {
    id: "approved", title: "Work In Progress",
    color: "#F3E5F5", countBg: "#9C27B0",
    cards: [
      {
        id: "TND-2026-004", status: "In Progress", statusColor: "#1565C0", statusBg: "#E3F0FB",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL", "UVT"], tagColors: { CIPL: "#E3F0FB", UVT: "#F3E5F5" },
        details: { status: "Docs. Pending", deadline: "Apr 25, 2026" },
        badges: [
          { text: "OEM Docs Pending", color: "#FF9800", bg: "#FFF4E0" },
          { text: "EMD Pending", color: "#F44336", bg: "#FBE9E7" },
        ],
        action: "Complete Tasks",
      },
    ],
  },
  {
    id: "pre_bid_query", title: "Pre Bid Query",
    color: "#E3F0FB", countBg: "#2979FF",
    cards: [
      {
        id: "TND-2026-009", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Pre bid Query", deadline: "Apr 25, 2026" },
        action: "View Submission", isQuery: true, isPreBidQueryPending: true,
      },
      {
        id: "TND-2026-009", status: "In Progress", statusColor: "#CA8A04", statusBg: "#FEF3C7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Pre bid Query", deadline: "Apr 25, 2026" },
        action: "Complete Tasks", isQuery: true, isPreBidQueryPending: true,
      },
      {
        id: "TND-2026-009", status: "Approval Pending", statusColor: "#EA580C", statusBg: "#FFF1E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Pre bid Query", deadline: "Apr 25, 2026" },
        action: "Complete Tasks", isQuery: true, isApprovalPending: true, isPreBidQueryPending: true,
      },
    ],
  },
  {
    id: "bid_submitted", title: "Bid Submitted",
    color: "#E8F5E9", countBg: "#4CAF50",
    cards: [
      {
        id: "TND-2026-009", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL", "UVT"], tagColors: { CIPL: "#E3F0FB", UVT: "#F3E5F5" },
        details: { status: "Bid Submitted - Date", dueDate: "Apr 25, 2026", dueTime: "Time" },
        action: "Bid Submitted",
      },
    ],
  },
  {
    id: "query_response", title: "Query & Response",
    color: "#FFF8E1", countBg: "#FFC107",
    cards: [
      {
        id: "TND-2026-009", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL", "UVT"], tagColors: { CIPL: "#E3F0FB", UVT: "#F3E5F5" },
        details: { status: "Docs - pending", dueDate: "Apr 25, 2026", dueTime: "Time" },
        isQuery: true,
        action: "Complete Tasks",
      },
    ],
  },
  {
    id: "result_awaited", title: "Result Awaited",
    color: "#FBE9E7", countBg: "#FF5722",
    cards: [
      {
        id: "TND-2026-009", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL", "UVT"], tagColors: { CIPL: "#E3F0FB", UVT: "#F3E5F5" },
        details: { status: "Result Awaited", deadline: "Apr 30, 2026" },
        wonLost: true,
      },
    ],
  },
  {
    id: "won", title: "Won (L1)",
    color: "#E8F5E9", countBg: "#2E7D32",
    cards: [
      {
        id: "TND-2026-007", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "PO Received", deadline: "Apr 30, 2026" },
        badge: { text: "Awarded", color: "#2E7D32", bg: "#E8F5E9" },
        statusBadge: { text: "PO Received", iconName: "bell", color: "#F5A623", bg: "#FFF4E0" },
      },
      {
        id: "TND-2026-017", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: [], tagColors: {},
        details: { status: "PO Awaiting", deadline: "Apr 30, 2026" },
        statusBadge: { text: "PO Awaiting", iconName: "alert", color: "#F5A623", bg: "#FFF4E0" },
      },
      {
        id: "TND-2026-017", status: "Bid Canceled", statusColor: "#F44336", statusBg: "#FBE9E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: [], tagColors: {},
        details: { status: "Bid Canceled", deadline: "Apr 30, 2026" },
        statusBadge: { text: "Bid Canceled", iconName: "alert", color: "#FF5722", bg: "#FFF8E1" },
      },
    ],
  },
  {
    id: "po_received", title: "PO Received",
    color: "#E3F0FB", countBg: "#1565C0",
    cards: [
      {
        id: "TND-2026-007", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Start with SOF", deadline: "Apr 30, 2026" },
        badge: { text: "Awarded", color: "#2E7D32", bg: "#E8F5E9" },
        statusBadge: { text: "Start SOF – Action Required", iconName: "bell", color: "#F5A623", bg: "#FFF4E0" },
        poActions: true,
      },
    ],
  },
  {
    id: "lost", title: "Lost",
    color: "#FBE9E7", countBg: "#C62828",
    cards: [
      {
        id: "TND-2026-012", status: "Lost", statusColor: "#C62828", statusBg: "#FBE9E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["UVT", "Lost", "NIPL", "Lost"],
        tagColors: {
          UVT: "#E3F0FB",
          NIPL: "#E3F0FB",
          Lost: { bg: "#FBE9E7", color: "#C62828" },
        },
        details: { remark: "Remark entered in comparison sheet", deadline: "Apr 08, 2026", deadlineColor: "#F44336" },
        lostActions: true,
      },
    ],
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  {
    id: 1, type: "success", tag: "active", title: "RFP Uploaded (New)", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 2, type: "alert", tag: "active", title: "Bid Lost", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 3, type: "warning", tag: "pending", title: "Result Awaited", time: "3h ago", actionText: "Update",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 4, type: "info", tag: "pending", title: "Reminder Pre-Bid Meeting", time: "3h ago", actionText: "View Link",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Date", value: "Today" },
      { label: "Time", value: "2:00PM" },
      { label: "Customer", value: "Customer Name" },
    ],
  },
  {
    id: 5, type: "info", tag: "pending", title: "Reminder Pre-Bid Meeting", time: "3h ago", actionText: "View Link",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Date", value: "Today" },
      { label: "Time", value: "2:00PM" },
      { label: "Customer", value: "Customer Name" },
    ],
  },
];

// ─── Task Dashboard SM Notifications ─────────────────────────────────────────
export const SM_NOTIFICATIONS = [
  {
    id: 1, type: "success", tag: "active", title: "(New) RFP Uploaded", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 2, type: "alert", tag: "active", title: "Bid Lost", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 3, type: "warning", tag: "pending", title: "Bid Submission Tomorrow", time: "3h ago",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Documents", value: "Completed" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 4, type: "success", tag: "completed", title: "RFP Approved by MD", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 5, type: "success", tag: "completed", title: "Bid Won", time: "3h ago", actionText: "PO Awaiting",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 6, type: "success", tag: "completed", title: "PO Received", time: "3h ago", actionText: "PO Received",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
];

// ─── Task Dashboard PS Notifications ─────────────────────────────────────────
export const PS_NOTIFICATIONS = [
  {
    id: 1, type: "success", tag: "active", title: "RFP Uploaded (New)", time: "3h ago", actionText: "View RFP & Complete Checklist",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 2, type: "info", tag: "pending", title: "OEM Documents Awaited", time: "3h ago", actionText: "View & Complete Docs.",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
    ],
  },
  {
    id: 3, type: "alert", tag: "active", title: "Query Response Due Today", time: "3h ago", actionText: "Submit Response",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 4, type: "warning", tag: "pending", title: "Bid Submission Tomorrow", time: "3h ago", actionText: "Check Docs.",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Documents", value: "Completed" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
];

// ─── Sidebar Navigation ───────────────────────────────────────────────────────
export const SIDEBAR_NAV = [
  { iconName: "dashboard", label: "Dashboard", path: "/dashboard" },
  {
    iconName: "clipboard", label: "Sales & Pre-sales", expandable: true,
    children: [
      { label: "RFP Dashboard", path: "/rfp-dashboard" },
      { label: "Pre-sales Checklist", path: "/pre-sales-checklist" },
      { label: "Comparison Sheet", path: "/comparison-sheet" },
      { label: "SOF", path: "/sof-dashboard" },
    ],
  },
  {
    iconName: "users", label: "Sales Coordinator", expandable: true,
    children: [
      { label: "RFP Dashboard", path: "/sc-rfp-dashboard" },
      { label: "SOF", path: "/sc-sof-dashboard" },
      { label: "SC Dashboard", path: "/sc-dashboard" },
    ],
  },
  {
    iconName: "inbox", label: "Task Inbox", expandable: true,
    children: [
      { label: "Purchase Team", path: "/purchase-task-inbox" },
      { label: "Accounts Team", path: "/accounts-team-inbox" },
      { label: "Service Team", path: "/service-team-inbox" },
      { label: "Store / Operation Team", path: "/store-team-inbox" },
      { label: "HR Team", path: "/hr-team-inbox" },
    ],
  },
  {
    iconName: "trending-up", label: "Tracker", expandable: true,
    children: [
      { label: "Tender Tracker", path: "/tender-tracker" },
      { label: "Order Tracker", path: "/order-tracker" },
      { label: "EMD-BG Tracker", path: "/emd-bg-tracker" },
    ],
  },
  { iconName: "bar-chart", label: "Reports", path: "/reports" },
  { iconName: "database", label: "Master Data", path: "/master-data" },
  { iconName: "settings", label: "Settings", path: "/settings" },
];

// Maps sub-routes to the parent sidebar route that should stay highlighted
export const ROUTE_PARENT = {
  "/emd-form": "/sc-dashboard",
  "/sales-order-form": "/sof-dashboard",
  "/comparison-sheet-detail": "/comparison-sheet",
  "/tender-checklist": "/pre-sales-checklist",
  "/purchase-order-form": "/purchase-task-inbox",
  "/purchase-sof-details": "/purchase-task-inbox",
};

// ─── View-All Table Rows (per column) ─────────────────────────────────────────
// Each entry is an array of complete row objects for the "View All" modal table.
// `variant` is a semantic key — ViewAllModal maps it to visual styles, keeping
// colour decisions out of data.  Valid variants: "success" | "error" | "warning" | "default"
// Local helper — not exported. Each row is a COMPLETE object; the spread mirrors
// what a real API would return as a single response item.
const r = extra => ({ ...BASE_ROW, ...extra });

export const VIEW_ALL_ROWS = {
  rfp_analysis: [
    r({ preBidDate: "Today", preBidTime: "2:00 P.M", venue: "Venue", variant: "warning" }),
    r({ preBidDate: "Date", preBidTime: "Time", venue: "Venue" }),
    r({ preBidDate: "Date", preBidTime: "Time", venue: "Venue" }),
    r({ preBidDate: "Date", preBidTime: "Time", venue: "Venue" }),
    r({ preBidDate: "Date", preBidTime: "Time", venue: "Venue" }),
  ],
  awaiting_approval: [
    r({ status: "Approved", variant: "success" }),
    r({ status: "Pending", variant: "default" }),
    r({ status: "Rejected", variant: "error" }),
  ],
  alert_notify: [
    r({ notifiedTeams: "Dept. Names" }),
    r({ notifiedTeams: "Pending" }),
    r({ notifiedTeams: "Dept. Names" }),
  ],
  approved: [
    r({ status: "In Progress", documents: "OEM + EMD", actionLabel: "Complete Tasks", actionIcon: "file" }),
    r({ status: "Completed", documents: "OEM + EMD", actionLabel: "View Docs", actionIcon: "file" }),
  ],
  bid_submitted: [
    r({ status: "Bid Submitted - Date" }),
    r({ status: "Bid Submitted - Date" }),
  ],
  query_response: [
    r({ dueDate: "25/04/2026", dueTime: "Time", status: "Pending", actionLabel: "Complete Tasks" }),
    r({ dueDate: "25/04/2026", dueTime: "Time", status: "Pending", actionLabel: "Complete Tasks" }),
    r({ dueDate: "25/04/2026", dueTime: "Time", status: "Completed", actionLabel: "View File" }),
  ],
  result_awaited: [
    r({ dateSubmitted: "25/04/2026", status: "Pending", resultType: "confirm" }),
    r({ dateSubmitted: "25/04/2026", status: "Pending", resultType: "confirm" }),
    r({ dateSubmitted: "25/04/2026", status: "-", resultType: "won", variant: "success" }),
  ],
  won: [
    r({ status: "PO Received", actionLabel: "View PDF", variant: "success" }),
    r({ status: "Pending", actionLabel: "View PDF" }),
    r({ status: "Canceled", actionLabel: null }),
  ],
  po_received: [
    r({ status: "Pending", actionLabel: "Upload PO + Additional", actionIcon: "upload" }),
    r({ status: "Pending", actionLabel: "Upload PO + Additional", actionIcon: "upload" }),
    r({ status: "PO Received", actionLabel: "View PO + Additional", actionIcon: "eye", variant: "success" }),
  ],
  lost: [
    r({ status: "Pending", action1: "Notify for EMD Return", action1Icon: "arrow-up-right", action2: "Complete Comparison Sheet", action2Icon: "file" }),
    r({ status: "EMD Return Received", action1: "View Docs", action1Icon: "eye", action2: "View Comparison Sheet", action2Icon: "eye" }),
  ],
  pre_bid_query: [
    r({ status: "In Progress", action1: "Complete Tasks", action1Icon: "file-check" }),
    r({ status: "Approval Pending", action1: "Complete Tasks", action1Icon: "file-check" }),
    r({ status: "Completed", action1: "View Submission", action1Icon: "eye", variant: "success" }),
  ],
};

// ─── Main Dashboard Data ───────────────────────────────────────────────────────

export const MAIN_KPI_TOP = [
  { label: "Active RFPs", value: 12, sub: "3 closing this week", cardBg: "#EFF6FF", color: "#1D4ED8", bar: "#3B82F6", barTrack: "#DBEAFE", barPct: 75 },
  { label: "Active SOFs", value: 24, sub: "5 pending validations", cardBg: "#F5F3FF", color: "#5B21B6", bar: "#8B5CF6", barTrack: "#EDE9FE", barPct: 60 },
  { label: "EMD Pending", value: 3, sub: "1 awaiting refund", cardBg: "#FDF4FF", color: "#86198F", bar: "#C026D3", barTrack: "#FAE8FF", barPct: 28 },
  { label: "Active Procurement", value: 18, sub: "4 delayed", cardBg: "#F0FDF4", color: "#166534", bar: "#22C55E", barTrack: "#DCFCE7", barPct: 82 },
];

export const MAIN_KPI_BOT = [
  { label: "Delayed Orders", value: 6, sub: "3 vendor delays", cardBg: "#FFFBEB", color: "#92400E", bar: "#F59E0B", barPct: 45 },
  { label: "Installation Scheduled", value: 14, sub: "4 this week", cardBg: "#F0FDF4", color: "#166534", bar: "#22C55E", barPct: 68 },
  { label: "Pending Invoices", value: 9, sub: "3 overdue", cardBg: "#FAF5FF", color: "#6B21A8", bar: "#A855F7", barPct: 55 },
];

export const WORKFLOW_PIPELINE = [
  { label: "RFP", active: 12, delayed: 2 },
  { label: "Bid Submitted", active: 8, delayed: 1 },
  { label: "PO Received", active: 15, delayed: null, cancelled: 1 },
  { label: "SOF Validation", active: 12, delayed: 3 },
  { label: "Procurement", active: 12, delayed: 4 },
  { label: "Dispatch", active: 14, delayed: 2 },
  { label: "Billing", active: 9, delayed: 1 },
  { label: "Installation", active: 6 },
  { label: "Completion", active: 22 },
];

export const PRIORITY_ALERTS = [
  { icon: "alert-circle", iconColor: "#EF4444", title: "BG Expiring in 48 hrs", sub: "ORDER ID ——————————", days: "2 Days", tag: "delayed" },
  { icon: "alert", iconColor: "#F97316", title: "Query Response Due Today", sub: "TND-042, TND-041, TND-039", days: "2 Days", tag: "pending" },
  { icon: "warning", iconColor: "#F59E0B", title: "Material Delay", sub: "PO-1245, PO-1238 stuck in transit", days: "7 Days", tag: "in-progress" },
  { icon: "clock", iconColor: "#F59E0B", title: "EMD Return Pending", sub: "4 returns pending", days: "3 Days", tag: "pending" },
  { icon: "alert", iconColor: "#F97316", title: "Vendor Payment Pending", sub: "3 payments awaiting approval", days: "3 Days", tag: "pending" },
];

export const TENDER_STATUS_DATA = [
  { label: "Active", value: 27, color: "#2979FF", count: 24 },
  { label: "Awarded", value: 34, color: "#10B981", count: 31 },
  { label: "Under Evaluation", value: 18, color: "#F59E0B", count: 16 },
  { label: "Delayed", value: 6, color: "#EF4444", count: 5 },
  { label: "Lost", value: 16, color: "#9CA3AF", count: 14 },
];

export const DEPT_WORKLOAD_DATA = [
  { label: "Purchase", value: 32, color: "#2979FF" },
  { label: "SOF Operations", value: 24, color: "#10B981" },
  { label: "Accounts", value: 18, color: "#F59E0B" },
  { label: "Service", value: 14, color: "#8B5CF6" },
  { label: "Sales", value: 12, color: "#EC4899" },
];

export const ACTIVITY_TIMELINE = [
  { icon: "tick", iconColor: "#10B981", title: "RFP Approved", id: "TND-045", meta: "Person/ Dept Name", time: "2 min ago" },
  { icon: "tick", iconColor: "#10B981", title: "EMD Submitted", id: "TND-045", meta: "Person/ Dept Name", time: "2 min ago" },
  { icon: "alert-circle", iconColor: "#2979FF", title: "Query Raised", id: "TND-045", meta: "Person/ Dept Name", time: "2 min ago" },
  { icon: "document", iconColor: "#6B7280", title: "Bid Submitted", id: "TND-045", meta: "Person/ Dept Name", time: "2 min ago" },
  { icon: "tick", iconColor: "#10B981", title: "Material Received", id: "ORD-045", meta: "Person/ Dept Name", time: "2 min ago" },
  { icon: "tick", iconColor: "#10B981", title: "Billing Done", id: "ORD-045", meta: "Person/ Dept Name", time: "2 min ago" },
];

export const MAIN_NOTIFICATIONS = [
  { icon: "alert-circle", iconBg: "#FEF2F2", iconColor: "#EF4444", title: "Query Response Due Today", sub: "TND-038 requires response before 5 PM", time: "2 hours left" },
  { icon: "warning", iconBg: "#FFFBEB", iconColor: "#F59E0B", title: "BG Expiring in 3 Days", sub: "2 Bank Guarantees are Expiring", time: "2 hours left" },
  { icon: "alert", iconBg: "#FFF7ED", iconColor: "#F97316", title: "SOF Pending", sub: "5 SOF Pending to be completed", time: "2 days ago" },
  { icon: "alert", iconBg: "#FFF7ED", iconColor: "#F97316", title: "Material Delay", sub: "ORD-1234 shipment delayed by vendor", time: "1 days ago" },
];

// ─── Full notification panel data (Main Dashboard bell) ────────────────────────
export const PANEL_NOTIFICATIONS = [
  {
    id: 1, type: "success", tag: "active", title: "RFP Uploaded (New)", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 2, type: "info", tag: "pending", title: "Pre-Bid Checklist", time: "3h ago", actionText: "View Pre Sales Checklist",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Submitted By", value: "Name" },
    ],
  },
  {
    id: 3, type: "alert", tag: "active", title: "Bid Lost", time: "3h ago", actionText: "View RFP",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 4, type: "warning", tag: "pending", title: "Bid Submission Tomorrow", time: "3h ago", actionText: "Update",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹5 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Documents", value: "Completed" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
  {
    id: 5, type: "info", tag: "pending", title: "Reminder Pre-Bid Meeting", time: "3h ago", actionText: "View Link",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Date", value: "Today" },
      { label: "Time", value: "2:00PM" },
      { label: "Customer", value: "Customer Name" },
    ],
  },
  {
    id: 6, type: "success", tag: "completed", title: "Bid Won", time: "3h ago", actionText: "Upload PO & Docs.",
    details: [
      { label: "Tender ID", value: "TND-2026-005" },
      { label: "Customer", value: "Customer Name" },
      { label: "Amount", value: "₹500 Cr" },
      { label: "Firm", value: "Firm Name" },
      { label: "Deadline", value: "Apr 25, 2026" },
    ],
  },
];

// ─── Task Dashboard B – Pre-sales Table (Redesigned) ─────────────────────────
export const TASK_TABLE_B_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "Result Awaiting", postBidQueries: "-", compSheet1: "-", compSheet2: "-", stage: "Bid Result Awaiting", deadline: "08/06/2026", approvedByManager: "Yes", actionType: "view" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "Result Awaiting", postBidQueries: "-", compSheet1: "-", compSheet2: "-", stage: "Bid Result Awaiting", deadline: "08/06/2026", approvedByManager: "Yes", actionType: "view" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: "green",
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "Won", postBidQueries: "Completed", compSheet1: "NA", compSheet2: "Project Transited to - Purchase & SITC", stage: "Complete", deadline: "08/06/2026", approvedByManager: "Yes", actionType: "view" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Awaiting OEM Docs", bidStatus: "-", postBidQueries: "-", compSheet1: "-", compSheet2: "-", stage: "OEM Pending", deadline: "08/06/2026", approvedByManager: "-", actionType: "checkOEM" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "Lost", postBidQueries: "Completed Round 2", compSheet1: "In Progress", compSheet2: "In Progress", stage: "Comparison Sheet", deadline: "08/06/2026", approvedByManager: "Yes", actionType: "start" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "-", postBidQueries: "Response Pending", compSheet1: "-", compSheet2: "-", stage: "Post-Bid Queries Pending", deadline: "08/06/2026", approvedByManager: "Yes", actionType: "upload" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "In Progress", oemStatus: "-", bidStatus: "-", postBidQueries: "-", compSheet1: "-", compSheet2: "-", stage: "Pre-Bid Queries In Progress", deadline: "08/06/2026", approvedByManager: "-", actionType: "upload" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: null,
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "-", postBidQueries: "-", compSheet1: "-", compSheet2: "-", stage: "Bid Not Submitted", deadline: "08/06/2026", approvedByManager: "No", actionType: "view" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", type: "Completed", presalesChecklist: "Completed", highlight: "yellow",
    alertNotify: "View Teams & Remarks", preBidQueries: "Completed", oemStatus: "Completed", bidStatus: "Won", postBidQueries: "Completed", compSheet1: "NA", compSheet2: "Project Transition in progress", stage: "Project Transition in progress", deadline: "08/06/2026", approvedByManager: "Yes", actionType: "upload" },
];

// ─── Task Dashboard PS – Upcoming Deadlines ──────────────────────────────────
export const TASK_DASHBOARD_PS_DEADLINES = [
  { label: "Pre-Bid Query Due", tenderId: "TND-2026-050", customer: "Customer Name", date: "Jun 29, 2026", dotColor: "red", alert: true },
  { label: "OEM Response Due", tenderId: "TND-2026-048", customer: "Customer Name", date: "Jun 25, 2026", dotColor: "red", alert: true },
  { label: "Post-Bid Query Due", tenderId: "TND-2026-050", customer: "Customer Name", date: "Jun 27, 2026", dotColor: "red", alert: true },
  { label: "OEM Docs Due", tenderId: "TND-2026-045", customer: "Customer Name", date: "Jun 28, 2026", dotColor: "red", alert: true },
  { label: "Pre-Bid Meeting", tenderId: "TND-2026-049", customer: "Customer Name", date: "Jul 2, 2026", dotColor: "orange", alert: false },
  { label: "Pre-Bid Query Due", tenderId: "TND-2026-048", customer: "Customer Name", date: "Jul 4, 2026", dotColor: "orange", alert: false },
  { label: "Bid Submission", tenderId: "TND-2026-046", customer: "Customer Name", date: "Jul 5, 2026", dotColor: "green", alert: false },
  { label: "Post-Bid Queries", tenderId: "TND-2026-051", customer: "Customer Name", date: "Jul 5, 2026", dotColor: "green", alert: false },
];

// ─── Task Dashboard PS – Quick Actions ───────────────────────────────────────
export const TASK_DASHBOARD_PS_QUICK_ACTIONS = [
  { icon: "checklist", label: "Update Checklist" },
  { icon: "upload", label: "Upload OEM Documents" },
  { icon: "query", label: "Create Pre-Bid Query" },
  { icon: "clarification", label: "Upload Clarification" },
  { icon: "history", label: "View Historical Queries" },
  { icon: "tender", label: "Open Assigned Tender" },
];

// ─── Task Dashboard PS – Activity Timeline ───────────────────────────────────
export const TASK_DASHBOARD_PS_TIMELINE = [
  { icon: "submit", title: "Pre-Bid Query Submitted to Sales", tenderId: "TND-2026-045", time: "Today, 11:30 AM" },
  { icon: "upload", title: "OEM Documents Uploaded", tenderId: "TND-2026-045", time: "Today, 11:00 AM" },
  { icon: "query", title: "Pre-Bid Query Created", tenderId: "TND-2026-045", time: "Today, 11:30 AM" },
  { icon: "check", title: "Checklist Updated", tenderId: "TND-2026-045", time: "Today, 11:30 AM" },
  { icon: "query", title: "Post-Bid Query & Response - Round 2", tenderId: "TND-2026-045", time: "Today, 11:30 AM" },
];

// ─── Task Dashboard Table ─────────────────────────────────────────────────────
// highlight: null | "yellow" | "green" | "orange"
export const TASK_TABLE_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approval Waiting",  statusColor: "#B45309", completion: 100, actionLabel: "Approve RFP",        actionIcon: "edit", highlight: "yellow" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approved",          statusColor: "#374151", completion: 100, actionLabel: "Send to MD",      actionIcon: "send", highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approved",          statusColor: "#374151", completion: 100, actionLabel: "Send to MD",      actionIcon: "send", highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Approved",          statusColor: "#374151", completion: 100, actionLabel: "Forwarded to MD",  actionIcon: "send", highlight: "green" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Rejected",          statusColor: "#DC2626", completion: 0,   actionLabel: "View RFP",             actionIcon: "eye",  highlight: "orange" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Won - PO Awaiting", statusColor: "#374151", completion: 100, actionLabel: "View RFP",             actionIcon: "eye",  highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", salesPerson: "Sales Persons Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "PO Updated",        statusColor: "#374151", completion: 100, actionLabel: "View PO",              actionIcon: "eye",  highlight: null    },
];

// ─── Task Dashboard C Table ───────────────────────────────────────────────────
// highlight: null | "yellow" | "green" | "red"
export const TASK_DASHBOARD_C_TABLE_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "PO Awaiting",                   statusColor: "#D97706", updated: "Today",      completion: 0,   actionLabel: "Upload PO",        actionIcon: "upload", highlight: "yellow" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "In Progress",                  statusColor: "#1565C0", updated: "2 hrs ago",  completion: 65,  actionLabel: "Continue",         actionIcon: "edit",   highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Query & Response", statusColor: "#D97706", updated: "Yesterday",  completion: 0,   actionLabel: "Upload",           actionIcon: "upload", highlight: "yellow" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Submitted",                     statusColor: "#16A34A", updated: "Yesterday",  completion: 100, actionLabel: "View",             actionIcon: "eye",    highlight: "green"  },
  { id: "ORD-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Order Placed",                  statusColor: "#374151", updated: "Today",      completion: 80,  actionLabel: "View SOF",         actionIcon: "eye",    highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Rework",                        statusColor: "#DC2626", updated: "Today",      completion: 80,  actionLabel: "Edit & Resubmit",  actionIcon: "edit",   highlight: "red"   },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026", status: "Rejected",                      statusColor: "#DC2626", updated: "Yesterday",  completion: 0,   actionLabel: "Edit",             actionIcon: "edit",   highlight: null    },
];

// ─── Order Tracker ────────────────────────────────────────────────────────────
export const ORDER_TRACKER_KPI_CARDS = [
  { label: "Total Orders",    value: 3, iconName: "briefcase",   color: "#2563EB", iconBg: "#EFF6FF" },
  { label: "In Progress",     value: 1, iconName: "clock",       color: "#F97316", iconBg: "#FFF7ED" },
  { label: "Delivered",       value: 1, iconName: "check-circle", color: "#16A34A", iconBg: "#F0FDF4" },
  { label: "Payment Pending", value: 3, iconName: "alert",       color: "#CA8A04", iconBg: "#FEF9C3" },
  { label: "Delayed Orders",  value: 0, iconName: "x-circle",    color: "#DC2626", iconBg: "#FEF2F2" },
];

export const ORDER_TRACKER_ROWS = [
  { pid: "PID-2026-045", tenderId: "Tender ID", tenderTitle: "Tender title", customer: "Customer Name", firm: "Firm Name", salesPerson: "Sales Person", value: "₹2 Cr.", status: "In Progress", statusColor: "#F97316", stage: "Delivery",  dueDate: "Date", highlight: null },
  { pid: "PID-2026-045", tenderId: "Tender ID", tenderTitle: "Tender title", customer: "Customer Name", firm: "Firm Name", salesPerson: "Sales Person", value: "₹2 Cr.", status: "Delayed",     statusColor: "#DC2626", stage: "Execution", dueDate: "Date", highlight: "red" },
  { pid: "PID-2026-045", tenderId: "Tender ID", tenderTitle: "Tender title", customer: "Customer Name", firm: "Firm Name", salesPerson: "Sales Person", value: "₹2 Cr.", status: "Submitted",   statusColor: "#16A34A", stage: "Completed", dueDate: "Date", highlight: "green" },
];

export const QUICK_ACCESS = [
  { icon: "document", label: "RFP Tracker", color: "#2979FF", bg: "#EFF6FF", path: "/rfp-dashboard" },
  { icon: "inbox", label: "SOF Dashboard", color: "#059669", bg: "#ECFDF5", path: "/sof-dashboard" },
  { icon: "users", label: "Sales Coordinator Dashboard", color: "#7C3AED", bg: "#F5F3FF", path: "/sales-coordinator" },
  { icon: "clipboard", label: "Tracker", color: "#EA580C", bg: "#FFF7ED", path: "/tracker" },
  { icon: "inbox", label: "Task Inbox", color: "#DC2626", bg: "#FEF2F2", path: "/task-inbox" },
  { icon: "bar-chart", label: "Reports", color: "#2563EB", bg: "#EFF6FF", path: "/reports" },
];
