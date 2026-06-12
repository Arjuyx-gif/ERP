// src/pages/dashboard/MainDashboard.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, SlidersHorizontal, ChevronRight, ChevronDown } from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import DynamicIcon from "../../components/ui/DynamicIcon";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import {
  MAIN_KPI_TOP, MAIN_KPI_BOT, WORKFLOW_PIPELINE,
  PRIORITY_ALERTS, TENDER_STATUS_DATA, DEPT_WORKLOAD_DATA,
  ACTIVITY_TIMELINE, MAIN_NOTIFICATIONS, QUICK_ACCESS,
  PANEL_NOTIFICATIONS,
} from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── SVG Pie / Donut chart ─────────────────────────────────────────────────────
const toRad = deg => (deg - 90) * Math.PI / 180;

const PieChart = ({ data, size = 150, donut = false }) => {
  const pad = 70;
  const total = size + pad * 2;
  const cx = total / 2, cy = total / 2;
  const outerR = size / 2;
  const innerR = donut ? outerR * 0.52 : 0;
  const dataTotal = data.reduce((s, d) => s + d.value, 0);

  // ESLint-safe: no mutable variable reassignment
  const slices = data.reduce((acc, d) => {
    const start = acc.length > 0 ? acc[acc.length - 1].start + acc[acc.length - 1].sweep : 0;
    const sweep = (d.value / dataTotal) * 360;
    return [...acc, { ...d, start, sweep }];
  }, []);

  const arcPath = s => {
    const a1 = toRad(s.start);
    const a2 = toRad(s.start + s.sweep);
    const x1o = cx + outerR * Math.cos(a1), y1o = cy + outerR * Math.sin(a1);
    const x2o = cx + outerR * Math.cos(a2), y2o = cy + outerR * Math.sin(a2);
    const large = s.sweep > 180 ? 1 : 0;
    if (innerR > 0) {
      const x1i = cx + innerR * Math.cos(a2), y1i = cy + innerR * Math.sin(a2);
      const x2i = cx + innerR * Math.cos(a1), y2i = cy + innerR * Math.sin(a1);
      return `M${x1o},${y1o} A${outerR},${outerR} 0 ${large} 1 ${x2o},${y2o} L${x1i},${y1i} A${innerR},${innerR} 0 ${large} 0 ${x2i},${y2i} Z`;
    }
    return `M${cx},${cy} L${x1o},${y1o} A${outerR},${outerR} 0 ${large} 1 ${x2o},${y2o} Z`;
  };

  const labelLine = s => {
    const mid = toRad(s.start + s.sweep / 2);
    const r1 = outerR + 8;
    const r2 = outerR + 28;
    const x1 = cx + r1 * Math.cos(mid), y1 = cy + r1 * Math.sin(mid);
    const x2 = cx + r2 * Math.cos(mid), y2 = cy + r2 * Math.sin(mid);
    const isRight = Math.cos(mid) > 0;
    const x3 = x2 + (isRight ? 12 : -12);
    return { x1, y1, x2, y2, x3, y3: y2, isRight, lx: x3, ly: y2 };
  };

  return (
    <svg
      width={total}
      height={total}
      viewBox={`0 0 ${total} ${total}`}
      style={{ flexShrink: 0, overflow: "visible" }}
    >
      {slices.map((s, i) => (
        <g key={i}>
          <path d={arcPath(s)} fill={s.color} />
          {s.sweep > 10 && (() => {
            const { x1, y1, x2, y2, x3, y3, isRight, lx, ly } = labelLine(s);
            return (
              <g>
                <polyline
                  points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={1}
                />
                <text
                  x={lx + (isRight ? 4 : -4)}
                  y={ly}
                  textAnchor={isRight ? "start" : "end"}
                  dominantBaseline="middle"
                  fontSize={10}
                  fontWeight={600}
                  fontFamily="Inter, sans-serif"
                  fill={s.color}
                >
                  {s.label} {s.value}%
                </text>
              </g>
            );
          })()}
        </g>
      ))}
    </svg>
  );
};

