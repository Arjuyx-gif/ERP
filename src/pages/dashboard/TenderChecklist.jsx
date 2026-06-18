import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Upload, Check, Pencil, Plus, Download } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

// ── Step indicator config ──────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: "Basic Details" },
  { n: 2, label: "Contact" },
  { n: 3, label: "Tender Details" },
  { n: 4, label: "Criteria" },
  { n: 5, label: "Approval" },
  { n: 6, label: "Review" },
];

// ── Checklist items ────────────────────────────────────────────────────────────

const CHECKLIST_ITEMS = [
  "MAF",
  "Compliance vetted by OEM (if reqd.)",
  "Compliance Sheet",
  "Bill of material vetted by OEM (if reqd.)",
  "Data Sheets",
  "Product Certificates",
  "Gartner Reports",
  "IDC Reports",
  "Other Criteria Clause",
  "Turnover",
  "Positive Net worth",
  "Experience asked for similar work",
  "Quality Certificates (EG: ISO, CMMI etc.)",
  "Blacklisting/Debarred/Banned - Undertaking",
  "OEM Undertaking (Eg: Support, Spare,Warranty etc)",
  "Service/Support Center List",
  "Solution Documents/Project plan",
  "Warranty Details",
  "OEM Purchase Order if required or not",
  "Balance sheet  CA certified",
  "Product customisation required or not, If yes then details",
  "Any Add-on Items if any required in RFP",
  "OEM Site Survey required or not",
  "Service Level",
  "Scope of work",
  "OEM Incorporation Certificate",
  "Article of Association",
];

// ── Component ──────────────────────────────────────────────────────────────────

