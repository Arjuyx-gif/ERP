// src/pages/dashboard/RFPDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, SlidersHorizontal, Eye, Minimize2, Plus, ArrowUpDown } from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import KanbanBoard from "../../components/dashboard/KanbanBoard";
import TaskTable from "../../components/dashboard/TaskTable";
import TaskTableB from "../../components/dashboard/TaskTableB";
import TaskDashboardPSM from "../../components/dashboard/TaskDashboardPSM";
import TaskTableC from "../../components/dashboard/TaskTableC";
import TaskTableS2 from "../../components/dashboard/TaskTableS2";
import RFPFormPanel from "../../components/dashboard/RFPFormPanel";
import BidSubmissionModal from "../../components/dashboard/BidSubmissionModal";
import DocumentsModal from "../../components/dashboard/DocumentsModal";
import PSDocumentsModal from "../../components/dashboard/PSDocumentsModal";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import Modal from "../../components/dashboard/ReminderModal";
import ViewAllModal from "../../components/dashboard/ViewAllModal";
import DynamicIcon from "../../components/ui/DynamicIcon";
import { useDashboard } from "../../hooks/useDashboard";
import { TASK_DASHBOARD_A_KPI_CARDS, PSM_KPI_CARDS, PS_KPI_CARDS, SM_NOTIFICATIONS, PS_NOTIFICATIONS, PANEL_NOTIFICATIONS } from "../../services/mockData";

// ─── RFPDashboard ─────────────────────────────────────────────────────────────

const RFPDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSalesCoordinator = location.pathname === "/sc-rfp-dashboard";

  // ── Data from service layer (swap service implementation for real API) ──────
  const { kpiCards, columns: initialColumns, notifications, loading, error } = useDashboard();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (initialColumns.length) setColumns(initialColumns);
  }, [initialColumns]);

  // ── UI state ────────────────────────────────────────────────────────────────
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState(location.state?.tab ?? "Dashboard");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deadlineFilter, setDeadlineFilter] = useState("By Deadline");
  const [tabFilter, setTabFilter] = useState("All");
  const [kanbanFullscreen, setKanbanFullscreen] = useState(false);
  const [sofModal, setSofModal] = useState(null); // null | "warn" | "error"
  const [sofWarned, setSofWarned] = useState(false);
  const [viewAllCol, setViewAllCol] = useState(null);
  const [viewRFPCard, setViewRFPCard] = useState(null);
  const [docsCard, setDocsCard] = useState(null);
  const [bidSubmittedCard, setBidSubmittedCard] = useState(null);
  const [psmAssignData, setPsmAssignData] = useState(null);
  const [psmReassignData, setPsmReassignData] = useState(null);
  const [psmReviewData, setPsmReviewData] = useState(null);
  const [psmViewTenderData, setPsmViewTenderData] = useState(null);
  const [psmDocumentsData, setPsmDocumentsData] = useState(null);
  const [psDocsRow, setPsDocsRow] = useState(null);

  // Handler: fullscreen PSM assign button → exit fullscreen, open modal on regular view
  const handlePsmAssign = (rowData) => {
    setKanbanFullscreen(false);
    setPsmAssignData({ ...(rowData || {}), _ts: Date.now() });
  };

  const handlePsmReassign = (rowData) => {
    setKanbanFullscreen(false);
    setPsmReassignData({ ...(rowData || {}), _ts: Date.now() });
  };

  const handlePsmReview = (rowData) => {
    setKanbanFullscreen(false);
    setPsmReviewData({ ...(rowData || {}), _ts: Date.now() });
  };

  const handlePsmViewTender = (rowData) => {
    setKanbanFullscreen(false);
    setPsmViewTenderData({ ...(rowData || {}), _ts: Date.now() });
  };

  const handlePsmDocuments = (rowData) => {
    setKanbanFullscreen(false);
    setPsmDocumentsData({ ...(rowData || {}), _ts: Date.now() });
  };

  const PRE_BID_MODAL = {
    title: "Pre-Bid Meeting Reminder",
    subtitle: "You have 1 upcoming pre-bid meeting:",
    rfpId: "TND-2026-006", tenderTitle: "Tender title", customer: "Customer Name",
    details: [
      { text: "Tender ID - TND-2026-001" },
      { text: "Apr 5, 2024", icon: "calendar" },
      { text: "2:00 PM", icon: "timer" },
      { text: "Online", icon: "globe" },
      { text: "Join Meeting", highlight: true },
    ],
  };

  // Auto-show Pre-Bid reminder on mount (chains to Pending Query Response)
  useEffect(() => {
    if (!isSalesCoordinator) {
      const t = setTimeout(() => setActiveModal(PRE_BID_MODAL), 800);
      return () => clearTimeout(t);
    }
  }, [isSalesCoordinator]);

  // Show Pre-Bid reminder whenever user switches to Task Dashboard S (chains to Pending Query)
  useEffect(() => {
    if (activeTab === "Task Dashboard S") {
      setActiveModal(PRE_BID_MODAL);
    }
  }, [activeTab]);

  const handleAcknowledge = () => {
    if (activeModal?.title === "Pre-Bid Meeting Reminder" && !activeModal?.noChain) {
      setTimeout(() => setActiveModal({
        title: "Pending Query Response",
        subtitle: "You have 1 pending query response(s):",
        rfpId: "TND-2026-006", tenderTitle: "Tender title", customer: "Customer Name",
        deadlinePill: "05-05-2026",
      }), 200);
    } else {
      setActiveModal(null);
    }
  };

  const handleSendNotification = (card, checkedDepts, notificationSections) => {
    let processed = false;
    setColumns(cols => cols.map(col => ({
      ...col,
      cards: col.cards.flatMap(c => {
        if (!processed && c.id === card.id && c.action === "Send Notification") {
          processed = true;
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

  const handleApprove = (card) => {
    setColumns(cols => {
      let approvedCard = null;
      let approvedAwaitingCard = null;
      const newCols = cols.map(col => {
        if (col.id === "awaiting_approval") {
          const idx = col.cards.findIndex(c => c.id === card.id);
          if (idx > -1) {
            const originalCard = col.cards[idx];
            // Card for Alert/Notify column with Send Notification functionality
            approvedCard = {
              ...originalCard,
              status: "Approved",
              statusColor: "#059669",
              statusBg: "#D1FAE5",
              badge: { text: "Approved", color: "#059669", bg: "#D1FAE5" },
              details: { ...originalCard.details, status: "Send Alert" },
              notifyList: ["Pre-sales", "Sales-coordinator", "Purchase", "Accounts", "HR", "Service"],
              checkedNotify: [],
              sendBy: "Sales Rep Name",
              action: "Send Notification",
            };
            // Card that stays in Awaiting Approval (like rejected cards)
            approvedAwaitingCard = {
              id: originalCard.id,
              tender: originalCard.tender,
              customer: originalCard.customer,
              amount: originalCard.amount,
              tags: originalCard.tags,
              tagColors: originalCard.tagColors,
              status: "Approved",
              statusColor: "#059669",
              statusBg: "#D1FAE5",
              action: "Review Now",
              details: {
                ...originalCard.details,
                status: "Approved",
              },
            };
            return {
              ...col,
              cards: [
                ...col.cards.filter((_, i) => i !== idx),
                approvedAwaitingCard,
              ],
            };
          }
        }
        return col;
      });
      if (!approvedCard) return cols;
      return newCols.map(col =>
        col.id === "alert_notify"
          ? { ...col, cards: [...col.cards, approvedCard] }
          : col
      );
    });
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
      statusColor: "#CA3500",
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
    let updated = false;
    setColumns(cols => cols.map(col => ({
      ...col,
      cards: col.cards.map(c => {
        if (c.id === data.cardId && !updated) {
          // Only update the first matching card with a "Complete Tasks" or "View Task" action
          if (c.action !== "Complete Tasks" && c.action !== "View Task") return c;
          updated = true;

          const updatedBadges = c.badges ? c.badges.map(b => {
            if (b.text.toLowerCase().includes("pending") && data.files && data.files.length > 0) {
              return { ...b, text: b.text.replace(/Pending/i, "Submitted"), color: "#15803D", bg: "#DCFCE7" };
            }
            return b;
          }) : c.badges;

          let finalStatus = data.status;
          let finalDetailsStatus = data.status;

          if (!data.status) {
            finalStatus = "Submitted";
            finalDetailsStatus = "Docs - submitted";

            if (data.files && data.files.length > 0) {
              if (c.status?.toLowerCase() === "pending") {
                finalStatus = "Submitted";
              }
              if (c.details?.status?.toLowerCase().includes("pending")) {
                finalDetailsStatus = c.details.status.replace(/pending/i, "submitted");
              }
            }
          }

          return {
            ...c,
            status: finalStatus,
            statusColor: "#15803D",
            statusBg: "#DCFCE7",
            action: (data.files && data.files.length > 0) ? "View Task" : c.action,
            badges: updatedBadges,
            details: {
              ...c.details,
              remark: data.remarks || c.details.remark,
              status: finalDetailsStatus,
            }
          };
        }
        return c;
      })
    })));
  };

  const handleUpdateResult = (data) => {
    const { cardId, results } = data;

    setColumns(cols => {
      let originalCard = null;

      // First pass: find and remove the card from its current column
      const newCols = cols.map(col => {
        const foundIndex = col.cards.findIndex(c => c.id === cardId);
        if (foundIndex > -1) {
          originalCard = { ...col.cards[foundIndex] };
          return {
            ...col,
            cards: [...col.cards.slice(0, foundIndex), ...col.cards.slice(foundIndex + 1)]
          };
        }
        return col;
      });

      if (!originalCard) return cols;

      const wonFirms = [];
      const lostFirms = [];
      Object.entries(results).forEach(([firm, res]) => {
        if (res === "Won") wonFirms.push(firm);
        else lostFirms.push(firm);
      });

      const cardsToAdd = [];

      if (wonFirms.length > 0) {
        const wonCard = { ...originalCard };
        wonCard.id = wonFirms.length > 0 && lostFirms.length > 0 ? originalCard.id + "-won" : originalCard.id;
        wonCard.status = "Completed";
        wonCard.statusColor = "#4CAF50";
        wonCard.statusBg = "#E8F5E9";
        wonCard.wonLost = false;
        wonCard.poActions = false;
        wonCard.lostActions = false;
        wonCard.action = null;
        wonCard.badge = null;

        wonCard.tags = [];
        wonCard.tagColors = { ...originalCard.tagColors };
        wonFirms.forEach(firm => {
          wonCard.tags.push(firm);
          wonCard.tags.push("Awarded");
          wonCard.tagColors[firm] = { bg: "#E3F0FB", color: "#2979FF" };
          wonCard.tagColors["Awarded"] = { bg: "#D1FAE5", color: "#059669" };
        });

        cardsToAdd.push({ columnId: "won", card: wonCard });
      }

      if (lostFirms.length > 0) {
        const lostCard = { ...originalCard };
        lostCard.id = wonFirms.length > 0 && lostFirms.length > 0 ? originalCard.id + "-lost" : originalCard.id;
        lostCard.status = "Lost";
        lostCard.statusColor = "#C62828";
        lostCard.statusBg = "#FBE9E7";
        lostCard.wonLost = false;
        lostCard.poActions = false;
        lostCard.lostActions = true;
        lostCard.action = null;
        lostCard.badge = null;

        lostCard.tags = [];
        lostCard.tagColors = { ...originalCard.tagColors };
        lostFirms.forEach(firm => {
          lostCard.tags.push(firm);
          const firmResult = results[firm];
          lostCard.tags.push(firmResult);
          lostCard.tagColors[firm] = { bg: "#E3F0FB", color: "#2979FF" };

          if (firmResult === "Lost") {
            lostCard.tagColors[firmResult] = { bg: "#FBE9E7", color: "#C62828" };
          } else if (firmResult === "Canceled") {
            lostCard.tagColors[firmResult] = { bg: "#F3F4F6", color: "#6B7280" };
          } else if (firmResult === "Disqualified") {
            lostCard.tagColors[firmResult] = { bg: "#FEF3C7", color: "#B45309" };
          } else {
            lostCard.tagColors[firmResult] = { bg: "#FEF9E7", color: "#D97706" };
          }
        });

        cardsToAdd.push({ columnId: "lost", card: lostCard });
      }

      // Second pass: add it to the target column
      return newCols.map(col => {
        const matchedAdds = cardsToAdd.filter(c => c.columnId === col.id);
        if (matchedAdds.length > 0) {
          return {
            ...col,
            cards: [...col.cards, ...matchedAdds.map(c => c.card)]
          };
        }
        return col;
      });
    });
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

  // Opens CompleteTaskModal at root level (above fullscreen stacking context) for "view" rows
  const handleShowDocs = (row) => {
    setDocsCard({
      id: row.id, tender: row.title, customer: row.customer,
      amount: "-", fromDashboardB: true,
    });
  };

  // Handler for Task Dashboard B action buttons
  const handleTaskBAction = (row) => {
    // Map actionType to the correct panel/modal flow
    let action = "View RFP Form";
    let isQuery = false;
    let showQueryUploadZone = false;

    if (row.actionType === "upload" && row.bidStatus === "Won") {
      setViewRFPCard({ ...row, tender: row.title, action: "View" });
      setPsDocsRow({ ...row, isWonUpload: true });
      return;
    }

    if (row.actionType === "checkOEM" || row.actionType === "start") {
      action = "Complete Tasks";      // opens CompleteTaskModal on top of RFP form
    } else if (row.actionType === "upload") {
      action = "Complete Tasks";      // opens QueryResponseModal with upload zone
      isQuery = true;
      showQueryUploadZone = true;
    } else if (row.actionType === "checkQuery") {
      action = "Complete Tasks";      // opens QueryResponseModal with pre-filled doc
      isQuery = true;
    }

    const card = {
      id: row.id,
      tender: row.title,
      customer: row.customer,
      amount: "-",
      action,
      isQuery,
      isOEMDocs: row.actionType === "checkOEM",
      fromDashboardB: true,
      showQueryUploadZone,
    };
    setViewRFPCard(card);
  };

  // Handler for "View Teams & Remarks" link in Task Dashboard B
  const handleAlertNotifyClick = (row) => {
    const card = {
      id: row.id,
      tender: row.title,
      customer: row.customer,
      amount: "-",
      tags: ["CIPL", "NIPL"],
      action: "View",
      fromDashboardB: true,
      notificationSections: [
        { id: 1, name: "Sales Coordinator", remark: "" },
        { id: 2, name: "Accounts", remark: "" },
        { id: 3, name: "Service", remark: "" },
      ],
    };
    setViewRFPCard(card);
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

  const board = <KanbanBoard columns={visibleColumns} onViewAll={setViewAllCol} onViewRFP={handleViewRFP} isSalesCoordinator={isSalesCoordinator} />;

  return (
    <div style={{
      display: "flex", height: "100vh",
      fontFamily: "'Inter','Segoe UI',sans-serif", background: "#F7F8FA",
    }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        {/* ── Main area ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden", overflowY: "auto" }}>

          {/* Header */}
          <div style={{ padding: "20px 28px 0", background: "#F7F8FA" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 2 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>
                  RFP Analysis Board{activeTab === "Task Dashboard PS" && <span style={{ fontWeight: 400, color: "#6B7280", fontSize: 15 }}> (Pre Sales)</span>}
                </h1>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Last updated: 2 hours ago</p>
              </div>
              {!isSalesCoordinator && activeTab.startsWith("Task Dashboard") && activeTab !== "Task Dashboard PS" && (
                <button
                  onClick={() => {
                    if (activeTab === "Task Dashboard S2") {
                      setSofModal(sofWarned ? "error" : "warn");
                    } else {
                      navigate("/rfp-analysis-form");
                    }
                  }}
                  style={{
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
              )}
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
              {(activeTab === "Task Dashboard SM" ? TASK_DASHBOARD_A_KPI_CARDS
                : activeTab === "Task Dashboard PSM" ? PSM_KPI_CARDS
                  : activeTab === "Task Dashboard PS" ? PS_KPI_CARDS
                    : kpiCards
              ).map(kpi => (
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
                  {kpi.sub && <span style={{ fontSize: 11, color: "#9CA3AF" }}>{kpi.sub}</span>}
                </div>
              ))}
            </div>

            {/* Dashboard / Task Dashboard tabs */}
            {!isSalesCoordinator && (
              <div style={{ display: "flex", borderBottom: "2px solid #E2E8F0" }}>
                {["Dashboard", "Task Dashboard SM", "Task Dashboard PSM", "Task Dashboard PS", "Task Dashboard S", "Task Dashboard S2"].map(tab => {
                  const isLocked = (activeTab === "Task Dashboard S" || activeTab === "Task Dashboard S2") && tab === "Dashboard";
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => { if (!isLocked) setActiveTab(tab); }}
                      disabled={isLocked}
                      style={{
                        padding: "10px 20px", background: "none", border: "none",
                        borderBottom: isActive ? "2px solid #2979FF" : "2px solid transparent",
                        marginBottom: "-2px",
                        color: isLocked ? "#C8C8C8" : isActive ? "#2979FF" : "#888",
                        fontWeight: isActive ? 700 : 400,
                        fontSize: 14,
                        cursor: isLocked ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        opacity: isLocked ? 0.5 : 1,
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filter bar */}
          <div style={{ padding: "12px 28px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {activeTab === "Task Dashboard PSM" ? (
              <>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 14px", background: "#fff" }}>
                  <Search size={14} color="#9CA3AF" />
                  <input type="text" placeholder="Search RFP ID / Customer..." style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", width: "100%", fontFamily: "inherit", background: "transparent" }} />
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex" }}>
                  <Bell size={18} color="#6B7280" />
                </button>
                <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 8, padding: 3, gap: 2 }}>
                  {["All", "Needs Action", "Completed"].map(f => (
                    <button key={f} onClick={() => setPsmViewFilter(f)} style={{
                      padding: "6px 14px", border: "none", borderRadius: 6, cursor: "pointer",
                      fontSize: 13, fontWeight: psmViewFilter === f ? 600 : 400,
                      background: psmViewFilter === f ? "#fff" : "transparent",
                      color: psmViewFilter === f ? "#111827" : "#6B7280",
                      fontFamily: "inherit",
                      boxShadow: psmViewFilter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    }}>
                      {f}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <SlidersHorizontal size={16} color="#888" />
                {[
                  { val: stageFilter, set: setStageFilter, opts: ["All Stages", "RFP Analysis", "Awaiting Approval", "Alert / Notify", "Approved", "Submitted", "Won", "PO Pending"] },
                  { val: statusFilter, set: setStatusFilter, opts: ["All Status", "Completed", "Pending", "In Progress", "Under Review", "Approval Pending", "Rejected"] },
                ].map((f, i) => (
                  <select key={i} value={f.val} onChange={e => f.set(e.target.value)} style={{
                    padding: "7px 12px", border: "1px solid #E2E8F0", borderRadius: 8,
                    fontSize: 13, color: "#333", background: "#F8FAFC", cursor: "pointer",
                    outline: "none", fontFamily: "inherit",
                  }}>
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                ))}

                <div style={{ width: 1, height: 16, background: "#CBD5E1", margin: "0 4px" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ArrowUpDown size={14} color="#888" />
                  <select value={deadlineFilter} onChange={e => setDeadlineFilter(e.target.value)} style={{
                    padding: "7px 12px", border: "1px solid #E2E8F0", borderRadius: 8,
                    fontSize: 13, color: "#333", background: "#F8FAFC", cursor: "pointer",
                    outline: "none", fontFamily: "inherit",
                  }}>
                    {["By Deadline", "Priority", "Newest First", "Oldest First", "Tender Value", "Last Updated"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => setKanbanFullscreen(true)} style={{
                  background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
                  padding: "7px 14px", fontSize: 13, color: "#555", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit",
                }}>
                  <Eye size={14} /> View
                </button>
              </>)}
          </div>

          {/* Board / Table */}
          <div style={{ flex: 1, overflowX: "auto", padding: "0 28px 28px" }}>
            {activeTab === "Task Dashboard PSM"
              ? <TaskDashboardPSM onExpandTable={() => setKanbanFullscreen(true)} initialAssignData={psmAssignData} initialReassignData={psmReassignData} initialReviewData={psmReviewData} initialViewTenderData={psmViewTenderData} initialDocumentsData={psmDocumentsData} />
              : activeTab === "Task Dashboard PS"
                ? <TaskTableB onExpandTable={() => setKanbanFullscreen(true)} onViewDocs={(row) => { setViewRFPCard({ ...row, tender: row.title, action: "View" }); setPsDocsRow(row); }} onAction={handleTaskBAction} onAlertNotifyClick={handleAlertNotifyClick} />
                : activeTab === "Task Dashboard S"
                  ? <TaskTableC onViewRFP={handleViewRFP} />
                  : activeTab === "Task Dashboard S2"
                    ? <TaskTableS2 onViewRFP={handleViewRFP} />
                    : activeTab.startsWith("Task Dashboard")
                      ? <TaskTable onViewRFP={handleViewRFP} />
                      : board}
          </div>
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
                {activeTab.startsWith("Task Dashboard") ? activeTab : "RFP Analysis Board"}
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
            {activeTab === "Task Dashboard PSM"
              ? <TaskDashboardPSM fullscreen onExpandTable={() => { }} onAssign={handlePsmAssign} onReassign={handlePsmReassign} onReview={handlePsmReview} onViewTender={handlePsmViewTender} onDocuments={handlePsmDocuments} />
              : activeTab === "Task Dashboard PS"
                ? <TaskTableB fullscreen onViewDocs={(row) => { setKanbanFullscreen(false); setViewRFPCard({ ...row, tender: row.title, action: "View" }); setPsDocsRow(row); }} onAction={(row) => { setKanbanFullscreen(false); handleTaskBAction(row); }} onAlertNotifyClick={(row) => { setKanbanFullscreen(false); handleAlertNotifyClick(row); }} />
                : activeTab === "Task Dashboard S"
                  ? <TaskTableC fullscreen onViewRFP={handleViewRFP} />
                  : activeTab === "Task Dashboard S2"
                    ? <TaskTableS2 fullscreen onViewRFP={handleViewRFP} />
                    : activeTab.startsWith("Task Dashboard")
                      ? <TaskTable fullscreen />
                      : board}
          </div>
        </div>
      )}

      {/* ── Documents modal for "view" rows (rendered outside fullscreen stacking context) ── */}
      <DocumentsModal row={docsCard} onClose={() => setDocsCard(null)} />

      {/* ── PS Documents modal for Task Dashboard PS "view" rows ── */}
      <PSDocumentsModal row={psDocsRow} onClose={() => setPsDocsRow(null)} />

      {/* ── Notification panel ── */}
      {showNotifications && (
        <>
          <div
            onClick={() => setShowNotifications(false)}
            style={{ position: "fixed", inset: 0, zIndex: 899 }}
          />
          <NotificationPanel
            notifications={
              activeTab === "Task Dashboard SM" ? SM_NOTIFICATIONS
                : activeTab === "Task Dashboard PS" ? PS_NOTIFICATIONS
                  : activeTab === "Task Dashboard S" ? PANEL_NOTIFICATIONS
                    : notifications
            }
            onClose={() => setShowNotifications(false)}
            onAction={() => {
              // Switch to Task Dashboard PS in fullscreen when "View & Complete Docs." is clicked
              setActiveTab("Task Dashboard PS");
              setKanbanFullscreen(true);
            }}
          />
        </>
      )}

      {/* ── Modals ── */}
      <Modal modal={activeModal} onClose={handleAcknowledge} />
      <ViewAllModal col={viewAllCol} onClose={() => setViewAllCol(null)} />

      {/* ── RFP Form panel ── */}
      <RFPFormPanel card={viewRFPCard} onClose={() => setViewRFPCard(null)} onReject={handleReject} onSendNotification={handleSendNotification} onCompleteTask={handleCompleteTask} onUpdateResult={handleUpdateResult} onApprove={handleApprove} />

      {/* ── Bid Submission modal ── */}
      <BidSubmissionModal card={bidSubmittedCard} onClose={() => setBidSubmittedCard(null)} />

      {/* ── SOF warning / error modal (Task Dashboard S2 only) ── */}
      {sofModal && (
        <div
          onClick={() => setSofModal(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 12,
              padding: "28px 28px 24px", width: 300,
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              fontFamily: "'Inter','Segoe UI',sans-serif", textAlign: "center",
            }}
          >
            {sofModal === "error" && (
              <p style={{ fontSize: 15, fontWeight: 700, color: "#DC2626", margin: "0 0 10px" }}>
                ERROR !!!
              </p>
            )}
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#2563EB", margin: "0 0 14px" }}>
              Complete Pending SOFs
            </h2>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: "0 0 24px" }}>
              Please complete the current SOF before creating a new RFP.<br />
              Finish all mandatory SOF details and submit/save the form to continue.
            </p>
            <button
              onClick={() => { setSofWarned(true); setSofModal(null); }}
              style={{
                padding: "10px 40px", background: "#2563EB", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Inter','Segoe UI',sans-serif",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFPDashboard;
