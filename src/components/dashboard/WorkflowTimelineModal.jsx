import { X, Package, Truck, MessageSquare, CheckCircle, Send, FileText } from "lucide-react";
import { FONT, COLORS } from "../../styles/theme";

const TIMELINE_DATA = [
  {
    id: 1,
    title: "Complete Material Received",
    time: "11 May 2026\n10:30 am",
    role1: "Purchase", role1Color: "blue",
    role2: "Vendor",
    remark: "Material received and verified. Quality check passed.",
    color: "#10B981", // green
    bg: "#F0FDF4",
    icon: <Package size={18} />
  },
  {
    id: 2,
    title: "Material Dispatched",
    time: "11 May 2026\n10:30 am",
    role1: "Vendor", role1Color: "purple",
    role2: "Vendor",
    remark: "Complete order of 110 units dispatched",
    color: "#3B82F6", // blue
    bg: "#EFF6FF",
    icon: <Truck size={18} />
  },
  {
    id: 3,
    title: "Delay Reported by Vendor",
    time: "11 May 2026\n10:30 am",
    role1: "Purchase", role1Color: "blue",
    role2: "Vendor",
    remark: "Remaining material delayed due to stock issue",
    color: "#F59E0B", // orange
    bg: "#FFFBEB",
    icon: <MessageSquare size={18} />
  },
  {
    id: 4,
    title: "Vendor Confirmed Order",
    time: "11 May 2026\n10:30 am",
    role1: "Vendor", role1Color: "purple",
    role2: "Vendor",
    remark: "Order Confirmed",
    color: "#10B981", // green
    bg: "#F0FDF4",
    icon: <CheckCircle size={18} />
  },
  {
    id: 5,
    title: "PO Sent to Vendor",
    time: "11 May 2026\n10:30 am",
    role1: "Purchase", role1Color: "blue",
    role2: "Vendor",
    remark: "Purchase order sent via email and portal",
    color: "#3B82F6", // blue
    bg: "#EFF6FF",
    icon: <Send size={18} />
  },
  {
    id: 6,
    title: "PO Created",
    time: "11 May 2026\n10:30 am",
    role1: "Vendor", role1Color: "purple",
    role2: "Vendor",
    remark: "Purchase order created based on approved SOF",
    color: "#10B981", // green
    bg: "#F0FDF4",
    icon: <FileText size={18} />
  }
];

const getRoleColor = (colorStr) => {
  if (colorStr === "blue") return { text: "#2563EB", bg: "#DBEAFE" };
  if (colorStr === "purple") return { text: "#9333EA", bg: "#F3E8FF" };
  return { text: COLORS.textSecondary, bg: "#F1F5F9" };
};

const WorkflowTimelineModal = ({ onClose }) => {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
      />
      
      {/* Modal Container */}
      <div style={{ position: "relative", background: COLORS.bgWhite, width: 800, maxHeight: "90vh", borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
        
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Purchase Execution System</h2>
            <div style={{ fontSize: 12, color: COLORS.textSecondary, display: "flex", gap: 16 }}>
              <span>PID: PID-2026-01234</span>
              <span>Firm Name: Name</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>Active PO</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>PO-2026-00542</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
              RK
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }} className="thin-scrollbar">
          
          <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, margin: "0 0 4px" }}>Activity Timeline</h3>
          <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "0 0 24px" }}>Recent Activity</p>

          <div style={{ position: "relative", paddingLeft: 12 }}>
            {/* Vertical Line */}
            <div style={{ position: "absolute", left: 30, top: 20, bottom: 20, width: 2, background: COLORS.borderLight }} />

            {TIMELINE_DATA.map((item, index) => {
              const r1 = getRoleColor(item.role1Color);
              return (
                <div key={item.id} style={{ display: "flex", gap: 24, marginBottom: 16, position: "relative" }}>
                  {/* Icon Node */}
                  <div style={{ position: "relative", zIndex: 2, width: 40, height: 40, borderRadius: "50%", background: item.bg, border: `1px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>
                    {item.icon}
                  </div>

                  {/* Card */}
                  <div style={{ flex: 1, border: `1px solid ${item.color}`, borderRadius: 8, padding: "16px 20px", background: "#fff", display: "flex", flexDirection: "column", gap: 12 }}>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>{item.title}</div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: r1.bg, color: r1.text, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                            <FileText size={12} /> {item.role1}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: COLORS.textSecondary, fontSize: 11, fontWeight: 500 }}>
                            <CheckCircle size={12} /> {item.role2}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.textSecondary, textAlign: "right", whiteSpace: "pre-wrap" }}>
                        {item.time}
                      </div>
                    </div>

                    <div style={{ background: "#F8FAFC", borderRadius: 6, padding: "12px 16px", border: `1px solid ${COLORS.borderLight}` }}>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <MessageSquare size={12} /> Remarks
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textSecondary }}>
                        {item.remark}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "center" }}>
          <button onClick={onClose} style={{ width: "100%", background: "#fff", border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "10px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default WorkflowTimelineModal;
