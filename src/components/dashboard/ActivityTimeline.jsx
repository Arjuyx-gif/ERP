import DynamicIcon from "../ui/DynamicIcon";
import { ACTIVITY_TIMELINE } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

const TimelineEntry = ({ entry }) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: entry.iconColor + "15",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <DynamicIcon name={entry.icon} size={14} color={entry.iconColor} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#101828" }}>{entry.title}</span>
        <span style={{ fontSize: 11, color: "#98A2B3", flexShrink: 0 }}>{entry.time}</span>
      </div>
      <div style={{ fontSize: 12, marginTop: 2 }}>
        <span style={{ color: "#2563EB", fontWeight: 600 }}>{entry.id}</span>
        <span style={{ color: "#98A2B3" }}> · {entry.meta}</span>
      </div>
    </div>
  </div>
);

const ActivityTimeline = () => (
  <div style={{ padding: 20 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 16 }}>Activity Timeline</div>
    {ACTIVITY_TIMELINE.map((entry, i) => <TimelineEntry key={i} entry={entry} />)}
    <button style={{
      width: "100%", padding: 10, marginTop: 4,
      border: "1px solid #EAECF0", borderRadius: 8,
      background: "#fff", fontSize: 13, fontWeight: 600, color: "#2979FF",
      cursor: "pointer", fontFamily: FONT,
    }}>
      View All Activities
    </button>
  </div>
);

export default ActivityTimeline;
