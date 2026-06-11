// src/pages/dashboard/MainDashboard.jsx
import { useState } from "react";
import { Search, Bell, SlidersHorizontal, ChevronRight } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import DynamicIcon from "../../components/ui/DynamicIcon";
import {
  MAIN_KPI_TOP, MAIN_KPI_BOT, WORKFLOW_PIPELINE,
  PRIORITY_ALERTS, TENDER_STATUS_DATA, DEPT_WORKLOAD_DATA,
  ACTIVITY_TIMELINE, MAIN_NOTIFICATIONS, QUICK_ACCESS,
} from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── SVG Pie / Donut chart ─────────────────────────────────────────────────────
const toRad = deg => (deg - 90) * Math.PI / 180;

const PieChart = ({ data, size = 150, donut = false }) => {
  const cx = size / 2, cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = donut ? outerR * 0.52 : 0;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = 0;
  const slices = data.map(d => {
    const start = angle;
    const sweep = (d.value / total) * 360;
    angle += sweep;
    return { ...d, start, sweep };
  });

  const arcPath = s => {
    const gap = 1.8;
    const a1 = toRad(s.start + gap);
    const a2 = toRad(s.start + s.sweep - gap);
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

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      {slices.map((s, i) => <path key={i} d={arcPath(s)} fill={s.color} />)}
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
  const [search, setSearch] = useState("");

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
          <button style={{
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
          <button style={{
            background: "#fff", border: "1px solid #EAECF0", borderRadius: 8,
            padding: "7px 14px", fontSize: 13, color: "#344054", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontFamily: FONT, fontWeight: 500,
            flexShrink: 0,
          }}>
            <SlidersHorizontal size={14} color="#667085" /> Filters
          </button>
        </div>

        <div style={{ padding: "24px 28px 36px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* ── KPI Row 1 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {MAIN_KPI_TOP.map(kpi => (
              <Card key={kpi.label} style={{ padding: "18px 20px 0", overflow: "hidden" }}>
                <div style={{ fontSize: 11, color: "#667085", fontWeight: 500, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 34, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 6 }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16 }}>{kpi.sub}</div>
                <div style={{ height: 3, background: "#F2F4F7", margin: "0 -20px" }}>
                  <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar, borderRadius: "0 2px 2px 0" }} />
                </div>
              </Card>
            ))}
          </div>

          {/* ── KPI Row 2 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {MAIN_KPI_BOT.map(kpi => (
              <div key={kpi.label} style={{
                background: kpi.cardBg, borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.05)",
                padding: "18px 20px 0", overflow: "hidden",
              }}>
                <div style={{ fontSize: 11, color: kpi.color, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 34, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 6 }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: 12, color: kpi.color, opacity: 0.6, marginBottom: 16 }}>{kpi.sub}</div>
                <div style={{ height: 3, background: "rgba(0,0,0,0.08)", margin: "0 -20px" }}>
                  <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar, borderRadius: "0 2px 2px 0" }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Live Workflow Pipeline ── */}
          <div>
            <SectionLabel>Live Workflow Pipeline</SectionLabel>
            <Card style={{ padding: "18px 20px" }}>
              {/* overflow: hidden on outer clips the shadow; scroll is on inner */}
              <div
                className="no-scrollbar"
                style={{ overflowX: "auto", paddingBottom: 2 }}
              >
                <div style={{ display: "flex", alignItems: "stretch", gap: 0, width: "max-content" }}>
                  {WORKFLOW_PIPELINE.map((stage, i) => (
                    <div key={stage.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                      {/* Stage card */}
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

                      {/* Arrow */}
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
              {PRIORITY_ALERTS.map((alert, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0",
                  borderBottom: i < PRIORITY_ALERTS.length - 1 ? "1px solid #F2F4F7" : "none",
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
                <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 18 }}>
                  Tender Status Distribution
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <PieChart data={TENDER_STATUS_DATA} size={150} donut />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {TENDER_STATUS_DATA.map(d => (
                      <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "#667085", flex: 1 }}>{d.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#344054" }}>{d.value}%</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #F2F4F7", marginTop: 10, paddingTop: 10, display: "flex", flexWrap: "wrap", gap: "5px 16px" }}>
                      {TENDER_STATUS_DATA.map(d => (
                        <span key={d.label} style={{ fontSize: 11, color: "#667085", display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontWeight: 700, color: "#344054" }}>{d.count}</span> {d.label.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Department Workload Distribution */}
              <Card style={{ padding: "20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 18 }}>
                  Department Workload Distribution
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <PieChart data={DEPT_WORKLOAD_DATA} size={150} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {DEPT_WORKLOAD_DATA.map(d => (
                      <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "#667085", flex: 1 }}>{d.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
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
                <button key={item.label} style={{
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
    </div>
  );
};

export default MainDashboard;
