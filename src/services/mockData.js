// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const KPI_CARDS = [
  { label: "Total RFPs",       value: 5, icon: "📄", color: "#4A90D9" },
  { label: "Awaiting Approval",value: 1, icon: "🕐", color: "#F5A623", iconBg: "#FFF4E0" },
  { label: "Submitted",        value: 1, icon: "✅", color: "#4CAF50", iconBg: "#E8F5E9" },
  { label: "Won (L1)",         value: 3, icon: "🏆", color: "#4CAF50", iconBg: "#E8F5E9" },
  { label: "PO - Pending",     value: 1, icon: "⚠️", color: "#FF5722", iconBg: "#FBE9E7" },
];

export const KANBAN_COLUMNS = [
  {
    id: "rfp_analysis", title: "RFP Analysis", count: 3,
    color: "#E3F0FB", countBg: "#4A90D9",
    cards: [
      {
        id: "RFP-2026-001", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: "Customer Name", amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Result Awaited", preBidDate: "20/04/2026", preBidTime: "Time", preBidVenue: "Venue", deadline: "Apr 25, 2026" },
        action: "View RFP Form",
      },
      {
        id: "RFP-2026-002", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: "Customer Name", amount: "500Cr.",
        tags: ["CIPL","UVT","NIPL"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5", NIPL:"#E8F5E9" },
        details: { status: "Approval Awaiting", preBidDate: "20/04/2026", preBidTime: "Time", preBidVenue: "Venue", deadline: "Apr 25, 2026" },
        action: "View RFP Form",
      },
    ],
  },
  {
    id: "awaiting_approval", title: "Awaiting Approval", count: 1,
    color: "#FFF8E1", countBg: "#F5A623",
    cards: [
      {
        id: "RFP-2026-005", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "MD Office - Approval Waiting", deadline: "Apr 25, 2026" },
        badge: { text: "Approval Pending", color: "#F5A623", bg: "#FFF4E0" },
        action: "Review Now",
      },
    ],
  },
  {
    id: "alert_notify", title: "Alert / Notify", count: 1,
    color: "#FFF3E0", countBg: "#FF9800",
    cards: [
      {
        id: "RFP-2026-005", status: "Approved", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT","NIPL"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5", NIPL:"#E8F5E9" },
        details: { status: "Send Alert", deadline: "Apr 25, 2026" },
        notifyList: ["Pre-sales","Sales-coordinator","Purchase","Accounts","HR","Service"],
        checkedNotify: ["Pre-sales"],
        action: "Send Notification",
      },
      {
        id: "RFP-2026-005", status: "Approved", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","NIPL"], tagColors: { CIPL:"#E3F0FB", NIPL:"#E8F5E9" },
        details: { status: "Send Alert", deadline: "Apr 25, 2026" },
        notifyList: ["Pre-sales","Sales-coordinator","Purchase","Accounts","HR","Service"],
        checkedNotify: ["Pre-sales","Sales-coordinator","Accounts"],
        action: "View",
      },
    ],
  },
  {
    id: "approved", title: "Approved - Pre Bid Tasks", count: 1,
    color: "#F3E5F5", countBg: "#9C27B0",
    cards: [
      {
        id: "RFP-2026-004", status: "In Progress", statusColor: "#1565C0", statusBg: "#E3F0FB",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Docs. Pending", deadline: "Apr 25, 2026" },
        badges: [{ text:"OEM Docs Pending", color:"#FF9800", bg:"#FFF4E0" },{ text:"EMD Pending", color:"#F44336", bg:"#FBE9E7" }],
        action: "Complete Tasks",
      },
    ],
  },
  {
    id: "bid_submitted", title: "Bid Submitted", count: 1,
    color: "#E8F5E9", countBg: "#4CAF50",
    cards: [
      {
        id: "RFP-2026-009", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Bid Submitted - Date", dueDate: "Apr 25, 2026", dueTime: "Time" },
        action: "View Submission",
      },
    ],
  },
  {
    id: "query_response", title: "Query & Response", count: 1,
    color: "#FFF8E1", countBg: "#FFC107",
    cards: [
      {
        id: "RFP-2026-009", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Docs - pending", dueDate: "Apr 25, 2026", dueTime: "Time" },
        action: "Complete Tasks",
      },
    ],
  },
  {
    id: "result_awaited", title: "Result Awaited", count: 1,
    color: "#FBE9E7", countBg: "#FF5722",
    cards: [
      {
        id: "RFP-2026-009", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Result Awaited", deadline: "Apr 30, 2026" },
        wonLost: true,
      },
    ],
  },
  {
    id: "won", title: "Won (L1)", count: 2,
    color: "#E8F5E9", countBg: "#2E7D32",
    cards: [
      {
        id: "RFP-2026-007", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "PO Received", deadline: "Apr 30, 2026" },
        statusBadge: { text: "PO Awaiting", color: "#F5A623", bg: "#FFF4E0" },
      },
      {
        id: "RFP-2026-017", status: "No Cancelled", statusColor: "#F44336", statusBg: "#FBE9E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: [], tagColors: {},
        details: { status: "Bid Cancelled", deadline: "Apr 30, 2026" },
        statusBadge: { text: "Bid Cancelled", color: "#F44336", bg: "#FBE9E7" },
      },
    ],
  },
  {
    id: "po_received", title: "PO Received", count: 1,
    color: "#E3F0FB", countBg: "#1565C0",
    cards: [
      {
        id: "RFP-2026-007", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "PO Received", deadline: "Apr 30, 2026" },
        badge: { text: "Awarded", color: "#2E7D32", bg: "#E8F5E9" },
        poActions: true,
      },
    ],
  },
  {
    id: "lost", title: "Lost", count: 1,
    color: "#FBE9E7", countBg: "#C62828",
    cards: [
      {
        id: "RFP-2026-012", status: "Lost", statusColor: "#C62828", statusBg: "#FBE9E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["UVT"], tagColors: { UVT: "#F3E5F5" },
        details: { deadline: "Apr 08, 2026" },
        badge: { text: "Awarded", color: "#2E7D32", bg: "#E8F5E9" },
        lostActions: true,
      },
    ],
  },
];

