import { useState } from "react";
import { MapPin, Filter, ArrowUpDown, Eye, ArrowRight, Activity } from "lucide-react";
import BusinessSummaryModal from "./BusinessSummaryModal";
import DailyActivityModal from "./DailyActivityModal";
import VisitReportModal from "./VisitReportModal";
import TendersListModal from "./TendersListModal";
import SMNewRFPModal from "./SMNewRFPModal";
import SMFullTableModal from "./SMFullTableModal";

const FONT = "'Inter','Segoe UI',sans-serif";

const TEAM_PERFORMANCE = [
  { name: "Sales persons name", ach: 80, won: 7 },
  { name: "Sales persons name", ach: 72, won: 6 },
  { name: "Sales persons name", ach: 64, won: 5 },
  { name: "Sales persons name", ach: 56, won: 4 },
  { name: "Sales persons name", ach: 27, won: 2 },
];

const BUSINESS_CATEGORY = [
  { label: "Cloud Computing",     value: "₹18.5 Cr", pct: 24, color: "#2563EB" },
  { label: "DTSS",                value: "₹14.2 Cr", pct: 18, color: "#8B5CF6" },
  { label: "Microsoft",           value: "₹9.8 Cr",  pct: 13, color: "#06B6D4" },
  { label: "Networking",          value: "₹8.1 Cr",  pct: 10, color: "#10B981" },
  { label: "Personal Computing",  value: "₹7.4 Cr",  pct: 9,  color: "#EF4444" },
  { label: "Security",            value: "₹6.3 Cr",  pct: 8,  color: "#EC4899" },
  { label: "Server",              value: "₹5.2 Cr",  pct: 7,  color: "#84CC16" },
  { label: "IT Infra Services",   value: "₹4.6 Cr",  pct: 6,  color: "#3B82F6" },
  { label: "Software",            value: "₹3.9 Cr",  pct: 5,  color: "#F97316" },
  { label: "Storage",             value: "₹3.9 Cr",  pct: 5,  color: "#A855F7" },
  { label: "Surveillance",        value: "₹3.9 Cr",  pct: 5,  color: "#0EA5E9" },
  { label: "Enterprise",          value: "₹3.9 Cr",  pct: 5,  color: "#EAB308" },
  { label: "MISC",                value: "₹3.9 Cr",  pct: 5,  color: "#EF4444" },
  { label: "Other",               value: "₹3.9 Cr",  pct: 5,  color: "#9CA3AF" },
];

const SUMMARY_STATS = [
  { value: "12", label: "Today's Visits", color: "#3B82F6", bg: "#EFF6FF" },
  { value: "8", label: "Pending Follow-ups", color: "#F97316", bg: "#FFF7ED" },
  { value: "5", label: "Meetings Completed", color: "#10B981", bg: "#F0FDF4" },
  { value: "3", label: "Cold Calls", color: "#A855F7", bg: "#FAF5FF" },
  { value: "7", label: "Upcoming Meetings", color: "#6366F1", bg: "#EEF2FF" },
];

const TABLE_DATA = Array(6).fill({
  id: "TND-2026-045",
  firm: "Firm Name",
  title: "Tender Title",
  salesPerson: "Sales Persons Name",
  value: "₹2 Cr.",
  deadline: "25/04/2026",
});

