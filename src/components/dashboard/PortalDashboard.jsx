import { useState } from "react";
import {
  Edit3, Eye, Upload, FileText, UploadCloud, Plus, History
} from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const TABLE_DATA = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "-", results: "-", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Bid Submitted", deadline: "08/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Uploaded", results: "-", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Awaiting Response", deadline: "08/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Submitted", results: "-", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Awaiting Response", deadline: "08/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 2 - Uploaded", results: "Update", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Awaiting Response", deadline: "09/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 2 - Query & Response", results: "Won", poStatus: "PO Uploaded", gemCharges: "Amount", addDocs: "NA", revisedResults: "NA", stage: "PO & Gem Charges Updated", deadline: "09/06/2026", action: "View", actionIcon: Eye, highlight: "green" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Submitted", results: "Lost", poStatus: "NA", gemCharges: "NA", addDocs: "NA", revisedResults: "NA", stage: "-", deadline: "08/06/2026", action: "View", actionIcon: Eye },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Submitted", results: "Lost", poStatus: "Pending", gemCharges: "-", addDocs: "-", revisedResults: "L2", stage: "changed status to L2", deadline: "08/06/2026", action: "Upload PO", actionIcon: Upload },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 2 - Query & Response", results: "Won", poStatus: "NA", gemCharges: "NA", addDocs: "NA", revisedResults: "Bid Canceled", stage: "Bid Canceled", deadline: "08/06/2026", action: "View", actionIcon: Eye },
];

const TIMELINE = [
  { title: "Post-Bid Query Uploaded", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "Result Updated to L1", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "Result Updated to Won", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "Customer PO Uploaded", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "GeM Charges Updated", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "_________ changed LOST status to L2 - PO Awaiting", tender: "TND-2026-045", time: "Today, 11:30 AM" },
];

const QUICK_ACTIONS = [
  { label: "Update Result", icon: FileText, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Upload Post-Bid Queries", icon: UploadCloud, color: "#D97706", bg: "#FEF3C7" },
  { label: "Upload PO & Additional Charges", icon: FileText, color: "#DC2626", bg: "#FEE2E2" },
  { label: "Update GeM Charges", icon: Plus, color: "#9333EA", bg: "#F3E8FF" },
  { label: "View Historical Queries", icon: History, color: "#4B5563", bg: "#F3F4F6" },
  { label: "Open Assigned Tender", icon: Eye, color: "#059669", bg: "#ECFDF5" },
];

const PortalDashboard = ({ fullscreen, onUpdate }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: FONT }}>
      
      {/* ── Table ── */}
      <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400 }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
              {["Tender ID", "Firm Name", "Tender Title", "Customer", "Portal", "Post-Bid Queries", "Results", "PO Status", "Gem Charges", "Additional Docs.", "Revised Results", "Stage", "Deadline", "Actions"].map(col => (
                <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", borderRight: "1px solid #F1F5F9", whiteSpace: "nowrap" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #E5E7EB", background: row.highlight === "green" ? "#E8F5E9" : "#fff" }}>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.firm}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.title}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.customer}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.portal}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.pbq}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>
                  {row.results === "Won" && <span style={{ padding: "2px 8px", borderRadius: 12, background: "#DCFCE7", color: "#16A34A", fontSize: 12, fontWeight: 500 }}>Won</span>}
                  {row.results === "Lost" && <span style={{ padding: "2px 8px", borderRadius: 12, background: "#FEE2E2", color: "#DC2626", fontSize: 12, fontWeight: 500 }}>Lost</span>}
                  {row.results !== "Won" && row.results !== "Lost" && <span style={{ color: "#4B5563" }}>{row.results}</span>}
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.poStatus}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.gemCharges}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.addDocs}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.revisedResults}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.stage}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.deadline}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center", whiteSpace: "nowrap" }}>
                  <button onClick={() => { if (row.action === "Update" && onUpdate) onUpdate(row); }} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", border: "none", background: "none", cursor: "pointer",
                    color: "#111827", fontWeight: 600, fontSize: 13,
                  }}>
                    <row.actionIcon size={14} /> {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Bottom Section ── */}
      {!fullscreen && (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          
          {/* Activity Timeline */}
          <div style={{ flex: "1 1 500px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "20px 24px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#111827" }}>Activity Timeline</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TIMELINE.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", marginTop: 6, marginRight: 12 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#3B82F6", fontWeight: 500 }}>
                      {item.tender} <span style={{ color: "#9CA3AF", fontWeight: 400, marginLeft: 4 }}>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ flex: "1 1 350px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "20px 24px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#111827" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUICK_ACTIONS.map((action, idx) => (
                <button key={idx} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", background: action.bg, border: "none", borderRadius: 8,
                  cursor: "pointer", transition: "opacity 0.2s"
                }} onMouseEnter={e => e.currentTarget.style.opacity = 0.9} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                  <action.icon size={16} color={action.color} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: action.color }}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default PortalDashboard;
