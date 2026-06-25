import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronLeft, Save, Download, Check } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import { FONT, COLORS } from "../../styles/theme";

import ciplLogo from "../../assets/cipl-logo.png";
import cmmiLogo from "../../assets/cmmi-logo.png";
import gptwLogo from "../../assets/gptw-logo.png";

const InputField = ({ label, value, onChange, placeholder, isTextArea }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6 }}>{label}</label>
    {isTextArea ? (
      <textarea 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 4, fontSize: 13, fontFamily: FONT, outline: "none", minHeight: 60, resize: "vertical" }}
      />
    ) : (
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 4, fontSize: 13, fontFamily: FONT, outline: "none" }}
      />
    )}
  </div>
);

const PurchaseOrderForm = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc", fontFamily: FONT }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <GlobalHeader />
        
        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 32px" }} className="thin-scrollbar">
          <div style={{ maxWidth: 1000, margin: "0 auto", background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: 32 }}>
            
            {/* Header Section */}
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Purchase Order Form</h1>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 24 }}>Order ID: <strong>ORD-2026-0412</strong></div>
              
              <div style={{ paddingBottom: 24, borderBottom: `1px solid ${COLORS.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  {/* Left Logo */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={ciplLogo} alt="CIPL Logo" style={{ width: 160, objectFit: "contain" }} />
                  </div>

                  {/* Center Content */}
                  <div style={{ textAlign: "center", flex: 1, padding: "0 24px" }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#000", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.5 }}>Corporate Infotech Private Limited</h2>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary, lineHeight: 1.4 }}>
                      Head Office: Plot No. 36, Sector-138, Noida Uttar Pradesh-201305<br/>
                      Registered Office: A-16, Jangpura Extension, New Delhi-110014<br/>
                      CIN: U72900DL2007PTC162708 || Email: info@cipl.org.in || website: www.cipl.org.in || Toll Free: 1800 11 6474
                    </div>
                  </div>

                  {/* Right Logo */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <img src={gptwLogo} alt="Great Place To Work Logo" style={{ width: 90, objectFit: "contain" }} />
                  </div>
                </div>
                
                {/* Second Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <img src={cmmiLogo} alt="CMMI Appraised Logo" style={{ height: 50, objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.text }}>
                    Purchase Dept E-mail: purchase@cipl.com
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 24px" }}>Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                <div>
                  <InputField label="Vendor" />
                  <InputField label="Address" isTextArea />
                  <InputField label="Person Name" />
                  <InputField label="Person Number" />
                  <InputField label="Mail ID" />
                </div>
                <div>
                  <InputField label="PO No." />
                  <InputField label="PO Date" />
                  <InputField label="PID No." />
                  <InputField label="EC Detail" />
                  <InputField label="ECPO No" />
                  <InputField label="ECPO Date" />
                </div>
              </div>
            </div>

            {/* Requirement Details Section */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: 0 }}>Requirement Details</h3>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.primary, color: "#fff", border: "none", padding: "6px 16px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  <Plus size={14} /> Add Row & Column
                </button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    <th style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, textAlign: "center", width: 60 }}>S. No</th>
                    <th style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, textAlign: "left" }}>Part</th>
                    <th style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, textAlign: "left" }}>Descriptions</th>
                    <th style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, textAlign: "right" }}>Quantity</th>
                    <th style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, textAlign: "right" }}>Unit Price</th>
                    <th style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, fontSize: 11, fontWeight: 600, color: COLORS.textSecondary, textAlign: "right" }}>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: 12, border: `1px solid ${COLORS.borderLight}`, textAlign: "center", fontSize: 13, color: COLORS.text }}>1</td>
                    <td style={{ padding: 12, border: `1px solid ${COLORS.borderLight}` }}><input type="text" style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontFamily: FONT }} /></td>
                    <td style={{ padding: 12, border: `1px solid ${COLORS.borderLight}` }}><input type="text" style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontFamily: FONT }} /></td>
                    <td style={{ padding: 12, border: `1px solid ${COLORS.borderLight}` }}><input type="text" style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontFamily: FONT, textAlign: "right" }} /></td>
                    <td style={{ padding: 12, border: `1px solid ${COLORS.borderLight}` }}><input type="text" style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontFamily: FONT, textAlign: "right" }} /></td>
                    <td style={{ padding: 12, border: `1px solid ${COLORS.borderLight}` }}><input type="text" style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontFamily: FONT, textAlign: "right" }} /></td>
                  </tr>
                </tbody>
              </table>
              <div style={{ border: `1px solid #EAB308`, background: "#FEF9C3", padding: 12, fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 24, minHeight: 60 }}>
                Additional Remarks :
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: 300 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Total</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>0.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: `1px solid ${COLORS.borderLight}` }}>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Taxes - GST 18%</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>0.00</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#F8FAFC", fontWeight: 700 }}>
                    <span style={{ fontSize: 12, color: COLORS.text }}>Grand Total</span>
                    <span style={{ fontSize: 13, color: COLORS.text }}>0.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 24px", textAlign: "center" }}>Terms & Conditions</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px", marginBottom: 24 }}>
                <div>
                  <InputField label="Payment Terms" value="70 Days from date of yearly Invoice&#10;Billing Year on Year Basis" isTextArea />
                  <InputField label="Bill To Details" value="Corporate Infotech Pvt. Ltd - Plot No. 36, Sector-138, Noida, Uttar Pradesh-201305" isTextArea />
                  <InputField label="CIPL'S PAN NO." value="AADCC0540R" />
                </div>
                <div>
                  <InputField label="Taxes" value="18% INC. ABOVE" />
                  <InputField label="CIPL'S GST NO." value="09AADCC0540R1ZF" />
                  <InputField label="CIPL'S TAN" value="DELC39648A" />
                  <InputField label="Ship To Details" value="Corporate Infotech Pvt. Ltd - Plot No. 36, Sector-138, Noida, Uttar Pradesh-201305" />
                </div>
              </div>

              <div style={{ background: "#FEF2F2", color: "#DC2626", padding: 16, borderRadius: 4, fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
                *Special instructions :- CIPL's PO no. & PID No to be mentioned in the invoice. Billing only after confirmation from CIPL.
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 16px", textTransform: "uppercase" }}>STANDARD TERMS AND CONDITIONS OF PURCHASE ORDER</h4>
              <div style={{ border: `1px solid ${COLORS.borderLight}`, padding: 16, borderRadius: 4, background: "#F8FAFC", fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
                1. The Vendor shall supply the materials as per the specifications mentioned in this Purchase Order. Any deviation from the specifications shall be subject to prior written approval from the Purchaser.<br/>
                2. The delivery of materials shall be made at the address specified in the Ship To Details section. The Vendor shall be responsible for safe delivery and shall bear the cost of freight, insurance, and other charges unless otherwise specified.<br/>
                3. The materials shall be delivered within the time frame specified in this Purchase Order. Any delay in delivery shall attract liquidated damages as per the terms agreed upon.<br/>
                4. The Vendor shall ensure that all materials are properly packed, labeled, and accompanied by necessary documentation including invoice, packing list, test certificates, and warranty documents.<br/>
                5. Payment shall be made as per the Payment Terms specified in this Purchase Order. All invoices must be submitted with proper tax details and supporting documents.<br/>
                6. The Vendor shall be responsible for the quality of materials supplied. Any defective or non-conforming materials shall be replaced by the Vendor at no additional cost to the Purchaser.<br/>
                7. The warranty period for the materials shall commence from the date of receipt and acceptance by the Purchaser. All warranty claims shall be honored by the Vendor within a reasonable time frame.<br/>
                8. The Vendor shall comply with all applicable laws, regulations, and standards in the manufacture, supply, and delivery of the materials.<br/>
                9. The Vendor shall maintain confidentiality of all information shared by the Purchaser and shall not disclose such information to any third party without prior written consent.<br/>
                10. The Vendor shall indemnify and hold harmless the Purchaser from any claims, damages, or liabilities arising out of the supply of materials or breach of any terms of this Purchase Order.<br/>
                11. The Purchaser reserves the right to inspect the materials at the Vendor's premises or at the delivery location. The Vendor shall provide all necessary assistance for such inspections.<br/>
                12. Any changes or amendments to this Purchase Order must be made in writing and signed by authorized representatives of both parties.
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${COLORS.border}`, padding: "8px 16px", borderRadius: 4, fontSize: 13, fontWeight: 600, color: COLORS.text, cursor: "pointer" }}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${COLORS.border}`, padding: "8px 16px", borderRadius: 4, fontSize: 13, fontWeight: 600, color: COLORS.text, cursor: "pointer" }}>
                  <Save size={16} /> Save Draft
                </button>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${COLORS.border}`, padding: "8px 16px", borderRadius: 4, fontSize: 13, fontWeight: 600, color: COLORS.text, cursor: "pointer" }}>
                  <Download size={16} /> Download
                </button>
                <button onClick={() => navigate("/purchase-task-inbox", { state: { showTaskBox: true } })} style={{ display: "flex", alignItems: "center", gap: 6, background: "#10B981", border: "none", padding: "8px 24px", borderRadius: 4, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                  <Check size={16} /> Submit Form
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
