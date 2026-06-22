import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Edit3, Plus, Save, Send, ArrowLeft, Trash2 } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FONT = "'Inter','Segoe UI',sans-serif";

const FORM_ROWS = [
  { sno: 1,  label: "Sales Person" },
  { sno: 2,  label: "Reporting Manager" },
  { sno: 3,  label: "Last Date & Time of Submission of EMD/SD" },
  { sno: 4,  label: "Validity of EMD /SD( Plz mention Tenure)" },
  { sno: 5,  label: "EMD/ SD in form of ePBG/PBG/DD/ Online payment/Fixed Deposit" },
  { sno: 6,  label: "EMD/ BG Amount (Value in INR)" },
  { sno: 7,  label: "Tender Fee ( If applicable)" },
  { sno: 8,  label: "Processing Fee ( If applicable)" },
  { sno: 9,  label: "Tender No./Bid No./ PO No." },
  { sno: 10, label: "Tender /Bid  for Procurement of" },
  { sno: 11, label: "*Name of the Customer/Department" },
  { sno: 12, label: "*Name of the Contact Person" },
  { sno: 13, label: "*Customer Email ID" },
  { sno: 14, label: "*Customer Contact No." },
  { sno: 15, label: "DD/FD in Favour of (mandatory for DD)" },
  { sno: 16, label: "DD/FD payable at (mandatory for DD)" },
  { sno: 17, label: "Beneficiary Name in BG (mandatory for BG)" },
  { sno: 18, label: "Beneficiary Address (mandatory for BG)" },
  { sno: 19, label: "Beneficiary PINCODE (mandatory for BG)" },
  { sno: 20, label: "IFSC Code (mandatory for BG)" },
  { sno: 21, label: "Name of Bank (mandatory for BG)" },
  { sno: 22, label: "Bank- Branch Name/ Address (mandatory for BG)" },
  { sno: 23, label: "EMD clause & details in Tender/bid (Kindly mention Page No)" },
  { sno: 24, label: "BG Format in Tender ( Plz mention page No)" },
  { sno: 25, label: "EMD Exemption clause in Tender" },
  { sno: 26, label: "Management Approval" },
  { sno: 27, label: "Company from which EMD required" },
  { sno: 28, label: "Justification for Participation" },
  { sno: 29, label: "Strategy for winning" },
];

