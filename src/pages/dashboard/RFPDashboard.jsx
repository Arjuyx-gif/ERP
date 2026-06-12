// src/pages/dashboard/RFPDashboard.jsx
import { useState, useEffect } from "react";
import { Search, Bell, SlidersHorizontal, Eye, Minimize2 } from "lucide-react";

import Sidebar           from "../../components/layout/Sidebar";
import KanbanBoard       from "../../components/dashboard/KanbanBoard";
import TaskTable         from "../../components/dashboard/TaskTable";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import Modal             from "../../components/dashboard/ReminderModal";
import ViewAllModal      from "../../components/dashboard/ViewAllModal";
import DynamicIcon       from "../../components/ui/DynamicIcon";
import { useDashboard }  from "../../hooks/useDashboard";

// ─── RFPDashboard ─────────────────────────────────────────────────────────────

const RFPDashboard = () => {
  // ── Data from service layer (swap service implementation for real API) ──────
  const { kpiCards, columns, notifications, loading, error } = useDashboard();

  // ── UI state ────────────────────────────────────────────────────────────────
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal,       setActiveModal]       = useState(null);
  const [activeTab,         setActiveTab]         = useState("Dashboard");
  const [search,            setSearch]            = useState("");
  const [stageFilter,       setStageFilter]       = useState("All Stages");
  const [statusFilter,      setStatusFilter]      = useState("All Status");
  const [deadlineFilter,    setDeadlineFilter]    = useState("By Deadline");
  const [tabFilter,         setTabFilter]         = useState("All");
  const [kanbanFullscreen,  setKanbanFullscreen]  = useState(false);
  const [viewAllCol,        setViewAllCol]        = useState(null);

  // Auto-show Pre-Bid reminder on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setActiveModal({
        title: "Pre-Bid Meeting Reminder",
        subtitle: "You have 1 upcoming pre-bid meeting:",
        rfpId: "RFP-2026-006", tenderTitle: "Tender title", customer: "Customer Name",
        details: [
          { text: "Tender ID - TND-2026-001" },
          { text: "Apr 5, 2024",  icon: "calendar" },
          { text: "2:00 PM",      icon: "timer" },
          { text: "Online",       icon: "globe" },
          { text: "Join Meeting", highlight: true },
        ],
      });
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleAcknowledge = () => {
    if (activeModal?.title === "Pre-Bid Meeting Reminder") {
      setTimeout(() => setActiveModal({
        title: "Pending Query Response",
        subtitle: "You have 1 pending query response(s):",
        rfpId: "RFP-2026-006", tenderTitle: "Tender title", customer: "Customer Name",
        deadlinePill: "05-05-2026",
      }), 200);
    } else {
      setActiveModal(null);
    }
  };

  // ── Loading / error guards ───────────────────────────────────────────────────
  if (loading) return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#888", fontSize: 14,
    }}>
      Loading dashboard…
    </div>
  );

  if (error) return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#C62828", fontSize: 14,
    }}>
      {error}
    </div>
  );

  // ── Board shared between normal and fullscreen views ─────────────────────────
  const board = <KanbanBoard columns={columns} onViewAll={setViewAllCol} />;

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'Inter','Segoe UI',sans-serif", background: "#F7F8FA",
    }}>

      <Sidebar />

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "20px 28px 0", background: "#F7F8FA" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
            RFP Analysis Board - Dashboard
          </h1>
          <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Last updated: 2 hours ago</p>

          {/* Search + bell + tab filters */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                display: "flex", alignItems: "center",
              }}>
                <Search size={15} color="#aaa" />
              </span>
              <input
                type="text" placeholder="Search RFP ID / Customer..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "9px 14px 9px 36px",
                  border: "1px solid #E2E8F0", borderRadius: 8,
                  fontSize: 13, color: "#333", background: "#fff",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
            </div>

            <button onClick={() => setShowNotifications(v => !v)} style={{
              position: "relative", background: "#fff", border: "1px solid #E2E8F0",
              borderRadius: 8, width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}>
              <Bell size={18} color="#555" />
              {notifications.length > 0 && (
                <span style={{
                  position: "absolute", top: 7, right: 7, width: 8, height: 8,
                  background: "#F44336", borderRadius: "50%", border: "2px solid #fff",
                }} />
              )}
            </button>

            {["All", "Needs Action", "Completed"].map(tab => (
              <button key={tab} onClick={() => setTabFilter(tab)} style={{
                padding: "8px 14px", whiteSpace: "nowrap",
                background: tabFilter === tab ? "#2979FF" : "#fff",
                color:       tabFilter === tab ? "#fff"    : "#555",
                border: "1px solid " + (tabFilter === tab ? "#2979FF" : "#E2E8F0"),
                borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* KPI cards */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            {kpiCards.map(kpi => (
              <div key={kpi.label} style={{
                flex: "1 1 130px", background: "#fff", borderRadius: 10,
                padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 6,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{kpi.label}</span>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: kpi.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <DynamicIcon name={kpi.iconName} size={16} color={kpi.color} />
                  </div>
                </div>
                <span style={{ fontSize: 28, fontWeight: 700, color: kpi.color }}>{kpi.value}</span>
              </div>
            ))}
          </div>

          {/* Dashboard / Task Dashboard tabs */}
          <div style={{ display: "flex", borderBottom: "2px solid #E2E8F0" }}>
            {["Dashboard", "Task Dashboard"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "10px 20px", background: "none", border: "none",
                borderBottom: activeTab === tab ? "2px solid #2979FF" : "2px solid transparent",
                marginBottom: "-2px",
                color:      activeTab === tab ? "#2979FF" : "#888",
                fontWeight: activeTab === tab ? 700 : 400,
                fontSize: 14, cursor: "pointer", fontFamily: "inherit",
              }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ padding: "12px 28px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <SlidersHorizontal size={16} color="#888" />
          {[
            { val: stageFilter,    set: setStageFilter,    opts: ["All Stages","RFP Analysis","Awaiting Approval","Alert/Notify","Approved","Submitted","Won","PO Pending"] },
            { val: statusFilter,   set: setStatusFilter,   opts: ["All Status","Completed","Pending","In Progress","Under Review","Approval Pending","Rejected"] },
            { val: deadlineFilter, set: setDeadlineFilter, opts: ["By Deadline","Priority","Newest First","Oldest First","Tender Value","Last Updated"] },
          ].map((f, i) => (
            <select key={i} value={f.val} onChange={e => f.set(e.target.value)} style={{
              padding: "7px 12px", border: "1px solid #E2E8F0", borderRadius: 8,
              fontSize: 13, color: "#333", background: "#fff", cursor: "pointer",
              outline: "none", fontFamily: "inherit",
            }}>
              {f.opts.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}
          <div style={{ flex: 1 }} />
          {activeTab !== "Task Dashboard" && (
            <button onClick={() => setKanbanFullscreen(true)} style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
            }}>
              <Eye size={14} /> View
            </button>
          )}
        </div>

        {/* Board / Table */}
        <div style={{ flex: 1, overflowX: "auto", padding: "0 28px 28px" }}>
          {activeTab === "Task Dashboard" ? <TaskTable /> : board}
        </div>
      </div>

      {/* ── Fullscreen Kanban overlay ── */}
      {kanbanFullscreen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
          display: "flex", flexDirection: "column", fontFamily: "'Inter','Segoe UI',sans-serif",
        }}>
          <div style={{
            padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>RFP Analysis Board</h2>
              <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>Fullscreen view</p>
            </div>
            <button onClick={() => setKanbanFullscreen(false)} style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
            }}>
              <Minimize2 size={14} /> Exit Fullscreen
            </button>
          </div>
          <div style={{ flex: 1, overflowX: "auto", padding: "20px 28px 28px" }}>
            {board}
          </div>
        </div>
      )}

      {/* ── Notification panel ── */}
      {showNotifications && (
        <>
          <div
            onClick={() => setShowNotifications(false)}
            style={{ position: "fixed", inset: 0, zIndex: 899 }}
          />
          <NotificationPanel
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        </>
      )}

      {/* ── Modals ── */}
      <Modal modal={activeModal} onClose={handleAcknowledge} />
      <ViewAllModal col={viewAllCol} onClose={() => setViewAllCol(null)} />
    </div>
  );
};

export default RFPDashboard;
