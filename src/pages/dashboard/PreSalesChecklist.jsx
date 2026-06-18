import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Search, Filter, ArrowUpDown, Eye, X, FileEdit } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

// ── Mock data ──────────────────────────────────────────────────────────────────

const CHECKLIST_ROWS = [
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title",
    customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026",
    status: "Draft", updated: "Today", completion: 0,
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title",
    customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026",
    status: "Completed", updated: "20-05-2026", completion: 100,
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title",
    customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026",
    status: "Completed", updated: "20-05-2026", completion: 100,
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title",
    customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026",
    status: "Completed", updated: "20-05-2026", completion: 100,
  },
  {
    id: "TND-2026-045", firm: "Firm Name", title: "Tender Title",
    customer: "Customer Name", value: "₹2 Cr.", deadline: "25/04/2026",
    status: "Completed", updated: "20-05-2026", completion: 100,
  },
];

const STATUS_OPTIONS = ["All Status", "Pending", "In Progress", "Completed"];

// ── Column definitions ─────────────────────────────────────────────────────────

const SUMMARY_COLS = [
  { key: "id", label: "RFP/Tender ID", width: "15%" },
  { key: "firm", label: "Firm Name", width: "14%" },
  { key: "title", label: "Tender Title", width: "18%" },
  { key: "customer", label: "Customer", width: "20%" },
  { key: "value", label: "Value", width: "13%", align: "right" },
  { key: "deadline", label: "Deadline", width: "14%", align: "center" },
];