const ActionBtn = ({ icon, label, onClick, primary = false, active = false }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontFamily: FONT,
      fontSize: 13, fontWeight: 500, transition: "all 0.15s",
      border: primary ? "none" : active ? "1px solid #BFDBFE" : "1px solid #E5E7EB",
      background: primary ? "#2563EB" : active ? "#EFF6FF" : "#fff",
      color: primary ? "#fff" : active ? "#2563EB" : "#374151",
    }}
    onMouseEnter={e => { if (!primary && !active) { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#D1D5DB"; } }}
    onMouseLeave={e => { if (!primary && !active) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#E5E7EB"; } }}
  >
    {icon}
    {label}
  </button>
);

const EMDForm = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [labelEdit, setLabelEdit] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [rows, setRows] = useState(() => FORM_ROWS.map(r => ({ ...r, value: "" })));

  const updateValue = (sno, val) =>
    setRows(r => r.map(row => row.sno === sno ? { ...row, value: val } : row));

  const updateLabel = (sno, val) =>
    setRows(r => r.map(row => row.sno === sno ? { ...row, label: val } : row));

  const addItem = () =>
    setRows(r => [...r, { sno: r.length + 1, label: "", value: "" }]);

  const deleteRow = (sno) =>
    setRows(r => r.filter(row => row.sno !== sno).map((row, i) => ({ ...row, sno: i + 1 })));

  const handleSaveDraft = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.setTextColor(13, 71, 161);
    doc.text("MANDATORY FORM FOR EMD/SD REQUEST", pageW / 2, 18, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Tender ID: TND-2026-0412", 14, 26);

    doc.autoTable({
      startY: 32,
      head: [["S.No", "FORM FOR (EMD/SD)", "EMD"]],
      body: rows.map(r => [r.sno, r.label, r.value || ""]),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [249, 250, 251], textColor: [55, 65, 81], fontStyle: "bold" },
      columnStyles: { 0: { cellWidth: 14 }, 1: { cellWidth: 110 }, 2: { cellWidth: 60 } },
    });

    doc.save("EMD_Form_TND-2026-0412.pdf");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F9FAFB" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
        <GlobalHeader />

        {/* Page Header */}
        <div style={{ padding: "24px 32px 20px", background: "#fff", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>EMD Form</h1>
            <div style={{ fontSize: 13, color: "#6B7280" }}>
              Tender ID: <span style={{ color: "#2563EB", fontWeight: 600 }}>TND-2026-0412</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", border: "1px solid #E5E7EB", borderRadius: 6,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: FONT,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#E5E7EB"; }}
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <button
              onClick={handleDownload}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", border: "1px solid #E5E7EB", borderRadius: 6,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: FONT,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#2563EB"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#E5E7EB"; }}
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 32px", flex: 1 }}>
          <div style={{
            background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
          }}>
            {/* Table header row */}
            <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5E7EB" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "0.02em" }}>
                MANDATORY FORM FOR EMD/SD REQUEST
              </h2>
              <button
                onClick={() => setEditing(v => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", border: "1px solid #FECDD3", borderRadius: 6,
                  background: "#FFF1F2", fontSize: 13, fontWeight: 500,
                  color: "#E11D48", cursor: "pointer", fontFamily: FONT,
                }}
              >
                <Edit3 size={13} />
                Edit + Add
              </button>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB" }}>
                  <th style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#374151", textAlign: "center", borderBottom: "1px solid #E5E7EB", width: 60 }}>S.No</th>
                  <th style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#374151", textAlign: "left", borderBottom: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>FORM FOR (EMD/SD)</th>
                  <th style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#374151", textAlign: "left", borderBottom: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB", width: "35%" }}>EMD</th>
                  {editing && <th style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#374151", textAlign: "center", borderBottom: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB", width: 60 }}></th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.sno}
                    style={{ borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none" }}
                    onMouseEnter={e => { if (!editing) e.currentTarget.style.background = "#F9FAFB"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
                  >
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#6B7280", textAlign: "center", verticalAlign: "middle" }}>
                      {row.sno}
                    </td>
                    <td style={{ padding: editing && labelEdit ? "8px 14px" : "14px 20px", fontSize: 13, color: "#374151", verticalAlign: "middle", borderLeft: "1px solid #F3F4F6" }}>
                      {editing && labelEdit ? (
                        <input
                          type="text"
                          value={row.label}
                          onChange={e => updateLabel(row.sno, e.target.value)}
                          placeholder="Enter field name..."
                          style={{ width: "100%", padding: "7px 10px", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, color: "#374151", fontFamily: FONT, outline: "none", boxSizing: "border-box", background: "#F9FAFB" }}
                          onFocus={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                          onBlur={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      ) : row.label}
                    </td>
                    <td style={{ padding: editing ? "8px 14px" : "14px 20px", verticalAlign: "middle", borderLeft: "1px solid #F3F4F6" }}>
                      {editing ? (
                        <input
                          type="text"
                          value={row.value}
                          onChange={e => updateValue(row.sno, e.target.value)}
                          placeholder="Enter value..."
                          style={{ width: "100%", padding: "7px 10px", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, color: "#374151", fontFamily: FONT, outline: "none", boxSizing: "border-box", background: "#F9FAFB" }}
                          onFocus={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                          onBlur={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      ) : (
                        <span style={{ fontSize: 13, color: row.value ? "#111827" : "#D1D5DB" }}>
                          {row.value || ""}
                        </span>
                      )}
                    </td>
                    {editing && (
                      <td style={{ padding: "8px 14px", textAlign: "center", verticalAlign: "middle", borderLeft: "1px solid #F3F4F6" }}>
                        <button
                          onClick={() => deleteRow(row.sno)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 4, display: "flex", alignItems: "center", borderRadius: 4 }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#FEF2F2"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action bar — visible only when editing */}
        {editing && (
          <div style={{
            position: "sticky", bottom: 0, background: "#fff",
            borderTop: "1px solid #E5E7EB", padding: "12px 32px",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 -2px 8px rgba(0,0,0,0.06)", flexShrink: 0,
          }}>
            <ActionBtn icon={<Download size={14} />} label="Download" onClick={handleDownload} />
            <ActionBtn icon={<Plus size={14} />} label="Add Item" onClick={addItem} />
            <ActionBtn
              icon={<Edit3 size={14} />} label="Edit"
              onClick={() => setLabelEdit(v => !v)}
              active={labelEdit}
            />
            <ActionBtn icon={<Save size={14} />} label="Save Draft" onClick={handleSaveDraft} />
            <ActionBtn icon={<Send size={14} />} label="Submit" primary onClick={() => { setEditing(false); setLabelEdit(false); }} />
            {savedMsg && (
              <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 500, marginLeft: 4 }}>
                ✓ Draft saved
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EMDForm;
