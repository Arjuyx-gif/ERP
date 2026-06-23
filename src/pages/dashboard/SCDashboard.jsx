import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Filter, AlertCircle, Clock, CheckCircle, XCircle, Send, ArrowRight } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import SCNotificationPanel from "../../components/dashboard/SCNotificationPanel";
import RFPFormPanel from "../../components/dashboard/RFPFormPanel";
import SOFViewPanel from "../../components/dashboard/SOFViewPanel";

const FONT = "'Inter','Segoe UI',sans-serif";

const TOP_KPIS = [
  { title: "In process", value: 2, icon: Clock, color: "#F59E0B", bg: "#FEF3C7" },
  { title: "Approved Today", value: 1, icon: CheckCircle, color: "#10B981", bg: "#D1FAE5" },
  { title: "Rejected", value: 0, icon: XCircle, color: "#EF4444", bg: "#FEE2E2" },
  { title: "Notifications Sent", value: 1, icon: Send, color: "#3B82F6", bg: "#DBEAFE" },
];

const EMD_KPIS = [
  { title: "Pending EMD", value: 1, color: "#F59E0B" },
  { title: "EMD Submitted", value: 3, color: "#10B981" },
  { title: "Return Pending", value: 2, color: "#F59E0B" },
  { title: "Overdue EMD", value: 0, color: "#EF4444" },
  { title: "Returned", value: 1, color: "#10B981" },
  { title: "Lost Firms", value: 3, color: "#EF4444" },
];

const SOF_ROWS = [
  { pid: "PID No.", firm: "Firm Name", type: "SOF Validation", customer: "Customer Name", deadline: "Due Date", status: "Pending", action: "View" },
  { pid: "PID No.", firm: "Firm Name", type: "SOF Validation", customer: "Customer Name", deadline: "Due Date", status: "Completed", action: "View" },
];

const EMD_ROWS = [
  { tender: "TND-2026-045", customer: "Customer Name", firm: "CIPL", amount: "Amount", result: "", status: "Return Pending", action: "Return EMD", actionColor: "#EF4444" },
  { tender: "", customer: "", firm: "CIPL", amount: "Amount", result: "Awarded", status: "-", action: "View EMD", actionColor: "#3B82F6" },
  { tender: "TND-2026-045", customer: "Customer Name", firm: "UVT", amount: "Amount", result: "Lost", status: "Return Pending", action: "Return EMD", actionColor: "#EF4444" },
  { tender: "", customer: "", firm: "NIPL", amount: "Amount", result: "Lost", status: "Return Pending", action: "Return EMD", actionColor: "#EF4444" },
  { tender: "", customer: "", firm: "CIPL", amount: "Amount", result: "Pending", status: "In Process", action: "Return EMD", actionColor: "#EF4444" },
  { tender: "ORD-2026-045", customer: "Customer Name", firm: "CIPL", amount: "Amount", result: "Expired", status: "", action: "BG Release Letter", actionColor: "#EF4444" },
  { tender: "ORD-2026-045", customer: "Customer Name", firm: "CIPL", amount: "Amount", result: "Awarded", status: "In Process", action: "Generate BG", actionColor: "#3B82F6" },
];

const ACTIVITY_LOG = [
  { title: "EMD Submission Requested", details: "TND-2026-002 - XYZ Industries - ₹2,50,000", by: "Sales Coordinator", time: "May 03, 14:45", icon: Clock },
  { title: "EMD Return Initiated", details: "TND-2026-003 - Bid Lost - ₹1,00,000", by: "Sales Coordinator", time: "May 03, 14:15", icon: Clock },
  { title: "SOF Validated", details: "TND-2026-001 - ABC Manufacturing", by: "Sales Coordinator", time: "May 02, 22:00", icon: CheckCircle },
  { title: "SOF Filled by Accounts", details: "TND-2026-001 - ABC Manufacturing", by: "Accounts", time: "May 02, 22:00", icon: CheckCircle },
];

