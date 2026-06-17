import { useState, useRef, useEffect } from "react";
import { Bell, Check, X, CheckCircle, AlertCircle, FileText, SlidersHorizontal, ChevronDown, Clock, ArrowRight } from "lucide-react";

// ─── Icon config per notification type ────────────────────────────────────────
const TYPE_STYLE = {
  alert:   { icon: AlertCircle,  iconColor: "#EF4444", iconBg: "#FEF2F2" },
  success: { icon: CheckCircle,  iconColor: "#16A34A", iconBg: "#DCFCE7" },
  info:    { icon: FileText,     iconColor: "#2563EB", iconBg: "#DBEAFE" },
  warning: { icon: Clock,        iconColor: "#F59E0B", iconBg: "#FEF3C7" },
};

const FILTERS = ["All", "Active", "In Progress", "Delayed", "Pending", "Completed"];
const TAG_KEY = { All: "all", Active: "active", "In Progress": "in-progress", Delayed: "delayed", Pending: "pending", Completed: "completed" };

// ─── NotificationPanel ────────────────────────────────────────────────────────
const NotificationPanel = ({ notifications = [], onClose, onAction }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterOpen, setFilterOpen]     = useState(false);
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = activeFilter === "All"
    ? notifications
    : notifications.filter(n => n.tag === TAG_KEY[activeFilter]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 899,
          background: "rgba(0,0,0,0.18)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 420, zIndex: 900,
        background: "#fff",
        boxShadow: "-6px 0 32px rgba(0,0,0,0.12)",
        display: "flex", flexDirection: "column",
        fontFamily: "'Inter',system-ui,sans-serif",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #F2F4F7", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Bell size={17} color="#101828" />
              <span style={{ fontSize: 15, fontWeight: 700, color: "#101828" }}>Notifications</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button style={{
                background: "none", border: "none", fontSize: 12, color: "#2979FF",
                cursor: "pointer", fontWeight: 500, fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 4, padding: 0,
              }}>
                <Check size={12} /> Mark all as read
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "none", border: "none", cursor: "pointer", color: "#667085",
                  display: "flex", alignItems: "center", padding: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#667085", margin: "0 0 14px" }}>
            Workflow alerts, tasks &amp; updates
          </p>

          {/* Filter row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#98A2B3", fontWeight: 500 }}>
              {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
            </span>

            {/* Filter dropdown */}
            <div ref={filterRef} style={{ position: "relative" }}>
              <button
                onClick={() => setFilterOpen(v => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 12px", border: "1px solid #E4E7EC", borderRadius: 8,
                  background: "#fff", fontSize: 12, fontWeight: 500, color: "#344054",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                <SlidersHorizontal size={13} color="#667085" />
                Filters
                <ChevronDown size={13} color="#667085" style={{ transform: filterOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
              </button>

              {filterOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 6px)", right: 0,
                  background: "#fff", border: "1px solid #E4E7EC", borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 10,
                  minWidth: 160, overflow: "hidden",
                }}>
                  {FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => { setActiveFilter(f); setFilterOpen(false); }}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "9px 16px", border: "none",
                        background: activeFilter === f ? "#2979FF" : "#fff",
                        color: activeFilter === f ? "#fff" : "#344054",
                        fontSize: 13, fontWeight: activeFilter === f ? 600 : 400,
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notification list */}
        <div className="thin-scrollbar" style={{ overflowY: "auto", flex: 1, padding: "10px 0" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#98A2B3" }}>No {activeFilter.toLowerCase()} notifications.</p>
            </div>
          ) : filtered.map(n => {
            const { icon: Icon, iconColor, iconBg } = TYPE_STYLE[n.type] ?? TYPE_STYLE.info;
            return (
              <div key={n.id} style={{
                margin: "0 14px 10px", padding: "14px 16px",
                background: "#FAFAFA", border: "1px solid #F2F4F7",
                borderRadius: 10, display: "flex", gap: 12,
              }}> 
              
                {/* Colored icon box */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={17} color={iconColor} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#101828", marginBottom: 8 }}>
                    {n.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {n.details.map((d, i) => (
                      <div key={i} style={{ fontSize: 12, color: "#344054", lineHeight: 1.5 }}>
                        <span style={{ color: "#667085" }}>{d.label}: </span>
                        <span style={{ fontWeight: 500 }}>{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Time & Action Button */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: "#98A2B3", fontWeight: 500 }}>
                      {n.time || "Just now"}
                    </div>
                    {n.actionText && (
                      <button
                        onClick={() => {
                          onAction?.(n);
                          onClose?.();
                        }}
                        style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "8px 14px", border: "none", borderRadius: 6,
                        background: "#000", color: "#fff", fontSize: 12, fontWeight: 500,
                        cursor: "pointer", fontFamily: "'Inter',system-ui,sans-serif",
                        transition: "opacity 0.15s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        {n.actionText} <ArrowRight size={14} color="#fff" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