export const NOTIFICATIONS = [
  { id:1, type:"success", title:"RFP Uploaded (New)",      rfpId:"TND-2026-005", amount:"₹500 Cr", firm:"Firm Name",  deadline:"Apr 25, 2026", time:"3h ago", action:"View RFP" },
  { id:2, type:"error",   title:"Bid Lost",                rfpId:"TND-2026-005", amount:"₹5 Cr",   firm:"Firm Name",  deadline:"Apr 25, 2026", time:"3h ago", action:"View RFP" },
  { id:3, type:"warning", title:"Result Awaited",          rfpId:"TND-2026-005", amount:"₹5 Cr",   firm:"Firm Name",  deadline:"Apr 25, 2026", time:"3h ago", action:"Update" },
  { id:4, type:"info",    title:"Reminder Pre-Bid Meeting",rfpId:"TND-2026-005", amount:"₹500 Cr", date:"Today", meetTime:"2:00PM", customer:"Customer Name", time:"3h ago", action:"View Link" },
  { id:5, type:"info",    title:"Reminder Pre-Bid Meeting",rfpId:"TND-2026-005", amount:"₹500 Cr", date:"Today", meetTime:"2:00PM", customer:"Customer Name", time:"3h ago", action:"View Link" },
];

export const SIDEBAR_NAV = [
  { icon:"⊞", label:"Dashboard" },
  { icon:"📋", label:"Sales & Pre-sales", expandable:true, active:true,
    children:[
      { label:"RFP Dashboard", active:true },
      { label:"RFP Analysis Form" },
      { label:"Pre-sales Checklist" },
      { label:"Comparison Sheet" },
      { label:"SOF" },
    ],
  },
  { icon:"👥", label:"Sales Coordinator", expandable:true },
  { icon:"📥", label:"Task Inbox",        expandable:true },
  { icon:"📈", label:"Tacker",            expandable:true },
  { icon:"📊", label:"Reports" },
  { icon:"🗄️", label:"Master Data" },
  { icon:"⚙️", label:"Settings" },
];
