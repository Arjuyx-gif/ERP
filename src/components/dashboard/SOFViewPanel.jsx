import { useState } from "react";
import { X, ChevronDown, Trash2, Check } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const labelStyle = { display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 4 };
const inputStyle = {
  width: "100%", padding: "8px 11px", border: "1px solid #E5E7EB", borderRadius: 6,
  fontSize: 13, color: "#374151", fontFamily: FONT, outline: "none",
  boxSizing: "border-box", background: "#F9FAFB",
};
const textareaStyle = { ...inputStyle, resize: "vertical", minHeight: 80 };
const cellInput = {
  width: "100%", border: "1px solid #E5E7EB", borderRadius: 5,
  padding: "5px 8px", fontSize: 12, fontFamily: FONT, outline: "none",
  boxSizing: "border-box", background: "#F9FAFB",
};

const Field = ({ label, type = "text", placeholder = "", span }) => (
  <div style={span ? { gridColumn: `span ${span}` } : {}}>
    {label && <label style={labelStyle}>{label}</label>}
    {type === "textarea" ? (
      <textarea style={textareaStyle} placeholder={placeholder} />
    ) : type === "date" ? (
      <div style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <span style={{ color: "#9CA3AF", fontSize: 13 }}></span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    ) : (
      <input type="text" style={inputStyle} placeholder={placeholder} />
    )}
  </div>
);

const Section = ({ title, children }) => (
  <div style={{
    background: "#fff", border: "1px solid #EAECF0", borderRadius: 10,
    boxShadow: "0 1px 4px rgba(16,24,40,0.06)", overflow: "hidden", marginBottom: 14,
  }}>
    <div style={{ padding: "10px 16px", background: "#F9FAFB", borderBottom: "1px solid #EAECF0", display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 3, height: 14, background: "#2979FF", borderRadius: 2 }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "#101828" }}>{title}</span>
    </div>
    <div style={{ padding: "16px 18px" }}>{children}</div>
  </div>
);

const TableWrapper = ({ children }) => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: FONT }}>
      {children}
    </table>
  </div>
);

const TH = ({ children, width }) => (
  <th style={{
    padding: "9px 12px", background: "#F9FAFB", fontSize: 12, fontWeight: 600,
    color: "#6B7280", textAlign: "left", borderBottom: "1px solid #E5E7EB", width,
  }}>{children}</th>
);

const TD = ({ children }) => (
  <td style={{ padding: "7px 8px", borderBottom: "1px solid #F3F4F6" }}>{children}</td>
);

const ToggleSwitch = () => {
  const [on, setOn] = useState(false);
  return (
    <div onClick={() => setOn(v => !v)} style={{
      width: 36, height: 20, background: on ? "#2563EB" : "#E5E7EB",
      borderRadius: 10, position: "relative", cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
    }}>
      <div style={{
        width: 16, height: 16, background: "#fff", borderRadius: "50%",
        position: "absolute", top: 2, left: on ? 18 : 2, transition: "all 0.2s",
      }} />
    </div>
  );
};

