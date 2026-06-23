import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Filter, Clock, Eye, Play, ChevronDown, CheckCircle, XCircle } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import SCNotificationPanel from "../../components/dashboard/SCNotificationPanel";
import RFPFormPanel from "../../components/dashboard/RFPFormPanel";
import SOFViewPanel from "../../components/dashboard/SOFViewPanel";

const FONT = "'Inter','Segoe UI',sans-serif";

const TASK_TABS = [
  { id: "new", label: "New Task (2)", icon: Clock },
  { id: "completed", label: "Completed (3)", icon: CheckCircle },
  { id: "pending", label: "Pending/ On Hold (0)", icon: XCircle },
];

const TASKS = [
  {
    id: 1,
    title: "SOF Validation - PID ID",
    priority: null,
    customer: "Customer Name",
    orderNo: "ORD NO.",
    value: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "Review & Validate", icon: Eye },
    secondaryAction: null,
  },
  {
    id: 2,
    title: "EMD Request - Tender No.",
    priority: "High",
    customer: "Customer Name",
    emdAmount: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "Generate EMD Form (CIPL)", icon: Play },
    secondaryAction: { label: "View RFP & Remark", icon: Eye },
  },
  {
    id: 3,
    title: "EMD Return Request - Tender No.",
    priority: null,
    customer: "Customer Name",
    emdAmount: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "dropdown", label: "Generate Release Letter", icon: Play, options: ["CIPL", "NIPL"] },
    secondaryAction: { label: "View RFP & Remark", icon: Eye },
  },
  {
    id: 4,
    title: "BG Expired - Order ID.",
    priority: null,
    customer: "Customer Name",
    emdAmount: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "dropdown", label: "Generate Release Letter", icon: Play, options: ["CIPL", "NIPL"] },
    secondaryAction: null,
  },
];

const COMPLETED_TASKS = [
  {
    id: 1,
    title: "SOF Validation - PID ID",
    priority: null,
    customer: "Customer Name",
    orderNo: "ORD NO.",
    value: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View SOF", icon: Eye },
    secondaryAction: null,
  },
  {
    id: 2,
    title: "EMD Request - Tender No.",
    priority: "High",
    customer: "Customer Name",
    emdAmount: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View EMD (CIPL)", icon: Eye },
    secondaryAction: null,
  },
  {
    id: 3,
    title: "EMD Return Request - Tender No.",
    priority: null,
    customer: "Customer Name",
    emdAmount: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View EMD Release Letter (Firm)", icon: Eye },
    secondaryAction: { label: "View EMD Release Letter (Firm)", icon: Eye },
  },
];

