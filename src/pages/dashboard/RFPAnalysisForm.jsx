import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Save, Upload, Eye, Check, Calendar, Download } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const STEPS = [
  { n: 1, label: "Basic Details" },
  { n: 2, label: "Contact" },
  { n: 3, label: "Tender Details" },
  { n: 4, label: "Criteria" },
  { n: 5, label: "Approval" },
  { n: 6, label: "Review" },
];

const UPLOAD_ITEMS = [
  "Tender(RFP) Documents",
  "ATC Documents",
  "GeM Documents",
  "Additional Documents",
];

const PQ_ROWS = [
  "Turnover (Past 3 yrs)",
  "Positive Net Worth",
  "Quality Certificates (Eg: ISO, CMMI etc.)",
  "Other Criteria Clause",
  "Blacklisting/Debarred/Banned - Undertaking",
  "Any Other Undertaking",
  "Bid Authorization Certificate",
  "MAF",
  "Service/Support Center List",
  "Page No & Indexing",
  "Other Highlights",
  "Details of any joint call with OEM",
  "Winning Strategy",
  "Reason to bid the tender",
];

// ── Reusable field components ──────────────────────────────────────────────────

const Field = ({ label, multiline = false, type = "text", value, onChange, fullSpan = false }) => (
  <div style={{ gridColumn: fullSpan ? "1 / -1" : undefined }}>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontFamily: FONT }}>
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value} onChange={e => onChange(e.target.value)} rows={4}
        style={{
          width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
          outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
          background: "#fff", resize: "none", padding: "10px 12px",
          boxSizing: "border-box", lineHeight: 1.5,
        }}
      />
    ) : type === "date" ? (
      <div style={{ position: "relative" }}>
        <input
          type="date" value={value} onChange={e => onChange(e.target.value)}
          style={{
            width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
            outline: "none", fontSize: 14, color: value ? "#111" : "#9CA3AF",
            fontFamily: FONT, background: "#fff",
            padding: "10px 36px 10px 12px", boxSizing: "border-box",
          }}
        />
        <Calendar size={15} color="#9CA3AF" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
      </div>
    ) : (
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
          outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
          background: "#fff", padding: "10px 12px", boxSizing: "border-box",
        }}
      />
    )}
  </div>
);

const SelectField = ({ label, value, onChange, options = [] }) => (
  <div>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontFamily: FONT }}>
      {label}
    </label>
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
        outline: "none", fontSize: 14, color: value ? "#111" : "#9CA3AF",
        fontFamily: FONT, background: "#fff", padding: "10px 12px", boxSizing: "border-box",
        appearance: "none", cursor: "pointer",
      }}
    >
      <option value="" />
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const SectionBanner = ({ text }) => (
  <div style={{
    gridColumn: "1 / -1",
    background: "#FEF2F2", border: "1px solid #FECACA",
    borderRadius: 6, padding: "10px 16px",
    fontSize: 13, fontWeight: 600, color: "#DC2626",
  }}>
    {text}
  </div>
);

// ── Step content ───────────────────────────────────────────────────────────────

const Step1 = ({ data, set }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 24px" }}>Details</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" }}>
      <Field label="Name of Sales Rep"  value={data.salesRep}         onChange={set("salesRep")} />
      <Field label="Funnel Ref No"       value={data.funnelRef}        onChange={set("funnelRef")} />
      <Field label="Name of Department" value={data.department}       onChange={set("department")} />
      <Field label="Existing Customer"  value={data.existingCustomer} onChange={set("existingCustomer")} />
      <Field label="Address"             value={data.address}          onChange={set("address")} multiline />
    </div>
  </div>
);

const Step2 = ({ data, set }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 24px" }}>Contact Details of the Customer</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" }}>
      <Field label="Category"        value={data.category}      onChange={set("category")} />
      <Field label="Customer's Name" value={data.customerName}  onChange={set("customerName")} />
      <Field label="Mail ID"         value={data.mailId}        onChange={set("mailId")} type="email" />
      <Field label="Mobile Number"   value={data.mobileNumber}  onChange={set("mobileNumber")} />
    </div>
  </div>
);