const SelectField = ({ label, placeholder, options = [] }) => {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  return (
    <div style={{ position: "relative" }}>
      {label && <label style={labelStyle}>{label}</label>}
      <div onClick={() => setOpen(v => !v)} style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <span style={{ color: val ? "#374151" : "#9CA3AF" }}>{val || placeholder || "Select"}</span>
        <ChevronDown size={14} color="#9CA3AF" />
      </div>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 1062 }} />
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, background: "#fff",
            border: "1px solid #E5E7EB", borderRadius: 6, zIndex: 1063,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden",
          }}>
            {options.map(o => (
              <div key={o} onClick={() => { setVal(o); setOpen(false); }}
                style={{ padding: "9px 12px", fontSize: 13, cursor: "pointer", color: "#374151" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >{o}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SOFViewPanel = ({ onClose }) => (
  <>
    {/* Backdrop */}
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 960,
        background: "rgba(0,0,0,0.22)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
      }}
    />

    {/* Panel — right-side slide-in, same as RFPFormPanel */}
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0,
      width: "68%", zIndex: 961,
      background: "#F8F9FB",
      boxShadow: "-8px 0 40px rgba(0,0,0,0.14)",
      display: "flex", flexDirection: "column",
      fontFamily: FONT,
    }}>

      {/* Header */}
      <div style={{ padding: "14px 20px 12px", borderBottom: "1px solid #EAECF0", flexShrink: 0, background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", background: "#16A34A", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1.5 6 4.5 9 9.5 3" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#101828" }}>SOF Details – Order/PID No.</div>
              <div style={{ fontSize: 11.5, color: "#667085", marginTop: 1 }}>Sales Order Form</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#667085", display: "flex", alignItems: "center", padding: 6, borderRadius: 6 }}>
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>

        {/* Sales Details */}
        <Section title="Sales Details">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Name of Sales Person" />
            <Field label="SO Date" type="date" />
            <Field label="Name of Customer / Department" />
            <Field label="PID No" />
            <Field label="Address of Customer / Department" type="textarea" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Field label="Customer GST No" />
              <Field label="Delivery Date" type="date" />
            </div>
            <Field label="Supply Order No" />
            <Field label="Customer PAN No" />
            <div style={{ gridColumn: "span 2" }}>
              <SelectField label="Delivery Location Type" placeholder="Select" options={["Local", "Outstation", "International"]} />
            </div>
            <Field label="Delivery Address" type="textarea" span={2} />
          </div>
        </Section>

        {/* Customer Contact Details */}
        <Section title="Customer Contact Details">
          <TableWrapper>
            <thead>
              <tr>
                <TH>Contact Person</TH>
                <TH>Mobile No</TH>
                <TH>Landline No</TH>
                <TH>Email ID</TH>
                <TH width={60}>Actions</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 2 }}><Trash2 size={14} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#16A34A", padding: 2 }}><Check size={14} /></button>
                  </div>
                </TD>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>

        {/* Requirement Details */}
        <Section title="Requirement Details">
          <TableWrapper>
            <thead>
              <tr>
                <TH width={40}>S.No</TH>
                <TH>Description of Items</TH>
                <TH width={80}>Quantity</TH>
                <TH width={120}>Total (Inc. TAX)</TH>
                <TH width={60}>Actions</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD><span style={{ fontSize: 13, color: "#374151", paddingLeft: 4 }}>1</span></TD>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 2 }}><Trash2 size={14} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#16A34A", padding: 2 }}><Check size={14} /></button>
                  </div>
                </TD>
              </tr>
              <tr>
                <td colSpan={5} style={{ padding: "8px 12px", textAlign: "right", fontSize: 13, fontWeight: 600, color: "#111827", background: "#F9FAFB" }}>
                  Grand Total: &nbsp;<span style={{ color: "#2563EB" }}>₹0.00</span>
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>

        {/* Add on Items */}
        <Section title="Add on Items Details (if any)">
          <TableWrapper>
            <thead>
              <tr>
                <TH width={40}>S.No</TH>
                <TH>Description of Items</TH>
                <TH width={80}>Quantity</TH>
                <TH width={120}>Total (Inc. TAX)</TH>
                <TH width={60}>Actions</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD><span style={{ fontSize: 13, color: "#374151", paddingLeft: 4 }}>1</span></TD>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD><input style={cellInput} /></TD>
                <TD>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 2 }}><Trash2 size={14} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#16A34A", padding: 2 }}><Check size={14} /></button>
                  </div>
                </TD>
              </tr>
              <tr>
                <td colSpan={5} style={{ padding: "8px 12px", textAlign: "right", fontSize: 13, fontWeight: 600, color: "#111827", background: "#F9FAFB" }}>
                  Grand Total: &nbsp;<span style={{ color: "#2563EB" }}>₹0.00</span>
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>

        {/* Remarks */}
        <Section title="Remarks">
          <label style={labelStyle}>Pre-requisites at the time of delivery</label>
          <textarea style={{ ...textareaStyle, minHeight: 100 }} placeholder="Enter any special instructions, requirements, or prerequisites for delivery..." />
          <p style={{ fontSize: 11, color: "#9CA3AF", margin: "4px 0 0" }}>
            Include any specific requirements, access instructions, or conditions needed at the delivery site.
          </p>
        </Section>

        {/* Site Inspection & Security Deposit */}
        <Section title="Site Inspection & Security Deposit">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Security Deposit Required *</span>
              <ToggleSwitch />
            </div>
            <SelectField placeholder="Yes" options={["Yes", "No"]} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Customer SD Format *</span>
              <ToggleSwitch />
            </div>
            <Field label="Last Date to Submit SD" type="date" />
            <SelectField label="Customer SD Format" placeholder="Select SD format (e.g. GeM, RFP, Other)" options={["GeM", "RFP", "Other"]} />
            <Field label="SD % of Order" placeholder="Enter percentage" />
            <Field label="Validity of SD" span={2} />
            <Field label="Amount" placeholder="Enter amount" span={2} />
          </div>
        </Section>

        {/* Security Deposit Beneficiary Details */}
        <Section title="Security Deposit Beneficiary Details">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Name of Beneficiary" />
            <Field label="Address" type="textarea" />
            <Field label="Bank Name" />
            <Field label="IFSC Code" />
            <Field label="Branch Address" type="textarea" />
          </div>
        </Section>

        {/* Payment Terms & Signatures */}
        <Section title="Payment Terms & Signatures">
          <label style={{ ...labelStyle, marginBottom: 8, fontSize: 13 }}>Payment Terms *</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <Field label="On Delivery (%)" placeholder="0" />
            <Field label="After Installation (%)" placeholder="0" />
            <Field label="Milestone basis (%) *" placeholder="Enter text – write all the milestones" />
          </div>
          <div style={{ padding: "8px 12px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, color: "#374151", marginBottom: 8 }}>
            Total Percentage: <strong>0%</strong>
          </div>
          <div style={{ padding: "8px 12px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, fontSize: 12, color: "#DC2626", marginBottom: 16 }}>
            * If Payment is in Milestones, define all the milestones.
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 12 }}>Signatures</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Sales Representative Signature" />
            <Field label="Sales Coordinator Signature" />
            <Field label="Date" type="date" />
          </div>
        </Section>

      </div>

      {/* Footer */}
      <div style={{
        padding: "14px 20px", borderTop: "1px solid #EAECF0",
        display: "flex", justifyContent: "space-between", gap: 10,
        background: "#fff", flexShrink: 0,
      }}>
        <button onClick={onClose} style={{
          flex: 1, padding: "9px 0", border: "1px solid #E5E7EB", borderRadius: 8,
          background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
          cursor: "pointer", fontFamily: FONT,
        }}>
          Close
        </button>
        <button style={{
          flex: 1, padding: "9px 0", border: "none", borderRadius: 8,
          background: "#2563EB", fontSize: 13, fontWeight: 600, color: "#fff",
          cursor: "pointer", fontFamily: FONT,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          View Details
        </button>
      </div>

    </div>
  </>
);

export default SOFViewPanel;
