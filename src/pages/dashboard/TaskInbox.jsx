import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Filter, Clock, Eye, Play, ChevronDown, CheckCircle, XCircle } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import SCNotificationPanel from "../../components/dashboard/SCNotificationPanel";
import RFPFormPanel from "../../components/dashboard/RFPFormPanel";
import SOFViewPanel from "../../components/dashboard/SOFViewPanel";
import SOFConfirmForm from "../../components/dashboard/SOFConfirmForm";
import { FONT, COLORS } from "../../styles/theme";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TASK_TABS = [
  { id: "new",       label: "New Task (2)",          icon: Clock },
  { id: "completed", label: "Completed (4)",          icon: CheckCircle },
  { id: "pending",   label: "Pending/ On Hold (0)",   icon: XCircle },
];

const TASKS = [
  {
    id: 1, title: "SOF Validation - PID ID", priority: null,
    customer: "Customer Name", orderNo: "ORD NO.", value: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction:   { type: "button",   label: "Review & Validate",      icon: Eye },
    secondaryAction: null,
  },
  {
    id: 2, title: "EMD Request - Tender No.", priority: "High",
    customer: "Customer Name", emdAmount: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction:   { type: "button",   label: "Generate EMD Form (CIPL)", icon: Play },
    secondaryAction: { label: "View RFP & Remark", icon: Eye },
  },
  {
    id: 3, title: "EMD Return Request - Tender No.", priority: null,
    customer: "Customer Name", emdAmount: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction:   { type: "dropdown", label: "Generate Release Letter", icon: Play, options: ["CIPL", "NIPL"] },
    secondaryAction: { label: "View RFP & Remark", icon: Eye },
  },
  {
    id: 4, title: "BG Expired - Order ID.", priority: null,
    customer: "Customer Name", emdAmount: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction:   { type: "dropdown", label: "Generate Release Letter", icon: Play, options: ["CIPL", "NIPL"] },
    secondaryAction: null,
  },
];

const COMPLETED_TASKS = [
  {
    id: 1, title: "SOF Validation - PID ID", priority: null,
    customer: "Customer Name", orderNo: "ORD NO.", value: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View SOF", icon: Eye },
    secondaryAction: null,
  },
  {
    id: 2, title: "EMD Request - Tender No.", priority: "High",
    customer: "Customer Name", emdAmount: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View EMD (CIPL)", icon: Eye },
    secondaryAction: null,
  },
  {
    id: 3, title: "EMD Return Request - Tender No.", priority: null,
    customer: "Customer Name", emdAmount: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction:   { type: "button", label: "View EMD Release Letter (Firm)", icon: Eye },
    secondaryAction: { label: "View EMD Release Letter (Firm)", icon: Eye },
  },
  {
    id: 4, title: "BG Expired – Order ID.", priority: null,
    customer: "Customer Name", emdAmount: "₹ Price",
    firm: "Firm Name", submittedBy: "Dept", time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View BG Release Letter (Firm)", icon: Eye },
    secondaryAction: null,
  },
];

// ─── DropdownButton ────────────────────────────────────────────────────────────

