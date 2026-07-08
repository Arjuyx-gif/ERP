import { useState } from "react";
import { X, Circle } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const MOCK_TENDERS = [
  { id: "TND-2026-046", priority: "High", priorityBg: "#FEF2F2", priorityColor: "#EF4444", status: "In Progress", updated: "25 min ago", customer: "Customer Name", title: "Tender Title", deadline: "Jun 29, 2026", currentStageIndex: 3, bg: "#fff", border: "#E5E7EB" },
  { id: "TND-2026-046", priority: "High", priorityBg: "#FEF2F2", priorityColor: "#EF4444", status: "In Progress", updated: "45 min ago", customer: "Customer Name", title: "Tender Title", deadline: "Jun 29, 2026", currentStageIndex: 4, bg: "#FEFCE8", border: "#FDE68A" },
  { id: "TND-2026-046", priority: "High", priorityBg: "#FEF2F2", priorityColor: "#EF4444", status: "In Progress", updated: "2 hrs ago", customer: "Customer Name", title: "Tender Title", deadline: "Jun 29, 2026", currentStageIndex: 2, bg: "#fff", border: "#E5E7EB" },
  { id: "TND-2026-046", priority: "Medium", priorityBg: "#FFFBEB", priorityColor: "#F59E0B", status: "In Progress", updated: "6 hrs ago", customer: "Customer Name", title: "Tender Title", deadline: "Jun 29, 2026", currentStageIndex: 5, bg: "#fff", border: "#E5E7EB" },
  { id: "TND-2026-046", priority: "Low", priorityBg: "#F0FDF4", priorityColor: "#10B981", status: "In Progress", updated: "Yesterday", customer: "Customer Name", title: "Tender Title", deadline: "Aug 01, 2026", currentStageIndex: 0, bg: "#fff", border: "#E5E7EB" },
];

const STAGES = ["Assigned", "Pre-Sales - Checklist", "Pre-Bid", "OEM", "Bid", "Post-Bid", "Result"];

const MemberViewModal = ({ open, onClose, member }) => {
  const [activeTab, setActiveTab] = useState("All");

  if (!open || !member) return null;

  return (
    <>
      <style>{`
        @keyframes memberViewBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes memberViewModalIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        .member-view-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .member-view-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .member-view-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .member-view-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
          animation: "memberViewBackdropIn 0.25s ease-out both",
        }}
      />

      {/* Modal Container */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: "800px", maxWidth: "90vw",
        height: "85vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "memberViewModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>
        
        {/* Header - Fixed */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{
              width: 42, height: 42, borderRadius: "10px", background: "#2563EB",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              PS
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>
                  {member.name || "Pre - Sales Member Name"}
                </h2>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: member.statusColor || "#DC2626",
                  border: `1px solid ${member.statusColor || "#DC2626"}40`, borderRadius: 20,
                  padding: "2px 10px", background: `${member.statusColor || "#DC2626"}10`,
                }}>{member.status || "Overloaded"}</span>
              </div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>
                Pre-Sales Executive • 6 assigned tenders
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"}
            onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Stats & Workload - Fixed */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#2563EB" }}>{member.active ?? 5}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Active</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#F59E0B" }}>{member.pending ?? 1}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Pending</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#10B981" }}>{member.done ?? 0}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Done</div>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: 300, margin: "0 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#6B7280" }}>Workload</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{member.workload ?? 95}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${member.workload ?? 95}%`, background: "#DC2626", borderRadius: 3 }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#10B981", fontSize: 12, fontWeight: 600 }}>
            <Circle size={8} fill="#10B981" stroke="none" />
            Live tracking active
          </div>
        </div>

        {/* Tabs - Fixed */}
        <div style={{ padding: "0 24px", borderBottom: "1px solid #E5E7EB", display: "flex", gap: 24 }}>
          {["All (6)", "Active (5)", "Pending (1)", "Done (0)"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none", border: "none", padding: "16px 0", cursor: "pointer",
                fontSize: 13, fontWeight: activeTab === tab ? 600 : 500,
                color: activeTab === tab ? "#2563EB" : "#6B7280",
                borderBottom: activeTab === tab ? "2px solid #2563EB" : "2px solid transparent",
                fontFamily: FONT, transition: "all 0.2s"
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tenders List - Scrollable */}
        <div className="member-view-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: "#F9FAFB" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_TENDERS.map((tender, idx) => (
              <div key={idx} style={{
                background: tender.bg, border: `1px solid ${tender.border}`, borderRadius: 10,
                padding: "16px", display: "flex", flexDirection: "column", gap: 12
              }}>
                {/* Tender Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#2563EB" }}>{tender.id}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600, color: tender.priorityColor,
                        background: tender.priorityBg, padding: "2px 8px", borderRadius: 4, border: `1px solid ${tender.priorityColor}40`
                      }}>{tender.priority}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 2 }}>{tender.customer}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>
                      {tender.title} • Deadline: <span style={{ fontWeight: 600, color: "#111827" }}>{tender.deadline}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#10B981", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                      <Circle size={8} fill="#10B981" stroke="none" />
                      {tender.status}
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>Updated {tender.updated}</div>
                  </div>
                </div>

                {/* Progress Bar & Stages */}
                <div style={{ marginTop: 4 }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                    {STAGES.map((_, i) => (
                      <div key={i} style={{
                        height: 4, flex: 1, borderRadius: 2,
                        background: i <= tender.currentStageIndex ? "#2563EB" : "#E5E7EB"
                      }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {STAGES.map((stage, i) => {
                      let bg = "#F3F4F6";
                      let color = "#9CA3AF";
                      let weight = 500;
                      if (i < tender.currentStageIndex) {
                        bg = "#EFF6FF";
                        color = "#3B82F6";
                      } else if (i === tender.currentStageIndex) {
                        bg = "#2563EB";
                        color = "#fff";
                        weight = 600;
                      }
                      return (
                        <div key={i} style={{
                          padding: "4px 10px", borderRadius: 4, background: bg,
                          color: color, fontSize: 11, fontWeight: weight, whiteSpace: "nowrap"
                        }}>
                          {stage}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div style={{
          padding: "16px 24px", borderTop: "1px solid #E5E7EB", background: "#fff",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>
            Showing 6 of 6 tenders
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                padding: "9px 16px", border: "none", borderRadius: 8,
                background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff",
                cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1D4ED8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563EB"}
            >
              Assign New Tender
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 8,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
                cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default MemberViewModal;
