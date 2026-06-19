import { useState } from "react";
import { Search, Filter, Bell, Plus, X, Edit, Eye, FileText, Clock, CheckCircle2, Users, AlertCircle, User, ChevronDown } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const KPI_CARDS = [
  { label: "Total Sheets", value: "24", valueColor: "#2563EB", bg: "#EFF6FF", icon: <FileText size={18} color="#2563EB" /> },
  { label: "Drafts", value: "6", valueColor: "#D97706", bg: "#FEF3C7", icon: <Clock size={18} color="#D97706" /> },
  { label: "Completed", value: "18", valueColor: "#0891B2", bg: "#CFFAFE", icon: <CheckCircle2 size={18} color="#0891B2" /> },
  { label: "Sumitted", value: "18", valueColor: "#16A34A", bg: "#DCFCE7", icon: <CheckCircle2 size={18} color="#16A34A" /> },
  { label: "Avg Vendor Compared", value: "4", valueColor: "#9333EA", bg: "#F3E8FF", icon: <Users size={18} color="#9333EA" /> },
];

const COMPARISON_ROWS = Array(6).fill({
  id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name"
});

const MODAL_ROWS = Array(5).fill({
  id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", 
  vendors: 3, l1Vendor: "Vendor Name", lowestPrice: "₹2,85,000", status: "Lose", updated: "15-04-2026", createdBy: "Person Name"
});

const RECENT_ACTIVITY = [
  { title: "Comparison sheet created - TENDER ID", subtitle: "Dept/Team • 2 hours ago" },
  { title: "Comparison sheet created - TENDER ID", subtitle: "Dept/Team • 2 hours ago" },
];

const NOTIFICATIONS = [
  {
    type: "alert", title: "Bid Lost",
    details: [{ label: "Tender ID", value: "TND-2026-005" }, { label: "Firm", value: "Firm Name" }],
    time: "3h ago", action: "Generate Comparison Sheet →"
  },
  {
    type: "info", title: "Comparison Sheet Viewed",
    details: [{ label: "Tender ID", value: "TND-2026-005" }],
    time: "3h ago", action: "View Comparison Sheet →"
  },
  {
    type: "info", title: "Comparison Sheet Completed",
    details: [{ label: "Tender ID", value: "TND-2026-005" }],
    time: "3h ago", action: "View Comparison Sheet →"
  },
];

