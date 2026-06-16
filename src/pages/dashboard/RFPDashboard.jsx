// src/pages/dashboard/RFPDashboard.jsx
import { useState, useEffect } from "react";
import { Search, Bell, SlidersHorizontal, Eye, Minimize2, Plus } from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import KanbanBoard from "../../components/dashboard/KanbanBoard";
import TaskTable from "../../components/dashboard/TaskTable";
import RFPFormPanel from "../../components/dashboard/RFPFormPanel";
import BidSubmissionModal from "../../components/dashboard/BidSubmissionModal";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import Modal from "../../components/dashboard/ReminderModal";
import ViewAllModal from "../../components/dashboard/ViewAllModal";
import DynamicIcon from "../../components/ui/DynamicIcon";
import { useDashboard } from "../../hooks/useDashboard";

// ─── RFPDashboard ─────────────────────────────────────────────────────────────

const RFPDashboard = () => {
  // ── Data from service layer (swap service implementation for real API) ──────
  const { kpiCards, columns: initialColumns, notifications, loading, error } = useDashboard();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (initialColumns.length) setColumns(initialColumns);
  }, [initialColumns]);

  // ── UI state ────────────────────────────────────────────────────────────────
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deadlineFilter, setDeadlineFilter] = useState("By Deadline");
  const [tabFilter, setTabFilter] = useState("All");
  const [kanbanFullscreen, setKanbanFullscreen] = useState(false);
  const [viewAllCol, setViewAllCol] = useState(null);
  const [viewRFPCard, setViewRFPCard] = useState(null);
  const [bidSubmittedCard, setBidSubmittedCard] = useState(null);

  // Auto-show Pre-Bid reminder on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setActiveModal({
        title: "Pre-Bid Meeting Reminder",
        subtitle: "You have 1 upcoming pre-bid meeting:",
        rfpId: "RFP-2026-006", tenderTitle: "Tender title", customer: "Customer Name",
        details: [
          { text: "Tender ID - TND-2026-001" },
          { text: "Apr 5, 2024", icon: "calendar" },
          { text: "2:00 PM", icon: "timer" },
          { text: "Online", icon: "globe" },
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

  const handleSendNotification = (card, checkedDepts, notificationSections) => {
    setColumns(cols => cols.map(col => ({
      ...col,
      cards: col.cards.flatMap(c => {
        if (c.id === card.id && c.action === "Send Notification") {
          const sentCard = {
            ...c,
            notifyList: checkedDepts,
            checkedNotify: checkedDepts,
            action: "View",
            notificationSections,
          };
          const originalCard = { ...c, checkedNotify: [] };
          return [originalCard, sentCard];
        }
        return [c];
      }),
    })));
  };

  const handleReject = (card, reason) => {
    const rejectedCard = {
      id: card.id,
      tender: card.tender,
      customer: card.customer,
      amount: card.amount,
      tags: card.tags,
      tagColors: card.tagColors,
      status: "Rejected",
      statusColor: "#F5A623",
      statusBg: "#FFF4E0",
      action: "Review Now",
      rejectionRemark: reason || "Sent back for rework",
      details: {
        ...card.details,
        status: "Rejected",
        remark: reason || "Sent back for rework",
      },
    };
    setColumns(cols => cols.map(col =>
      col.id === "awaiting_approval"
        ? { ...col, cards: [...col.cards, rejectedCard] }
        : col
    ));
  };

  const handleCompleteTask = (data) => {
    setColumns(cols => cols.map(col => ({
      ...col,
      cards: col.cards.map(c => {
        if (c.id === data.cardId) {
          const updatedBadges = c.badges ? c.badges.map(b => {
            if (b.text.includes("Pending") && data.files && data.files.length > 0) {
              return { ...b, text: b.text.replace("Pending", "Submitted"), color: "#15803D", bg: "#DCFCE7" };
            }
            return b;
          }) : c.badges;

          return {
            ...c,
            status: data.status || "Completed",
            statusColor: "#15803D",
            statusBg: "#DCFCE7",
            badges: updatedBadges,
            details: {
              ...c.details,
              remark: data.remarks || c.details.remark,
              status: data.status || "Completed",
            }
          };
        }
        return c;
      })
    })));
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

  const handleViewRFP = (card) => {
    if (card?.action === "Bid Submitted") {
      setBidSubmittedCard(card);
    } else {
      setViewRFPCard(card);
    }
  };

  const STAGE_MAP = {
    "RFP Analysis": "rfp_analysis",
    "Awaiting Approval": "awaiting_approval",
    "Alert/Notify": "alert_notify",
    "Approved": "approved",
    "Submitted": "bid_submitted",
    "Won": "won",
    "PO Pending": "po_received",
  };

  const visibleColumns = columns
    .filter(col => stageFilter === "All Stages" || col.id === STAGE_MAP[stageFilter])
    .map(col => ({
      ...col,
      cards: statusFilter === "All Status"
        ? col.cards
        : col.cards.filter(c => c.status === statusFilter),
    }));

  const board = <KanbanBoard columns={visibleColumns} onViewAll={setViewAllCol} onViewRFP={handleViewRFP} />;

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
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 2 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
                RFP Analysis Board
              </h1>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Last updated: 2 hours ago</p>
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 20px", border: "none", borderRadius: 8,
              background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "'Inter','Segoe UI',sans-serif",
              boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#1D4ED8";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.35)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#2563EB";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(37,99,235,0.25)";
            }}
            >
              <Plus size={16} /> Create RFP
            </button>
          </div>

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

            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "#F1F5F9", padding: 4, borderRadius: 10,
            }}>
              {["All", "Needs Action", "Completed"].map(tab => {
                const isActive = tabFilter === tab;
                return (
                  <button key={tab} onClick={() => setTabFilter(tab)} style={{
                    padding: "6px 14px", whiteSpace: "nowrap",
                    background: isActive ? "#fff" : "transparent",
                    color: isActive ? "#0F172A" : "#475569",
                    border: "none",
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" : "none",
                    borderRadius: 6, fontSize: 13, fontWeight: isActive ? 600 : 500,
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s ease"
                  }}>
                    {tab}
                  </button>
                );
              })}
            </div>
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
                color: activeTab === tab ? "#2979FF" : "#888",
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
            { val: statusFilter, set: setStatusFilter, opts: ["All Status", "Completed", "Pending", "In Progress", "Under Review", "Approval Pending", "Rejected"] },
            { val: deadlineFilter, set: setDeadlineFilter, opts: ["By Deadline", "Priority", "Newest First", "Oldest First", "Tender Value", "Last Updated"] },
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
          <button onClick={() => setKanbanFullscreen(true)} style={{
            background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
            padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
          }}>
            <Eye size={14} /> View
          </button>
        </div>

        {/* Board / Table */}
        <div style={{ flex: 1, overflowX: "auto", padding: "0 28px 28px" }}>
          {activeTab === "Task Dashboard" ? <TaskTable /> : board}
        </div>
      </div>

      {/* ── Fullscreen overlay (Kanban or Task Dashboard) ── */}
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
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>
                {activeTab === "Task Dashboard" ? "Task Dashboard" : "RFP Analysis Board"}
              </h2>
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
          <div style={{ flex: 1, overflowX: "auto", overflowY: "auto", padding: "20px 28px 28px" }}>
            {activeTab === "Task Dashboard" ? <TaskTable fullscreen /> : board}
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

      {/* ── RFP Form panel ── */}
      <RFPFormPanel card={viewRFPCard} onClose={() => setViewRFPCard(null)} onReject={handleReject} onSendNotification={handleSendNotification} onCompleteTask={handleCompleteTask} />

      {/* ── Bid Submission modal ── */}
      <BidSubmissionModal card={bidSubmittedCard} onClose={() => setBidSubmittedCard(null)} />
    </div>
  );
};

export default RFPDashboard;
