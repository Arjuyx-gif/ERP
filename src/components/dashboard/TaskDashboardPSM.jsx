import { useState } from "react";
import { Search, Eye, Filter, ArrowUpDown, ChevronDown, Bell, AlertTriangle } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TABLE_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales persons Name", highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales persons Name", highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Reactive",  assignedTo: "Pre Sales persons Name", highlight: "green" },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales persons Name", highlight: null    },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Reactive",  assignedTo: "Pre Sales persons Name", highlight: "yellow"},
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", title: "Tender Title", type: "Proactive", assignedTo: "Pre Sales persons Name", highlight: "red"   },
];

const ROW_BG    = { green: "#E8F5E9", yellow: "#FFFDE7", red: "#FFF0F0" };
const TYPE_PILL = { Proactive: { bg: "#EFF6FF", color: "#1D4ED8" }, Reactive: { bg: "#FEF3C7", color: "#92400E" } };

const TEAM_MEMBERS = [
  { id: 1, name: "Pre - Sales Member Name", status: "Busy",       statusColor: "#F97316", active: 6, pending: 5, done: 8, workload: 80 },
  { id: 2, name: "Pre - Sales Member Name", status: "Overloaded", statusColor: "#DC2626", active: 6, pending: 5, done: 8, workload: 95 },
  { id: 3, name: "Pre - Sales Member Name", status: "Available",  statusColor: "#16A34A", active: 6, pending: 5, done: 8, workload: 40 },
  { id: 4, name: "Pre - Sales Member Name", status: "Normal",     statusColor: "#2563EB", active: 6, pending: 5, done: 8, workload: 65 },
  { id: 5, name: "Pre - Sales Member Name", status: "Busy",       statusColor: "#F97316", active: 6, pending: 5, done: 8, workload: 80 },
];
const BAR_COLOR = { Overloaded: "#DC2626", Busy: "#F97316", Available: "#16A34A", Normal: "#2563EB" };

const DEADLINES = [
  { type: "Bid Submission",    id: "TND-2026-050", customer: "Customer Name", date: "Jun 29, 2026", urgency: "red"    },
  { type: "OEM Response Due",  id: "TND-2026-048", customer: "Customer Name", date: "Jun 25, 2026", urgency: "red"    },
  { type: "OEM Response Due",  id: "TND-2026-046", customer: "Customer Name", date: "Jun 27, 2026", urgency: "red"    },
  { type: "OEM Response Due",  id: "TND-2026-045", customer: "Customer Name", date: "Jun 28, 2026", urgency: "red"    },
  { type: "Pre-Bid Meeting",   id: "TND-2026-049", customer: "Customer Name", date: "Jul 2, 2026",  urgency: "yellow" },
  { type: "Pre-Bid Query Due", id: "TND-2026-048", customer: "Customer Name", date: "Jul 4, 2026",  urgency: "yellow" },
  { type: "Bid Submission",    id: "TND-2026-046", customer: "Customer Name", date: "Jul 5, 2026",  urgency: "green"  },
  { type: "Post-Bid Queries",  id: "TND-2026-051", customer: "Customer Name", date: "Jul 5, 2026",  urgency: "green"  },
];
const DOT_COLOR   = { red: "#EF4444",  yellow: "#F59E0B", green: "#10B981" };
const TYPE_COLOR  = { red: "#DC2626",  yellow: "#D97706", green: "#16A34A" };
const DATE_COLOR  = { red: "#DC2626",  yellow: "#D97706", green: "#16A34A" };
const CARD_BG     = { red: "#FEF2F2",  yellow: "#FEFCE8", green: "#F0FDF4" };
const CARD_BORDER = { red: "#FECACA",  yellow: "#FEF08A", green: "#BBF7D0" };
const PILL_BORDER = { red: "#FCA5A5",  yellow: "#FDE68A", green: "#6EE7B7" };

const ACTIVITY = [
  { id: "TND-2026-050", action: "uploaded OEM documents for",           time: "32 min ago" },
  { id: "TND-2026-051", action: "submitted Pre-Bid Query response for",  time: "30 min ago" },
  { id: "TND-2026-047", action: "completed checklist review for",        time: "20 min ago" },
  { id: "TND-2026-048", action: "updated comparison sheet for",          time: "38 min ago" },
  { id: "TND-2026-052", action: "was assigned to new tender",            time: "38 min ago" },
];

