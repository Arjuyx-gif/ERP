// src/pages/dashboard/RFPDashboard.jsx
import { useState, useEffect } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  { label: "Total RFPs",       value: 5, icon: "📄", color: "#4A90D9" },
  { label: "Awaiting Approval",value: 1, icon: "🕐", color: "#F5A623", iconBg: "#FFF4E0" },
  { label: "Submitted",        value: 1, icon: "✅", color: "#4CAF50", iconBg: "#E8F5E9" },
  { label: "Won (L1)",         value: 3, icon: "🏆", color: "#4CAF50", iconBg: "#E8F5E9" },
  { label: "PO - Pending",     value: 1, icon: "⚠️", color: "#FF5722", iconBg: "#FBE9E7" },
];

const KANBAN_COLUMNS = [
  {
    id: "rfp_analysis", title: "RFP Analysis", count: 3,
    color: "#E3F0FB", countBg: "#4A90D9",
    cards: [
      {
        id: "RFP-2026-001", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: "Customer Name", amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "Result Awaited", preBidDate: "20/04/2026", preBidTime: "Time", preBidVenue: "Venue", deadline: "Apr 25, 2026" },
        action: "View RFP Form",
      },
      {
        id: "RFP-2026-002", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: "Customer Name", amount: "500Cr.",
        tags: ["CIPL","UVT","NIPL"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5", NIPL:"#E8F5E9" },
        details: { status: "Approval Awaiting", preBidDate: "20/04/2026", preBidTime: "Time", preBidVenue: "Venue", deadline: "Apr 25, 2026" },
        action: "View RFP Form",
      },
    ],
  },
  {
    id: "awaiting_approval", title: "Awaiting Approval", count: 1,
    color: "#FFF8E1", countBg: "#F5A623",
    cards: [
      {
        id: "RFP-2026-005", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "MD Office - Approval Waiting", deadline: "Apr 25, 2026" },
        badge: { text: "Approval Pending", color: "#F5A623", bg: "#FFF4E0" },
        action: "Review Now",
      },
    ],
  },
  {
    id: "alert_notify", title: "Alert / Notify", count: 1,
    color: "#FFF3E0", countBg: "#FF9800",
    cards: [
      {
        id: "RFP-2026-005", status: "Approved", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT","NIPL"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5", NIPL:"#E8F5E9" },
        details: { status: "Send Alert", deadline: "Apr 25, 2026" },
        notifyList: ["Pre-sales","Sales-coordinator","Purchase","Accounts","HR","Service"],
        checkedNotify: ["Pre-sales"],
        action: "Send Notification",
      },
      {
        id: "RFP-2026-005", status: "Approved", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","NIPL"], tagColors: { CIPL:"#E3F0FB", NIPL:"#E8F5E9" },
        details: { status: "Send Alert", deadline: "Apr 25, 2026" },
        notifyList: ["Pre-sales","Sales-coordinator","Purchase","Accounts","HR","Service"],
        checkedNotify: ["Pre-sales","Sales-coordinator","Accounts"],
        action: "View",
      },
    ],
  },
  {
    id: "approved", title: "Approved - Pre Bid Tasks", count: 1,
    color: "#F3E5F5", countBg: "#9C27B0",
    cards: [
      {
        id: "RFP-2026-004", status: "In Progress", statusColor: "#1565C0", statusBg: "#E3F0FB",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Docs. Pending", deadline: "Apr 25, 2026" },
        badges: [{ text:"OEM Docs Pending", color:"#FF9800", bg:"#FFF4E0" },{ text:"EMD Pending", color:"#F44336", bg:"#FBE9E7" }],
        action: "Complete Tasks",
      },
    ],
  },
  {
    id: "bid_submitted", title: "Bid Submitted", count: 1,
    color: "#E8F5E9", countBg: "#4CAF50",
    cards: [
      {
        id: "RFP-2026-009", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Bid Submitted - Date", dueDate: "Apr 25, 2026", dueTime: "Time" },
        action: "View Submission",
      },
    ],
  },
  {
    id: "query_response", title: "Query & Response", count: 1,
    color: "#FFF8E1", countBg: "#FFC107",
    cards: [
      {
        id: "RFP-2026-009", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Docs - pending", dueDate: "Apr 25, 2026", dueTime: "Time" },
        action: "Complete Tasks",
      },
    ],
  },
  {
    id: "result_awaited", title: "Result Awaited", count: 1,
    color: "#FBE9E7", countBg: "#FF5722",
    cards: [
      {
        id: "RFP-2026-009", status: "Pending", statusColor: "#F5A623", statusBg: "#FFF4E0",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "Result Awaited", deadline: "Apr 30, 2026" },
        wonLost: true,
      },
    ],
  },
  {
    id: "won", title: "Won (L1)", count: 2,
    color: "#E8F5E9", countBg: "#2E7D32",
    cards: [
      {
        id: "RFP-2026-007", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL","UVT"], tagColors: { CIPL:"#E3F0FB", UVT:"#F3E5F5" },
        details: { status: "PO Received", deadline: "Apr 30, 2026" },
        statusBadge: { text: "PO Awaiting", color: "#F5A623", bg: "#FFF4E0" },
      },
      {
        id: "RFP-2026-017", status: "No Cancelled", statusColor: "#F44336", statusBg: "#FBE9E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: [], tagColors: {},
        details: { status: "Bid Cancelled", deadline: "Apr 30, 2026" },
        statusBadge: { text: "Bid Cancelled", color: "#F44336", bg: "#FBE9E7" },
      },
    ],
  },
  {
    id: "po_received", title: "PO Received", count: 1,
    color: "#E3F0FB", countBg: "#1565C0",
    cards: [
      {
        id: "RFP-2026-007", status: "Completed", statusColor: "#4CAF50", statusBg: "#E8F5E9",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["CIPL"], tagColors: { CIPL: "#E3F0FB" },
        details: { status: "PO Received", deadline: "Apr 30, 2026" },
        badge: { text: "Awarded", color: "#2E7D32", bg: "#E8F5E9" },
        poActions: true,
      },
    ],
  },
  {
    id: "lost", title: "Lost", count: 1,
    color: "#FBE9E7", countBg: "#C62828",
    cards: [
      {
        id: "RFP-2026-012", status: "Lost", statusColor: "#C62828", statusBg: "#FBE9E7",
        tender: "Tender Title", customer: null, amount: "500Cr.",
        tags: ["UVT"], tagColors: { UVT: "#F3E5F5" },
        details: { deadline: "Apr 08, 2026" },
        badge: { text: "Awarded", color: "#2E7D32", bg: "#E8F5E9" },
        lostActions: true,
      },
    ],
  },
];