const DropdownButton = ({ label, icon: Icon, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          background: "#2563EB", color: "#fff", border: "none", borderRadius: 6,
          padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
          width: 200, justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {Icon && <Icon size={14} />} {label}
        </div>
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "100%", right: 0, marginTop: 4, width: "100%",
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          zIndex: 10, overflow: "hidden"
        }}>
          {options.map(opt => (
            <button key={opt} style={{
              width: "100%", textAlign: "left", padding: "10px 16px", border: "none", background: "#fff",
              fontSize: 13, color: "#374151", cursor: "pointer", borderBottom: "1px solid #F3F4F6",
            }} onMouseEnter={(e) => e.currentTarget.style.background = "#F9FAFB"} onMouseLeave={(e) => e.currentTarget.style.background = "#fff"} onClick={() => setOpen(false)}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TaskInboxCard = ({ task, onAction }) => {
  return (
    <div style={{ background: "#fff", display: "flex", justifyContent: "space-between", padding: "24px 0" }}>
      
      {/* Details */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#111827" }}>{task.title}</div>
          {task.priority === "High" && (
            <div style={{ background: "#EF4444", color: "#fff", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>High</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#6B7280", width: 90 }}>Customer:</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{task.customer}</span>
          </div>
          
          {task.orderNo && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <span style={{ color: "#6B7280", width: 90 }}>Order No.:</span>
              <span style={{ color: "#111827", fontWeight: 600 }}>{task.orderNo}</span>
            </div>
          )}
          {task.emdAmount && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <span style={{ color: "#6B7280", width: 90 }}>EMD Amount :</span>
              <span style={{ color: "#111827", fontWeight: 600 }}>{task.emdAmount}</span>
            </div>
          )}

          {task.value && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <span style={{ color: "#6B7280", width: 90 }}>Value:</span>
              <span style={{ color: "#111827", fontWeight: 600 }}>{task.value}</span>
            </div>
          )}
          
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#6B7280", width: 90 }}>Firm:</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{task.firm}</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#6B7280", width: 90 }}>Submitted By:</span>
            <span style={{ color: "#111827", fontWeight: 600 }}>{task.submittedBy}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280", marginTop: 16 }}>
          <Clock size={14} />
          {task.time}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
        {task.primaryAction && (
          task.primaryAction.type === "dropdown" ? (
            <DropdownButton {...task.primaryAction} />
          ) : (
            <button
              onClick={() => onAction(task.primaryAction.label, task)}
              style={{
                background: "#2563EB", color: "#fff", border: "none", borderRadius: 6,
                padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
              }}
            >
              {task.primaryAction.icon && <task.primaryAction.icon size={14} />}
              {task.primaryAction.label}
            </button>
          )
        )}
        
        {task.secondaryAction && (
          <button 
            onClick={() => onAction(task.secondaryAction.label, task)}
            style={{
              background: "#fff", color: "#374151", border: "1px solid #D1D5DB", borderRadius: 6,
              padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
            }}
          >
            {task.secondaryAction.icon && <task.secondaryAction.icon size={14} />}
            {task.secondaryAction.label}
          </button>
        )}
      </div>

    </div>
  );
};

const TaskInbox = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [activeTask, setActiveTask] = useState(null);
  const [sofPanelMode, setSofPanelMode] = useState(null); // null | "view" | "review"
  const navigate = useNavigate();

  const handleAction = (actionLabel, task) => {
    if (actionLabel === "View SOF") {
      setSofPanelMode("view");
    } else if (actionLabel === "Review & Validate") {
      setSofPanelMode("review");
    } else if (actionLabel === "Generate EMD Form (CIPL)") {
      navigate("/emd-form");
    } else if (actionLabel === "View RFP & Remark") {
      setActiveTask({
        id: task.id,
        tender: task.title,
        customer: task.customer,
        action: "View RFP & Remark"
      });
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F8F9FB" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
        
        <GlobalHeader />
        
        {/* Header */}
        <div style={{ padding: "24px 32px 16px", background: "#fff", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>Task Inbox</h1>
            <div style={{ fontSize: 12, color: "#6B7280" }}>Last updated: 2 hours ago</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setShowNotifications(true)} style={{ background  : "none", border: "none", cursor: "pointer", position: "relative" }}>
              <Bell size={20} color="#4B5563" />
              <div style={{ position: "absolute", top: -2, right: 0, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #fff" }} />
            </button>
            <button onClick={() => navigate("/sc-dashboard")} style={{ background: "#fff", color: "#000", border: "1px solid #D1D5DB", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Dashboard
            </button>
            <button style={{ background: "#155DFC", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
              Task Inbox
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: "20px 32px", display: "flex", gap: 16, alignItems: "center", background: "#fff" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 12px" }}>
            <Search size={16} color="#9CA3AF" />
            <input type="text" placeholder="Search Order/ PID No..." style={{ border: "none", outline: "none", fontSize: 13, marginLeft: 8, width: "100%", fontFamily: FONT, background: "transparent" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #E5E7EB", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}>
            <Filter size={14} /> Filters <ChevronDown size={14} />
          </button>
        </div>

        {/* Main Content Area */}
        <div style={{ padding: "0 32px 32px", background: "#fff", flex: 1 }}>
          
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, background: "#fff" }}>
            
            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 30, padding: 4, width: "100%" }}>
                {TASK_TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                      flex: 1, background: isActive ? "#fff" : "transparent",
                      border: "none", borderRadius: 24, padding: "10px 0",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      fontSize: 13, fontWeight: 600, color: isActive ? "#111827" : "#64748B",
                      boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                      cursor: "pointer", transition: "all 0.2s"
                    }}>
                      <Icon size={16} /> {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Task List */}
            <div style={{ padding: "0 32px" }}>
              {activeTab === "new" && TASKS.map((task, i) => (
                <div key={task.id} style={{ borderBottom: i < TASKS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <TaskInboxCard task={task} onAction={handleAction} />
                </div>
              ))}
              {activeTab === "completed" && COMPLETED_TASKS.map((task, i) => (
                <div key={task.id} style={{ borderBottom: i < COMPLETED_TASKS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <TaskInboxCard task={task} onAction={handleAction} />
                </div>
              ))}
              {activeTab === "pending" && (
                <div style={{ padding: "48px 0", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>
                  No pending tasks
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {showNotifications && (
        <SCNotificationPanel 
          onClose={() => setShowNotifications(false)} 
          onAction={handleAction} 
        />
      )}

      {activeTask && (
        <RFPFormPanel
          card={activeTask}
          onClose={() => setActiveTask(null)}
        />
      )}

      {sofPanelMode && (
        <SOFViewPanel mode={sofPanelMode} onClose={() => setSofPanelMode(null)} />
      )}
    </div>
  );
};

export default TaskInbox;