const Step3 = ({ data, set }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 24px" }}>Tender Details</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" }}>
      <Field label="Tender Title"                value={data.tenderTitle}          onChange={set("tenderTitle")} />
      <Field label="RFP No."                     value={data.rfpNo}                onChange={set("rfpNo")} />
      <Field label="Tender ID"                   value={data.tenderId}             onChange={set("tenderId")} fullSpan />
      <Field label="No. of Bids"                 value={data.noOfBids}             onChange={set("noOfBids")} />
      <SelectField label="Firm Names"            value={data.firmNames}            onChange={set("firmNames")}
        options={["CIPL", "NIPL", "UVT", "BMG", "E Square"]} />
      <Field label="Reverse Auction"             value={data.reverseAuction}       onChange={set("reverseAuction")} />
      <Field label="Estimated Bid Value"         value={data.estimatedBidValue}    onChange={set("estimatedBidValue")} />
      <Field label="RFP Issue Date"              value={data.rfpIssueDate}         onChange={set("rfpIssueDate")} type="date" />
      <Field label="Submission Portal Address"   value={data.submissionPortal}     onChange={set("submissionPortal")} />
      <Field label="Tender Type"                 value={data.tenderType}           onChange={set("tenderType")} />
      <Field label="Bid/Tender Validity"         value={data.bidValidity}          onChange={set("bidValidity")} />
      <Field label="Query Submission Date"       value={data.querySubmissionDate}  onChange={set("querySubmissionDate")} type="date" />
      <Field label="Mode of Submission - Query"  value={data.modeQuery}            onChange={set("modeQuery")} />
      <Field label="Pre-Bid Meeting Time"        value={data.preBidTime}           onChange={set("preBidTime")} fullSpan />
      <Field label="Bid Submission Date"         value={data.bidSubmissionDate}    onChange={set("bidSubmissionDate")} type="date" />
      <Field label="Bid Opening Date"            value={data.bidOpeningDate}       onChange={set("bidOpeningDate")} type="date" />
      <Field label="Mode of Submission - Tender" value={data.modeTender}           onChange={set("modeTender")} />
      <Field label="Price Validity"              value={data.priceValidity}        onChange={set("priceValidity")} />
      <Field label="Tender Fee Amount"           value={data.tenderFeeAmount}      onChange={set("tenderFeeAmount")} />
      <Field label="Mode of Tender Fee Payment"  value={data.tenderFeeMode}        onChange={set("tenderFeeMode")} />
      <Field label="EMD Required"                value={data.emdRequired}          onChange={set("emdRequired")} fullSpan />
      <Field label="EMD Amount"                  value={data.emdAmount}            onChange={set("emdAmount")} />
      <Field label="Date of Submission - EMD"    value={data.emdDate}              onChange={set("emdDate")} type="date" />
      <SectionBanner text="In case EMD is required in the form of BG" />
      <Field label="Reason for Exemption of EMD/Tender Fee" value={data.emdExemptionReason} onChange={set("emdExemptionReason")} fullSpan />
      <Field label="Payment T&C"                 value={data.paymentTnc}           onChange={set("paymentTnc")} />
      <Field label="Payment Schedule"            value={data.paymentSchedule}      onChange={set("paymentSchedule")} />
      <Field label="PBG%"                        value={data.pbgPct}               onChange={set("pbgPct")} />
      <Field label="PBG Validity"                value={data.pbgValidity}          onChange={set("pbgValidity")} />
      <Field label="AMC Reqd"                    value={data.amcReqd}              onChange={set("amcReqd")} />
      <Field label="Duration of AMC"             value={data.amcDuration}          onChange={set("amcDuration")} />
      <SectionBanner text="Manpower Details" />
      <Field label="Manpower Reqd for Support"   value={data.manpower1}            onChange={set("manpower1")} />
      <Field label="Manpower Reqd for Support"   value={data.manpower2}            onChange={set("manpower2")} />
      <Field label="Qualification"               value={data.qualification}        onChange={set("qualification")} />
      <Field label="Certification"               value={data.certification}        onChange={set("certification")} />
      <Field label="Quantity"                    value={data.quantity}             onChange={set("quantity")} />
      <Field label="Experience"                  value={data.experience}           onChange={set("experience")} />
    </div>
  </div>
);

