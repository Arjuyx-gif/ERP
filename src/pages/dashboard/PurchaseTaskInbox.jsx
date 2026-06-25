import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Search, Filter, ShoppingCart, CheckSquare, Clock, CheckCircle } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import { FONT, COLORS } from "../../styles/theme";
import ProcessPOModal from "../../components/dashboard/ProcessPOModal";
import WorkflowTimelineModal from "../../components/dashboard/WorkflowTimelineModal";
import SOFViewPanel from "../../components/dashboard/SOFViewPanel";

// Mock Data for Purchase Task Inbox
const NEW_TASKS = [
  {
    id: 1,
    title: "PO for Order ID",
    customer: "Name",
    vendor: "Name",
    firm: "Name",
    status: "NEW",
    dueDate: "Today",
    action: "Start PO"
  },
  {
    id: 2,
    title: "PO for Order ID",
    customer: "Name",
    vendor: "Name",
    firm: "Name",
    status: "NEW",
    dueDate: "Today",
    action: "Start PO"
  },
  {
    id: 3,
    title: "PO for Order ID",
    customer: "Name",
    vendor: "Name",
    firm: "Name",
    status: "IN PROGRESS",
    dueDate: "Today",
    action: "Complete PO"
  }
];

const CURRENT_PROCESSING = [
  {
    id: 1,
    title: "Order Placed for Order ID________",
    vendor: "Name of the vendor",
    firm: "Name of the Firm",
    delivery: "1-3 weeks",
    action: "Mark as Material Received"
  }
];

const ACTIVITY_LOG = [
  {
    id: 1,
    type: "success",
    orderId: "ORDER ID - _________",
    action: "Purchase order placed to vendor",
    vendor: "NAME (Vendor Name)",
    time: "Today, 2:40:22 PM",
    firm: "Name",
    remark: ""
  },
  {
    id: 2,
    type: "pending",
    orderId: "ORDER ID - _________",
    action: "Purchase order placed to vendor",
    vendor: "NAME (Vendor Name)",
    time: "4/21/2026, 2:40:22 PM",
    firm: "Name",
    remark: ""
  }
];

const ALL_TASKS = [
  {
    id: 1, title: "Order ID - PO -", date: "Apr 21, 2026", status: "NEW", statusColor: "#EA580C", statusBg: "#FFEDD5",
    vendor: "Name", material: "Pending Confirmation", firm: "Name", expected: "May 10, 2026",
    progress: 0, stage: "Create PO", remark: null,
    button: "Start PO", buttonIcon: "Start", buttonVariant: "primary", lastUpdated: "4/21/2026, 2:40:22 PM"
  },
  {
    id: 2, title: "Order ID - PO -", date: "Apr 21, 2026", status: "NEW", statusColor: "#EA580C", statusBg: "#FFEDD5",
    vendor: "Name", material: "Pending Confirmation", firm: "Name", expected: "May 10, 2026",
    progress: 0, stage: "Create PO", remark: null,
    button: "Start PO", buttonIcon: "Start", buttonVariant: "primary", lastUpdated: "4/21/2026, 2:40:22 PM"
  },
  {
    id: 3, title: "Order ID - PO -", date: "Apr 21, 2026", status: "IN PROGRESS", statusColor: "#fff", statusBg: "#EFF6FF", // Actually light blue text #2563EB ? Wait, IN PROGRESS is blue bg, white text? No, it's light blue bg, blue text.
    vendor: "Name", material: "Pending Confirmation", firm: "Name", expected: "May 10, 2026",
    progress: 1, stage: "PO Created 100%", remark: null,
    button: "Send to Vendor", buttonIcon: "Send", buttonVariant: "primary", lastUpdated: "4/21/2026, 2:40:22 PM"
  },
  {
    id: 4, title: "Order ID - PO -", date: "Apr 21, 2026", status: "DELAYED", statusColor: "#EF4444", statusBg: "#FEE2E2",
    vendor: "Name", material: "Pending Confirmation", firm: "Name", expected: "May 10, 2026",
    progress: 2, stage: "Partial Material Received", remark: "Remaining material arriving on May 6",
    button: "Follow Up", buttonIcon: "Info", buttonVariant: "primary", lastUpdated: "4/21/2026, 2:40:22 PM"
  },
  {
    id: 5, title: "Order ID - PO -", date: "Apr 21, 2026", status: "COMPLETED", statusColor: "#10B981", statusBg: "#D1FAE5",
    vendor: "Name", material: "Pending Confirmation", firm: "Name", expected: "May 10, 2026",
    progress: 3, stage: "Billing Done", remark: "-",
    button: "View Workflow", buttonIcon: "Check", buttonVariant: "primary", lastUpdated: "4/21/2026, 2:40:22 PM"
  },
  {
    id: 6, title: "Order ID - PO -", date: "Apr 21, 2026", status: "IN PROGRESS", statusColor: "#2563EB", statusBg: "#DBEAFE",
    vendor: "Name", material: "Arriving", firm: "Name", expected: "May 10, 2026",
    progress: 2, stage: "Update Status", remark: "In Transit",
    button: "Update Status", buttonIcon: "Check", buttonVariant: "primary", lastUpdated: "4/21/2026, 2:40:22 PM"
  }
];

