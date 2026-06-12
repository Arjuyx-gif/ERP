import Card from "../ui/Card";
import SectionLabel from "../ui/SectionLabel";
import ActivityTimeline from "./ActivityTimeline";
import NotificationsCard from "./NotificationsCard";

const RecentActivities = () => (
  <div>
    <SectionLabel>Recent Activities & Notifications</SectionLabel>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card><ActivityTimeline /></Card>
      <Card><NotificationsCard /></Card>
    </div>
  </div>
);

export default RecentActivities;