const FULL_COLS = [
  { key: "id", label: "RFP/Tender ID", width: "10%" },
  { key: "firm", label: "Firm Name", width: "9%" },
  { key: "title", label: "Tender Title", width: "11%" },
  { key: "customer", label: "Customer", width: "13%" },
  { key: "value", label: "Value", width: "8%", align: "right" },
  { key: "deadline", label: "Deadline", width: "10%", align: "center" },
  { key: "status", label: "Status", width: "10%", align: "center" },
  { key: "updated", label: "Updated", width: "10%", align: "center" },
  { key: "completion", label: "Completion", width: "10%", align: "center" },
  { key: "actions", label: "Actions", width: "10%", align: "center" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const thStyle = (col) => ({
  padding: "14px 16px",
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  textAlign: col.align || "left",
  borderBottom: "1px solid #E5E7EB",
  width: col.width,
  whiteSpace: "nowrap",
  fontFamily: FONT,
  background: "#F8FAFC",
});

const tdStyle = (col) => ({
  padding: "14px 16px",
  fontSize: 13,
  color: "#374151",
  textAlign: col.align || "left",
  borderBottom: "1px solid #F3F4F6",
  fontFamily: FONT,
  whiteSpace: "nowrap",
});

const modalThStyle = (col, i, len) => ({
  ...thStyle(col),
  textAlign: "center",
  borderRight: i < len - 1 ? "1px solid #E5E7EB" : "none",
  borderBottom: "1px solid #E5E7EB",
  borderTop: "none",
});

const modalTdStyle = (col, i, len) => ({
  ...tdStyle(col),
  textAlign: "center",
  borderRight: i < len - 1 ? "1px solid #E5E7EB" : "none",
  borderBottom: "1px solid #E5E7EB",
  color: "#6B7280",
});

const statusColor = (s) => {
  if (s === "Completed") return "#16A34A";
  if (s === "Draft") return "#6B7280";
  if (s === "In Progress") return "#2563EB";
  if (s === "Pending") return "#D97706";
  return "#374151";
};

// ── Component ──────────────────────────────────────────────────────────────────

const PreSalesChecklist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showStatusDrop, setShowStatusDrop] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Merge submitted entry from TenderChecklist into the rows
  const allRows = useMemo(() => {
    const base = [...CHECKLIST_ROWS];
    if (location.state?.newEntry) {
      base.unshift(location.state.newEntry);
    }
    return base;
  }, [location.state]);

  const filteredRows = useMemo(() => {
    let rows = [...allRows];
    // Tab filter
    if (tab === "Needs Action") rows = rows.filter(r => r.status !== "Completed");
    if (tab === "Completed") rows = rows.filter(r => r.status === "Completed");
    // Status dropdown
    if (statusFilter !== "All Status") rows = rows.filter(r => r.status === statusFilter);
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.id.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.firm.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [tab, statusFilter, search, allRows]);

  const TABS = ["All", "Needs Action", "Completed"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <GlobalHeader />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          <div style={{ padding: "24px 32px 0", background: "#F7F8FA", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>Pre-sales Checklists</h1>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>Last updated: 2 hours ago</p>
              </div>
              <button
                onClick={() => navigate("/rfp-analysis-form")}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 20px", border: "none", borderRadius: 8,
                  background: "#2563EB", color: "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                }}
              >
                <Plus size={15} strokeWidth={2.5} /> Create New
              </button>
            </div>

            {/* Search bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
              padding: "10px 14px", maxWidth: 600,
            }}>
              <Search size={16} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search RFP ID / Customer..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none", fontSize: 13,
                  color: "#111", fontFamily: FONT, background: "transparent",
                }}
              />
            </div>

            {/* Filter row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* Status dropdown */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowStatusDrop(s => !s)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
                      background: "#fff", fontSize: 13, color: "#374151",
                      cursor: "pointer", fontFamily: FONT,
                    }}
                  >
                    <Filter size={14} color="#6B7280" />
                    {statusFilter}
                    <span style={{ fontSize: 10, color: "#9CA3AF", marginLeft: 2 }}>▼</span>
                  </button>
                  {showStatusDrop && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 4px)", left: 0,
                      background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 20,
                      minWidth: 160, overflow: "hidden",
                    }}>
                      {STATUS_OPTIONS.map(opt => (
                        <div
                          key={opt}
                          onClick={() => { setStatusFilter(opt); setShowStatusDrop(false); }}
                          style={{
                            padding: "10px 16px", fontSize: 13,
                            cursor: "pointer", fontFamily: FONT,
                            background: statusFilter === opt ? "#EFF6FF" : "transparent",
                            fontWeight: statusFilter === opt ? 600 : 400,
                            color: statusFilter === opt ? "#2563EB" : "#374151",
                          }}
                          onMouseEnter={e => { if (statusFilter !== opt) e.currentTarget.style.background = "#F9FAFB"; }}
                          onMouseLeave={e => { if (statusFilter !== opt) e.currentTarget.style.background = "transparent"; }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort */}
                <button style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 13, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  <ArrowUpDown size={14} color="#6B7280" />
                  By Deadline
                </button>
              </div>

              {/* Tabs + View */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* Tab pills */}
                <div style={{
                  display: "flex", background: "#F3F4F6", borderRadius: 8,
                  border: "1px solid #E5E7EB", overflow: "hidden",
                }}>
                  {TABS.map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        padding: "8px 16px", border: "none",
                        background: tab === t ? "#fff" : "transparent",
                        fontSize: 12, fontWeight: tab === t ? 600 : 400,
                        color: tab === t ? "#111" : "#6B7280",
                        cursor: "pointer", fontFamily: FONT,
                        boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                        borderRadius: tab === t ? 6 : 0,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* View button */}
                <button
                  onClick={() => setShowViewModal(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "8px 14px", border: "1px solid #E5E7EB", borderRadius: 8,
                    background: "#fff", fontSize: 13, color: "#374151",
                    cursor: "pointer", fontFamily: FONT,
                  }}
                >
                  <Eye size={14} color="#6B7280" /> View
                </button>
              </div>
            </div>
          </div>

          {/* Table section */}
          <div style={{ padding: "0 32px 40px", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 16px", flexShrink: 0 }}>Details</h2>

            <div style={{
              background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB",
              overflow: "auto", flex: 1,
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
                <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                  <tr>
                    {FULL_COLS.map((col, i) => (
                      <th key={col.key} style={{
                        ...thStyle(col),
                        borderTop: "none",
                        textAlign: "center",
                        borderRight: i < FULL_COLS.length - 1 ? "1px solid #E5E7EB" : "none",
                      }}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={FULL_COLS.length} style={{ padding: 40, textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>
                        No checklists found.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, i) => (
                      <tr
                        key={i}
                        style={{ transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        {FULL_COLS.map((col, cIdx) => {
                          if (col.key === "status") return (
                            <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>
                              <span style={{ color: statusColor(row.status), fontWeight: 500 }}>{row.status}</span>
                            </td>
                          );
                          if (col.key === "completion") return (
                            <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>
                              {row.completion}%
                            </td>
                          );
                          if (col.key === "actions") {
                            const isDraft = row.status === "Draft";
                            return (
                              <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>
                                <button style={{
                                  display: "inline-flex", alignItems: "center", gap: 5,
                                  background: "none", border: "none", cursor: "pointer",
                                  fontSize: 13, fontWeight: 600, fontFamily: FONT, color: "#374151",
                                }}>
                                  {isDraft
                                    ? <><FileEdit size={14} color="#6B7280" /> Continue</>
                                    : <><Eye size={14} color="#6B7280" /> View</>}
                                </button>
                              </td>
                            );
                          }
                          return (
                            <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>{row[col.key]}</td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full View Modal ── */}
      {showViewModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            padding: 24,
          }}
          onClick={() => setShowViewModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex", flexDirection: "column",
              background: "#fff", borderRadius: 8, border: "1px solid #E5E7EB",
              width: "100%", height: "100%", maxWidth: 1600, overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            }}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "flex-end",
              padding: "12px 16px", flexShrink: 0,
            }}>
              <button
                onClick={() => setShowViewModal(false)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 4,
                }}
              >
                <X size={18} color="#6B7280" />
              </button>
            </div>

            {/* Modal table */}
            <div style={{ overflow: "auto", flex: 1 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
                <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                  <tr>
                    {FULL_COLS.map((col, i) => (
                      <th key={col.key} style={modalThStyle(col, i, FULL_COLS.length)}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allRows.map((row, i) => (
                    <tr
                      key={i}
                      style={{ transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {FULL_COLS.map((col, cIdx) => {
                        if (col.key === "status") {
                          return (
                            <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>
                              {row.status}
                            </td>
                          );
                        }
                        if (col.key === "completion") {
                          return (
                            <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>
                              {row.completion}%
                            </td>
                          );
                        }
                        if (col.key === "actions") {
                          const isDraft = row.status === "Draft";
                          return (
                            <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>
                              <button
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: 5,
                                  background: "none", border: "none", cursor: "pointer",
                                  fontSize: 13, fontWeight: 600, fontFamily: FONT,
                                  color: "#374151",
                                }}
                              >
                                {isDraft ? (
                                  <><FileEdit size={14} color="#6B7280" /> Continue</>
                                ) : (
                                  <><Eye size={14} color="#6B7280" /> View</>
                                )}
                              </button>
                            </td>
                          );
                        }
                        return (
                          <td key={col.key} style={modalTdStyle(col, cIdx, FULL_COLS.length)}>{row[col.key]}</td>
                        );
                      })}
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

export default PreSalesChecklist;
