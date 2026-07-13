import { Bell, CheckCheck, X, CheckCircle, AlertCircle, FileText, ArrowRight } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const TYPE_STYLE = {
  success: { Icon: CheckCircle,  iconColor: "#16A34A" },
  alert:   { Icon: AlertCircle,  iconColor: "#EF4444" },
  warning: { Icon: AlertCircle,  iconColor: "#F59E0B" },
  info:    { Icon: FileText,     iconColor: "#2563EB" },
};

const NotificationPanel = ({ notifications = [], onClose, onAction }) => (
  <>
    {/* Backdrop */}
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 899,
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
      }}
    />

    {/* Panel */}
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 400, zIndex: 900,
      background: "#fff",
      boxShadow: "-6px 0 32px rgba(0,0,0,0.12)",
      display: "flex", flexDirection: "column",
      fontFamily: FONT,
    }}>

      {/* Header */}
      <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid #F2F4F7", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Bell size={17} color="#101828" />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#101828" }}>Notifications</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{
              background: "none", border: "none", fontSize: 12, color: "#2979FF",
              cursor: "pointer", fontWeight: 500, fontFamily: FONT,
              display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>
              <CheckCheck size={14} /> Mark all as read
            </button>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#667085", display: "flex", alignItems: "center", padding: 0 }}>
              <X size={18} />
            </button>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#667085", margin: 0 }}>Workflow alerts, tasks &amp; updates</p>
      </div>

      {/* List */}
      <div className="thin-scrollbar" style={{ overflowY: "auto", flex: 1, padding: "14px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#667085", marginBottom: 10 }}>Notifications</div>

        {notifications.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#98A2B3" }}>No notifications.</p>
          </div>
        ) : notifications.map(n => {
          const { Icon, iconColor } = TYPE_STYLE[n.type] ?? TYPE_STYLE.info;
          return (
            <div key={n.id} style={{
              border: "1px solid #E2E8F0", borderRadius: 10, background: "#fff",
              marginBottom: 10, overflow: "hidden",
            }}>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  {/* Circle icon - no background */}
                  <div style={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={iconColor} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{n.title}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                      {(n.details || []).map((d, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#475569" }}>
                          {d.label}: {d.value}
                        </div>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>{n.time || "Just now"}</span>
                      {n.actionText && (
                        <button
                          onClick={() => { onAction?.(n); onClose?.(); }}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "6px 14px", border: "none", borderRadius: 6,
                            background: "#0F172A", color: "#fff", fontSize: 12, fontWeight: 600,
                            cursor: "pointer", fontFamily: FONT,
                          }}
                          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                        >
                          {n.actionText} {n.actionText.toLowerCase().includes("rfp") || n.actionText.toLowerCase().includes("received") ? <ArrowRight size={13} /> : null}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </>
);

export default NotificationPanel;
