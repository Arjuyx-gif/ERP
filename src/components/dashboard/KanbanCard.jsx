import { useState } from "react";
import Badge from "../ui/Badge";
import Tag from "../ui/Tag";

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

export default KanbanCard;