// Helper to fix the IN PROGRESS status colors for mock 3
ALL_TASKS[2].statusColor = "#2563EB";
ALL_TASKS[2].statusBg = "#DBEAFE";

// Notification panel with blur backdrop (matches SCNotificationPanel pattern)
const NotificationsPanel = ({ onClose }) => (
  <>
    {/* Backdrop with blur */}
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 990,
        background: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
      }}
    />

    {/* Slide-out Panel */}
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 400,
      background: "#fff", zIndex: 991, boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
      display: "flex", flexDirection: "column", fontFamily: FONT,
      animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      {/* Header */}
      <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.border}` }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, color: "#0F172A" }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            Notifications
          </div>
          <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>Workflow alerts, tasks & updates</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ background: "none", border: "none", color: "#3B82F6", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <CheckSquare size={14} /> Mark all as read
          </button>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      {/* Scrollable List */}
      <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>Notifications</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* SOF Approved */}
          <div style={{ border: "1px solid #E2E8F0", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ marginTop: 2 }}><CheckCircle size={18} color="#10B981" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>SOF Approved</div>
                  <div style={{ fontSize: 12, color: "#64748B", display: "flex", flexDirection: "column", gap: 3, marginBottom: 8 }}>
                    <div>PID ID: PID-2026-005</div>
                    <div>Amount: ₹500 Cr</div>
                    <div>Deadline: Apr 25, 2026</div>
                    <div>Firm: Name</div>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#475569", marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, color: "#0F172A" }}>Remark: </span>"Proceed with Purchase Order"
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>3h ago</span>
                    <button style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: FONT }}>
                      View SOF <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Material Delayed */}
          <div style={{ border: "1px solid #E2E8F0", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ marginTop: 2, color: "#EF4444" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Material Delayed</div>
                  <div style={{ fontSize: 12, color: "#64748B", display: "flex", flexDirection: "column", gap: 3, marginBottom: 8 }}>
                    <div>Order ID: ORD-2026-005</div>
                    <div>Amount: ₹5 Cr</div>
                    <div>Deadline: Apr 25, 2026</div>
                    <div>Firm: Name</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>3h ago</span>
                    <button style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: FONT }}>
                      Confirm Status <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PO Submitted */}
          <div style={{ border: "1px solid #E2E8F0", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ marginTop: 2, color: "#3B82F6" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>PO Submitted</div>
                  <div style={{ fontSize: 12, color: "#64748B", display: "flex", flexDirection: "column", gap: 3, marginBottom: 8 }}>
                    <div>Order ID: ORD-2026-005</div>
                    <div>Amount: ₹500 Cr</div>
                    <div>Customer: Customer Name</div>
                    <div>Deadline: Apr 25, 2026</div>
                    <div>Firm: Name</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>3h ago</span>
                    <button style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: FONT }}>
                      Update Status <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Material Arriving in 3 Days */}
          <div style={{ border: "1px solid #E2E8F0", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ marginTop: 2, color: "#F59E0B" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Material Arriving in 3 Days</div>
                  <div style={{ fontSize: 12, color: "#64748B", display: "flex", flexDirection: "column", gap: 3, marginBottom: 8 }}>
                    <div>Order ID: ORD-2026-005</div>
                    <div>Amount: ₹500 Cr</div>
                    <div>Customer: Customer Name</div>
                    <div>Firm: Name</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>3h ago</span>
                    <button style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: FONT }}>
                      View PO <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to   { transform: translateX(0); }
      }
    `}</style>
  </>
);