const HISTORY_ROWS = [
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", category: "Tender Title", year: "2026", assignedTo: "Pre Sales persons Name" },
  { id: "TND-2026-045", firm: "Firm Name", customer: "Customer Name", category: "Tender Title", year: "2026", assignedTo: "Pre Sales persons Name" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const TaskDashboardPSM = ({ fullscreen = false }) => {
  const [subTab, setSubTab] = useState("Task Dashboard");

  return (
    <div style={{ fontFamily: FONT }}>

      {/* ── Sub-tabs ── */}
      <div style={{ display: "flex", borderBottom: "2px solid #E5E7EB", marginBottom: 16 }}>
        {["Dashboard", "Task Dashboard"].map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            style={{
              padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
              borderBottom: subTab === tab ? "2px solid #2563EB" : "2px solid transparent",
              marginBottom: "-2px",
              color: subTab === tab ? "#2563EB" : "#6B7280",
              fontWeight: subTab === tab ? 700 : 400,
              fontSize: 14, fontFamily: FONT,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Dashboard sub-tab placeholder ── */}
      {subTab === "Dashboard" && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF", fontSize: 14 }}>
          Dashboard overview coming soon
        </div>
      )}

      {/* ── Task Dashboard content ── */}
      {subTab === "Task Dashboard" && (
        <div>

          {/* Table filter row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 12px", background: "#F9FAFB", cursor: "pointer" }}>
              <Filter size={13} color="#6B7280" />
              <span style={{ fontSize: 13, color: "#374151" }}>All Status</span>
              <ChevronDown size={13} color="#6B7280" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 12px", background: "#F9FAFB", cursor: "pointer" }}>
              <ArrowUpDown size={13} color="#6B7280" />
              <span style={{ fontSize: 13, color: "#374151" }}>By Deadline</span>
            </div>
            <div style={{ flex: 1 }} />
            <button style={{
              display: "flex", alignItems: "center", gap: 6, border: "1px solid #E5E7EB", borderRadius: 8,
              padding: "7px 14px", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: FONT,
            }}>
              <Eye size={14} /> View
            </button>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", overflow: "auto", marginBottom: 28 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, minWidth: 700 }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 2 }}>
                  {["Tender ID", "Firm Name", "Customer", "Tender Title", "Type", "Assigned To"].map(col => (
                    <th key={col} style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", whiteSpace: "nowrap", background: "#F9FAFB" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => {
                  const pill = TYPE_PILL[row.type] || {};
                  return (
                    <tr key={i} style={{ background: ROW_BG[row.highlight] ?? "#fff", borderBottom: i < TABLE_ROWS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>{row.id}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.firm}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.customer}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.title}</td>
                      <td style={{ padding: "13px 14px", textAlign: "center" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: pill.bg, color: pill.color }}>
                          {row.type}
                        </span>
                      </td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.assignedTo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Team Workload */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Team Workload</h3>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Pre-Sales team capacity and current assignment status</p>
              </div>
              <button style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>View All</button>
            </div>
            <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 6 }}>
              {TEAM_MEMBERS.map(m => (
                <div key={m.id} style={{ minWidth: 200, background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: "16px 18px", flexShrink: 0, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                  {/* Avatar + status badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#2563EB" }}>PS</div>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: m.statusColor,
                      border: `1.5px solid ${m.statusColor}`, borderRadius: 20,
                      padding: "2px 10px", background: "#fff",
                    }}>{m.status}</span>
                  </div>
                  {/* Name */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 14 }}>{m.name}</div>
                  {/* Active / Pending / Done */}
                  <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#2563EB" }}>{m.active}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>Active</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#F97316" }}>{m.pending}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>Pending</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#16A34A" }}>{m.done}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>Done</div>
                    </div>
                  </div>
                  {/* Workload bar */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>Workload</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{m.workload}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${m.workload}%`, background: BAR_COLOR[m.status] ?? "#2563EB", borderRadius: 3 }} />
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 8, background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>Assign</button>
                    <button style={{ flex: 1, padding: "8px 0", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines + Team Activity Feed */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>

            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px 22px" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Upcoming Deadlines</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {DEADLINES.map((d, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: CARD_BG[d.urgency], border: `1px solid ${CARD_BORDER[d.urgency]}`,
                    borderRadius: 10, padding: "12px 16px",
                  }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: DOT_COLOR[d.urgency], flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: TYPE_COLOR[d.urgency] }}>{d.type}</span>
                      <span style={{ fontSize: 13, color: "#9CA3AF" }}>·</span>
                      <span style={{ fontSize: 13, color: "#2563EB", fontWeight: 600 }}>{d.id}</span>
                      <span style={{ fontSize: 13, color: "#9CA3AF" }}>{d.customer}</span>
                    </div>
                    <div style={{
                      padding: "4px 12px", borderRadius: 20, border: `1px solid ${PILL_BORDER[d.urgency]}`,
                      background: d.urgency === "green" ? "#F0FDF4" : d.urgency === "yellow" ? "#FEFCE8" : "#FEF2F2",
                      fontSize: 12, fontWeight: 700, color: DATE_COLOR[d.urgency], whiteSpace: "nowrap",
                    }}>
                      {d.date}
                    </div>
                    {d.urgency === "red" && <AlertTriangle size={15} color="#EF4444" style={{ flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px 22px" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Team Activity Feed</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, paddingTop: i === 0 ? 0 : 12, paddingBottom: 12, borderBottom: i < ACTIVITY.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#2563EB", flexShrink: 0 }}>PS</div>
                    <div>
                      <div style={{ fontSize: 12, color: "#374151" }}>
                        <span style={{ color: "#6B7280" }}>PS Member Name </span>{a.action}
                      </div>
                      <div style={{ fontSize: 12, color: "#2563EB", fontWeight: 600, margin: "3px 0 2px" }}>{a.id}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Repository */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Historical Repository</h3>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>Quick access to previous tender documents, OEM docs, and comparison sheets</p>
              </div>
              <button style={{ fontSize: 13, color: "#2563EB", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>View All</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0 12px" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 12px", background: "#fff" }}>
                <Search size={13} color="#9CA3AF" />
                <input type="text" placeholder="Search by Tender ID, Customer, Category..." style={{ border: "none", outline: "none", fontSize: 12, color: "#374151", width: "100%", fontFamily: FONT, background: "transparent" }} />
              </div>
              {["Years", "Result"].map(lbl => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #E5E7EB", borderRadius: 8, padding: "7px 12px", background: "#fff", cursor: "pointer" }}>
                  <span style={{ fontSize: 12, color: "#374151" }}>{lbl}</span>
                  <ChevronDown size={13} color="#6B7280" />
                </div>
              ))}
            </div>
            <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
                <thead>
                  <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {["Tender ID", "Firm Name", "Customer", "Category", "Year", "Assigned To"].map(col => (
                      <th key={col} style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", whiteSpace: "nowrap" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HISTORY_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < HISTORY_ROWS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#2563EB", fontWeight: 600, textAlign: "center" }}>{row.id}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.firm}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.customer}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.category}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.year}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{row.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default TaskDashboardPSM;
