// ─── KanbanBoard ──────────────────────────────────────────────────────────────
// Pure presentational component. Receives columns from the parent (via the
// useDashboard hook) and fires onViewAll(col) when a column header is clicked.

import KanbanCard from "./KanbanCard";

const KanbanBoard = ({ columns, onViewAll }) => (
  <div style={{
    display: "flex", gap: 14,
    minWidth: "max-content", paddingBottom: 8,
    alignItems: "flex-start",
  }}>
    {columns.map(col => (
      <div key={col.id} style={{ width: 260, flexShrink: 0 }}>

        {/* Column header */}
        <div style={{
          background: col.color, borderRadius: "10px 10px 0 0",
          padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{col.title}</span>
            <span style={{
              background: col.countBg, color: "#fff",
              fontSize: 11, fontWeight: 700, borderRadius: 12, padding: "1px 8px",
            }}>
              {col.count}
            </span>
          </div>
          <button
            onClick={() => onViewAll(col)}
            style={{
              background: "none", border: "none", fontSize: 11,
              color: "#666", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            👁 View All
          </button>
        </div>

        {/* Cards */}
        <div style={{
          background: "#EAECF0", borderRadius: "0 0 10px 10px",
          padding: "10px 8px 8px", minHeight: 80,
        }}>
          {col.cards.map((card, idx) => (
            <KanbanCard key={idx} card={card} />
          ))}
        </div>

      </div>
    ))}
  </div>
);

export default KanbanBoard;
