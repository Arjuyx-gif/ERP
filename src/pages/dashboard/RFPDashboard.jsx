// src/pages/dashboard/RFPDashboard.jsx
import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import Modal from "../../components/dashboard/ReminderModal";
import KanbanCard from "../../components/dashboard/KanbanCard";
import { KPI_CARDS, KANBAN_COLUMNS } from "../../services/mockData";

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

const RFPDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal,       setActiveModal]       = useState(null);
  const [activeTab,         setActiveTab]         = useState("Dashboard");
  const [search,            setSearch]            = useState("");
  const [stageFilter,       setStageFilter]       = useState("All Stages");
  const [statusFilter,      setStatusFilter]      = useState("All Status");
  const [deadlineFilter, setDeadlineFilter]       = useState("By Deadline");
  const [tabFilter,         setTabFilter]         = useState("All");

  // Auto-show Pre-Bid reminder on load
  useEffect(() => {
    const t = setTimeout(() => {
      setActiveModal({
        title: "Pre-Bid Meeting Reminder",
        subtitle: "You have 1 upcoming pre-bid meeting:",
        rfpId: "RFP-2026-006", tenderTitle: "Tender title", customer: "Customer Name",
        details: [
          { text:"Tender ID - TND-2026-001" },
          { text:"Apr 5, 2024",  icon:"📅" },
          { text:"2:00 PM",      icon:"🕐" },
          { text:"Online",       icon:"🌐" },
          { text:"Join Meeting", highlight:true },
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

  return (
    <div style={{ display:"flex", minHeight:"100vh",
      fontFamily:"'Inter','Segoe UI',sans-serif", background:"#F7F8FA" }}>

      <Sidebar />

      {/* ── Main area ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>

        {/* Header */}
        <div style={{ padding:"20px 28px 0", background:"#F7F8FA" }}>
          <h1 style={{ fontSize:20, fontWeight:700, color:"#111", margin:"0 0 2px" }}>
            RFP Analysis Board - Dashboard
          </h1>
          <p style={{ fontSize:12, color:"#888", margin:"0 0 16px" }}>Last updated: 2 hours ago</p>

          {/* Search + bell + tab filters */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <div style={{ flex:1, position:"relative" }}>
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#aaa" }}>🔍</span>
              <input type="text" placeholder="Search RFP ID / Customer..."
                value={search} onChange={e=>setSearch(e.target.value)}
                style={{ width:"100%", padding:"9px 14px 9px 36px",
                  border:"1px solid #E2E8F0", borderRadius:8,
                  fontSize:13, color:"#333", background:"#fff",
                  outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
            </div>

            <button onClick={()=>setShowNotifications(v=>!v)} style={{
              position:"relative", background:"#fff", border:"1px solid #E2E8F0",
              borderRadius:8, width:40, height:40,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", fontSize:18, flexShrink:0 }}>
              🔔
              <span style={{ position:"absolute", top:7, right:7, width:8, height:8,
                background:"#F44336", borderRadius:"50%", border:"2px solid #fff" }} />
            </button>

            {["All","Needs Action","Completed"].map(tab => (
              <button key={tab} onClick={()=>setTabFilter(tab)} style={{
                padding:"8px 14px", whiteSpace:"nowrap",
                background: tabFilter===tab?"#2979FF":"#fff",
                color:       tabFilter===tab?"#fff":"#555",
                border:"1px solid "+(tabFilter===tab?"#2979FF":"#E2E8F0"),
                borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* KPI cards */}
          <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
            {KPI_CARDS.map(kpi => (
              <div key={kpi.label} style={{ flex:"1 1 130px", background:"#fff", borderRadius:10,
                padding:"14px 16px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
                border:"1px solid #f0f0f0", display:"flex", flexDirection:"column", gap:6 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <span style={{ fontSize:12, color:"#888", fontWeight:500 }}>{kpi.label}</span>
                  {kpi.iconBg && (
                    <div style={{ width:30, height:30, borderRadius:8, background:kpi.iconBg,
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                      {kpi.icon}
                    </div>
                  )}
                </div>
                <span style={{ fontSize:28, fontWeight:700, color:kpi.color }}>{kpi.value}</span>
                {!kpi.iconBg && <span style={{ fontSize:20 }}>{kpi.icon}</span>}
              </div>
            ))}
          </div>

          {/* Dashboard / Task Dashboard tabs */}
          <div style={{ display:"flex", borderBottom:"2px solid #E2E8F0" }}>
            {["Dashboard","Task Dashboard"].map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{
                padding:"10px 20px", background:"none", border:"none",
                borderBottom: activeTab===tab?"2px solid #2979FF":"2px solid transparent",
                marginBottom:"-2px",
                color:      activeTab===tab?"#2979FF":"#888",
                fontWeight: activeTab===tab?700:400,
                fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ padding:"12px 28px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ color:"#888" }}>⚙️</span>
          {[
            { val:stageFilter,  set:setStageFilter,  opts:["All Stages","RFP Analysis","Awaiting Approval","Alert/Notify","Approved", "Submitted", "Won", "PO Pending"] },
            { val:statusFilter, set:setStatusFilter, opts:["All Status","Completed","Pending","In Progress","Under Review", "Approval Pending", "Rejected"] },
            { val:deadlineFilter, set:setDeadlineFilter, opts:["By Deadline","Priority","Newest First", "Oldest First","Tender Value", "Last Updated" ]},
          ].map((f,i) => (
            <select key={i} value={f.val} onChange={e=>f.set(e.target.value)} style={{
              padding:"7px 12px", border:"1px solid #E2E8F0", borderRadius:8,
              fontSize:13, color:"#333", background:"#fff", cursor:"pointer",
              outline:"none", fontFamily:"inherit" }}>
              {f.opts.map(o=><option key={o}>{o}</option>)}
            </select>
          ))}
          <div style={{ flex:1 }} />
          <button style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:8,
            padding:"7px 14px", fontSize:13, color:"#555", cursor:"pointer",
            display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
            ⚙️ Filters
          </button>
          <button style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:8,
            padding:"7px 14px", fontSize:13, color:"#555", cursor:"pointer",
            display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
            👁 View
          </button>
        </div>

        {/* Kanban board */}
        <div style={{ flex:1, overflowX:"auto", padding:"0 28px 28px" }}>
          <div style={{ display:"flex", gap:14, minWidth:"max-content", paddingBottom:8, alignItems:"flex-start" }}>
            {KANBAN_COLUMNS.map(col => (
              <div key={col.id} style={{ width:260, flexShrink:0 }}>
                {/* Column header */}
                <div style={{ background:col.color, borderRadius:"10px 10px 0 0",
                  padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:"#333" }}>{col.title}</span>
                    <span style={{ background:col.countBg, color:"#fff",
                      fontSize:11, fontWeight:700, borderRadius:12, padding:"1px 8px" }}>{col.count}</span>
                  </div>
                  <button style={{ background:"none", border:"none", fontSize:11,
                    color:"#666", cursor:"pointer", fontFamily:"inherit" }}>👁 View All</button>
                </div>

                {/* Cards area */}
                <div style={{ background:"#EAECF0", borderRadius:"0 0 10px 10px",
                  padding:"10px 8px 8px", minHeight:80 }}>
                  {col.cards.map((card,idx) => <KanbanCard key={idx} card={card} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification panel */}
      {showNotifications && (
        <>
          <div onClick={()=>setShowNotifications(false)}
            style={{ position:"fixed", inset:0, zIndex:899 }} />
          <NotificationPanel onClose={()=>setShowNotifications(false)} />
        </>
      )}

      {/* Reminder modal */}
      <Modal modal={activeModal} onClose={handleAcknowledge} />
    </div>
  );
};

export default RFPDashboard;