const NOTIFICATIONS = [
  { id:1, type:"success", title:"RFP Uploaded (New)",      rfpId:"TND-2026-005", amount:"₹500 Cr", firm:"Firm Name",  deadline:"Apr 25, 2026", time:"3h ago", action:"View RFP" },
  { id:2, type:"error",   title:"Bid Lost",                rfpId:"TND-2026-005", amount:"₹5 Cr",   firm:"Firm Name",  deadline:"Apr 25, 2026", time:"3h ago", action:"View RFP" },
  { id:3, type:"warning", title:"Result Awaited",          rfpId:"TND-2026-005", amount:"₹5 Cr",   firm:"Firm Name",  deadline:"Apr 25, 2026", time:"3h ago", action:"Update" },
  { id:4, type:"info",    title:"Reminder Pre-Bid Meeting",rfpId:"TND-2026-005", amount:"₹500 Cr", date:"Today", meetTime:"2:00PM", customer:"Customer Name", time:"3h ago", action:"View Link" },
  { id:5, type:"info",    title:"Reminder Pre-Bid Meeting",rfpId:"TND-2026-005", amount:"₹500 Cr", date:"Today", meetTime:"2:00PM", customer:"Customer Name", time:"3h ago", action:"View Link" },
];

const SIDEBAR_NAV = [
  { icon:"⊞", label:"Dashboard" },
  { icon:"📋", label:"Sales & Pre-sales", expandable:true, active:true,
    children:[
      { label:"RFP Dashboard", active:true },
      { label:"RFP Analysis Form" },
      { label:"Pre-sales Checklist" },
      { label:"Comparison Sheet" },
      { label:"SOF" },
    ],
  },
  { icon:"👥", label:"Sales Coordinator", expandable:true },
  { icon:"📥", label:"Task Inbox",        expandable:true },
  { icon:"📈", label:"Tacker",            expandable:true },
  { icon:"📊", label:"Reports" },
  { icon:"🗄️", label:"Master Data" },
  { icon:"⚙️", label:"Settings" },
];

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────

const Tag = ({ label, colors }) => (
  <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:4,
    background: colors?.[label] || "#E3F0FB", color:"#1565C0", marginRight:4 }}>
    {label}
  </span>
);

