import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import DashboardTopBar from "../../components/dashboard/DashboardTopBar";
import KpiGrid from "../../components/dashboard/KpiGrid";
import WorkflowPipeline from "../../components/dashboard/WorkflowPipeline";
import PriorityAlerts from "../../components/dashboard/PriorityAlerts";
import OperationalAnalytics from "../../components/dashboard/OperationalAnalytics";
import RecentActivities from "../../components/dashboard/RecentActivities";
import QuickAccess from "../../components/dashboard/QuickAccess";
import { PANEL_NOTIFICATIONS } from "../../services/mockData";

const MainDashboard = () => {
  const [search, setSearch]                       = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter]           = useState("All");

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'Inter','Segoe UI',sans-serif",
      background: "#F8F9FB",
    }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>
        <DashboardTopBar
          search={search}
          onSearchChange={setSearch}
          onBellClick={() => setShowNotifications(v => !v)}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div style={{ padding: "24px 28px 36px", display: "flex", flexDirection: "column", gap: 24 }}>
          <KpiGrid />
          <WorkflowPipeline />
          <PriorityAlerts activeFilter={activeFilter} />
          <OperationalAnalytics />
          <RecentActivities />
          <QuickAccess />
        </div>
      </div>

      {showNotifications && (
        <NotificationPanel
          notifications={PANEL_NOTIFICATIONS}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default MainDashboard;
