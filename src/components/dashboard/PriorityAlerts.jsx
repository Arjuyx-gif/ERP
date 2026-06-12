import Card from "../ui/Card";
import SectionLabel from "../ui/SectionLabel";
import DynamicIcon from "../ui/DynamicIcon";
import { PRIORITY_ALERTS } from "../../services/mockData";

const TAG_MAP = {
  All: "all",
  Active: "active",
  "In Progress": "in-progress",
  Delayed: "delayed",
  Pending: "pending",
  Completed: "completed",
};

const AlertRow = ({ alert, isLast }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 14,
    padding: "14px 0",
    borderBottom: isLast ? "none" : "1px solid #F2F4F7",
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 8, flexShrink: 0,
      background: alert.iconColor + "15",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <DynamicIcon name={alert.icon} size={16} color={alert.iconColor} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#101828", marginBottom: 2 }}>{alert.title}</div>
      <div style={{ fontSize: 12, color: "#98A2B3" }}>{alert.sub}</div>
    </div>
    <span style={{
      fontSize: 11, fontWeight: 600, color: "#667085",
      background: "#F2F4F7", borderRadius: 6, padding: "4px 10px",
      flexShrink: 0, whiteSpace: "nowrap",
    }}>
      {alert.days}
    </span>
  </div>
);

const PriorityAlerts = ({ activeFilter }) => {
  const alerts = activeFilter === "All"
    ? PRIORITY_ALERTS
    : PRIORITY_ALERTS.filter(a => a.tag === TAG_MAP[activeFilter]);

  return (
    <div>
      <SectionLabel>Priority Alerts</SectionLabel>
      <Card style={{ padding: "4px 20px" }}>
        {alerts.length === 0 ? (
          <div style={{ padding: "24px 0", textAlign: "center", color: "#98A2B3", fontSize: 13 }}>
            No {activeFilter.toLowerCase()} alerts.
          </div>
        ) : alerts.map((alert, i) => (
          <AlertRow key={i} alert={alert} isLast={i === alerts.length - 1} />
        ))}
      </Card>
    </div>
  );
};

export default PriorityAlerts;
