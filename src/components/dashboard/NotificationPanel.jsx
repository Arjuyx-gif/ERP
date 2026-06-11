import { Bell, Check, X, CheckCircle, FileText, AlertCircle, ArrowRight } from "lucide-react";

// ─── NotificationPanel ────────────────────────────────────────────────────────
// Receives notifications as a prop so the data source is fully decoupled from
// the component. The parent (RFPDashboard) supplies data from useDashboard().

const NotificationPanel = ({ notifications = [], onClose }) => (
  <div style={{
    position: "fixed", top: 0, right: 0, bottom: 0, width: 400, zIndex: 900,
    background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.13)",
    display: "flex", flexDirection: "column",
  }}>

    <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell size={18} color="#333" />
          <strong style={{ fontSize: 15, color: "#111" }}>Notifications</strong>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{
            background: "none", border: "none", fontSize: 12, color: "#2979FF",
            cursor: "pointer", fontWeight: 500, fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <Check size={13} /> Mark all as read
          </button>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#888",
            cursor: "pointer", display: "flex", alignItems: "center",
          }}>
            <X size={20} />
          </button>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Workflow alerts, tasks &amp; updates</p>
    </div>

    <div style={{ overflowY: "auto", flex: 1 }}>
      <div style={{ padding: "10px 20px 4px", fontSize: 12, color: "#888", fontWeight: 500 }}>Notifications</div>
      {notifications.map(n => (
        <div key={n.id} style={{ padding: "14px 20px", borderBottom: "1px solid #f5f5f5" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ flexShrink: 0, marginTop: 1, display: "flex", alignItems: "flex-start" }}>
              {n.type === "success"
                ? <CheckCircle  size={20} color="#4CAF50" />
                : n.type === "info"
                  ? <FileText   size={20} color="#2979FF" />
                  : <AlertCircle size={20} color="#F44336" />}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#111", marginBottom: 4 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                Tender ID: {n.rfpId}<br />
                Amount: {n.amount}<br />
                {n.firm     && <span>Firm: {n.firm}<br /></span>}
                {n.deadline && <span>Deadline: {n.deadline}<br /></span>}
                {n.date     && <span>Date: {n.date}<br /></span>}
                {n.meetTime && <span>Time: {n.meetTime}<br /></span>}
                {n.customer && <span>Customer: {n.customer}<br /></span>}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "#aaa" }}>{n.time}</span>
                <button style={{
                  background: "#111", color: "#fff", border: "none", borderRadius: 6,
                  padding: "5px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit",
                }}>
                  {n.action} <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationPanel;