const TaskDashboardSM = ({ onViewRFP }) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showDailyActivityModal, setShowDailyActivityModal] = useState(false);
  const [showVisitReportModal, setShowVisitReportModal] = useState(false);
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  const [showNewRFPModal, setShowNewRFPModal] = useState(true);
  const [showFullTableModal, setShowFullTableModal] = useState(false);

  return (
    <div style={{ fontFamily: FONT, display: "flex", flexDirection: "column", gap: 20 }}>
      {showNewRFPModal && <SMNewRFPModal onClose={() => setShowNewRFPModal(false)} onApprove={() => setShowNewRFPModal(false)} />}
      {showFullTableModal && <SMFullTableModal onClose={() => setShowFullTableModal(false)} onViewRFP={onViewRFP} />}
      {showSummaryModal && <BusinessSummaryModal onClose={() => setShowSummaryModal(false)} />}
      {showDailyActivityModal && <DailyActivityModal onClose={() => setShowDailyActivityModal(false)} />}
      {showVisitReportModal && <VisitReportModal onClose={() => setShowVisitReportModal(false)} />}
      {selectedSalesperson && (
        <TendersListModal 
          title={`Salesperson: ${selectedSalesperson}`} 
          subtitle={`3 tenders for ${selectedSalesperson}`}
          onClose={() => setSelectedSalesperson(null)} 
        />
      )}
      
      {/* ── Top Charts Section ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        
        {/* Team Target vs Achievement */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Team Target vs<br/>Achievement</h3>
            <button 
              onClick={() => setShowSummaryModal(true)}
              style={{ 
              display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", 
              color: "#2563EB", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 
            }}>
              View Report <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
            {/* Donut Chart Mockup */}
            <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="16" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.38} />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.79} strokeDashoffset2={251.2 * 0.62} style={{ strokeDashoffset: 251.2 * (1 - 0.21), strokeDasharray: "251.2 251.2" }} />
              </svg>
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>₹100 Cr. Target</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: 13, color: "#374151" }}>Achieved</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>₹62 Cr.</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6" }} />
                  <span style={{ fontSize: 13, color: "#374151" }}>Pipeline</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>₹21 Cr.</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E5E7EB" }} />
                  <span style={{ fontSize: 13, color: "#374151" }}>Shortfall</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>₹17 Cr.</span>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
              <span>Progress</span>
              <span>62%</span>
            </div>
            <div style={{ height: 6, background: "#E2E8F0", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "62%", height: "100%", background: "#2563EB", borderRadius: 3 }} />
            </div>
          </div>
        </div>

        {/* Business Category Performance */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Business Category Performance</h3>
          <div className="thin-scrollbar" style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 220, overflowY: "auto", paddingRight: 4 }}>
            {BUSINESS_CATEGORY.map((cat, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#374151", fontWeight: 500 }}>{cat.label}</span>
                  <span style={{ color: "#6B7280" }}>{cat.value} · {cat.pct}%</span>
                </div>
                <div style={{ height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${cat.pct}%`, height: "100%", background: cat.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance Snapshot */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Team Performance Snapshot</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", paddingBottom: 12, fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E2E8F0" }}>Salesperson</th>
                <th style={{ textAlign: "center", paddingBottom: 12, fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E2E8F0" }}>Ach%</th>
                <th style={{ textAlign: "center", paddingBottom: 12, fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E2E8F0" }}>Won</th>
              </tr>
            </thead>
            <tbody>
              {TEAM_PERFORMANCE.map((tp, i) => (
                <tr key={i}>
                  <td style={{ padding: "12px 0", fontSize: 13, borderBottom: i < TEAM_PERFORMANCE.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <span style={{ color: "#9CA3AF", marginRight: 8, fontSize: 12 }}>{i + 1}.</span>
                    <span 
                      onClick={() => setSelectedSalesperson(tp.name)}
                      style={{ color: "#2563EB", fontWeight: 500, cursor: "pointer" }}
                    >
                      {tp.name}
                    </span>
                  </td>
                  <td style={{ padding: "12px 0", fontSize: 13, color: tp.ach >= 70 ? "#10B981" : tp.ach >= 50 ? "#F59E0B" : "#EF4444", fontWeight: 700, textAlign: "center", borderBottom: i < TEAM_PERFORMANCE.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    {tp.ach}%
                  </td>
                  <td style={{ padding: "12px 0", fontSize: 13, color: "#374151", fontWeight: 600, textAlign: "center", borderBottom: i < TEAM_PERFORMANCE.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    {tp.won}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ── Visit Summary ── */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={18} color="#2563EB" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Visit Summary — Today</h3>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button 
              onClick={() => setShowVisitReportModal(true)}
              style={{ 
              background: "#1D4ED8", color: "#fff", border: "none", borderRadius: 8,
              padding: "10px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8
            }}>
              <Eye size={18} /> View Visit Report
            </button>
            <button 
              onClick={() => setShowDailyActivityModal(true)}
              style={{ 
              background: "#fff", color: "#334155", border: "1px solid #E2E8F0", borderRadius: 8,
              padding: "10px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8
            }}>
              <Activity size={18} color="#334155" /> View Daily Activity
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {SUMMARY_STATS.map((stat, i) => (
            <div key={i} style={{ 
              background: stat.bg, borderRadius: 8, padding: "16px 20px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4 
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: stat.color }}>{stat.value}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#6B7280" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Table Section ── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Filter size={18} color="#6B7280" />
            <select style={{ 
              padding: "8px 32px 8px 12px", border: "1px solid #E2E8F0", borderRadius: 6,
              fontSize: 13, color: "#111827", background: "#fff", outline: "none",
              appearance: "none", backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.5%201.5L6%206L10.5%201.5%22%20stroke%3D%22%23111827%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')",
              backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "12px 8px", cursor: "pointer", fontWeight: 500
            }}>
              {[
                "All Status", "Approved", "Approval Pending", "Rejected", 
                "Forwarded to MD Sir", "Approved by MD Sir", "Won", "Lost", "PO Received"
              ].map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <ArrowUpDown size={18} color="#6B7280" />
            <select style={{ 
              padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 6,
              fontSize: 13, color: "#374151", background: "#F8FAFC", outline: "none" 
            }}>
              <option>By Deadline</option>
            </select>
          </div>
          <button 
            onClick={() => setShowFullTableModal(true)}
            style={{ 
            background: "#fff", color: "#374151", border: "1px solid #D1D5DB", borderRadius: 6,
            padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6
          }}>
            <Eye size={16} /> View
          </button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                {["Tender/ Order ID", "Firm Name", "Tender Title", "Sales Person", "Value", "Deadline"].map(col => (
                  <th key={col} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#64748B", textAlign: "left" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, i) => {
                let bg = "#fff";
                if (i === 0 || i === 4) bg = "#FEF3C7"; // yellow-ish
                if (i === 3) bg = "#DCFCE7"; // green-ish
                return (
                  <tr key={i} style={{ 
                    borderBottom: i < TABLE_DATA.length - 1 ? "1px solid #E2E8F0" : "none",
                    background: bg,
                  }}>
                    <td style={{ padding: "16px", fontSize: 13, color: "#334155", textAlign: "center" }}>{row.id}</td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#334155", textAlign: "center" }}>{row.firm}</td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#334155", textAlign: "center" }}>{row.title}</td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#334155", textAlign: "center" }}>{row.salesPerson}</td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#334155", textAlign: "center" }}>{row.value}</td>
                    <td style={{ padding: "16px", fontSize: 13, color: "#334155", textAlign: "center" }}>{row.deadline}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default TaskDashboardSM;
