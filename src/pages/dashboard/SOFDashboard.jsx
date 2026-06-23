import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Bell, X, ArrowRight, Play } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const SOF_ROWS = [
  { id: "Order/PID ID no.", firm: "Firm Name", customer: "Customer Name", value: "₹4.50Cr", status: "Completed", pendingWith: "-", inputsRequired: null, deadline: "-", highlight: "green", actionType: "view" },
  { id: "Order/PID ID no.", firm: "Firm Name", customer: "Customer Name", value: "₹4.50Cr", status: "Waiting for Inputs", pendingWith: "Sales", inputsRequired: { label: "Specifications", type: "purple" }, deadline: "20 Apr 2026", highlight: "yellow", actionType: "view" },
  { id: "Order/PID ID no.", firm: "Firm Name", customer: "Customer Name", value: "₹4.50Cr", status: "Pending", pendingWith: "-", inputsRequired: null, deadline: "20 Apr 2026", highlight: "yellow", actionType: "continue" },
  { id: "Order/PID ID no.", firm: "Firm Name", customer: "Customer Name", value: "₹4.50Cr", status: "Partial Material Received", pendingWith: "Purchase", inputsRequired: { label: "Vendor Material", type: "orange" }, deadline: "20 Apr 2026", highlight: "yellow", actionType: "view" },
  { id: "Order/PID ID no.", firm: "Firm Name", customer: "Customer Name", value: "₹4.50Cr", status: "Full Material Received", pendingWith: "-", inputsRequired: { label: "Vendor Price", type: "orange" }, deadline: "20 Apr 2026", highlight: "yellow", actionType: "view" },
];

import { CheckCircle2, AlertCircle, FileText } from "lucide-react";

const SOF_NOTIFICATIONS = [
  {
    icon: <CheckCircle2 size={18} color="#16A34A" />, title: "PO Received - Start SOF Creation",
    details: [
      { label: "Order ID", value: "ORD-2026-005" }, { label: "Tender ID", value: "TND-2026-005" },
      { label: "Amount", value: "₹500 Cr" }, { label: "Firm", value: "Firm Name" }
    ],
    time: "3h ago", action: "Create SOF"
  },
  {
    icon: <CheckCircle2 size={18} color="#16A34A" />, title: "Material Arriving",
    details: [
      { label: "Order ID", value: "ORD-2026-005" }, { label: "PID No.", value: "PID no._________" },
      { label: "Amount", value: "₹500 Cr" }, { label: "Firm", value: "Firm Name" }
    ],
    remark: "Material delivery is scheduled within 24 hours"
  },
  {
    icon: <AlertCircle size={18} color="#DC2626" />, title: "SOF Rejected",
    details: [
      { label: "Order ID", value: "ORD-2026-005" }, { label: "PID No.", value: "PID no._________" },
      { label: "Amount", value: "₹500 Cr" }, { label: "Firm", value: "Firm Name" }
    ],
    remark: "Remarks by Sales Coordinator", time: "3h ago", action: "View Remark & SOF"
  },
  {
    icon: <FileText size={18} color="#2563EB" />, title: "Service Team Updated SOF",
    details: [
      { label: "Order ID", value: "ORD-2026-005" }, { label: "PID No.", value: "PID no._________" },
      { label: "Amount", value: "₹500 Cr" }, { label: "Firm", value: "Firm Name" }
    ],
    time: "3h ago", action: "View SOF"
  },
  {
    icon: <FileText size={18} color="#2563EB" />, title: "Additional Document Uploaded",
    details: [
      { label: "Tender ID", value: "TND-2026-005" }, { label: "Amount", value: "₹500 Cr" },
      { label: "Customer", value: "Customer Name" }, { label: "Deadline", value: "Apr 25, 2026" }
    ]
  }
];

const COLUMNS = [
  { key: "id", label: "Order/ PID ID No", width: "14%" },
  { key: "firm", label: "Firm Name", width: "12%" },
  { key: "customer", label: "Customer", width: "14%" },
  { key: "value", label: "Value", width: "10%" },
  { key: "status", label: "Status", width: "14%" },
  { key: "pendingWith", label: "Pending With", width: "10%" },
  { key: "inputsRequired", label: "Inputs Required", width: "12%" },
  { key: "deadline", label: "Deadline", width: "10%" },
  { key: "action", label: "Action", width: "12%" },
];