const Badge = ({ text, color, bg }) => (
  <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:12,
    background: bg || "#E8F5E9", color: color || "#4CAF50" }}>
    {text}
  </span>
);

// ─── KANBAN CARD ─────────────────────────────────────────────────────────────

const btnStyle = { padding:"7px 0", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", width:"100%" };
const linkBtn  = { background:"none", border:"none", color:"#2979FF", fontSize:11, fontWeight:500, cursor:"pointer", textAlign:"left", padding:"2px 0", display:"block" };

const KanbanCard = ({ card }) => {
  const [checked, setChecked] = useState(card.checkedNotify || []);
  const toggle = (item) => setChecked(p => p.includes(item) ? p.filter(x=>x!==item) : [...p, item]);

  const isBlue   = card.action === "Send Notification";

  return (
    <div style={{ background:"#fff", borderRadius:10, padding:"14px 14px 12px",
      marginBottom:10, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0" }}>

      {/* ID + status */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <span style={{ fontWeight:700, fontSize:13, color:"#222" }}>{card.id}</span>
        <Badge text={card.status} color={card.statusColor} bg={card.statusBg} />
      </div>

      {/* Tender / customer */}
      <div style={{ fontSize:12, color:"#555", marginBottom:2 }}>{card.tender}</div>
      {card.customer && <div style={{ fontSize:12, color:"#555", marginBottom:4 }}>{card.customer}</div>}

      {/* Amount */}
      <div style={{ fontSize:12, color:"#333", marginBottom:6 }}>₹ {card.amount}</div>

      {/* Tags */}
      {card.tags?.length > 0 && (
        <div style={{ marginBottom:8 }}>
          {card.tags.map(t => <Tag key={t} label={t} colors={card.tagColors} />)}
        </div>
      )}

      {/* Single badge */}
      {card.badge && <div style={{ marginBottom:6 }}><Badge text={card.badge.text} color={card.badge.color} bg={card.badge.bg} /></div>}

      {/* Multi badges */}
      {card.badges?.map((b,i) => (
        <span key={i} style={{ display:"inline-block", marginRight:4, marginBottom:4 }}>
          <Badge text={b.text} color={b.color} bg={b.bg} />
        </span>
      ))}

      {/* Details */}
      <div style={{ fontSize:11, color:"#666", marginBottom:6, lineHeight:1.7 }}>
        {card.details?.status    && <div>👤 Status: {card.details.status}</div>}
        {card.details?.preBidDate&& <div>📅 Pre Bid - Date: {card.details.preBidDate}</div>}
        {card.details?.preBidTime&& <div>👤 Pre Bid - Time: {card.details.preBidTime}</div>}
        {card.details?.preBidVenue&&<div>&nbsp;&nbsp; Pre Bid - Venue: {card.details.preBidVenue}</div>}
        {card.details?.dueDate   && <div>📅 Due Date: {card.details.dueDate}</div>}
        {card.details?.dueTime   && <div>🕐 Due Time: {card.details.dueTime}</div>}
        {card.details?.deadline  && <div>📅 Deadline: <strong>{card.details.deadline}</strong></div>}
      </div>

      {/* Status badge */}
      {card.statusBadge && <div style={{ marginBottom:8 }}><Badge text={card.statusBadge.text} color={card.statusBadge.color} bg={card.statusBadge.bg} /></div>}

      {/* Notify checklist */}
      {card.notifyList && (
        <div style={{ marginBottom:8 }}>
          {card.notifyList.map(item => (
            <div key={item} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
              <input type="checkbox" checked={checked.includes(item)} onChange={()=>toggle(item)}
                style={{ accentColor:"#2979FF", width:13, height:13 }} />
              <span style={{ fontSize:11, color:"#555" }}>Notify: {item}</span>
            </div>
          ))}
          <div style={{ fontSize:11, color:"#555", marginTop:4 }}>
            👤 Send By: <span style={{ borderBottom:"1px solid #999", minWidth:60, display:"inline-block" }}>&nbsp;</span>
          </div>
        </div>
      )}

      {/* Won / Lost / Cancelled */}
      {card.wonLost && (
        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:6 }}>
          <button style={{ ...btnStyle, background:"#4CAF50", color:"#fff", border:"none" }}>✅ Won</button>
          <button style={{ ...btnStyle, background:"#F44336", color:"#fff", border:"none" }}>❌ Lost</button>
          <button style={{ ...btnStyle, background:"#fff", color:"#888", border:"1px solid #ddd" }}>❌ Cancelled</button>
        </div>
      )}

      {/* PO actions */}
      {card.poActions && (
        <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:6 }}>
          <button style={linkBtn}>🔔 PO Received</button>
          <button style={linkBtn}>→ Start SOF - Action Required</button>
          <button style={linkBtn}>📤 Upload PO</button>
          <button style={linkBtn}>📄 Additional Documents &amp; GeM Charges</button>
          <button style={linkBtn}>👁 View Comparison Sheet</button>
        </div>
      )}

      {/* Lost actions */}
      {card.lostActions && (
        <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:6 }}>
          <button style={linkBtn}>🔔 Notify for EMD Return</button>
          <button style={linkBtn}>👁 View Comparison Sheet</button>
        </div>
      )}

      {/* CTA button */}
      {card.action && (
        <button style={{
          width:"100%", marginTop:4, padding:"8px 0",
          background: isBlue ? "#2979FF" : "#fff",
          color:       isBlue ? "#fff"    : "#2979FF",
          border:      isBlue ? "none"    : "1px solid #2979FF",
          borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          fontFamily:"inherit",
        }}>
          👁 {card.action}
        </button>
      )}
    </div>
  );
};

