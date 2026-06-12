import DynamicIcon from "../ui/DynamicIcon";
import { MAIN_NOTIFICATIONS } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

const NotificationRow = ({ notification }) => (
  <div style={{
    display: "flex", gap: 12, padding: "12px 14px",
    background: notification.iconBg, borderRadius: 8, marginBottom: 10,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: notification.iconColor + "20",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <DynamicIcon name={notification.icon} size={14} color={notification.iconColor} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#101828" }}>{notification.title}</span>
        <span style={{ fontSize: 11, color: "#98A2B3", flexShrink: 0, whiteSpace: "nowrap" }}>{notification.time}</span>
      </div>
      <div style={{ fontSize: 12, color: "#667085", marginTop: 2 }}>{notification.sub}</div>
    </div>
  </div>
);

const NotificationsCard = () => (
  <div style={{ padding: 20 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 16 }}>Notifications</div>
    {MAIN_NOTIFICATIONS.map((n, i) => <NotificationRow key={i} notification={n} />)}
    <button style={{
      width: "100%", padding: 10, marginTop: 4,
      border: "1px solid #EAECF0", borderRadius: 8,
      background: "#fff", fontSize: 13, fontWeight: 600, color: "#2979FF",
      cursor: "pointer", fontFamily: FONT,
    }}>
      View All Notifications
    </button>
  </div>
);

export default NotificationsCard;
