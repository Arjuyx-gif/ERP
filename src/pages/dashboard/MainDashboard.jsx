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
    border: "1px solid #F0F0F0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    ...style,
  }}>
    {children}
  </div>
);

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
const MainDashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: FONT, background: "#F7F8FA",
    }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>

        {/* ── Top bar ── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#fff", borderBottom: "1px solid #E5E7EB",
          padding: "10px 24px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{
              position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
              display: "flex", alignItems: "center",
            }}>
              <Search size={14} color="#aaa" />
            </span>
            <input
              type="text"
              placeholder="Search Tender ID / Order ID / Customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "8px 12px 8px 34px",
                border: "1px solid #E2E8F0", borderRadius: 8,
                fontSize: 13, color: "#333", background: "#F8FAFC",
                outline: "none", fontFamily: FONT, boxSizing: "border-box",
              }}
            />
          </div>
          <button style={{
            background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, position: "relative",
          }}>
            <Bell size={16} color="#555" />
            <span style={{
              position: "absolute", top: 7, right: 7,
              width: 7, height: 7, background: "#EF4444",
              borderRadius: "50%", border: "1.5px solid #fff",
            }} />
          </button>
          <button style={{
            background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
            padding: "7px 14px", fontSize: 13, color: "#374151", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontFamily: FONT, fontWeight: 500,
            flexShrink: 0,
          }}>
            <SlidersHorizontal size={14} color="#6B7280" /> Filters
          </button>
        </div>

        <div style={{ padding: "20px 24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── KPI Row 1 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {MAIN_KPI_TOP.map(kpi => (
              <Card key={kpi.label} style={{ padding: "16px 16px 0", overflow: "hidden" }}>
                <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 4 }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 14 }}>{kpi.sub}</div>
                <div style={{ height: 3, background: "#F3F4F6", margin: "0 -16px" }}>
                  <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar }} />
                </div>
              </Card>
            ))}
          </div>

          {/* ── KPI Row 2 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {MAIN_KPI_BOT.map(kpi => (
              <div key={kpi.label} style={{
                background: kpi.cardBg, borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.05)",
                padding: "16px 16px 0", overflow: "hidden",
              }}>
                <div style={{ fontSize: 11, color: kpi.color, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 4 }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: 11, color: kpi.color, opacity: 0.65, marginBottom: 14 }}>{kpi.sub}</div>
                <div style={{ height: 3, background: "rgba(0,0,0,0.08)", margin: "0 -16px" }}>
                  <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Live Workflow Pipeline ── */}
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Live Workflow Pipeline</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
              {WORKFLOW_PIPELINE.map((stage, i) => (
                <div key={stage.label} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <div style={{
                    background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10,
                    padding: "12px 18px", minWidth: 130,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>{stage.label}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>
                      Active{" "}<span style={{ color: "#2979FF", fontWeight: 700 }}>{stage.active}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: stage.cancelled != null ? 2 : 0 }}>
                      Delayed{" "}<span style={{ color: "#EF4444", fontWeight: 700 }}>{stage.delayed ?? 0}</span>
                    </div>
                    {stage.cancelled != null && (
                      <div style={{ fontSize: 12, color: "#6B7280" }}>
                        Cancelled{" "}<span style={{ color: "#EF4444", fontWeight: 700 }}>{stage.cancelled}</span>
                      </div>
                    )}
                  </div>
                  {i < WORKFLOW_PIPELINE.length - 1 && (
                    <ChevronRight size={18} color="#D1D5DB" />
                  )}
                </div>
              ))}
              <ChevronRight size={18} color="#D1D5DB" style={{ flexShrink: 0 }} />
            </div>
          </Card>

          {/* ── Priority Alerts ── */}
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Priority Alerts</div>
            {PRIORITY_ALERTS.map((alert, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0",
                borderBottom: i < PRIORITY_ALERTS.length - 1 ? "1px solid #F3F4F6" : "none",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: alert.iconColor + "18",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <DynamicIcon name={alert.icon} size={16} color={alert.iconColor} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{alert.title}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{alert.sub}</div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: "#6B7280",
                  background: "#F3F4F6", borderRadius: 6, padding: "3px 9px", flexShrink: 0,
                }}>
                  {alert.days}
                </span>
              </div>
            ))}
          </Card>

          {/* ── Operational Analytics ── */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Operational Analytics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

              {/* Tender Status Distribution */}
              <Card style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 16 }}>Tender Status Distribution</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <PieChart data={TENDER_STATUS_DATA} size={150} donut />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {TENDER_STATUS_DATA.map(d => (
                      <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: "#374151", flex: 1 }}>
                          {d.label}{" "}<span style={{ color: "#2563EB", fontWeight: 700 }}>{d.value}%</span>
                        </span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 10, paddingTop: 10, display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
                      {TENDER_STATUS_DATA.map(d => (
                        <span key={d.label} style={{ fontSize: 11, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                          {d.label.split(" ")[0]}: <strong style={{ color: "#374151" }}>{d.count}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Department Workload Distribution */}
              <Card style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 16 }}>Department Workload Distribution</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <PieChart data={DEPT_WORKLOAD_DATA} size={150} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {DEPT_WORKLOAD_DATA.map(d => (
                      <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                        <span style={{ width: 9, height: 9, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: "#374151", flex: 1 }}>{d.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: d.color }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* ── Recent Activities & Notifications ── */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Recent Activities & Notifications</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

              {/* Activity Timeline */}
              <Card style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 14 }}>Activity Timeline</div>
                {ACTIVITY_TIMELINE.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                      background: a.iconColor + "18",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <DynamicIcon name={a.icon} size={13} color={a.iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{a.title}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0, marginLeft: 8 }}>{a.time}</span>
                      </div>
                      <div style={{ fontSize: 11, marginTop: 2 }}>
                        <span style={{ color: "#2563EB", fontWeight: 600 }}>{a.id}</span>
                        <span style={{ color: "#9CA3AF" }}> · {a.meta}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button style={{
                  width: "100%", padding: "9px", marginTop: 4,
                  border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 12, fontWeight: 600, color: "#2979FF",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  View All Activities
                </button>
              </Card>

              {/* Notifications */}
              <Card style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 14 }}>Notifications</div>
                {MAIN_NOTIFICATIONS.map((n, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, padding: "10px 12px",
                    background: n.iconBg, borderRadius: 8, marginBottom: 8,
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                      background: n.iconColor + "22",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <DynamicIcon name={n.icon} size={13} color={n.iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{n.title}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0, marginLeft: 8 }}>{n.time}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{n.sub}</div>
                    </div>
                  </div>
                ))}
                <button style={{
                  width: "100%", padding: "9px", marginTop: 4,
                  border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 12, fontWeight: 600, color: "#2979FF",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  View All Activities
                </button>
              </Card>
            </div>
          </div>

          {/* ── Quick Access ── */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Quick Access</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
              {QUICK_ACCESS.map(item => (
                <button key={item.label} style={{
                  background: "#fff", border: "1px solid #F0F0F0", borderRadius: 12,
                  padding: "16px 8px 14px", cursor: "pointer", fontFamily: FONT,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: item.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <DynamicIcon name={item.icon} size={20} color={item.color} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#374151", textAlign: "center", lineHeight: 1.35 }}>
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