const Step4 = ({ data, set }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 20px" }}>PQ Criteria</h2>
    <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            {["Particulars", "Bidder", "OEM", "Evidence Required"].map(h => (
              <th key={h} style={{
                padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#374151",
                textAlign: "center", borderBottom: "1px solid #E5E7EB",
                borderRight: "1px solid #E5E7EB",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PQ_ROWS.map((row, i) => (
            <tr key={row} style={{ borderBottom: i < PQ_ROWS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
              <td style={{
                padding: "14px 16px", fontSize: 13,
                color: "#374151", fontWeight: 400,
                borderRight: "1px solid #E5E7EB", verticalAlign: "middle",
              }}>
                {row}
              </td>
              {["bidder", "oem", "evidence"].map(col => (
                <td key={col} style={{ padding: "8px 12px", borderRight: "1px solid #E5E7EB", verticalAlign: "middle" }}>
                  <input
                    type="text"
                    value={data[`pq_${i}_${col}`] ?? ""}
                    onChange={e => set(`pq_${i}_${col}`)(e.target.value)}
                    style={{
                      width: "100%", border: "none", outline: "none",
                      fontSize: 13, fontFamily: FONT, background: "transparent", color: "#111",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Step5 = ({ data, set }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 24px" }}>Approval</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" }}>
      <Field label="Prepared By"    value={data.preparedBy}   onChange={set("preparedBy")} />
      <Field label="Approved By"    value={data.approvedBy}   onChange={set("approvedBy")} />
      <Field label="Pre-sales Rep"  value={data.presalesRep}  onChange={set("presalesRep")} />
      <Field label="Date"           value={data.approvalDate} onChange={set("approvalDate")} type="date" />
    </div>
  </div>
);

const ReviewSection = ({ title }) => (
  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1F2937", margin: "28px 0 16px", borderBottom: "1px solid #E5E7EB", paddingBottom: 8 }}>
    {title}
  </h3>
);

const ReadField = ({ label, value }) => (
  <div>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontFamily: FONT }}>{label}</label>
    <input
      readOnly value={value}
      style={{
        width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
        outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
        background: "#F9FAFB", padding: "10px 12px", boxSizing: "border-box",
      }}
    />
  </div>
);

const ReadArea = ({ label, value }) => (
  <div style={{ gridColumn: "span 1" }}>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontFamily: FONT }}>{label}</label>
    <textarea
      readOnly value={value} rows={4}
      style={{
        width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
        outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
        background: "#F9FAFB", resize: "none", padding: "10px 12px",
        boxSizing: "border-box", lineHeight: 1.5,
      }}
    />
  </div>
);

const Step6 = ({ data, set }) => (
  <div>
    {/* Details */}
    <ReviewSection title="Details" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
      <ReadField label="Name of Sales Rep"  value={data.salesRep} />
      <ReadField label="Funnel Ref No"       value={data.funnelRef} />
      <ReadField label="Name of Department" value={data.department} />
      <ReadField label="Existing Customer"  value={data.existingCustomer} />
      <ReadArea  label="Address"             value={data.address} />
    </div>

    {/* Contact */}
    <ReviewSection title="Contact Details of the Customer" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
      <ReadField label="Category"        value={data.category} />
      <ReadField label="Customer's Name" value={data.customerName} />
      <ReadField label="Mail ID"         value={data.mailId} />
      <ReadField label="Mobile Number"   value={data.mobileNumber} />
    </div>

    {/* Tender Details */}
    <ReviewSection title="Tender Details" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
      <ReadField label="Tender Title"                value={data.tenderTitle} />
      <ReadField label="RFP No."                     value={data.rfpNo} />
      <div style={{ gridColumn: "1 / -1" }}><ReadField label="Tender ID" value={data.tenderId} /></div>
      <ReadField label="No. of Bids"                 value={data.noOfBids} />
      <ReadField label="Firm Names"                  value={data.firmNames} />
      <ReadField label="Reverse Auction"             value={data.reverseAuction} />
      <ReadField label="Estimated Bid Value"         value={data.estimatedBidValue} />
      <ReadField label="RFP Issue Date"              value={data.rfpIssueDate} />
      <ReadField label="Submission Portal Address"   value={data.submissionPortal} />
      <ReadField label="Tender Type"                 value={data.tenderType} />
      <ReadField label="Bid/Tender Validity"         value={data.bidValidity} />
      <ReadField label="Query Submission Date"       value={data.querySubmissionDate} />
      <ReadField label="Mode of Submission - Query"  value={data.modeQuery} />
      <div style={{ gridColumn: "1 / -1" }}><ReadField label="Pre-Bid Meeting Time" value={data.preBidTime} /></div>
      <ReadField label="Bid Submission Date"         value={data.bidSubmissionDate} />
      <ReadField label="Bid Opening Date"            value={data.bidOpeningDate} />
      <ReadField label="Mode of Submission - Tender" value={data.modeTender} />
      <ReadField label="Price Validity"              value={data.priceValidity} />
      <ReadField label="Tender Fee Amount"           value={data.tenderFeeAmount} />
      <ReadField label="Mode of Tender Fee Payment"  value={data.tenderFeeMode} />
      <div style={{ gridColumn: "1 / -1" }}><ReadField label="EMD Required" value={data.emdRequired} /></div>
      <ReadField label="EMD Amount"                  value={data.emdAmount} />
      <ReadField label="Date of Submission - EMD"    value={data.emdDate} />
      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#DC2626" }}>
          In case EMD is required in the form of BG
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1" }}><ReadField label="Reason for Exemption of EMD/Tender Fee" value={data.emdExemptionReason} /></div>
      <ReadField label="Payment T&C"       value={data.paymentTnc} />
      <ReadField label="Payment Schedule"  value={data.paymentSchedule} />
      <ReadField label="PBG%"              value={data.pbgPct} />
      <ReadField label="PBG Validity"      value={data.pbgValidity} />
      <ReadField label="AMC Reqd"          value={data.amcReqd} />
      <ReadField label="Duration of AMC"   value={data.amcDuration} />
      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#DC2626" }}>
          Manpower Details
        </div>
      </div>
      <ReadField label="Manpower Reqd for Support" value={data.manpower1} />
      <ReadField label="Manpower Reqd for Support" value={data.manpower2} />
      <ReadField label="Qualification"             value={data.qualification} />
      <ReadField label="Certification"             value={data.certification} />
      <ReadField label="Quantity"                  value={data.quantity} />
      <ReadField label="Experience"                value={data.experience} />
    </div>

    {/* PQ Criteria */}
    <ReviewSection title="PQ Criteria" />
    <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            {["Particulars", "Bidder", "OEM", "Evidence Required"].map(h => (
              <th key={h} style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#374151", textAlign: "center", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PQ_ROWS.map((row, i) => (
            <tr key={row} style={{ borderBottom: i < PQ_ROWS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
              <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151", borderRight: "1px solid #E5E7EB" }}>{row}</td>
              {["bidder", "oem", "evidence"].map(col => (
                <td key={col} style={{ padding: "8px 12px", fontSize: 13, color: "#374151", borderRight: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                  {data[`pq_${i}_${col}`] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Approval */}
    <ReviewSection title="Approval" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
      <ReadField label="Prepared By"   value={data.preparedBy} />
      <ReadField label="Approved By"   value={data.approvedBy} />
      <ReadField label="Pre-sales Rep" value={data.presalesRep} />
      <ReadField label="Date"          value={data.approvalDate} />
    </div>

    {/* Remarks */}
    <ReviewSection title="Remarks" />
    <textarea
      value={data.remarks ?? ""}
      onChange={e => set("remarks")(e.target.value)}
      placeholder="Enter any additional remarks..."
      rows={4}
      style={{
        width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
        outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
        background: "#fff", resize: "none", padding: "10px 12px",
        boxSizing: "border-box", lineHeight: 1.5,
      }}
    />
  </div>
);

// ── Doc sub-form (ATC / GeM) ──────────────────────────────────────────────────

const DOC_FORM_FIELDS = [
  { label: "Beneficiary Name & Address", fKey: "beneficiary" },
  { label: "Bank Name",                  fKey: "bankName" },
  { label: "IFSC CODE",                  fKey: "ifscCode" },
  { label: "Branch Address",             fKey: "branchAddress" },
  { label: "Amount",                     fKey: "amount" },
  { label: "Validity",                   fKey: "validity" },
  { label: "BG Format",                  fKey: "bgFormat" },
  { label: "EMD Format",                 fKey: "emdFormat" },
  { label: "Additional Agreements",      fKey: "additionalAgreements", multiline: true },
];

const PgField = ({ label, fKey, data, set, multiline = false }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
      <label style={{ fontSize: 13, color: "#374151", fontFamily: FONT }}>{label}</label>
      <span style={{ fontSize: 12, color: "#374151", fontFamily: FONT, display: "flex", alignItems: "center", gap: 4 }}>
        Pg No. -&nbsp;
        <input
          type="text"
          value={data[`${fKey}_pg`] ?? ""}
          onChange={e => set(`${fKey}_pg`)(e.target.value)}
          style={{
            width: 36, borderTop: "none", borderLeft: "none", borderRight: "none",
            borderBottom: "1px solid #D1D5DB", outline: "none",
            fontSize: 12, color: "#374151", fontFamily: FONT, textAlign: "center",
            background: "transparent", padding: "0 2px",
          }}
        />
      </span>
    </div>
    {multiline ? (
      <textarea
        value={data[fKey] ?? ""}
        onChange={e => set(fKey)(e.target.value)}
        rows={4}
        style={{
          width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
          outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
          background: "#fff", resize: "none", padding: "10px 12px",
          boxSizing: "border-box", lineHeight: 1.5,
        }}
      />
    ) : (
      <input
        type="text"
        value={data[fKey] ?? ""}
        onChange={e => set(fKey)(e.target.value)}
        style={{
          width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
          outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
          background: "#fff", padding: "10px 12px", boxSizing: "border-box",
        }}
      />
    )}
  </div>
);

const DocSubForm = ({ docType, data, set, filename }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 28px" }}>
      {docType === "atc" ? "ATC" : "GeM"} Doc. -&nbsp;
      <span style={{ fontWeight: 400, borderBottom: "1.5px solid #374151", paddingBottom: 1 }}>
        {filename || "          "}
      </span>
    </h2>
    {DOC_FORM_FIELDS.map(f => (
      <PgField
        key={f.fKey}
        label={f.label}
        fKey={`${docType}_${f.fKey}`}
        data={data}
        set={set}
        multiline={f.multiline}
      />
    ))}
  </div>
);

const BLUE_LINK = {
  background: "none", border: "none", borderBottom: "1.5px solid #2563EB",
  padding: "0 0 2px", cursor: "pointer", fontFamily: FONT,
  fontSize: 14, color: "#2563EB", minWidth: 140, display: "inline-block", textAlign: "left",
};

const DocumentsPage = ({ data, set, uploadedFiles, handleFileChange, setDocView }) => (
  <div>
    <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", margin: "0 0 28px" }}>Documents</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: "#374151", minWidth: 220 }}>Tender Documents (RFP) -</span>
        <label style={{ cursor: "pointer" }}>
          <span style={{ ...BLUE_LINK, display: "inline-block" }}>
            {uploadedFiles["Tender(RFP) Documents"] || " "}
          </span>
          <input type="file" style={{ display: "none" }} onChange={e => handleFileChange("Tender(RFP) Documents", e)} />
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: "#374151", minWidth: 220 }}>ATC -</span>
        <button onClick={() => setDocView("atc")} style={BLUE_LINK}>
          {uploadedFiles["ATC Documents"] || " "}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: "#374151", minWidth: 220 }}>GeM -</span>
        <button onClick={() => setDocView("gem")} style={BLUE_LINK}>
          {uploadedFiles["GeM Documents"] || " "}
        </button>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontFamily: FONT }}>Remarks</label>
        <textarea
          value={data.docRemarks ?? ""}
          onChange={e => set("docRemarks")(e.target.value)}
          rows={5}
          style={{
            width: "100%", border: "1px solid #D1D5DB", borderRadius: 6,
            outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
            background: "#fff", resize: "none", padding: "10px 12px",
            boxSizing: "border-box", lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────────

const RFPAnalysisForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showUpload, setShowUpload] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [docView, setDocView] = useState(null); // null | "atc" | "gem"
  const [formData, setFormData] = useState({
    // Step 1
    salesRep: "", funnelRef: "", department: "", existingCustomer: "", address: "",
    // Step 2
    category: "", customerName: "", mailId: "", mobileNumber: "",
    // Step 3
    tenderTitle: "", rfpNo: "", tenderId: "", noOfBids: "", firmNames: "",
    reverseAuction: "", estimatedBidValue: "", rfpIssueDate: "", submissionPortal: "",
    tenderType: "", bidValidity: "", querySubmissionDate: "", modeQuery: "",
    preBidTime: "", bidSubmissionDate: "", bidOpeningDate: "", modeTender: "",
    priceValidity: "", tenderFeeAmount: "", tenderFeeMode: "", emdRequired: "",
    emdAmount: "", emdDate: "", emdExemptionReason: "", paymentTnc: "",
    paymentSchedule: "", pbgPct: "", pbgValidity: "", amcReqd: "", amcDuration: "",
    manpower1: "", manpower2: "", qualification: "", certification: "", quantity: "", experience: "",
    // Step 4: PQ table cells stored dynamically as pq_{rowIndex}_{col}
    // Step 5
    preparedBy: "", approvedBy: "", presalesRep: "", approvalDate: "",
  });

  const set = key => val => setFormData(f => ({ ...f, [key]: val }));


  const handleFileChange = (item, e) => {
    const file = e.target.files[0];
    if (file) setUploadedFiles(prev => ({ ...prev, [item]: file.name }));
  };

  const handleSubmitUpload = () => {
    setShowUpload(false);
    setTimeout(() => setShowValidation(true), 80);
  };

  const displayTenderId = formData.tenderId || "TND-";

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 data={formData} set={set} />;
      case 2: return <Step2 data={formData} set={set} />;
      case 3: return <Step3 data={formData} set={set} />;
      case 4: return <Step4 data={formData} set={set} />;
      case 5: return <Step5 data={formData} set={set} />;
      case 6: return <Step6 data={formData} set={set} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <GlobalHeader />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          {/* Page header */}
          <div style={{ padding: "20px 32px 0", background: "#F7F8FA", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 5px" }}>
                  RFP Analysis Form
                </h1>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>
                  Documents:&nbsp;
                  <button
                    onClick={() => setDocView("docs")}
                    style={{
                      background: "none", border: "none", borderBottom: "1.5px solid #2563EB",
                      padding: "6px 0", cursor: "pointer", fontFamily: FONT,
                      fontSize: 14, color: "#2563EB", minWidth: 140, display: "inline-block",
                      textAlign: "left", lineHeight: "1",
                    }}
                  >{"\u00A0"}</button>
                  &nbsp;&nbsp;Tender ID:&nbsp;<strong style={{ color: "#111" }}>{displayTenderId}</strong>
                </p>
              </div>
              <button
                onClick={() => navigate("/tender-checklist")}
                style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", border: "1px solid #FECDD3", borderRadius: 8,
                background: "#FFF1F2", fontSize: 13, fontWeight: 500, color: "#E11D48",
                cursor: "pointer", fontFamily: FONT, flexShrink: 0,
              }}>
                <Eye size={15} color="#E11D48" />
                View Pre-sales Checklist
              </button>
            </div>

            {/* Step indicator */}
            {!docView && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0 16px" }}>
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
            </div>}
          </div>

          {/* Scrollable form body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 100px" }}>
            <div style={{
              background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
              padding: "28px 32px", width: "100%", boxSizing: "border-box",
            }}>
              {docView === "docs"
                ? <DocumentsPage
                    data={formData}
                    set={set}
                    uploadedFiles={uploadedFiles}
                    handleFileChange={handleFileChange}
                    setDocView={setDocView}
                  />
                : (docView === "atc" || docView === "gem")
                  ? <DocSubForm
                      docType={docView}
                      data={formData}
                      set={set}
                      filename={uploadedFiles[docView === "atc" ? "ATC Documents" : "GeM Documents"]}
                    />
                  : renderStep()
              }
            </div>
          </div>

          {/* Footer */}
          <div style={{
            position: "fixed", bottom: 0, left: 230, right: 0,
            background: "#fff", borderTop: "1px solid #E5E7EB",
            padding: "14px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 100,
          }}>
            <button
              onClick={() => {
                if (docView === "atc" || docView === "gem") setDocView("docs");
                else if (docView === "docs") setDocView(null);
                else if (step > 1) setStep(s => s - 1);
                else navigate("/rfp-dashboard");
              }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 20px", border: "1px solid #E2E8F0", borderRadius: 8,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: FONT,
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {!docView && <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 20px", border: "1px solid #E2E8F0", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
              cursor: "pointer", fontFamily: FONT,
            }}>
              <Save size={15} /> Save Draft
            </button>}

            {docView === "docs" ? (
              <button
                onClick={() => setDocView(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 24px", border: "none", borderRadius: 8,
                  background: "#2563EB", color: "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                }}
              >
                Done <Check size={15} strokeWidth={3} />
              </button>
            ) : (docView === "atc" || docView === "gem") ? (
              <button
                onClick={() => setDocView("docs")}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 24px", border: "none", borderRadius: 8,
                  background: "#2563EB", color: "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : step === 6 ? (
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 20px", border: "1px solid #E2E8F0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  <Download size={15} /> Download
                </button>
                <button
                  onClick={() => navigate("/rfp-dashboard", { state: { tab: "Task Dashboard S" } })}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "9px 24px", border: "none", borderRadius: 8,
                    background: "#16A34A", color: "#fff",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                  }}
                >
                  <Check size={15} strokeWidth={3} /> Submit Form
                </button>
              </div>
            ) : (
              <button
                onClick={() => step < STEPS.length && setStep(s => s + 1)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 24px", border: "none", borderRadius: 8,
                  background: "#2563EB", color: "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Upload Tender Documents modal ── */}
      {showUpload && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.18)",
        }}>
          <div style={{
            background: "#fff", borderRadius: 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
            padding: "36px 40px 32px", width: 420, maxWidth: "90vw",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#2563EB", textAlign: "center", margin: "0 0 8px" }}>
              Upload Tender Documents
            </h3>
            <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", margin: "0 0 26px" }}>
              Please upload the required files to Continue.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
              {UPLOAD_ITEMS.map(item => (
                <label key={item} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 14, color: uploadedFiles[item] ? "#16A34A" : "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  <Upload size={16} color={uploadedFiles[item] ? "#16A34A" : "#374151"} />
                  <span style={{ flex: 1 }}>{uploadedFiles[item] ?? item}</span>
                  <input type="file" style={{ display: "none" }} onChange={e => handleFileChange(item, e)} />
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmitUpload}
              style={{
                width: "100%", padding: "12px 0",
                background: "#2563EB", color: "#fff",
                border: "none", borderRadius: 8,
                fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* ── Form Validation modal ── */}
      {showValidation && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 400,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.18)",
        }}>
          <div style={{
            background: "#fff", borderRadius: 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
            padding: "36px 40px 32px", width: 420, maxWidth: "90vw",
          }}>
            <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 6px", fontWeight: 500 }}>
              Form Validation Required
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#2563EB", margin: "0 0 16px" }}>
              Complete All Required Fields
            </h3>
            <p style={{ fontSize: 14, color: "#374151", margin: "0 0 28px", lineHeight: 1.7 }}>
              Please fill all fields before submitting the form.
              If any field is not applicable to this bid, enter "NA".
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setShowValidation(false)}
                style={{
                  padding: "10px 48px", background: "#2563EB", color: "#fff",
                  border: "none", borderRadius: 8,
                  fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFPAnalysisForm;
