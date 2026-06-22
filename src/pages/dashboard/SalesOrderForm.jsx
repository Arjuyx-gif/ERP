import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Save, Upload, X, Check, Clock, ChevronDown, Trash2, Download, Pencil, FileCheck } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const ALL_STEPS = [
  { id: "sales", label: "Sales" },
  { id: "contact", label: "Contact" },
  { id: "requirement", label: "Requirement" },
  { id: "remarks", label: "Remarks" },
  { id: "security", label: "Security" },
  { id: "beneficiary", label: "Beneficiary" },
  { id: "payment", label: "Payment" },
  { id: "accounts", label: "Accounts" },
  { id: "operations", label: "Operations" },
  { id: "service", label: "Service" },
  { id: "review", label: "Review" },
];

const TIMELINE = [
  { icon: "green", title: "PO Received", subtitle: "Order ID", time: "2026-04-09 10:30 AM" },
  { icon: "blue", title: "SOF In Process", subtitle: "By NAME", time: "2026-04-09 11:45 AM" },
  { icon: "blue", title: "Submitted to Sales Coordinator", subtitle: "By NAME (Manager)", time: "2026-04-09 02:15 PM" },
];

/* ─── Reusable field helpers ─── */
const labelStyle = { display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 };
const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 6,
  fontSize: 13, color: "#374151", fontFamily: FONT, outline: "none", boxSizing: "border-box",
};
const textareaStyle = { ...inputStyle, resize: "vertical", minHeight: 72 };
const dateInputStyle = { ...inputStyle };

const Field = ({ label, type = "text", placeholder = "", rowSpan }) => (
  <div style={{ gridRow: rowSpan ? `span ${rowSpan}` : "auto", display: "flex", flexDirection: "column", height: rowSpan ? "100%" : "auto" }}>
    <label style={labelStyle}>{label}</label>
    {type === "textarea" ? (
      <textarea style={{ ...textareaStyle, flex: 1 }} placeholder={placeholder} />
    ) : type === "date" ? (
      <input type="date" style={dateInputStyle} />
    ) : (
      <input type="text" style={inputStyle} placeholder={placeholder} />
    )}
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div onClick={onChange} style={{ width: 36, height: 20, background: checked ? "#0044FF" : "#E5E7EB", borderRadius: 10, position: "relative", cursor: "pointer", transition: "all 0.2s" }}>
    <div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: checked ? 18 : 2, transition: "all 0.2s" }} />
  </div>
);

const ToggleField = ({ label, checked, onChange }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 6 }}>
    <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{label}</span>
    <ToggleSwitch checked={checked} onChange={onChange} />
  </div>
);