const SOFDashboard = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [showFilterDrop, setShowFilterDrop] = useState(false);
  const [filter, setFilter] = useState("Completed");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#fff" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          
          {/* Header Area */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>SOF Action Board</h1>
              <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Last updated: 2 hours ago</p>
            </div>
            <button
              onClick={() => navigate("/sales-order-form")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 20px", border: "none", borderRadius: 6,
                background: "#2563EB", color: "#fff",
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
              }}
            >
              <Plus size={16} /> Create SOF
            </button>
          </div>

          {/* Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 16 }}>
            
            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6,
              padding: "8px 14px", flex: 1,
            }}>
              <Search size={16} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search Order/PID No. / Customer..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#374151", fontFamily: FONT }}
              />
            </div>

            {/* Right side: Bell, Filters & Tabs */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setShowNotifications(true)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, background: "#fff", border: "none", cursor: "pointer"
                }}
              >
                <Bell size={20} color="#374151" />
              </button>
              
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowFilterDrop(!showFilterDrop)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", border: "1px solid #E5E7EB", borderRadius: 6,
                    background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer",
                    fontFamily: FONT
                  }}
                >
                  <Filter size={14} color="#6B7280" /> Filters <span style={{ fontSize: 10, color: "#9CA3AF" }}>▼</span>
                </button>
                
                {showFilterDrop && (
                  <div style={{
                    position: "absolute", top: "100%", right: 0, marginTop: 4,
                    background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    zIndex: 10, minWidth: 180, display: "flex", flexDirection: "column"
                  }}>
                    {["Draft", "Order Placed", "Partial Material Received", "Full Order Received", "Dispatched", "Completed"].map(f => (
                      <button
                        key={f}
                        onClick={() => { setFilter(f); setShowFilterDrop(false); }}
                        style={{
                          padding: "10px 16px", border: "none", background: filter === f ? "#93C5FD" : "#fff",
                          textAlign: "left", fontSize: 13, color: filter === f ? "#000" : "#111827",
                          cursor: "pointer", fontFamily: FONT, width: "100%",
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{
                display: "flex", background: "#F3F4F6", borderRadius: 6, padding: 4, gap: 4
              }}>
                {["All", "Needs Action", "Completed"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "6px 14px", border: "none",
                      background: tab === t ? "#fff" : "transparent",
                      fontSize: 13, fontWeight: tab === t ? 500 : 400,
                      color: tab === t ? "#111827" : "#4B5563",
                      cursor: "pointer", fontFamily: FONT,
                      boxShadow: tab === t ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                      borderRadius: 4,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "0 -32px 24px" }} />

          {/* Alert Box */}
          {showAlert && (
            <div style={{
              background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: 8, padding: "16px 20px",
              marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <ArrowRight size={18} color="#0284C7" />
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0369A1", margin: 0 }}>
                    New PO Arrived — SOF action required
                  </h3>
                </div>
                <div style={{ fontSize: 13, color: "#0C4A6E", display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <span><strong>PO:</strong> PO FILE.</span>
                  <span><strong>Tender ID:</strong> TND-2026</span>
                  <span><strong>Customer:</strong> Customer Name</span>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => navigate("/sales-order-form")} style={{
                    padding: "6px 16px", background: "#2563EB", border: "none", borderRadius: 6,
                    color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT
                  }}>
                    Open SOF
                  </button>
                  <button style={{
                    padding: "6px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 6,
                    color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT
                  }}>
                    View Details
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={18} color="#9CA3AF" />
              </button>
            </div>
          )}

          {/* Table */}
          <div style={{
            background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  {COLUMNS.map((col, idx) => (
                    <th key={col.key} style={{
                      padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#374151",
                      borderRight: idx < COLUMNS.length - 1 ? "1px solid #E5E7EB" : "none",
                      width: col.width
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOF_ROWS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < SOF_ROWS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                    
                    {/* Order ID */}
                    <td style={{ padding: "14px 16px", borderRight: "1px solid #E5E7EB" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: row.highlight === "green" ? "#16A34A" : "#F59E0B" }} />
                        <span style={{ color: "#2563EB", fontWeight: 600, fontSize: 13 }}>{row.id}</span>
                      </div>
                    </td>

                    {/* Firm Name */}
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.firm}</td>
                    
                    {/* Customer */}
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.customer}</td>
                    
                    {/* Value */}
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.value}</td>
                    
                    {/* Status */}
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.status}</td>
                    
                    {/* Pending With */}
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.pendingWith}</td>
                    
                    {/* Inputs Required */}
                    <td style={{ padding: "14px 16px", borderRight: "1px solid #E5E7EB" }}>
                      {row.inputsRequired ? (
                        <span style={{
                          display: "inline-block", padding: "4px 10px", borderRadius: 4, fontSize: 12, fontWeight: 500,
                          background: row.inputsRequired.type === "purple" ? "#F3E8FF" : "#FFEDD5",
                          color: row.inputsRequired.type === "purple" ? "#7E22CE" : "#C2410C",
                          border: `1px solid ${row.inputsRequired.type === "purple" ? "#E9D5FF" : "#FED7AA"}`
                        }}>
                          {row.inputsRequired.label}
                        </span>
                      ) : <span style={{ color: "#9CA3AF" }}>-</span>}
                    </td>
                    
                    {/* Deadline */}
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280", borderRight: "1px solid #E5E7EB" }}>{row.deadline}</td>
                    
                    {/* Action */}
                    <td style={{ padding: "14px 16px" }}>
                      {row.actionType === "view" ? (
                        <button
                          onClick={() => navigate("/sales-order-form", { state: { step: 10, showUploadModal: false } })}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "#155DFC", border: "none", borderRadius: 8, color: "#fff",
                            padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Play size={16} strokeWidth={2} /> View SOF
                        </button>
                      ) : (
                        <button style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          background: "#fff", border: "1px solid #D1D5DB", borderRadius: 8, color: "#111827",
                          padding: "8px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT
                        }}>
                          Continue SOF
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <>
          {/* Blurred Backdrop */}
          <div 
            onClick={() => setShowNotifications(false)}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 999
            }}
          />
          
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: 450,
            background: "#fff", zIndex: 1000, boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
            display: "flex", flexDirection: "column", fontFamily: FONT
          }}>
          {/* Panel Header */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Bell size={20} color="#111827" />
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 }}>Notifications</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button style={{
                  background: "none", border: "none", color: "#2563EB", fontSize: 13,
                  fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Mark all as read
                </button>
                <button onClick={() => setShowNotifications(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <X size={20} color="#9CA3AF" />
                </button>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Workflow alerts, tasks & updates</p>
          </div>

          {/* Panel Body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: "#FAFAFA" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 12, marginTop: 0 }}>Notifications</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOF_NOTIFICATIONS.map((notif, i) => (
                <div key={i} style={{
                  background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: 16,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ marginTop: 2 }}>{notif.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 8px" }}>{notif.title}</h4>
                      <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.6, marginBottom: notif.remark ? 12 : (notif.action ? 12 : 0) }}>
                        {notif.details.map((d, idx) => (
                          <div key={idx}><strong>{d.label}:</strong> {d.value}</div>
                        ))}
                      </div>
                      
                      {notif.remark && (
                        <div style={{
                          background: "#F3F4F6", padding: "8px 12px", borderRadius: 6,
                          fontSize: 12, color: "#374151", fontWeight: 500, marginBottom: notif.action ? 12 : 0
                        }}>
                          Remark: "{notif.remark}"
                        </div>
                      )}

                      {(notif.time || notif.action) && (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{notif.time || ""}</span>
                          {notif.action && (
                            <button style={{
                              background: "#000", color: "#fff", border: "none", borderRadius: 4,
                              padding: "6px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer",
                              display: "flex", alignItems: "center", gap: 6, fontFamily: FONT
                            }}>
                              {notif.action} <ArrowRight size={12} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SOFDashboard;