// ─── Shared card ──────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fff", borderRadius: 12,
    border: "1px solid #EAECF0",
    boxShadow: "0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
    ...style,
  }}>
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 15, fontWeight: 700, color: "#101828", marginBottom: 12, letterSpacing: "-0.01em" }}>
    {children}
  </div>
);

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
const MainDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch]                       = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [dashFilter, setDashFilter]               = useState("All");
  const [filterOpen, setFilterOpen]               = useState(false);
  const filterRef                                 = useRef(null);

  const DASH_FILTERS = ["All", "Active", "In Progress", "Delayed", "Pending", "Completed"];
  const TAG_MAP = { All: "all", Active: "active", "In Progress": "in-progress", Delayed: "delayed", Pending: "pending", Completed: "completed" };

  useEffect(() => {
    const handler = e => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredAlerts = dashFilter === "All"
    ? PRIORITY_ALERTS
    : PRIORITY_ALERTS.filter(a => a.tag === TAG_MAP[dashFilter]);

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: FONT, background: "#F8F9FB",
    }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>

        {/* ── Top bar ── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#fff", borderBottom: "1px solid #EAECF0",
          padding: "12px 28px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
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
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "8px 12px 8px 34px",
                border: "1px solid #EAECF0", borderRadius: 8,
                fontSize: 13, color: "#344054", background: "#F9FAFB",
                outline: "none", fontFamily: FONT, boxSizing: "border-box",
              }}
            />
          </div>
          <button onClick={() => setShowNotifications(v => !v)} style={{
            background: "#fff", border: "1px solid #EAECF0", borderRadius: 8,
            width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, position: "relative",
          }}>
            <Bell size={16} color="#667085" />
            <span style={{
              position: "absolute", top: 8, right: 8,
              width: 7, height: 7, background: "#F04438",
              borderRadius: "50%", border: "1.5px solid #fff",
            }} />
          </button>
          <div ref={filterRef} style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={() => setFilterOpen(v => !v)}
              style={{
                background: dashFilter !== "All" ? "#EFF6FF" : "#fff",
                border: `1px solid ${dashFilter !== "All" ? "#2979FF" : "#EAECF0"}`,
                borderRadius: 8, padding: "7px 14px", fontSize: 13,
                color: dashFilter !== "All" ? "#2979FF" : "#344054",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                fontFamily: FONT, fontWeight: 500,
              }}
            >
              <SlidersHorizontal size={14} color={dashFilter !== "All" ? "#2979FF" : "#667085"} />
              {dashFilter === "All" ? "Filters" : dashFilter}
              <ChevronDown
                size={13}
                color={dashFilter !== "All" ? "#2979FF" : "#667085"}
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
                    onClick={() => { setDashFilter(f); setFilterOpen(false); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "9px 16px", border: "none",
                      background: dashFilter === f ? "#2979FF" : "#fff",
                      color: dashFilter === f ? "#fff" : "#344054",
                      fontSize: 13, fontWeight: dashFilter === f ? 600 : 400,
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

        <div style={{ padding: "24px 28px 36px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ── KPI Row 1 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {MAIN_KPI_TOP.map(kpi => (
              <div key={kpi.label} style={{
                background: kpi.cardBg, borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden", display: "flex", flexDirection: "column",
              }}>
                <div style={{ padding: "18px 20px 16px", flex: 1 }}>
                  <div style={{ fontSize: 12, color: kpi.color, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                    {kpi.label}
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 8 }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontSize: 12, color: kpi.color, opacity: 0.55 }}>{kpi.sub}</div>
                </div>
                <div style={{ height: 4, background: kpi.barTrack }}>
                  <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── KPI Row 2 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {MAIN_KPI_BOT.map(kpi => (
              <div key={kpi.label} style={{
                background: kpi.cardBg, borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.05)",
                overflow: "hidden", display: "flex", flexDirection: "column",
              }}>
                <div style={{ padding: "18px 20px 16px", flex: 1 }}>
                  <div style={{ fontSize: 12, color: kpi.color, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                    {kpi.label}
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 8 }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontSize: 12, color: kpi.color, opacity: 0.55 }}>{kpi.sub}</div>
                </div>
                <div style={{ height: 4, background: "rgba(0,0,0,0.08)" }}>
                  <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Live Workflow Pipeline ── */}
          <div>
            <SectionLabel>Live Workflow Pipeline</SectionLabel>
            <Card style={{ padding: "18px 20px" }}>
              <div
                className="thin-scrollbar"
                style={{ overflowX: "auto", paddingBottom: 6 }}
              >
                <div style={{ display: "flex", alignItems: "stretch", gap: 0, width: "max-content" }}>
                  {WORKFLOW_PIPELINE.map((stage) => (
                    <div key={stage.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                      <div style={{
                        background: "#fff", border: "1px solid #E4E7EC", borderRadius: 10,
                        padding: "12px 18px", minWidth: 130,
                      }}>
                        <div style={{
                          fontSize: 12, fontWeight: 700, color: "#101828",
                          marginBottom: 10, whiteSpace: "nowrap",
                        }}>
                          {stage.label}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: "#667085" }}>Active</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#2979FF" }}>{stage.active}</span>
                        </div>
                        {(stage.delayed != null || stage.delayed === 0) && stage.delayed !== undefined && (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: stage.cancelled != null ? 4 : 0 }}>
                            <span style={{ fontSize: 12, color: "#667085" }}>Delayed</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#F04438" }}>{stage.delayed}</span>
                          </div>
                        )}
                        {stage.cancelled != null && (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: "#667085" }}>Cancelled</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#F04438" }}>{stage.cancelled}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "0 6px", color: "#D0D5DD", flexShrink: 0 }}>
                        <ChevronRight size={16} color="#D0D5DD" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* ── Priority Alerts ── */}
          <div>
            <SectionLabel>Priority Alerts</SectionLabel>
            <Card style={{ padding: "4px 20px" }}>
              {filteredAlerts.length === 0 ? (
                <div style={{ padding: "24px 0", textAlign: "center", color: "#98A2B3", fontSize: 13 }}>
                  No {dashFilter.toLowerCase()} alerts.
                </div>
              ) : filteredAlerts.map((alert, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0",
                  borderBottom: i < filteredAlerts.length - 1 ? "1px solid #F2F4F7" : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background: alert.iconColor + "15",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <DynamicIcon name={alert.icon} size={16} color={alert.iconColor} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#101828", marginBottom: 2 }}>{alert.title}</div>
                    <div style={{ fontSize: 12, color: "#98A2B3" }}>{alert.sub}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: "#667085",
                    background: "#F2F4F7", borderRadius: 6, padding: "4px 10px",
                    flexShrink: 0, whiteSpace: "nowrap",
                  }}>
                    {alert.days}
                  </span>
                </div>
              ))}
            </Card>
          </div>

          {/* ── Operational Analytics ── */}
          <div>
            <SectionLabel>Operational Analytics</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              {/* Tender Status Distribution */}
              <Card style={{ padding: "20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 12 }}>
                  Tender Status Distribution
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart data={TENDER_STATUS_DATA} size={150} donut />
                </div>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "6px 24px", marginTop: 16,
                  borderTop: "1px solid #F2F4F7", paddingTop: 14,
                }}>
                  {TENDER_STATUS_DATA.map(d => (
                    <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: d.color, flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 12, color: "#344054" }}>
                        {d.label}: <strong>{d.count}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Department Workload Distribution */}
              <Card style={{ padding: "20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 12 }}>
                  Department Workload Distribution
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart data={DEPT_WORKLOAD_DATA} size={150} />
                </div>
              </Card>

            </div>
          </div>

          {/* ── Recent Activities & Notifications ── */}
          <div>
            <SectionLabel>Recent Activities & Notifications</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              {/* Activity Timeline */}
              <Card style={{ padding: "20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 16 }}>Activity Timeline</div>
                {ACTIVITY_TIMELINE.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                      background: a.iconColor + "15",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <DynamicIcon name={a.icon} size={14} color={a.iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#101828" }}>{a.title}</span>
                        <span style={{ fontSize: 11, color: "#98A2B3", flexShrink: 0 }}>{a.time}</span>
                      </div>
                      <div style={{ fontSize: 12, marginTop: 2 }}>
                        <span style={{ color: "#2563EB", fontWeight: 600 }}>{a.id}</span>
                        <span style={{ color: "#98A2B3" }}> · {a.meta}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{
                  width: "100%", padding: "10px", marginTop: 4,
                  border: "1px solid #EAECF0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 600, color: "#2979FF",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  View All Activities
                </button>
              </Card>

              {/* Notifications */}
              <Card style={{ padding: "20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 16 }}>Notifications</div>
                {MAIN_NOTIFICATIONS.map((n, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, padding: "12px 14px",
                    background: n.iconBg, borderRadius: 8, marginBottom: 10,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                      background: n.iconColor + "20",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <DynamicIcon name={n.icon} size={14} color={n.iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#101828" }}>{n.title}</span>
                        <span style={{ fontSize: 11, color: "#98A2B3", flexShrink: 0, whiteSpace: "nowrap" }}>{n.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#667085", marginTop: 2 }}>{n.sub}</div>
                    </div>
                  </div>
                ))}
                <button style={{
                  width: "100%", padding: "10px", marginTop: 4,
                  border: "1px solid #EAECF0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 600, color: "#2979FF",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  View All Activities
                </button>
              </Card>
            </div>
          </div>

          {/* ── Quick Access ── */}
          <div>
            <SectionLabel>Quick Access</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
              {QUICK_ACCESS.map(item => (
                <button key={item.label} onClick={() => navigate(item.path)} style={{
                  background: "#fff", border: "1px solid #EAECF0", borderRadius: 12,
                  padding: "18px 10px 16px", cursor: "pointer", fontFamily: FONT,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, background: item.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <DynamicIcon name={item.icon} size={20} color={item.color} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#344054", textAlign: "center", lineHeight: 1.4 }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {showNotifications && (
        <NotificationPanel
          notifications={PANEL_NOTIFICATIONS}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default MainDashboard;