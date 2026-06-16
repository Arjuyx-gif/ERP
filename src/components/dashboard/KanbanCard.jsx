import { useState, useEffect } from "react";
import {
  Calendar, Clock, User, CheckCircle, XCircle, Upload, Download,
  ArrowUpRight, Eye, AlertCircle, Star
} from "lucide-react";
import Badge from "../ui/Badge";
import Tag from "../ui/Tag";
import DynamicIcon from "../ui/DynamicIcon";

const btnStyle = {
  padding: "7px 0", borderRadius: 6, fontSize: 12, fontWeight: 600,
  cursor: "pointer", width: "100%", fontFamily: "inherit",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
};

const KanbanCard = ({ card, onViewRFP }) => {
  const [checked, setChecked] = useState(card.checkedNotify || []);
  const toggle = (item) => setChecked(p => p.includes(item) ? p.filter(x => x !== item) : [...p, item]);

  useEffect(() => {
    setChecked(card.checkedNotify || []);
  }, [card.checkedNotify]);

  const isBlue = card.action === "Send Notification";

  return (
    <div style={{
      background: "#fff", borderRadius: 10, padding: "14px 14px 12px",
      marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0",
    }}>

      {/* ID + status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#222" }}>
          {card.id.replace(/-won$|-lost$/, "")}
        </span>
        <Badge text={card.status} color={card.statusColor} bg={card.statusBg} />
      </div>

      {/* Tender / customer */}
      <div style={{ fontSize: 12, color: "#555", marginBottom: 2 }}>{card.tender}</div>
      {card.customer && <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>{card.customer}</div>}

      {/* Amount */}
      <div style={{ fontSize: 12, color: "#333", marginBottom: 6 }}>₹ {card.amount}</div>

      {/* Tags */}
      {card.tags?.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {card.tags.map((t, i) => <Tag key={i} label={t} colors={card.tagColors} />)}
        </div>
      )}

      {/* Single badge */}
      {card.badge && (
        <div style={{ marginBottom: 6 }}>
          <Badge text={card.badge.text} color={card.badge.color} bg={card.badge.bg} />
        </div>
      )}

      {/* Multi badges */}
      {card.badges?.map((b, i) => (
        <span key={i} style={{ display: "inline-block", marginRight: 4, marginBottom: 4 }}>
          <Badge text={b.text} color={b.color} bg={b.bg} />
        </span>
      ))}

      {/* Details */}
      <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>
        {card.details?.status && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <User size={11} color="#888" />
            <span>Status: {card.details.status}</span>
          </div>
        )}
        {card.details?.preBidDate && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <Calendar size={11} color="#888" />
            <span>Pre Bid - Date: {card.details.preBidDate}</span>
          </div>
        )}
        {card.details?.preBidTime && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <Clock size={11} color="#888" />
            <span>Pre Bid - Time: {card.details.preBidTime}</span>
          </div>
        )}
        {card.details?.preBidVenue && (
          <div style={{ paddingLeft: 16, marginBottom: 2 }}>
            Pre Bid - Venue: {card.details.preBidVenue}
          </div>
        )}
        {card.details?.dueDate && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <Calendar size={11} color="#888" />
            <span>Due Date: {card.details.dueDate}</span>
          </div>
        )}
        {card.details?.dueTime && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <Clock size={11} color="#888" />
            <span>Due Time: {card.details.dueTime}</span>
          </div>
        )}
        {card.details?.remark && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <User size={11} color="#888" />
            <span>Remark: {card.details.remark}</span>
          </div>
        )}
        {card.details?.deadline && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <Calendar size={11} color="#888" />
            <span>Deadline: <strong style={{ color: card.details.deadlineColor }}>{card.details.deadline}</strong></span>
          </div>
        )}
      </div>

      {/* Status badge with optional icon */}
      {card.statusBadge && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 12px", borderRadius: 8,
            background: card.statusBadge.bg || "#FFFBEB",
            border: `1px solid ${card.statusBadge.color ? card.statusBadge.color + "40" : "#FDE047"}`,
            color: card.statusBadge.color || "#B45309", fontSize: 12, fontWeight: 700,
          }}>
            <AlertCircle size={14} color={card.statusBadge.color || "#B45309"} strokeWidth={2.5} />
            {card.statusBadge.iconName === "bell" && (
              <Star size={14} color="#FBBF24" fill="#FBBF24" strokeWidth={1} />
            )}
            <span style={{ marginLeft: 2 }}>{card.statusBadge.text}</span>
          </div>
        </div>
      )}

      {/* Notify checklist */}
      {card.notifyList && (
        <div style={{ marginBottom: 8 }}>
          {card.notifyList.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <input
                type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)}
                style={{ accentColor: "#2979FF", width: 13, height: 13 }}
                disabled={card.action === "View"}
              />
              <span style={{ fontSize: 11, color: "#555" }}>Notify: {item}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#555", marginTop: 4 }}>
            <User size={11} color="#888" />
            Send By: <span style={{ fontWeight: 600, color: "#333" }}>{card.sendBy || "—"}</span>
          </div>
        </div>
      )}

      {/* Result Awaited Action */}
      {card.wonLost && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 6 }}>
          <button
            onClick={() => onViewRFP?.({ ...card, action: "Update Result" })}
            style={{ ...btnStyle, background: "#111", color: "#fff", border: "none" }}
          >
            Update Result
          </button>
        </div>
      )}

      {/* PO actions */}
      {card.poActions && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 6 }}>
          <button
            onClick={() => onViewRFP?.({ ...card, action: "View PO" })}
            style={{ ...btnStyle, background: "#fff", color: "#111827", border: "1px solid #E5E7EB" }}
          >
            <Eye size={14} /> View PO
          </button>
          <button
            onClick={() => onViewRFP?.({ ...card, action: "Additional Docs" })}
            style={{ ...btnStyle, background: "#000", color: "#fff", border: "none", position: "relative", display: "block", textAlign: "center", padding: "10px 0" }}
          >
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
              <Upload size={14} />
            </div>
            <span style={{ display: "inline-block", lineHeight: 1.4 }}>
              Additional Documents &<br />GeM Charges
            </span>
          </button>
        </div>
      )}

      {/* Lost actions */}
      {card.lostActions && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 6 }}>
          <button
            onClick={() => onViewRFP?.({ ...card, action: "EMD Return" })}
            style={{ ...btnStyle, background: "#fff", color: "#333", border: "1px solid #E2E8F0" }}
          >
            <ArrowUpRight size={13} /> Notify for EMD Return
          </button>
          <button style={{ ...btnStyle, background: "#fff", color: "#333", border: "1px solid #E2E8F0" }}>
            <Eye size={13} /> View Comparison Sheet
          </button>
        </div>
      )}

      {/* CTA button */}
      {card.action && (
        <button
          onClick={["View RFP Form", "Review Now", "Send Notification", "View", "Complete Tasks", "Bid Submitted", "View PO", "View Task"].includes(card.action) ? () => onViewRFP({ ...card, checkedNotify: checked }) : undefined}
          style={{
            width: "100%", marginTop: 4, padding: "8px 0",
            background: isBlue ? "#2979FF" : "#fff",
            color: isBlue ? "#fff" : "#2979FF",
            border: isBlue ? "none" : "1px solid #2979FF",
            borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            fontFamily: "inherit",
          }}
        >
          <Eye size={13} /> {card.action}
        </button>
      )}
    </div>
  );
};

export default KanbanCard;