const CustomDropdown = ({ label, placeholder, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = value !== undefined ? value : "";

  return (
    <div style={{ position: "relative" }}>
      <label style={labelStyle}>{label}</label>
      <div
        onClick={() => setOpen(!open)}
        style={{
          ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
          background: "#fff", padding: "9px 12px", border: "1px solid #CBD5E1"
        }}
      >
        <span style={{ color: "#111827", fontWeight: 500 }}>
          {selected || placeholder}
        </span>
        <ChevronDown size={18} color="#111827" strokeWidth={2} />
      </div>

      {open && (
        <>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, marginTop: -1,
            background: "#fff", border: "1px solid #CBD5E1", borderTop: "none",
            borderBottomLeftRadius: 6, borderBottomRightRadius: 6, zIndex: 100,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", overflow: "hidden"
          }}>
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => { if (onChange) onChange(opt); setOpen(false); }}
                style={{
                  padding: "10px 16px", cursor: "pointer", fontSize: 13, color: "#111827",
                  borderTop: "1px solid #CBD5E1", background: "#fff",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ─── Main Component ─── */
const emptyContact = () => ({ id: Date.now() + Math.random(), contactPerson: "", mobileNo: "", landlineNo: "", emailId: "" });
const emptyItem = (sno) => ({ id: Date.now() + Math.random(), sno, description: "", quantity: "", total: "" });

const SalesOrderForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(true);
  const [sdRequired, setSdRequired] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [contactRows, setContactRows] = useState([emptyContact()]);
  const [requirementRows, setRequirementRows] = useState([emptyItem(1)]);
  const [addonRows, setAddonRows] = useState([emptyItem(1)]);
  const [uploadedFiles, setUploadedFiles] = useState({ rfp: null, po: null });
  const rfpInputRef = useRef(null);
  const poInputRef = useRef(null);

  const handleFileSelect = (type, e) => {
    const file = e.target.files[0];
    if (file) setUploadedFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(13, 71, 161);
    doc.text("Sales Order Form", pageW / 2, 22, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, pageW / 2, 30, { align: "center" });

    let y = 40;

    const addSection = (title, fields) => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(14);
      doc.setTextColor(17, 24, 39);
      doc.text(title, 14, y);
      y += 2;
      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(0.5);
      doc.line(14, y, pageW - 14, y);
      y += 8;

      doc.setFontSize(10);
      fields.forEach(([label, value]) => {
        if (y > 275) { doc.addPage(); y = 20; }
        doc.setTextColor(100);
        doc.text(label + ":", 14, y);
        doc.setTextColor(30);
        doc.text(value || "—", 70, y);
        y += 7;
      });
      y += 6;
    };

    addSection("Sales Details", [
      ["Sales Rep", ""], ["Department", ""], ["Address", ""],
      ["Customer Name", ""], ["Customer RFP No", ""],
    ]);

    addSection("Contact Details", contactRows.map((c, i) => [
      `Contact ${i + 1}`, `${c.contactPerson || "—"} | ${c.mobileNo || "—"} | ${c.emailId || "—"}`
    ]));

    addSection("Requirement", requirementRows.map((r, i) => [
      `Item ${i + 1}`, `${r.description || "—"} | Qty: ${r.quantity || "—"} | Total: ${r.total || "—"}`
    ]));

    addSection("Security Deposit", [
      ["SD Required", sdRequired ? "Yes" : "No"],
    ]);

    addSection("Payment Terms", [
      ["On Delivery", ""], ["After Installation", ""], ["Milestone", ""],
    ]);

    doc.save("Sales_Order_Form.pdf");
  };

  const addContactRow = () => setContactRows(r => [...r, emptyContact()]);
  const removeContactRow = (id) => setContactRows(r => r.filter(x => x.id !== id));
  const updateContact = (id, field, val) => setContactRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const addRequirementRow = () => setRequirementRows(r => [...r, emptyItem(r.length + 1)]);
  const removeRequirementRow = (id) => setRequirementRows(r => r.filter(x => x.id !== id).map((x, i) => ({ ...x, sno: i + 1 })));
  const updateRequirement = (id, field, val) => setRequirementRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const addAddonRow = () => setAddonRows(r => [...r, emptyItem(r.length + 1)]);
  const removeAddonRow = (id) => setAddonRows(r => r.filter(x => x.id !== id).map((x, i) => ({ ...x, sno: i + 1 })));
  const updateAddon = (id, field, val) => setAddonRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const calcTotal = (rows) => {
    const sum = rows.reduce((acc, r) => acc + (parseFloat(r.total.replace(/[^0-9.]/g, "")) || 0), 0);
    return sum > 0 ? `₹${sum.toFixed(2)}` : "₹0.00";
  };

  const STEPS = ALL_STEPS.filter(s => sdRequired ? true : s.id !== "beneficiary").map((s, index) => ({ ...s, num: index + 1 }));
  const currentStepId = STEPS[activeStep - 1]?.id || "sales";

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F9FAFB" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
        <GlobalHeader />

        {/* TOP HEADER SECTION (White Background) */}
        <div style={{ background: "#fff", padding: "32px 32px 0", borderBottom: "1px solid #E5E7EB" }}>
          {/* Page Title */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 12px" }}>Sales Order Form</h1>
            <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#6B7280" }}>
              <span>Tender ID: <span style={{ color: "#2563EB", fontWeight: 600 }}>TND-2026-0412</span></span>
              <span>Order No. (PO): <span style={{ color: "#2563EB", fontWeight: 600 }}>2026-0412</span></span>
              <span>PID No: <span style={{ color: "#2563EB" }}>__________</span></span>
              <span>Firm: <span style={{ color: "#2563EB" }}>__________</span></span>
            </div>
          </div>

          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, paddingBottom: 32, flexWrap: "wrap" }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 68 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                    background: s.num < activeStep ? "#16A34A" : activeStep === s.num ? "#0044FF" : "#E5E7EB",
                    color: s.num < activeStep ? "#fff" : activeStep === s.num ? "#fff" : "#4B5563",
                  }}
                >
                  {s.num < activeStep ? <Check size={16} strokeWidth={3} /> : s.num}
                </div>
                <span style={{ fontSize: 12, color: s.num < activeStep ? "#111827" : activeStep === s.num ? "#0044FF" : "#6B7280", marginTop: 8, fontWeight: activeStep === s.num ? 600 : 500 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTENT SECTION (Gray Background) */}
        <div style={{ padding: "32px", display: "flex", gap: 24, alignItems: "stretch", flex: 1, position: "relative" }}>

          {/* LEFT — Form Container */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>

            {currentStepId === "review" && (
              <div style={{ background: "#ECFDF5", border: "1px solid #10B981", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#10B981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#065F46", fontSize: 14 }}>Review & Submit</div>
                  <div style={{ color: "#047857", fontSize: 13, marginTop: 4 }}>Please review all the information carefully before submitting the sales order form.</div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 24, pointerEvents: (currentStepId === "review" && !isEditingReview) ? "none" : "auto" }}>
              {(currentStepId === "sales" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Sales Details</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px", alignItems: "start" }}>
                    <Field label="Name of Sales Person" />
                    <Field label="SO Date" type="date" />

                    <Field label="Name of Customer / Department" />
                    <CustomDropdown
                      label="PID No"
                      placeholder="Select Sources"
                      options={["Gem - SITC", "Gem - Run Rate", "Tender - SITC", "Tender - Run Rate", "Other - SITC", "Other - Run Rate", "TRC", "Add +"]}
                    />

                    <Field label="Billing Address of Customer / Department" type="textarea" rowSpan={2} />
                    <Field label="Customer GST No" />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label style={labelStyle}>Delivery Date</label>
                      <input type="date" style={dateInputStyle} />
                    </div>

                    <Field label="Supply Order No" />
                    <Field label="Customer PAN No" />

                    <CustomDropdown label="Delivery Location Type" placeholder="Single" options={["Single", "Multi"]} />
                    <div />

                    <Field label="Delivery Address" type="textarea" />
                  </div>
                </div>
              )}

              {(currentStepId === "contact" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Customer Contact Details</h2>
                    <button onClick={addContactRow} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#0044FF", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      + Add Row
                    </button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E7EB", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "20%" }}>Contact Person</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "20%" }}>Mobile No</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "20%" }}>Landline No</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "25%" }}>Email ID</th>
                        <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", width: "15%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactRows.map((row, i) => (
                        <tr key={row.id} style={{ borderTop: i > 0 ? "1px solid #E5E7EB" : "none" }}>
                          <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.contactPerson} onChange={e => updateContact(row.id, "contactPerson", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, boxSizing: "border-box" }} /></td>
                          <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.mobileNo} onChange={e => updateContact(row.id, "mobileNo", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, boxSizing: "border-box" }} /></td>
                          <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.landlineNo} onChange={e => updateContact(row.id, "landlineNo", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, boxSizing: "border-box" }} /></td>
                          <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.emailId} onChange={e => updateContact(row.id, "emailId", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, boxSizing: "border-box" }} /></td>
                          <td style={{ padding: "12px 16px", textAlign: "center" }}>
                            <Trash2 size={18} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => removeContactRow(row.id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {(currentStepId === "requirement" || currentStepId === "review") && (
                <>
                  <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Requirement Details</h2>
                      <button onClick={addRequirementRow} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#0044FF", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        + Add Row
                      </button>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E7EB", fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "8%" }}>S. No</th>
                          <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "42%" }}>Description of Items</th>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "15%" }}>Quantity</th>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "20%" }}>Total (Inc. TAX)</th>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", width: "15%" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirementRows.map((row, i) => (
                          <tr key={row.id} style={{ borderTop: i > 0 ? "1px solid #E5E7EB" : "none" }}>
                            <td style={{ padding: "12px 16px", borderRight: "1px solid #E5E7EB", textAlign: "center", color: "#6B7280" }}>{row.sno}</td>
                            <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.description} onChange={e => updateRequirement(row.id, "description", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, boxSizing: "border-box" }} /></td>
                            <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="number" value={row.quantity} onChange={e => updateRequirement(row.id, "quantity", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, textAlign: "center", boxSizing: "border-box" }} /></td>
                            <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.total} onChange={e => updateRequirement(row.id, "total", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, textAlign: "center", boxSizing: "border-box" }} /></td>
                            <td style={{ padding: "12px 16px", textAlign: "center" }}>
                              <Trash2 size={18} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => removeRequirementRow(row.id)} />
                            </td>
                          </tr>
                        ))}
                        <tr style={{ borderTop: "1px solid #E5E7EB" }}>
                          <td colSpan={3} style={{ padding: "12px 16px", borderRight: "1px solid #E5E7EB", textAlign: "right", fontWeight: 700, color: "#111827" }}>Grand Total:</td>
                          <td style={{ padding: "12px 16px", borderRight: "1px solid #E5E7EB", textAlign: "center", fontWeight: 700, color: "#111827" }}>{calcTotal(requirementRows)}</td>
                          <td style={{ padding: "12px 16px" }}></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Add on Items Details (if any)</h2>
                      <button onClick={addAddonRow} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#0044FF", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        + Add Row
                      </button>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E7EB", fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "8%" }}>S. No</th>
                          <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "42%" }}>Description of Items</th>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "15%" }}>Quantity</th>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", borderRight: "1px solid #E5E7EB", width: "20%" }}>Total (Inc. TAX)</th>
                          <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#4B5563", width: "15%" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addonRows.map((row, i) => (
                          <tr key={row.id} style={{ borderTop: i > 0 ? "1px solid #E5E7EB" : "none" }}>
                            <td style={{ padding: "12px 16px", borderRight: "1px solid #E5E7EB", textAlign: "center", color: "#6B7280" }}>{row.sno}</td>
                            <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.description} onChange={e => updateAddon(row.id, "description", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, boxSizing: "border-box" }} /></td>
                            <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="number" value={row.quantity} onChange={e => updateAddon(row.id, "quantity", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, textAlign: "center", boxSizing: "border-box" }} /></td>
                            <td style={{ padding: 0, borderRight: "1px solid #E5E7EB" }}><input type="text" value={row.total} onChange={e => updateAddon(row.id, "total", e.target.value)} style={{ width: "100%", padding: "12px 16px", border: "none", outline: "none", background: "transparent", fontSize: 13, textAlign: "center", boxSizing: "border-box" }} /></td>
                            <td style={{ padding: "12px 16px", textAlign: "center" }}>
                              <Trash2 size={18} color="#EF4444" style={{ cursor: "pointer" }} onClick={() => removeAddonRow(row.id)} />
                            </td>
                          </tr>
                        ))}
                        <tr style={{ borderTop: "1px solid #E5E7EB" }}>
                          <td colSpan={3} style={{ padding: "12px 16px", borderRight: "1px solid #E5E7EB", textAlign: "right", fontWeight: 700, color: "#111827" }}>Grand Total:</td>
                          <td style={{ padding: "12px 16px", borderRight: "1px solid #E5E7EB", textAlign: "center", fontWeight: 700, color: "#111827" }}>{calcTotal(addonRows)}</td>
                          <td style={{ padding: "12px 16px" }}></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {(currentStepId === "remarks" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Remarks</h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Pre-requisites at the time of delivery</label>
                    <textarea
                      style={{ ...textareaStyle, minHeight: 120 }}
                      placeholder="Enter any special instructions, requirements, or prerequisites for delivery..."
                    />
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Include any specific requirements, access instructions, or conditions needed at the delivery site.</span>
                  </div>
                </div>
              )}

              {(currentStepId === "security" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Site Inspection & Security Deposit</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px", alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <ToggleField label={<span>Security Deposit Required <span style={{ color: "#EF4444" }}>*</span></span>} checked={sdRequired} onChange={() => setSdRequired(!sdRequired)} />
                      <ToggleField label={<span>Customer SD Format <span style={{ color: "#EF4444" }}>*</span></span>} checked={false} />

                      <CustomDropdown label="Customer SD Format" placeholder="Select SD format (e.g. GeM, RFP, Other)" options={["GeM", "RFP", "Other"]} />
                      <Field label="Validity of SD" />
                      <Field label="Amount" placeholder="Enter amount" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <CustomDropdown label={<span>Security Deposit Required <span style={{ color: "#EF4444" }}>*</span></span>} placeholder="Select" options={["Yes", "No"]} value={sdRequired ? "Yes" : "No"} onChange={(val) => setSdRequired(val === "Yes")} />
                      <Field label="Last Date to Submit SD" type="date" />
                      <Field label="SD % of Order" placeholder="Enter percentage" />
                    </div>
                  </div>
                </div>
              )}

              {(currentStepId === "beneficiary" || (currentStepId === "review" && sdRequired)) && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Security Deposit Beneficiary Details</h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Field label="Name of Beneficiary" />
                    <Field label="Beneficiary Address" type="textarea" />
                    <Field label="Bank Name" />
                    <Field label="IFSC Code" />
                    <Field label="Branch Address" type="textarea" />
                  </div>
                </div>
              )}

              {(currentStepId === "payment" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Payment Terms & Signatures</h2>

                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#374151", margin: "0 0 16px" }}>Payment Terms <span style={{ color: "#EF4444" }}>*</span></h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 24, marginBottom: 24 }}>
                    <Field label="On Delivery (%)" placeholder="0" />
                    <Field label="After Installation (%)" placeholder="0" />
                    <Field label={<span>Milestone basis (%) <span style={{ color: "#EF4444" }}>*</span></span>} placeholder="Enter text - write all the milestones" />
                  </div>

                  <div style={{ background: "#FEF2F2", padding: "12px 16px", borderRadius: 6, marginBottom: 12, color: "#EF4444", fontWeight: 600, fontSize: 13 }}>
                    Total Percentage: 0%
                  </div>
                  <div style={{ background: "#FEF2F2", padding: "12px 16px", borderRadius: 6, marginBottom: 32, color: "#EF4444", fontWeight: 600, fontSize: 13 }}>
                    * If Payment is in Milestones, define all the milestones.
                  </div>

                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#374151", margin: "0 0 16px" }}>Signatures</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Field label="Sales Representative Signature" />
                    <Field label="Sales Coordinator Signature" />
                    <Field label="Date" type="date" />
                  </div>
                </div>
              )}

              {(currentStepId === "accounts" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Accounts</h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Field label="Challan No" />
                    <Field label="Invoice No" />
                    <Field label="Challan Date" type="date" />
                    <Field label="Invoice Date" type="date" />
                    <Field label="Value of Invoice" />
                    <Field label="Signature (Accounts)" />
                  </div>
                </div>
              )}

              {(currentStepId === "operations" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Operations / Stores</h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Field label="Mode of Delivery" placeholder="e.g., Courier, Truck, Air Freight" />
                    <Field label="Dispatched On" type="date" />
                    <Field label="Docket Number" />
                    <Field label="Signature (Operations/Stores)" />
                  </div>
                </div>
              )}

              {(currentStepId === "service" || currentStepId === "review") && (
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "28px 32px" }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Service</h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Field label="Mode of Installation" placeholder="e.g., On-site, Remote, etc." />
                    <Field label="Outsourced" />
                    <Field label="Installation Completed On" type="date" />
                    <Field label="CSAT Report" type="textarea" placeholder="Customer Satisfaction Report details..." />
                    <Field label="Signature (Service)" />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div style={{ marginTop: "auto", position: "sticky", bottom: 0, background: "#F9FAFB", padding: "16px 0 24px", zIndex: 10 }}>
              {currentStepId === "review" ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => { setIsEditingReview(false); activeStep > 1 ? setActiveStep(prev => prev - 1) : navigate("/sof-dashboard"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    {!isEditingReview ? (
                      <button onClick={() => setIsEditingReview(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>
                        <Pencil size={14} /> Edit
                      </button>
                    ) : (
                      <button onClick={() => setIsEditingReview(false)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>
                        <Save size={14} /> Save Draft
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={handleDownloadPDF} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>
                      <Download size={16} /> Download PDF
                    </button>
                    <button onClick={() => navigate("/sof-dashboard")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 20px", border: "none", borderRadius: 6, background: "#16A34A", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
                      <Check size={16} strokeWidth={3} /> Submit Order
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() => activeStep > 1 ? setActiveStep(prev => prev - 1) : navigate("/sof-dashboard")}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 6,
                        background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT,
                      }}
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 6,
                      background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT,
                    }}>
                      <Save size={14} /> Save Draft
                    </button>
                  </div>
                  <button
                    onClick={() => setActiveStep(prev => Math.min(STEPS.length, prev + 1))}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "9px 20px", border: "none", borderRadius: 6,
                      background: "#0044FF", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                    }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Sidebar Cards */}
          <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Order Status */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 20px 16px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>Order Status</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Current Status</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: "#0044FF", padding: "4px 12px", borderRadius: 16 }}>In Process</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Pending With</span>
                  <span style={{ fontSize: 13, color: "#111827" }}>-</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Department</span>
                  <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>Dept. Name</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Expected By</span>
                  <span style={{ fontSize: 13, color: "#D97706", fontWeight: 600 }}>Today, 5:00 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Priority</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", background: "#FEE2E2", border: "1px solid #FECACA", padding: "2px 10px", borderRadius: 4 }}>High</span>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 20px 16px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>Activity Timeline</h3>
              <div style={{ position: "relative" }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < TIMELINE.length - 1 ? 20 : 0 }}>
                    {/* Dot + Line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                        background: item.icon === "green" ? "#DCFCE7" : "#EFF6FF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {item.icon === "green"
                          ? <Check size={14} color="#16A34A" strokeWidth={3} />
                          : <Clock size={14} color="#2563EB" strokeWidth={2.5} />
                        }
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: "#E5E7EB", marginTop: 4, minHeight: 40 }} />
                      )}
                    </div>
                    {/* Text */}
                    <div style={{ paddingBottom: 4 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "0 0 2px" }}>{item.title}</p>
                      <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 2px" }}>{item.subtitle}</p>
                      <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 20px 16px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 12px" }}>Quick Actions</h3>
              <button onClick={handleDownloadPDF} style={{
                display: "flex", alignItems: "center", gap: 8, width: "100%",
                padding: "9px 14px", border: "1px solid #E5E7EB", borderRadius: 6,
                background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT,
              }}>
                <Save size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload RFP & PO Documents Modal */}
      {showUploadModal && (
        <>
          <div
            onClick={() => setShowUploadModal(false)}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
              zIndex: 999,
            }}
          />
          <div style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            background: "#fff", borderRadius: 12, padding: "32px", width: 420,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)", zIndex: 1000, fontFamily: FONT,
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#0D47A1", margin: "0 0 8px", textAlign: "center" }}>Upload RFP & PO Documents</h3>
            <p style={{ fontSize: 15, color: "#4B5563", margin: "0 0 24px", textAlign: "center" }}>Please upload the required files to Continue.</p>

            {/* Hidden file inputs */}
            <input type="file" ref={rfpInputRef} style={{ display: "none" }} accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" onChange={e => handleFileSelect("rfp", e)} />
            <input type="file" ref={poInputRef} style={{ display: "none" }} accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" onChange={e => handleFileSelect("po", e)} />

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32, paddingLeft: 0 }}>
              {/* RFP Document */}
              <div
                onClick={() => rfpInputRef.current?.click()}
                style={{
                  display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                  padding: "12px 16px", borderRadius: 8,
                  border: uploadedFiles.rfp ? "1px solid #86EFAC" : "1px dashed #D1D5DB",
                  background: uploadedFiles.rfp ? "#F0FDF4" : "#FAFAFA",
                  transition: "all 0.2s",
                }}
              >
                {uploadedFiles.rfp
                  ? <FileCheck size={20} color="#16A34A" />
                  : <Upload size={20} strokeWidth={1.5} color="#6B7280" />}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: uploadedFiles.rfp ? "#16A34A" : "#111827" }}>
                    {uploadedFiles.rfp ? uploadedFiles.rfp.name : "RFP Document (Tender ID)"}
                  </span>
                  {uploadedFiles.rfp && (
                    <span style={{ display: "block", fontSize: 11, color: "#6B7280", marginTop: 2 }}>
                      {(uploadedFiles.rfp.size / 1024).toFixed(1)} KB
                    </span>
                  )}
                </div>
                {uploadedFiles.rfp && <Check size={16} color="#16A34A" strokeWidth={3} />}
              </div>

              {/* Purchase Order */}
              <div
                onClick={() => poInputRef.current?.click()}
                style={{
                  display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                  padding: "12px 16px", borderRadius: 8,
                  border: uploadedFiles.po ? "1px solid #86EFAC" : "1px dashed #D1D5DB",
                  background: uploadedFiles.po ? "#F0FDF4" : "#FAFAFA",
                  transition: "all 0.2s",
                }}
              >
                {uploadedFiles.po
                  ? <FileCheck size={20} color="#16A34A" />
                  : <Upload size={20} strokeWidth={1.5} color="#6B7280" />}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: uploadedFiles.po ? "#16A34A" : "#111827" }}>
                    {uploadedFiles.po ? uploadedFiles.po.name : "Purchase Order (PO)"}
                  </span>
                  {uploadedFiles.po && (
                    <span style={{ display: "block", fontSize: 11, color: "#6B7280", marginTop: 2 }}>
                      {(uploadedFiles.po.size / 1024).toFixed(1)} KB
                    </span>
                  )}
                </div>
                {uploadedFiles.po && <Check size={16} color="#16A34A" strokeWidth={3} />}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{
                  padding: "10px 24px", border: "none", borderRadius: 8,
                  background: "#0044FF", color: "#fff", fontSize: 15, fontWeight: 500,
                  cursor: "pointer", fontFamily: FONT,
                  opacity: (!uploadedFiles.rfp && !uploadedFiles.po) ? 0.6 : 1,
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesOrderForm;
