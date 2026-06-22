import { X, CheckCircle, XCircle, FileText, Clock, Check } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const NOTIFICATIONS = [
  {
    id: 1, type: "approved", icon: CheckCircle, color: "#10B981", bg: "#ECFDF5",
    title: "RFP Approved \u2013 Notification Sent",
    tender: "TND-2026-005", amount: "\u20b9500 Cr", deadline: "Apr 25, 2026", firm: "Firm Names",
    remark: "Proceed with EMD preparation",
    time: "3h ago",
    action: "View RFP & Remark",
  },
  {
    id: 2, type: "lost", icon: XCircle, color: "#EF4444", bg: "#FEF2F2",
    title: "Bid Lost \u2013 Notification Sent",
    tender: "TND-2026-005", amount: "\u20b95 Cr", deadline: "Apr 25, 2026", firm: "Firm Names",
    remark: "Proceed with EMD Release Request preparation",
    time: "3h ago",
    action: "View Remark & EMD",
  },
  {
    id: 3, type: "emd", icon: FileText, color: "#3B82F6", bg: "#EFF6FF",
    title: "EMD Request Created",
    tender: "TND-2026-005", amount: "\u20b9500 Cr", customer: "Customer Name", deadline: "Apr 25, 2026", firm: "Firm Names",
    remark: "Proceed with EMD submission as per tender guidelines",
    time: "3h ago",
    action: "Process EMD",
  },
  {
    id: 4, type: "sof", icon: FileText, color: "#3B82F6", bg: "#EFF6FF",
    title: "SOF - Validation - Order ID",
    order: "ORD-2026-005", amount: "\u20b9500 Cr", customer: "Customer Name", firm: "Firm Names",
    time: "3h ago",
    action: "View SOF",
  },
  {
    id: 5, type: "reminder", icon: Clock, color: "#EF4444", bg: "#FEF2F2",
    title: "Reminder - EMD Submission",
    tender: "TND-2026-005", amount: "\u20b95 Cr", deadline: "Apr 25, 2026", firm: "Firm Names",
    remark: "Proceed with EMD preparation",
    time: "3h ago",
    action: "View RFP & Remark",
  },
];

const SCNotificationPanel = ({ onClose, onAction }) => {
  return (
    <>
      {/* Backdrop */}
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
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
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
            <button style={{
              background: "none", border: "none", color: "#3B82F6", fontSize: 12, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 4, cursor: "pointer",
            }}>
              <Check size={14} /> Mark all as read
            </button>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>Notifications</div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NOTIFICATIONS.map(notif => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} style={{
                  border: "1px solid #E2E8F0", borderRadius: 10, background: "#fff",
                  overflow: "hidden",
                }}>
                  <div style={{ padding: "16px 16px 12px" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ marginTop: 2 }}>
                        <Icon size={18} color={notif.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                          {notif.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#64748B", display: "flex", flexDirection: "column", gap: 3, marginBottom: 8 }}>
                          {notif.tender && <div>Tender ID: {notif.tender}</div>}
                          {notif.order && <div>Order ID: {notif.order}</div>}
                          {notif.amount && <div>Amount: {notif.amount}</div>}
                          {notif.customer && <div>Customer: {notif.customer}</div>}
                          {notif.deadline && <div>Deadline: {notif.deadline}</div>}
                          {notif.firm && <div>Firm: {notif.firm}</div>}
                        </div>

                        {notif.remark && (
                          <div style={{
                            background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 6,
                            padding: "8px 10px", fontSize: 11, color: "#475569", marginBottom: 8,
                          }}>
                            <span style={{ fontWeight: 600, color: "#0F172A" }}>Remark: </span>
                            "{notif.remark}"
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: "#94A3B8" }}>{notif.time}</span>
                          <button 
                            onClick={() => onAction && onAction(notif.action, notif)}
                            style={{
                              background: "#0F172A", color: "#fff", border: "none", borderRadius: 6,
                              padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                              display: "flex", alignItems: "center", gap: 6, fontFamily: FONT,
                            }}
                          >
                            {notif.action}
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
};

export default SCNotificationPanel;