// ─── REMINDER MODAL ───────────────────────────────────────────────────────────

const Modal = ({ modal, onClose }) => {
  if (!modal) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.2)" }} />
      <div style={{ position:"relative", zIndex:1, background:"#fff", borderRadius:12,
        padding:"24px 28px 20px", width:430, maxWidth:"90vw",
        boxShadow:"0 8px 40px rgba(0,0,0,0.15)" }}>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:18 }}>🔴</span>
          <strong style={{ fontSize:15, color:"#111" }}>{modal.title}</strong>
        </div>
        <p style={{ fontSize:13, color:"#555", marginBottom:12 }}>{modal.subtitle}</p>

        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
          <span style={{ background:"#E3F0FB", color:"#1565C0", padding:"3px 10px",
            borderRadius:6, fontSize:12, fontWeight:600 }}>{modal.rfpId}</span>
          <span style={{ fontSize:13, color:"#333" }}>{modal.tenderTitle}</span>
        </div>
        <p style={{ fontSize:13, color:"#555", marginBottom:12 }}>{modal.customer}</p>

        {modal.details && (
          <div style={{ background:"#F5F7FA", borderRadius:8, padding:"10px 14px",
            fontSize:12, marginBottom:16, display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
            {modal.details.map((d,i) => (
              <span key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                {d.icon && <span>{d.icon}</span>}
                <span style={{ color: d.highlight?"#2979FF":"#333", fontWeight: d.highlight?600:400 }}>{d.text}</span>
                {i < modal.details.length-1 && <span style={{ color:"#ccc", margin:"0 4px" }}>|</span>}
              </span>
            ))}
          </div>
        )}

        {modal.deadlinePill && (
          <div style={{ marginBottom:16 }}>
            <span style={{ background:"#F5F7FA", border:"1px solid #ddd", borderRadius:6,
              padding:"6px 14px", fontSize:13, color:"#333", fontWeight:500 }}>
              Deadline - {modal.deadlinePill}
            </span>
          </div>
        )}

        <button onClick={onClose} style={{ width:"100%", padding:"11px 0",
          background:"#2979FF", color:"#fff", border:"none", borderRadius:8,
          fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
          Acknowledge
        </button>
      </div>
    </div>
  );
};

// ─── NOTIFICATIONS PANEL ──────────────────────────────────────────────────────

const NotificationPanel = ({ onClose }) => (
  <div style={{ position:"fixed", top:0, right:0, bottom:0, width:400, zIndex:900,
    background:"#fff", boxShadow:"-4px 0 24px rgba(0,0,0,0.13)",
    display:"flex", flexDirection:"column" }}>

    <div style={{ padding:"20px 20px 12px", borderBottom:"1px solid #f0f0f0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:18 }}>🔔</span>
          <strong style={{ fontSize:15, color:"#111" }}>Notifications</strong>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button style={{ background:"none", border:"none", fontSize:12, color:"#2979FF", cursor:"pointer", fontWeight:500 }}>
            ✓ Mark all as read
          </button>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, color:"#888", cursor:"pointer" }}>×</button>
        </div>
      </div>
      <p style={{ fontSize:12, color:"#888", margin:0 }}>Workflow alerts, tasks &amp; updates</p>
    </div>

    <div style={{ overflowY:"auto", flex:1 }}>
      <div style={{ padding:"10px 20px 4px", fontSize:12, color:"#888", fontWeight:500 }}>Notifications</div>
      {NOTIFICATIONS.map(n => (
        <div key={n.id} style={{ padding:"14px 20px", borderBottom:"1px solid #f5f5f5" }}>
          <div style={{ display:"flex", gap:12 }}>
            <span style={{ fontSize:20, flexShrink:0, marginTop:1 }}>
              {n.type==="success"?"✅": n.type==="info"?"📄":"🔴"}
            </span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:13, color:"#111", marginBottom:4 }}>{n.title}</div>
              <div style={{ fontSize:12, color:"#555", lineHeight:1.7 }}>
                Tender ID: {n.rfpId}<br/>
                Amount: {n.amount}<br/>
                {n.firm     && <span>Firm: {n.firm}<br/></span>}
                {n.deadline && <span>Deadline: {n.deadline}<br/></span>}
                {n.date     && <span>Date: {n.date}<br/></span>}
                {n.meetTime && <span>Time: {n.meetTime}<br/></span>}
                {n.customer && <span>Customer: {n.customer}<br/></span>}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
                <span style={{ fontSize:11, color:"#aaa" }}>{n.time}</span>
                <button style={{ background:"#111", color:"#fff", border:"none", borderRadius:6,
                  padding:"5px 12px", fontSize:11, fontWeight:600, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
                  {n.action} →
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

const Sidebar = () => {
  const [expanded, setExpanded] = useState({ "Sales & Pre-sales": true });
  return (
    <div style={{ width:200, flexShrink:0, background:"#2D3748",
      display:"flex", flexDirection:"column", minHeight:"100vh", fontFamily:"inherit" }}>

      <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15 }}>ERP System</span>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
        {SIDEBAR_NAV.map(item => (
          <div key={item.label}>
            <div onClick={() => item.expandable && setExpanded(p=>({...p,[item.label]:!p[item.label]}))}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 16px",
                cursor: item.expandable?"pointer":"default",
                background: item.active&&!item.expandable?"#2979FF":"transparent",
                borderRadius: item.active&&!item.expandable?8:0, margin:"1px 8px" }}>
              <span style={{ fontSize:14 }}>{item.icon}</span>
              <span style={{ fontSize:13, color:"#CBD5E0", flex:1, fontWeight:item.active?600:400 }}>{item.label}</span>
              {item.expandable && <span style={{ color:"#718096", fontSize:10 }}>{expanded[item.label]?"▼":"›"}</span>}
            </div>
            {item.children && expanded[item.label] && (
              <div>
                {item.children.map(child => (
                  <div key={child.label} style={{ padding:"7px 16px 7px 42px",
                    background: child.active?"#2979FF":"transparent",
                    borderRadius: child.active?8:0, margin: child.active?"1px 8px":"0", cursor:"pointer" }}>
                    <span style={{ fontSize:12, color:child.active?"#fff":"#A0AEC0", fontWeight:child.active?600:400 }}>
                      {child.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,0.08)",
        display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:32, height:32, borderRadius:"50%", background:"#2979FF",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontWeight:700, fontSize:12 }}>JD</div>
        <div>
          <div style={{ fontSize:12, color:"#E2E8F0", fontWeight:600 }}>Name</div>
          <div style={{ fontSize:11, color:"#718096" }}>Sales Manager</div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

const RFPDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal,       setActiveModal]       = useState(null);
  const [activeTab,         setActiveTab]         = useState("Dashboard");
  const [search,            setSearch]            = useState("");
  const [stageFilter,       setStageFilter]       = useState("All Stages");
  const [statusFilter,      setStatusFilter]      = useState("All Status");
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
            { val:stageFilter,  set:setStageFilter,  opts:["All Stages","RFP Analysis","Awaiting Approval","Won"] },
            { val:statusFilter, set:setStatusFilter, opts:["All Status","Completed","Pending","In Progress"] },
          ].map((f,i) => (
            <select key={i} value={f.val} onChange={e=>f.set(e.target.value)} style={{
              padding:"7px 12px", border:"1px solid #E2E8F0", borderRadius:8,
              fontSize:13, color:"#333", background:"#fff", cursor:"pointer",
              outline:"none", fontFamily:"inherit" }}>
              {f.opts.map(o=><option key={o}>{o}</option>)}
            </select>
          ))}
          <select style={{ padding:"7px 12px", border:"1px solid #E2E8F0", borderRadius:8,
            fontSize:13, color:"#333", background:"#fff", outline:"none", fontFamily:"inherit" }}>
            <option>By Deadline</option><option>By Date</option>
          </select>
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
