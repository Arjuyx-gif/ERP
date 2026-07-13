import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter, ChevronDown, ChevronUp, Download, Send } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", border: "1px solid #E5E7EB", borderRadius: 6,
  outline: "none", fontSize: 14, color: "#111", fontFamily: FONT,
  background: "#F3F4F6", padding: "10px 12px", boxSizing: "border-box",
};

const highlightStyle = { ...inputStyle, background: "#F0FDF4", border: "1px solid #86EFAC" };

const Field = ({ label, value, onChange, highlight = false, multiline = false }) => (
  <div>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 6, fontFamily: FONT }}>{label}</label>
    {multiline ? (
      <textarea rows={2} value={value} onChange={e => onChange(e.target.value)} style={{ ...(highlight ? highlightStyle : inputStyle), resize: "none" }} />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)} style={highlight ? highlightStyle : inputStyle} />
    )}
  </div>
);

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: open ? "8px 8px 0 0" : 8,
          fontSize: 14, fontWeight: 700, color: "#111827", cursor: "pointer", fontFamily: FONT,
        }}
      >
        {title}
        {open ? <ChevronUp size={16} color="#6B7280" /> : <ChevronDown size={16} color="#6B7280" />}
      </button>
      {open && (
        <div style={{ border: "1px solid #E5E7EB", borderTop: "none", borderRadius: "0 0 8px 8px", padding: 20 }}>
          {children}
        </div>
      )}
    </div>
  );
};

const Grid = ({ children, cols = 4 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "18px 20px" }}>{children}</div>
);

const OrderEditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || {};

  const [data, setData] = useState({
    pid: order.pid || "", orderNo: order.orderNo || "", tenderId: order.tenderId || "", tenderTitle: order.tenderTitle || "",
    customer: order.customer || "", salesPerson: order.salesPerson || "", reportingManager: "", lob: "",
    typeOfOrder: "", supplyOrderNo: "", bidNo: "", companyName: order.firm || "",
    orderDate: "", edd: "", executionDate: "", sofDate: "", dueDate: order.dueDate || "",
    pbg: "", pbgAmount: "", pbgRequestDate: "", pbgSubmissionDate: "", bank: "", bgddNo: "", preparedOn: "", expiryDate: "",
    productCategory: "", make: "", itemDescription: "", qty: "", unitPrice: "", gstPct: "", taxValue: "", totalAmount: "",
    status: order.status || "", invoice: "", invoiceDate: "", challanNo: "", challanDate: "",
    gemCharges: "", gemChargesPaid: "", deliveryType: "", billingAddress: "", deliveryAddress: "",
    customerPaymentStatus: "", remarks: "",
    vendorName: "", poNo: "", poDate: "", buyer: "", vendorPricing: "", vendorGstPct: "", vendorRemarks: "",
    materialReceived: "", inspection: "", qtyReceived: "", balanceQty: "",
    paymentStatus: "", invoiceDetails: "", paymentTerms: "", paymentDueDate: "", chequeDetails: "",
    margin: "", marginPct: "", profitRemarks: "",
  });

  const set = key => val => setData(d => ({ ...d, [key]: val }));

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Header */}
          <div style={{ padding: "20px 28px 0" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>Order Tracker</h1>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Last updated: 2 hours ago</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 18px", border: "1px solid #E2E8F0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}>
                  <Download size={14} /> Download
                </button>
                <button
                  onClick={() => navigate(-1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "9px 18px", border: "none", borderRadius: 8,
                    background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: FONT,
                  }}
                >
                  <Send size={14} /> Submit
                </button>
              </div>
            </div>

            {/* Search + filters */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
                  <Search size={15} color="#aaa" />
                </span>
                <input
                  type="text" placeholder="Search by Order No / PID / Customer"
                  style={{
                    width: "100%", padding: "9px 14px 9px 36px",
                    border: "1px solid #E2E8F0", borderRadius: 8,
                    fontSize: 13, color: "#333", background: "#fff",
                    outline: "none", fontFamily: FONT, boxSizing: "border-box",
                  }}
                />
              </div>
              <Filter size={16} color="#6B7280" />
              {["Firm", "Delivery Type", "Payment Status"].map(label => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  whiteSpace: "nowrap",
                }}>
                  {label} <ChevronDown size={14} color="#6B7280" />
                </div>
              ))}
            </div>
          </div>

          {/* Form body */}
          <div style={{ margin: "0 28px 28px", background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: 24 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 20px" }}>Order Details</h2>

            <Section title="Details">
              <Grid>
                <Field label="PID Number" value={data.pid} onChange={set("pid")} />
                <Field label="Order Number" value={data.orderNo} onChange={set("orderNo")} />
                <Field label="Tender ID" value={data.tenderId} onChange={set("tenderId")} />
                <Field label="Tender Title" value={data.tenderTitle} onChange={set("tenderTitle")} />
                <Field label="Name of Customer" value={data.customer} onChange={set("customer")} />
                <Field label="Sales Person" value={data.salesPerson} onChange={set("salesPerson")} />
                <Field label="Reporting Manager" value={data.reportingManager} onChange={set("reportingManager")} />
                <Field label="LOB" value={data.lob} onChange={set("lob")} />
                <Field label="Type of Order" value={data.typeOfOrder} onChange={set("typeOfOrder")} />
                <Field label="Supply Order No." value={data.supplyOrderNo} onChange={set("supplyOrderNo")} />
                <Field label="Bid No" value={data.bidNo} onChange={set("bidNo")} />
                <Field label="Company Name" value={data.companyName} onChange={set("companyName")} />
              </Grid>
            </Section>

            <Section title="Key Dates">
              <Grid>
                <Field label="Order Date" value={data.orderDate} onChange={set("orderDate")} />
                <Field label="EDD" value={data.edd} onChange={set("edd")} />
                <Field label="Execution Date" value={data.executionDate} onChange={set("executionDate")} />
                <Field label="SOF Date" value={data.sofDate} onChange={set("sofDate")} />
                <Field label="Due Date" value={data.dueDate} onChange={set("dueDate")} />
              </Grid>
            </Section>

            <Section title="BG / Finance">
              <Grid>
                <Field label="PBG" value={data.pbg} onChange={set("pbg")} />
                <Field label="PBG Amount" value={data.pbgAmount} onChange={set("pbgAmount")} />
                <Field label="PBG Request Date" value={data.pbgRequestDate} onChange={set("pbgRequestDate")} />
                <Field label="PBG Submission Date" value={data.pbgSubmissionDate} onChange={set("pbgSubmissionDate")} />
                <Field label="Bank" value={data.bank} onChange={set("bank")} />
                <Field label="BG/DD Number" value={data.bgddNo} onChange={set("bgddNo")} />
                <Field label="Prepared On" value={data.preparedOn} onChange={set("preparedOn")} />
                <Field label="Expiry Date" value={data.expiryDate} onChange={set("expiryDate")} />
              </Grid>
            </Section>

            <Section title="Product / Billing Details">
              <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC" }}>
                      {["Product Category", "Make", "Item Description", "Qty", "Unit Price (w/o tax)", "GST %", "Tax Value", "Total Amount"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#374151", textAlign: "center", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {["productCategory", "make", "itemDescription", "qty", "unitPrice", "gstPct", "taxValue", "totalAmount"].map((key, i, arr) => (
                        <td key={key} style={{ padding: "6px 8px", borderRight: i < arr.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                          <input
                            type="text" value={data[key]} onChange={e => set(key)(e.target.value)}
                            style={{ width: "100%", border: "none", outline: "none", fontSize: 13, fontFamily: FONT, background: "transparent", color: "#111", padding: "6px 4px" }}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Order Status & Delivery">
              <Grid>
                <Field label="Status" value={data.status} onChange={set("status")} />
                <Field label="Invoice" value={data.invoice} onChange={set("invoice")} />
                <Field label="Invoice Date" value={data.invoiceDate} onChange={set("invoiceDate")} />
                <Field label="Challan No" value={data.challanNo} onChange={set("challanNo")} />
                <Field label="Challan Date" value={data.challanDate} onChange={set("challanDate")} />
                <Field label="GEM Charges" value={data.gemCharges} onChange={set("gemCharges")} />
                <Field label="GEM Charges Paid" value={data.gemChargesPaid} onChange={set("gemChargesPaid")} />
                <Field label="Delivery Type" value={data.deliveryType} onChange={set("deliveryType")} />
              </Grid>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 20px", marginTop: 18 }}>
                <Field label="Billing Address" value={data.billingAddress} onChange={set("billingAddress")} multiline />
                <Field label="Delivery Address" value={data.deliveryAddress} onChange={set("deliveryAddress")} multiline />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 20px", marginTop: 18 }}>
                <Field label="Customer Payment Status" value={data.customerPaymentStatus} onChange={set("customerPaymentStatus")} />
                <Field label="Remarks" value={data.remarks} onChange={set("remarks")} />
              </div>
            </Section>

            <Section title="Vendor">
              <Grid>
                <Field label="Vendor Name" value={data.vendorName} onChange={set("vendorName")} />
                <Field label="PO No." value={data.poNo} onChange={set("poNo")} />
                <Field label="PO Date" value={data.poDate} onChange={set("poDate")} />
                <Field label="Buyer" value={data.buyer} onChange={set("buyer")} />
                <Field label="Vendor Pricing" value={data.vendorPricing} onChange={set("vendorPricing")} />
                <Field label="Vendor GST %" value={data.vendorGstPct} onChange={set("vendorGstPct")} />
                <Field label="Remarks" value={data.vendorRemarks} onChange={set("vendorRemarks")} />
              </Grid>
            </Section>

            <Section title="Material & Inventory">
              <Grid>
                <Field label="Material Received" value={data.materialReceived} onChange={set("materialReceived")} />
                <Field label="Inspection" value={data.inspection} onChange={set("inspection")} />
                <Field label="Qty Received" value={data.qtyReceived} onChange={set("qtyReceived")} />
                <Field label="Balance Qty" value={data.balanceQty} onChange={set("balanceQty")} />
              </Grid>
            </Section>

            <Section title="Payment Tracking">
              <Grid>
                <Field label="Payment Status" value={data.paymentStatus} onChange={set("paymentStatus")} />
                <Field label="Invoice Details" value={data.invoiceDetails} onChange={set("invoiceDetails")} />
                <Field label="Payment Terms" value={data.paymentTerms} onChange={set("paymentTerms")} />
                <Field label="Payment Due Date" value={data.paymentDueDate} onChange={set("paymentDueDate")} />
              </Grid>
              <div style={{ marginTop: 18, maxWidth: "24.5%" }}>
                <Field label="Cheque Details" value={data.chequeDetails} onChange={set("chequeDetails")} />
              </div>
            </Section>

            <Section title="Profitability">
              <Grid cols={3}>
                <Field label="Margin" value={data.margin} onChange={set("margin")} highlight />
                <Field label="Margin %" value={data.marginPct} onChange={set("marginPct")} highlight />
                <Field label="Remarks" value={data.profitRemarks} onChange={set("profitRemarks")} />
              </Grid>
            </Section>

            <button style={{
              width: "100%", marginTop: 8, padding: "12px 0",
              border: "1px solid #E2E8F0", borderRadius: 8,
              background: "#fff", fontSize: 14, fontWeight: 600, color: "#111827",
              cursor: "pointer", fontFamily: FONT,
            }}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEditForm;