const ResultChip = ({ result }) => {
  if (!result) return null;
  const colorMap = {
    "Awarded": { bg: "#D1FAE5", text: "#059669" },
    "Lost": { bg: "#FEE2E2", text: "#DC2626" },
    "Pending": { bg: "#F1F5F9", text: "#475569" },
    "Expired": { bg: "#FEE2E2", text: "#DC2626" },
  };
  const style = colorMap[result] || { bg: "#F1F5F9", text: "#475569" };
  return (
    <div style={{ display: "inline-block", background: style.bg, color: style.text, padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>
      {result}
    </div>
  );
};

const SCDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTask, setActiveTask] = useState(null);
  const [sofPanelMode, setSofPanelMode] = useState(null);
  const navigate = useNavigate();

  const handleAction = (actionLabel, notif) => {
    if (actionLabel === "View RFP & Remark") {
      setActiveTask({
        id: notif.id,
        tender: notif.title || notif.tender,
        customer: notif.customer || "Customer Name",
        action: "View RFP & Remark"
      });
      setShowNotifications(false);
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
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>Sales Coordinator Portal</h1>
            <div style={{ fontSize: 12, color: "#6B7280" }}>Last updated: 2 hours ago</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setShowNotifications(true)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
              <Bell size={20} color="#4B5563" />
              <div style={{ position: "absolute", top: -2, right: 0, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #fff" }} />
            </button>
            <button onClick={() => navigate("/sc-dashboard")} style={{ background: "#155DFC", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Dashboard
            </button>
            <button onClick={() => navigate("/task-inbox")} style={{ background: "#fff", color: "#374151", border: "1px solid #D1D5DB", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
              Task Inbox
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: "20px 32px 0", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, padding: "8px 12px" }}>
            <Search size={16} color="#9CA3AF" />
            <input type="text" placeholder="Search Order / PID ID..." style={{ border: "none", outline: "none", fontSize: 13, marginLeft: 8, width: "100%", fontFamily: FONT, background: "transparent" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #E5E7EB", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}>
            <Filter size={14} /> Filters <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 6, padding: 4 }}>
            {["All", "Needs Action", "Completed"].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                background: activeFilter === f ? "#fff" : "transparent",
                border: "none",
                boxShadow: activeFilter === f ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                padding: "6px 12px", borderRadius: 4, fontSize: 12, fontWeight: 600,
                color: activeFilter === f ? "#111827" : "#64748B", cursor: "pointer", transition: "all 0.2s"
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "20px 32px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Validation Alert */}
          <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <AlertCircle size={18} color="#2563EB" style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1E3A8A", marginBottom: 4 }}>New SOF Submitted — Validation Required</div>
              <div style={{ fontSize: 12, color: "#1D4ED8" }}>3 orders awaiting validation</div>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: "flex", gap: 20 }}>
            {/* Top KPIs */}
            <div style={{ display: "flex", gap: 16, flex: 1 }}>
              {TOP_KPIS.map(kpi => {
                const Icon = kpi.icon;
                return (
                  <div key={kpi.title} style={{ flex: 1, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: kpi.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <Icon size={20} color={kpi.color} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", marginBottom: 8 }}>{kpi.title}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>{kpi.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EMD Tracking */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12, marginLeft: 8 }}>EMD Tracking</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {EMD_KPIS.map(kpi => (
                <div key={kpi.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#6B7280" }}>{kpi.title}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SOF Validations Table */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>SOF Validations</div>
              <a href="#" style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", textDecoration: "none" }}>View All</a>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
                    {["PID No./Tender no.", "Firm Name", "Type", "Customer", "Deadline", "Status", "Action"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#64748B", textAlign: "center" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SOF_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < SOF_ROWS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#3B82F6", fontWeight: 500, textAlign: "center" }}>{row.pid}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.firm}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <svg width="14" height="14" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        {row.type}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.customer}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.deadline}</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <div style={{ display: "inline-block", background: row.status === "Pending" ? "#FFEDD5" : "#D1FAE5", color: row.status === "Pending" ? "#C2410C" : "#059669", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>
                          {row.status}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button
                          onClick={() => setSofPanelMode(row.status === "Pending" ? "review" : "view")}
                          style={{ background: "none", border: "none", color: "#3B82F6", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
                        >
                          {row.action} <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EMD / BG Tracker Table */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>EMD/ BG Tracker</div>
              <a href="#" style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", textDecoration: "none" }}>View All</a>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
                    {["Tender ID / PID", "Customer Name", "Firm", "EMD Amount", "Result", "Status", "Action"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#64748B", textAlign: "center" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EMD_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < EMD_ROWS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#3B82F6", fontWeight: 500, textAlign: "center" }}>{row.tender}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.customer}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.firm}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.amount}</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <ResultChip result={row.result} />
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569", textAlign: "center" }}>{row.status}</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button style={{ background: "none", border: "none", color: row.actionColor, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {row.action} <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Log */}
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden", padding: "20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Activity Log</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>Recent actions and updates</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
              <div style={{ position: "absolute", left: 15, top: 20, bottom: 20, width: 2, background: "#E5E7EB" }} />
              {ACTIVITY_LOG.map((log, i) => {
                const Icon = log.icon;
                return (
                  <div key={i} style={{ display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EFF6FF", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color="#3B82F6" />
                    </div>
                    <div style={{ flex: 1, paddingTop: 4 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{log.title}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF" }}>{log.time}</div>
                      </div>
                      <div style={{ fontSize: 12, color: "#4B5563", marginBottom: 2 }}>{log.details}</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>by {log.by}</div>
                    </div>
                  </div>
                );
              })}
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
        <SOFViewPanel
          mode={sofPanelMode}
          onClose={() => setSofPanelMode(null)}
        />
      )}
    </div>
  );
};

export default SCDashboard;