const DropdownButton = ({ label, icon: Icon, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ background: COLORS.primary, color: COLORS.bgWhite, border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", whiteSpace: "nowrap" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {Icon && <Icon size={14} />} {label}
        </div>
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, minWidth: "100%", background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, borderRadius: 6, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden" }}>
          {options.map(opt => (
            <button key={opt} onClick={() => setOpen(false)}
              style={{ width: "100%", textAlign: "left", padding: "10px 16px", border: "none", background: COLORS.bgWhite, fontSize: 13, color: COLORS.textSecondary, cursor: "pointer", borderBottom: `1px solid ${COLORS.borderLight}` }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.bgWhite}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── TaskInboxCard ─────────────────────────────────────────────────────────────

const TaskInboxCard = ({ task, onAction }) => (
  <div style={{ background: COLORS.bgWhite, display: "flex", justifyContent: "space-between", padding: "24px 0" }}>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.text }}>{task.title}</div>
        {task.priority === "High" && (
          <div style={{ background: "#EF4444", color: COLORS.bgWhite, padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>High</div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          ["Customer",     task.customer],
          task.orderNo  && ["Order No.",    task.orderNo],
          task.emdAmount && ["EMD Amount :", task.emdAmount],
          task.value    && ["Value",        task.value],
          ["Firm",         task.firm],
          ["Submitted By", task.submittedBy],
        ].filter(Boolean).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: COLORS.textMuted, width: 90 }}>{k}:</span>
            <span style={{ color: COLORS.text, fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted, marginTop: 16 }}>
        <Clock size={14} /> {task.time}
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
      {task.primaryAction && (
        task.primaryAction.type === "dropdown"
          ? <DropdownButton {...task.primaryAction} />
          : (
            <button
              onClick={() => onAction(task.primaryAction.label, task)}
              style={{ background: COLORS.primary, color: COLORS.bgWhite, border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            >
              {task.primaryAction.icon && <task.primaryAction.icon size={14} />}
              {task.primaryAction.label}
            </button>
          )
      )}
      {task.secondaryAction && (
        <button
          onClick={() => onAction(task.secondaryAction.label, task)}
          style={{ background: COLORS.bgWhite, color: COLORS.textSecondary, border: `1px solid #D1D5DB`, borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          {task.secondaryAction.icon && <task.secondaryAction.icon size={14} />}
          {task.secondaryAction.label}
        </button>
      )}
    </div>
  </div>
);

// ─── TaskInbox page ────────────────────────────────────────────────────────────

const TaskInbox = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab]   = useState("new");
  const [activeTask, setActiveTask] = useState(null);
  const [sofPanelMode, setSofPanelMode]     = useState(null); // null | "view" | "review"
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const navigate = useNavigate();

  const handleAction = (label, task) => {
    if      (label === "View SOF")               setSofPanelMode("view");
    else if (label === "Review & Validate")      setSofPanelMode("review");
    else if (label === "Generate EMD Form (CIPL)") navigate("/emd-form");
    else if (label === "View RFP & Remark")      setActiveTask({ id: task.id, tender: task.title, customer: task.customer, action: label });
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: COLORS.bgPage }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>

        <GlobalHeader />

        {/* Page header */}
        <div style={{ padding: "24px 32px 16px", background: COLORS.bgWhite, borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Task Inbox</h1>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Last updated: 2 hours ago</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setShowNotifications(true)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
              <Bell size={20} color="#4B5563" />
              <div style={{ position: "absolute", top: -2, right: 0, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #fff" }} />
            </button>
            <button onClick={() => navigate("/sc-dashboard")}
              style={{ background: COLORS.bgWhite, color: COLORS.text, border: `1px solid #D1D5DB`, padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Dashboard
            </button>
            <button style={{ background: "#155DFC", color: COLORS.bgWhite, border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
              Task Inbox
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: "20px 32px", display: "flex", gap: 16, alignItems: "center", background: COLORS.bgWhite }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 12px" }}>
            <Search size={16} color={COLORS.textSubtle} />
            <input type="text" placeholder="Search Order/ PID No..." style={{ border: "none", outline: "none", fontSize: 13, marginLeft: 8, width: "100%", fontFamily: FONT, background: "transparent" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, color: COLORS.textSecondary, cursor: "pointer" }}>
            <Filter size={14} /> Filters <ChevronDown size={14} />
          </button>
        </div>

        {/* Main content */}
        {showConfirmForm ? (
          <SOFConfirmForm onClose={() => setShowConfirmForm(false)} />
        ) : (
          <div style={{ padding: "0 32px 32px", background: COLORS.bgWhite, flex: 1 }}>
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.bgWhite }}>

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, padding: "20px 24px" }}>
                <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 30, padding: 4, width: "100%" }}>
                  {TASK_TABS.map(tab => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, background: active ? COLORS.bgWhite : "transparent", border: "none", borderRadius: 24, padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontWeight: 600, color: active ? COLORS.text : "#64748B", boxShadow: active ? "0 1px 2px rgba(0,0,0,0.05)" : "none", cursor: "pointer", transition: "all 0.2s" }}>
                        <Icon size={16} /> {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Task lists */}
              <div style={{ padding: "0 32px" }}>
                {activeTab === "new" && TASKS.map((task, i) => (
                  <div key={task.id} style={{ borderBottom: i < TASKS.length - 1 ? `1px solid #F1F5F9` : "none" }}>
                    <TaskInboxCard task={task} onAction={handleAction} />
                  </div>
                ))}
                {activeTab === "completed" && COMPLETED_TASKS.map((task, i) => (
                  <div key={task.id} style={{ borderBottom: i < COMPLETED_TASKS.length - 1 ? `1px solid #F1F5F9` : "none" }}>
                    <TaskInboxCard task={task} onAction={handleAction} />
                  </div>
                ))}
                {activeTab === "pending" && (
                  <div style={{ padding: "48px 0", textAlign: "center", color: COLORS.textSubtle, fontSize: 14 }}>
                    No pending tasks
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {showNotifications && (
        <SCNotificationPanel onClose={() => setShowNotifications(false)} onAction={handleAction} />
      )}
      {activeTask && (
        <RFPFormPanel card={activeTask} onClose={() => setActiveTask(null)} />
      )}
      {sofPanelMode && (
        <SOFViewPanel
          mode={sofPanelMode}
          onClose={() => setSofPanelMode(null)}
          onConfirm={() => { setSofPanelMode(null); setShowConfirmForm(true); }}
        />
      )}
    </div>
  );
};

export default TaskInbox;