const ComparisonSheet = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", fontFamily: FONT, background: "#F9FAFB" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
          
          {/* Top Section */}
          <div style={{ padding: "32px 32px 24px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>Comparison Sheet</h1>
                <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Vendor Analysis & Decision Support</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div 
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#fff", border: "1px solid #E5E7EB", position: "relative" }}
                >
                  <Bell size={20} color="#4B5563" />
                  <div style={{ position: "absolute", top: 10, right: 11, width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#2563EB", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  <Plus size={16} /> Create
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
              {KPI_CARDS.map((kpi, i) => (
                <div key={i} style={{ flex: 1, minWidth: 160, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{kpi.label}</span>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: kpi.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {kpi.icon}
                    </div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: kpi.valueColor }}>{kpi.value}</div>
                </div>
              ))}
            </div>

            {/* Search & Filters */}
            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={18} color="#9CA3AF" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type="text" 
                  placeholder="Search RFP ID / Customer..." 
                  style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 6, border: "1px solid #E5E7EB", outline: "none", fontSize: 13, boxSizing: "border-box" }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, color: "#374151", cursor: "pointer", height: 42 }}
                >
                  <Filter size={16} color="#6B7280" /> Filter <ChevronDown size={14} color="#6B7280" />
                </button>
                {showFilters && (
                  <>
                    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }} onClick={() => setShowFilters(false)} />
                    <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, width: 140, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 20, overflow: "hidden" }}>
                      {["All Status", "Draft", "Pending", "Completed"].map((status, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            padding: "10px 16px", fontSize: 13, color: i === 0 ? "#000" : "#374151", 
                            cursor: "pointer", background: i === 0 ? "#93C5FD" : "#fff", 
                            borderBottom: i < 3 ? "1px solid #E5E7EB" : "none" 
                          }}
                          onClick={() => setShowFilters(false)}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Split */}
          <div style={{ padding: 32, display: "flex", gap: 24 }}>
            
            {/* Left: Main Table */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 16 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                  <Edit size={14} /> Edit
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}
                >
                  <Eye size={14} /> View
                </button>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                      <th style={{ padding: "16px", textAlign: "center", fontWeight: 600, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>Tender ID</th>
                      <th style={{ padding: "16px", textAlign: "center", fontWeight: 600, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>Firm Name</th>
                      <th style={{ padding: "16px", textAlign: "center", fontWeight: 600, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>Tender Title</th>
                      <th style={{ padding: "16px", textAlign: "center", fontWeight: 600, color: "#6B7280" }}>Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < COMPARISON_ROWS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                        <td style={{ padding: "16px", textAlign: "center", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.id}</td>
                        <td style={{ padding: "16px", textAlign: "center", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.firm}</td>
                        <td style={{ padding: "16px", textAlign: "center", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.title}</td>
                        <td style={{ padding: "16px", textAlign: "center", color: "#6B7280" }}>{row.customer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Recent Activity Sidebar */}
            <div style={{ width: 320, flexShrink: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, borderBottom: "1px solid #E5E7EB", paddingBottom: 16 }}>
                <Clock size={18} color="#111827" />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: 0 }}>Recent Activity</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {RECENT_ACTIVITY.map((act, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DBEAFE", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <User size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#111827", margin: "0 0 4px" }}>{act.title}</p>
                      <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{act.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }} onClick={() => setShowNotifications(false)} />
              <div style={{ position: "absolute", top: 16, right: 16, width: 420, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", zIndex: 50, display: "flex", flexDirection: "column", maxHeight: "calc(100% - 32px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "20px 24px", borderBottom: "1px solid #E5E7EB" }}>
                  <div>
                    <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, color: "#111827", margin: "0 0 4px" }}>
                      <Bell size={18} /> Notifications
                    </h2>
                    <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Workflow alerts, tasks & updates</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <CheckCircle2 size={14} /> Mark all as read
                    </span>
                    <X size={18} color="#9CA3AF" style={{ cursor: "pointer" }} onClick={() => setShowNotifications(false)} />
                  </div>
                </div>

                <div style={{ padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", margin: "0 0 4px" }}>Notifications</p>
                  
                  {NOTIFICATIONS.map((notif, i) => (
                    <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 16, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        {notif.type === "alert" ? <AlertCircle size={18} color="#EF4444" style={{ marginTop: 2 }} /> : <FileText size={18} color="#2563EB" style={{ marginTop: 2 }} />}
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 6px" }}>{notif.title}</h4>
                          <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#6B7280" }}>
                            {notif.details.map((d, j) => (
                              <span key={j}>{d.label}: {d.value}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{notif.time}</span>
                        <button style={{ background: "#111827", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          {notif.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* View All Modal */}
          {showModal && (
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", padding: 24 }}>
              <div style={{ background: "#fff", width: "100%", maxWidth: 1400, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}>
                
                <div style={{ padding: "16px 24px", display: "flex", justifyContent: "flex-end", borderBottom: "1px solid #E5E7EB" }}>
                  <X size={20} color="#6B7280" style={{ cursor: "pointer" }} onClick={() => setShowModal(false)} />
                </div>
                
                <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, border: "1px solid #E5E7EB" }}>
                    <thead>
                      <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Tender ID</th>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Firm Name</th>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Tender Title</th>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Customer</th>
                        <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Vendors</th>
                        <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>L1 Vendor</th>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Lowest Price</th>
                        <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Status</th>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Last Updated</th>
                        <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB" }}>Created By</th>
                        <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODAL_ROWS.map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < MODAL_ROWS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.id}</td>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.firm}</td>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.title}</td>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.customer}</td>
                          <td style={{ padding: "16px", textAlign: "center", borderRight: "1px solid #E5E7EB" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", border: "1px solid #E5E7EB", color: "#6B7280" }}>{row.vendors}</span>
                          </td>
                          <td style={{ padding: "16px", textAlign: "center", borderRight: "1px solid #E5E7EB" }}>
                            <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 12px", borderRadius: 16, fontSize: 12, fontWeight: 500 }}>{row.l1Vendor}</span>
                          </td>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.lowestPrice}</td>
                          <td style={{ padding: "16px", textAlign: "center", borderRight: "1px solid #E5E7EB" }}>
                            <span style={{ background: "#FEF2F2", color: "#EF4444", border: "1px solid #FECACA", padding: "4px 12px", borderRadius: 16, fontSize: 12, fontWeight: 500 }}>{row.status}</span>
                          </td>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.updated}</td>
                          <td style={{ padding: "16px", color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.createdBy}</td>
                          <td style={{ padding: "16px", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#374151", cursor: "pointer", fontWeight: 500 }}><Eye size={14} /> View</span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#374151", cursor: "pointer", fontWeight: 500 }}><Edit size={14} /> Edit</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ComparisonSheet;