const TenderChecklist = () => {
  const navigate = useNavigate();
  const [step] = useState(1);
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState(
    CHECKLIST_ITEMS.map((label, i) => ({ id: i, label, remarks: "", status: "" }))
  );

  const updateField = (idx, field, value) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: prev.length, label: "", remarks: "", status: "" }]);
  };

  const handleSubmit = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const dateStr = `${dd}-${mm}-${yyyy}`;
    const filledCount = items.filter(it => it.status.trim() !== "").length;
    const completion = items.length > 0 ? Math.round((filledCount / items.length) * 100) : 0;

    const newEntry = {
      id: "TND-2026-006",
      firm: "Firm Name",
      title: "Tender Title",
      customer: "Customer Name",
      value: "₹2 Cr.",
      deadline: "25/04/2026",
      status: "Completed",
      updated: dateStr,
      completion,
    };

    navigate("/pre-sales-checklist", { state: { newEntry } });
  };

  // Table column styles
  const thBase = {
    padding: "14px 16px",
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    borderBottom: "1px solid #E5E7EB",
    borderRight: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
    fontFamily: FONT,
    background: "#F1F5F9",
    textAlign: "center",
  };

  const tdBase = {
    padding: "12px 16px",
    fontSize: 13,
    color: "#374151",
    borderBottom: "1px solid #E5E7EB",
    borderRight: "1px solid #E5E7EB",
    fontFamily: FONT,
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #E5E7EB",
    borderRadius: 6,
    padding: "8px 10px",
    fontSize: 13,
    fontFamily: FONT,
    color: "#374151",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  };

  const barBtnStyle = {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 18px", border: "1px solid #E5E7EB", borderRadius: 8,
    background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
    cursor: "pointer", fontFamily: FONT,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <GlobalHeader />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          {/* ── Page header ── */}
          <div style={{ padding: "24px 32px 0", background: "#F7F8FA", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>Pre-sales Checklist</h1>
                <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
                  Documents: <span style={{ borderBottom: "1.5px solid #2563EB", color: "#2563EB", cursor: "pointer", padding: "0 8px" }}>&nbsp;</span>
                  &nbsp;&nbsp;Tender ID:&nbsp;<strong style={{ color: "#111" }}>TND-2026-006</strong>
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <button
                  onClick={() => navigate("/pre-sales-checklist")}
                  style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  <Save size={14} color="#6B7280" /> Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", border: "none", borderRadius: 8,
                    background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff",
                    cursor: "pointer", fontFamily: FONT,
                  }}>
                  <Upload size={14} /> Submit
                </button>
              </div>
            </div>

            {/* ── Step indicator ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0 16px" }}>
              {STEPS.map((s, i) => {
                const done = step > s.n;
                const active = step === s.n;
                return (
                  <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: done ? "#16A34A" : active ? "#2563EB" : "#E5E7EB",
                        color: done || active ? "#fff" : "#9CA3AF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700, flexShrink: 0,
                      }}>
                        {done ? <Check size={16} strokeWidth={3} /> : s.n}
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: active ? 600 : 400,
                        color: active ? "#2563EB" : done ? "#374151" : "#9CA3AF",
                        whiteSpace: "nowrap",
                      }}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{
                        width: 64, height: 1.5,
                        background: done ? "#16A34A" : "#E5E7EB",
                        margin: "0 2px", marginBottom: 20, flexShrink: 0,
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div style={{ flex: 1, overflow: "auto", padding: "0 32px 40px", paddingBottom: editing ? 80 : 40 }}>

            {/* Tender Checklist heading + Edit/Add */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0 }}>Tender Checklist</h2>
              <button
                onClick={() => setEditing(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", border: "1px solid #FFA2A2", borderRadius: 8,
                  background: "#FFF1F1", fontSize: 13, fontWeight: 500, color: "#E11D48",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                <Pencil size={13} color="#E11D48" /> Edit + Add
              </button>
            </div>

            {/* ── Checklist table ── */}
            <div style={{
              background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...thBase, width: 80 }}>S.No</th>
                    <th style={{ ...thBase, textAlign: "left", width: "35%" }}>Particulars</th>
                    <th style={{ ...thBase, textAlign: "left", width: "30%" }}>Remarks</th>
                    <th style={{ ...thBase, width: "20%", borderRight: "none" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={item.id}
                      style={{ transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ ...tdBase, textAlign: "center", width: 80, color: "#6B7280" }}>{i + 1}</td>
                      <td style={{ ...tdBase, textAlign: "left" }}>
                        {editing ? (
                          <input
                            type="text"
                            value={item.label}
                            onChange={e => updateField(i, "label", e.target.value)}
                            style={inputStyle}
                          />
                        ) : item.label}
                      </td>
                      <td style={{ ...tdBase, textAlign: "left", color: "#9CA3AF" }}>
                        {editing ? (
                          <input
                            type="text"
                            value={item.remarks}
                            onChange={e => updateField(i, "remarks", e.target.value)}
                            placeholder="Add remarks..."
                            style={inputStyle}
                          />
                        ) : item.remarks}
                      </td>
                      <td style={{ ...tdBase, textAlign: "center", borderRight: "none", color: "#9CA3AF" }}>
                        {editing ? (
                          <input
                            type="text"
                            value={item.status}
                            onChange={e => updateField(i, "status", e.target.value)}
                            placeholder="Status"
                            style={{ ...inputStyle, textAlign: "center" }}
                          />
                        ) : item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom action bar (visible in edit mode) ── */}
          {editing && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              padding: "12px 32px",
              borderTop: "1px solid #E5E7EB",
              background: "#fff", flexShrink: 0,
            }}>
              <button style={barBtnStyle}>
                <Download size={14} color="#6B7280" /> Download
              </button>
              <button onClick={addItem} style={barBtnStyle}>
                <Plus size={14} color="#6B7280" /> Add Item
              </button>
              <button onClick={() => navigate("/pre-sales-checklist")} style={barBtnStyle}>
                <Save size={14} color="#6B7280" /> Save Draft
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", border: "none", borderRadius: 8,
                  background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                <Check size={14} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenderChecklist;

