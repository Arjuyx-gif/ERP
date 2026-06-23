import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Filter, Clock, Eye, Play, ChevronDown, CheckCircle, XCircle, Plus, X } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import SCNotificationPanel from "../../components/dashboard/SCNotificationPanel";
import RFPFormPanel from "../../components/dashboard/RFPFormPanel";
import SOFViewPanel from "../../components/dashboard/SOFViewPanel";

const FONT = "'Inter','Segoe UI',sans-serif";

const TASK_TABS = [
  { id: "new", label: "New Task (2)", icon: Clock },
  { id: "completed", label: "Completed (4)", icon: CheckCircle },
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
  {
    id: 4,
    title: "BG Expired – Order ID.",
    priority: null,
    customer: "Customer Name",
    emdAmount: "₹ Price",
    firm: "Firm Name",
    submittedBy: "Dept",
    time: "2026-04-22 09:30 AM",
    primaryAction: { type: "button", label: "View BG Release Letter (Firm)", icon: Eye },
    secondaryAction: null,
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
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {Icon && <Icon size={14} />} {label}
        </div>
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "100%", right: 0, marginTop: 4, minWidth: "100%",
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

const DEPT_ROWS = [
  { key: "purchase", label: "Purchase", badge: 1 },
  { key: "accounts", label: "Accounts", badge: 1 },
];

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 6,
  fontSize: 13, color: "#374151", fontFamily: FONT, outline: "none",
  boxSizing: "border-box", background: "#fff",
};

const DEPT_OPTIONS = ["Purchase", "Accounts", "Service Team", "Stores", "Sales", "Legal", "HR", "Finance"];

const DeptDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const ref = useRef();

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(v => !v)}
        style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: val ? "#374151" : "#9CA3AF" }}
      >
        <span>{val || "Select Dept."}</span>
        <ChevronDown size={14} color="#9CA3AF" style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, zIndex: 50, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", marginTop: 2 }}>
          {DEPT_OPTIONS.map(opt => (
            <div
              key={opt}
              onClick={() => { setVal(opt); setOpen(false); onSelect(opt); }}
              style={{ padding: "9px 12px", fontSize: 13, color: "#374151", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const SOFConfirmForm = ({ onClose }) => {
  const [depts, setDepts] = useState(DEPT_ROWS);
  const [pendingDepts, setPendingDepts] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [sent, setSent] = useState(false);
  const [sentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }) +
      ", " + now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
  });

  const addDept = () => {
    setPendingDepts(p => [...p, { id: Date.now() }]);
  };

  const confirmPending = (id, label) => {
    if (!label) return;
    const key = label.toLowerCase() + "_" + id;
    setDepts(d => [...d, { key, label, badge: 0 }]);
    setPendingDepts(p => p.filter(x => x.id !== id));
  };

  const removePending = (id) => setPendingDepts(p => p.filter(x => x.id !== id));

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", paddingBottom: 80 }}>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>

          {/* Card header */}
          <div style={{ padding: "18px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>Sales Order Form</span>
              <span style={{ fontSize: 13, color: "#9CA3AF" }}>PID No. –&nbsp;<span style={{ borderBottom: "1px solid #D1D5DB", paddingBottom: 1 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </div>
            <button style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
              SOF Validation
            </button>
          </div>

          {/* Customer / Firm */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Customer Name</label>
              <input type="text" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Firm Name</label>
              <input type="text" style={inputStyle} />
            </div>
          </div>

          {/* Order Value + Priority */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: "#2563EB" }}>₹</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#2563EB" }}>Order Value</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1E40AF" }}>₹1,25,000</div>
            </div>
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#16A34A" }}>Priority</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#DC2626" }}>High</div>
            </div>
          </div>

          {/* Products */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Products</div>
            <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              {["HP All-In-One Desktop (x15)", "HP LaserJet Pro Printer (x3)"].map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                  <span style={{ width: 6, height: 6, background: "#2563EB", borderRadius: "50%", flexShrink: 0 }} />
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Department Notifications Summary */}
          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Department Notifications Summary</div>
              <button
                onClick={addDept}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}
                onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <Plus size={13} /> Add
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Confirmed depts */}
              {depts.map((dept, idx) => {
                const isLast = idx === depts.length - 1 && pendingDepts.length === 0;
                return (
                  <div key={dept.key} style={{ borderBottom: !isLast ? "1px solid #F3F4F6" : "none", paddingBottom: !isLast ? 16 : 0, marginBottom: !isLast ? 16 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{dept.label}</span>
                      {dept.badge > 0 && (
                        <span style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{dept.badge} New</span>
                      )}
                    </div>
                    <label style={{ display: "block", fontSize: 12, color: "#6B7280", marginBottom: 5 }}>Remarks</label>
                    <textarea
                      value={remarks[dept.key] || ""}
                      onChange={e => setRemarks(r => ({ ...r, [dept.key]: e.target.value }))}
                      style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                      placeholder="Add remarks..."
                    />
                  </div>
                );
              })}

              {/* Pending (unselected) dept rows */}
              {pendingDepts.map((p, idx) => (
                <div key={p.id} style={{ borderTop: depts.length > 0 || idx > 0 ? "1px solid #F3F4F6" : "none", paddingTop: depts.length > 0 || idx > 0 ? 16 : 0, marginTop: depts.length > 0 || idx > 0 ? 0 : 0, paddingBottom: idx < pendingDepts.length - 1 ? 16 : 0, marginBottom: idx < pendingDepts.length - 1 ? 0 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Select Dept.</span>
                    <button
                      onClick={() => removePending(p.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 2, display: "flex", alignItems: "center" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#EF4444"}
                      onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <DeptDropdown onSelect={label => confirmPending(p.id, label)} />
                </div>
              ))}
            </div>

            {/* Confirm & Send / Sent */}
            <div style={{ marginTop: 20 }}>
              {sent ? (
                <div style={{ width: "100%", padding: "13px 0", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#F9FAFB" }}>
                  <CheckCircle size={16} color="#6B7280" />
                  Sent
                </div>
              ) : (
                <button
                  onClick={() => setSent(true)}
                  style={{ width: "100%", padding: "13px 0", background: "#16A34A", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#15803D"}
                  onMouseLeave={e => e.currentTarget.style.background = "#16A34A"}
                >
                  <CheckCircle size={16} />
                  Confirm &amp; Send
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Activity Log — shown after sending */}
        {sent && (
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginTop: 16, padding: "20px 24px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Activity Log</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Approved entry */}
              <div style={{ border: "1px solid #BBF7D0", borderRadius: 8, padding: "12px 16px", background: "#F0FDF4" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5 5.5 4 8 8.5 2"/></svg>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>ORDER ID</span>
                  <svg width="12" height="12" fill="none" stroke="#9CA3AF" strokeWidth="2"><line x1="2" y1="6" x2="10" y2="6"/><polyline points="7 3 10 6 7 9"/></svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Sales Coordination</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2, marginLeft: 26 }}>SOF Validated and Approved</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginLeft: 26 }}>Order value: ₹125,000, Customer: Customer Name</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 26, marginTop: 4 }}>NAME (Sales Coordinator) &nbsp;•&nbsp; {sentTime}</div>
              </div>

              {/* One entry per confirmed dept */}
              {depts.map(dept => (
                <div key={dept.key} style={{ border: "1px solid #BFDBFE", borderRadius: 8, padding: "12px 16px", background: "#EFF6FF" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#DBEAFE", border: "2px solid #93C5FD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="10" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"><circle cx="5" cy="5" r="4"/><line x1="5" y1="3" x2="5" y2="5"/><line x1="5" y1="7" x2="5.01" y2="7"/></svg>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>ORDER ID</span>
                    <svg width="12" height="12" fill="none" stroke="#9CA3AF" strokeWidth="2"><line x1="2" y1="6" x2="10" y2="6"/><polyline points="7 3 10 6 7 9"/></svg>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{dept.label}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2, marginLeft: 26 }}>Notification sent to {dept.label} Team</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginLeft: 26 }}>
                    {remarks[dept.key] ? remarks[dept.key] : `Action required: Review and process for SOF validation`}
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 26, marginTop: 4 }}>NAME (Sales Coordinator) &nbsp;•&nbsp; {sentTime}</div>
                </div>
              ))}

            </div>

            {/* Close */}
            <div style={{ marginTop: 16 }}>
              <button
                onClick={onClose}
                style={{ width: "100%", padding: "12px 0", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "#374151", background: "#fff", cursor: "pointer", fontFamily: FONT }}
                onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                Close
              </button>
            </div>
          </div>
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
  const [showConfirmForm, setShowConfirmForm] = useState(false);
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
        {showConfirmForm ? (
          <SOFConfirmForm onClose={() => setShowConfirmForm(false)} />
        ) : (
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
        )}

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
