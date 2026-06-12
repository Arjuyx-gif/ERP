import { useRef, useState } from "react";
import { Search, Bell, SlidersHorizontal, ChevronDown } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";

const FONT = "'Inter','Segoe UI',sans-serif";
const DASH_FILTERS = ["All", "Active", "In Progress", "Delayed", "Pending", "Completed"];

const DashboardTopBar = ({ search, onSearchChange, onBellClick, activeFilter, onFilterChange }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useClickOutside(filterRef, () => setFilterOpen(false));

  const isFiltered = activeFilter !== "All";

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff", borderBottom: "1px solid #EAECF0",
      padding: "12px 28px",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      {/* Search */}
      <div style={{ flex: 1, position: "relative" }}>
        <span style={{
          position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
          display: "flex", alignItems: "center",
        }}>
          <Search size={14} color="#9CA3AF" />
        </span>
        <input
          type="text"
          placeholder="Search Tender ID / Order ID / Customer..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            width: "100%", padding: "8px 12px 8px 34px",
            border: "1px solid #EAECF0", borderRadius: 8,
            fontSize: 13, color: "#344054", background: "#F9FAFB",
            outline: "none", fontFamily: FONT, boxSizing: "border-box",
          }}
        />
      </div>

      {/* Notification bell */}
      <button
        onClick={onBellClick}
        style={{
          background: "#fff", border: "1px solid #EAECF0", borderRadius: 8,
          width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0, position: "relative",
        }}
      >
        <Bell size={16} color="#667085" />
        <span style={{
          position: "absolute", top: 8, right: 8,
          width: 7, height: 7, background: "#F04438",
          borderRadius: "50%", border: "1.5px solid #fff",
        }} />
      </button>

      {/* Filter dropdown */}
      <div ref={filterRef} style={{ position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => setFilterOpen(v => !v)}
          style={{
            background: isFiltered ? "#EFF6FF" : "#fff",
            border: `1px solid ${isFiltered ? "#2979FF" : "#EAECF0"}`,
            borderRadius: 8, padding: "7px 14px", fontSize: 13,
            color: isFiltered ? "#2979FF" : "#344054",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            fontFamily: FONT, fontWeight: 500,
          }}
        >
          <SlidersHorizontal size={14} color={isFiltered ? "#2979FF" : "#667085"} />
          {isFiltered ? activeFilter : "Filters"}
          <ChevronDown
            size={13}
            color={isFiltered ? "#2979FF" : "#667085"}
            style={{ transform: filterOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}
          />
        </button>

        {filterOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", right: 0,
            background: "#fff", border: "1px solid #E4E7EC", borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100,
            minWidth: 160, overflow: "hidden",
          }}>
            {DASH_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => { onFilterChange(f); setFilterOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "9px 16px", border: "none",
                  background: activeFilter === f ? "#2979FF" : "#fff",
                  color: activeFilter === f ? "#fff" : "#344054",
                  fontSize: 13, fontWeight: activeFilter === f ? 600 : 400,
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTopBar;