// Helper to get button icons
const getButtonIcon = (iconName) => {
  if (iconName === "Start") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
  if (iconName === "Send") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
  if (iconName === "Info") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
  if (iconName === "Check") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
  return null;
};

const PurchaseTaskInbox = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(location.state?.showTaskBox || false);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [showSOFDetails, setShowSOFDetails] = useState(false);
  const [showFilterDrop, setShowFilterDrop] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [receivedTasks, setReceivedTasks] = useState(new Set());
  const navigate = useNavigate();

  const FILTER_OPTIONS = ["Draft", "Order Placed", "Partial Material Received", "Full Order Received", "Completed"];

  const filterMatch = (task) => {
    if (!activeFilter) return true;
    if (activeFilter === "Draft") return task.progress === 0;
    if (activeFilter === "Order Placed") return task.progress === 1;
    if (activeFilter === "Partial Material Received") return task.stage?.includes("Partial");
    if (activeFilter === "Full Order Received") return task.stage?.includes("Billing") || task.stage?.includes("Full");
    if (activeFilter === "Completed") return task.status === "COMPLETED";
    return true;
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: COLORS.bgPage }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
        <GlobalHeader />

        {/* Page header */}
        <div style={{ padding: "24px 32px 16px", background: COLORS.bgWhite, borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
              Task Inbox - <span style={{ border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "2px 8px", fontSize: 14, fontWeight: 500, color: COLORS.textSecondary }}>Purchase Team</span>
            </h1>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Last updated: 2 hours ago</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setShowNotifications(true)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
              <Bell size={20} color="#4B5563" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: "20px 32px", display: "flex", gap: 16, alignItems: "center", background: COLORS.bgWhite }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 12px" }}>
            <Search size={16} color={COLORS.textSubtle} />
            <input type="text" placeholder="Search Order/ PID No..." style={{ border: "none", outline: "none", fontSize: 13, marginLeft: 8, width: "100%", fontFamily: FONT, background: "transparent" }} />
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowFilterDrop(v => !v)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: activeFilter ? "#EFF6FF" : COLORS.bgWhite, border: `1px solid ${activeFilter ? "#2563EB" : COLORS.border}`, padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, color: activeFilter ? "#2563EB" : COLORS.textSecondary, cursor: "pointer" }}
            >
              <Filter size={14} /> {activeFilter || "Filters"} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {showFilterDrop && (
              <>
                <div onClick={() => setShowFilterDrop(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 11, minWidth: 220, padding: "6px 0" }}>
                  {activeFilter && (
                    <button
                      onClick={() => { setActiveFilter(null); setShowFilterDrop(false); }}
                      style={{ width: "100%", textAlign: "left", padding: "9px 16px", fontSize: 13, background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontFamily: FONT, fontWeight: 500 }}
                    >
                      Clear filter
                    </button>
                  )}
                  {FILTER_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setActiveFilter(opt); setShowFilterDrop(false); }}
                      style={{ width: "100%", textAlign: "left", padding: "9px 16px", fontSize: 13, background: activeFilter === opt ? "#EFF6FF" : "none", border: "none", cursor: "pointer", color: activeFilter === opt ? "#2563EB" : "#374151", fontFamily: FONT, fontWeight: activeFilter === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        {!showAllTasks ? (
          <div style={{ padding: "0 32px 32px", background: COLORS.bgWhite, flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
            {/* New task & Alerts */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, background: COLORS.bgWhite }}>
              <div style={{ padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, margin: 0 }}>New task & Alerts</h2>
                <div style={{ background: "#FEE2E2", color: "#EF4444", padding: "4px 12px", borderRadius: 16, fontSize: 12, fontWeight: 600 }}>3 Urgent</div>
              </div>
              <div style={{ padding: "0 24px" }}>
                {NEW_TASKS.map((task, i) => (
                  <div key={task.id} style={{ borderBottom: i < NEW_TASKS.length - 1 ? `1px solid ${COLORS.borderLight}` : "none", padding: "20px 0", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.primary }}>
                        <ShoppingCart size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>{task.title}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 }}>
                          <div>Customer: {task.customer}</div>
                          <div>Vendor: {task.vendor}</div>
                          <div>Firm: {task.firm}</div>
                        </div>
                        <div style={{ background: task.status === "NEW" ? "#FFEDD5" : "#FFEDD5", color: "#EA580C", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600, display: "inline-block" }}>
                          {task.status}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                      <div style={{ fontSize: 12, color: COLORS.textMuted }}>Due: {task.dueDate}</div>
                      <button
                        onClick={() => {
                          if (task.action === "Start PO") navigate("/purchase-order-form");
                          else if (task.action === "Complete PO") setProcessModalOpen(true);
                        }}
                        style={{ background: COLORS.primary, color: COLORS.bgWhite, border: "none", padding: "8px 24px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        {task.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "16px", borderTop: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                <button onClick={() => setShowAllTasks(true)} style={{ background: "none", border: "none", color: COLORS.textSecondary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View All Tasks</button>
              </div>
            </div>

            {/* Current Processing */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <CheckSquare size={18} color={COLORS.textSecondary} /> Current Processing
              </h2>
              {CURRENT_PROCESSING.map(task => (
                <div key={task.id} style={{ border: `1px solid #BFDBFE`, borderRadius: 8, background: "#F8FAFC", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.primary, display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.primary }}></div>
                      {task.title}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 }}>Vendor: {task.vendor}</div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 }}>Firm: {task.firm}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFEDD5", color: "#EA580C", padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>
                      <Clock size={14} /> Expected delivery: {task.delivery}
                    </div>
                  </div>
                  {receivedTasks.has(task.id) ? (
                    <button style={{ background: "#00A63E", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "default", display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle size={15} /> Material Received
                    </button>
                  ) : (
                    <button
                      onClick={() => setReceivedTasks(prev => new Set([...prev, task.id]))}
                      style={{ background: COLORS.primary, color: COLORS.bgWhite, border: "none", padding: "10px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                      {task.action}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Activity Log */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, margin: "0 0 16px" }}>Activity Log</h2>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, background: COLORS.bgWhite, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                {ACTIVITY_LOG.map(log => (
                  <div key={log.id} style={{ border: `1px solid ${log.type === "success" ? "#86EFAC" : "#93C5FD"}`, borderRadius: 6, background: log.type === "success" ? "#F0FDF4" : "#EFF6FF", padding: "16px 20px", display: "flex", gap: 12 }}>
                    <div style={{ marginTop: 2 }}>
                      {log.type === "success" ? <CheckCircle size={16} color="#10B981" /> : <Clock size={16} color="#3B82F6" />}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>{log.orderId}</div>
                      <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 }}>{log.action}</div>
                      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{log.vendor} • {log.time}</div>
                      <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 }}>Firm: {log.firm}</div>
                      <div style={{ fontSize: 13, color: COLORS.textMuted }}>Remark: {log.remark}</div>
                    </div>
                  </div>
                ))}
                
                <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 6, background: "#F8FAFC", padding: "16px 20px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>ADD Internal Remark</div>
                  <input type="text" placeholder="Additional remark/reminder for team" style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: 13, color: COLORS.text, fontFamily: FONT }} />
                </div>
              </div>
              <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderTop: "none", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, textAlign: "center", background: COLORS.bgWhite, marginTop: -8 }}>
                <button style={{ background: "none", border: "none", color: COLORS.textSecondary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View All Activity</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "0 32px 32px", background: COLORS.bgWhite, flex: 1 }}>
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, background: COLORS.bgWhite }}>
              
              {/* Task Box Header */}
              <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: COLORS.text, margin: 0 }}>Task Box</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 12px", background: "#fff", width: 200 }}>
                    <Search size={14} color={COLORS.textSubtle} />
                    <input type="text" placeholder="Search orders..." style={{ border: "none", outline: "none", fontSize: 12, marginLeft: 8, width: "100%", fontFamily: FONT }} />
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${COLORS.border}`, padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 500, color: COLORS.textSecondary, cursor: "pointer" }}>
                    <Filter size={14} /> All Tasks <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div style={{ background: "#FEE2E2", color: "#EF4444", padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 600 }}>3 Urgent</div>
                </div>
              </div>

              {/* Task Box Grid */}
              <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, background: "#FAFAFA" }}>
                {ALL_TASKS.filter(filterMatch).map(task => (
                  <div key={task.id} style={{ background: "#fff", border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, display: "flex", flexDirection: "column" }}>
                    {/* Card Header */}
                    <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.primary, flexShrink: 0 }}>
                          <ShoppingCart size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{task.title}</div>
                          <div style={{ fontSize: 12, color: COLORS.textMuted }}>{task.date}</div>
                        </div>
                      </div>
                      <div style={{ background: task.statusBg, color: task.statusColor, padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                        {task.status}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary }}><span style={{ fontWeight: 600, color: COLORS.text }}>Vendor:</span> {task.vendor}</div>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary }}><span style={{ fontWeight: 600, color: COLORS.text }}>Material:</span> {task.material}</div>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary }}><span style={{ fontWeight: 600, color: COLORS.text }}>Firm:</span> {task.firm}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>
                        <Clock size={14} /> Expected: {task.expected}
                      </div>
                    </div>

                    {/* Card Footer / Progress */}
                    <div style={{ padding: "20px", borderTop: `1px solid ${COLORS.borderLight}`, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase" }}>WORKFLOW STAGE</div>
                      
                      {/* Progress Bars */}
                      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                        {[0, 1, 2, 3].map(idx => (
                          <div key={idx} style={{ height: 6, borderRadius: 3, flex: 1, background: idx < task.progress ? COLORS.primary : "#E5E7EB" }} />
                        ))}
                      </div>

                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: task.remark ? 8 : 16 }}>
                        {task.stage}
                      </div>
                      {task.remark && (
                        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 16 }}>
                          <span style={{ fontWeight: 600, color: COLORS.text }}>Remark:</span> {task.remark}
                        </div>
                      )}

                      <button 
                        onClick={() => {
                          if (task.button === "Start PO") {
                            navigate("/purchase-order-form");
                          } else if (task.button === "Send to Vendor") {
                            setProcessModalOpen(true);
                          } else if (task.button === "View Workflow") {
                            setWorkflowModalOpen(true);
                          }
                        }}
                        style={{ width: "100%", background: COLORS.primary, color: "#fff", border: "none", padding: "10px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", marginBottom: 16 }}
                      >
                        {getButtonIcon(task.buttonIcon)}
                        {task.button}
                      </button>

                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                        Last updated: {task.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div style={{ padding: "16px 24px", borderTop: `1px solid ${COLORS.borderLight}`, display: "flex", justifyContent: "center" }}>
                <button onClick={() => setShowAllTasks(false)} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, padding: "10px 48px", borderRadius: 6, fontSize: 13, fontWeight: 600, color: COLORS.text, cursor: "pointer" }}>
                  Close
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      {processModalOpen && (
        <ProcessPOModal
          onClose={() => setProcessModalOpen(false)}
          onViewSOF={() => { setProcessModalOpen(false); setShowSOFDetails(true); }}
        />
      )}
      {workflowModalOpen && <WorkflowTimelineModal onClose={() => setWorkflowModalOpen(false)} />}
      {showSOFDetails && <SOFViewPanel mode="view" onClose={() => setShowSOFDetails(false)} />}
    </div>
  );
};

export default PurchaseTaskInbox;
