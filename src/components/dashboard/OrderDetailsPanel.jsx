import { useState } from "react";
import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const SectionHeading = ({ icon, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#2563EB", margin: "22px 0 10px" }}>
    <span>{icon}</span> {children}
  </div>
);

const InfoCard = ({ rows }) => (
  <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 8, padding: "4px 16px" }}>
    {rows.map(([label, value], i) => (
      <div key={label} style={{
        display: "flex", justifyContent: "space-between", gap: 16,
        padding: "10px 0", borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none",
      }}>
        <span style={{ fontSize: 13, color: "#6B7280", flexShrink: 0 }}>{label}</span>
        <span style={{ fontSize: 13, color: "#111827", fontWeight: 500, textAlign: "right" }}>{value}</span>
      </div>
    ))}
  </div>
);

const OrderDetailsPanel = ({ open, onClose, order }) => {
  const [tab, setTab] = useState("Status");

  if (!open) return null;

  const o = order || {};

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 960,
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        }}
      />

      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 460, maxWidth: "94vw", zIndex: 961,
        background: "#fff", boxShadow: "-8px 0 40px rgba(0,0,0,0.14)",
        display: "flex", flexDirection: "column", fontFamily: FONT,
      }}>

        {/* Header */}
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #EAECF0", flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>{o.pid || "PID No."}</h2>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9CA3AF" }}>
              Order No. {o.orderNo || "ORD-2026-002"} &nbsp;·&nbsp; Tender ID {o.tenderId || "TND-2026-002"}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>{o.tenderTitle || "Tender Title"}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
            <X size={20} />
          </button>
        </div>

        {/* Status / Stage tabs */}
        <div style={{ display: "flex", gap: 8, padding: "12px 24px 0", borderBottom: "1px solid #F3F4F6", flexShrink: 0 }}>
          {["Status", "Stage"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 16px", borderRadius: "6px 6px 0 0", border: "none",
                background: tab === t ? (t === "Status" ? "#FEE2E2" : "#F3F4F6") : "transparent",
                color: tab === t ? (t === "Status" ? "#DC2626" : "#374151") : "#9CA3AF",
                fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
                marginBottom: -1,
              }}
            >
              {t === "Status" ? (o.status || "Delayed") : t}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 24px" }}>

          <SectionHeading icon="🧾">Order Details</SectionHeading>
          <InfoCard rows={[
            ["PID Number", o.pid || "PID-2026-002"],
            ["Order Number", o.orderNo || "ORD-2026-002"],
            ["Tender ID", o.tenderId || "TND-2026-002"],
            ["Tender Title", o.tenderTitle || "TND-2026-002"],
            ["Name of the Customer", o.customer || "Name of Customer"],
            ["Sales Person", o.salesPerson || "Sales Rep Name"],
            ["Reporting Manager", "Manager Name"],
            ["LOB", "Hardware (or Software / Services)"],
            ["Type of Order", "Tender"],
            ["Supply Order No.", "SO-2026-002"],
            ["Bid No.", "BID-2026-Q1-045"],
            ["Company Name", o.firm || "Name"],
          ]} />

          <SectionHeading icon="📅">Key Dates</SectionHeading>
          <InfoCard rows={[
            ["Order Date", "15 Feb 2026"],
            ["EDD", "20 Apr 2026"],
            ["Execution Date", "20 Feb 2026"],
            ["SOF Date", "18 Feb 2026"],
            ["Due Date", o.dueDate || "20 Apr 2026"],
          ]} />

          <SectionHeading icon="💰">Bank Guarantee / Finance</SectionHeading>
          <InfoCard rows={[
            ["PBG", "Yes"],
            ["PBG Amount", "₹85,000"],
            ["Request Date", "10 Feb 2026"],
            ["Submission Date", "14 Feb 2026"],
            ["Bank", "HDFC Bank"],
            ["BG/DD No.", "BG-2026-002"],
            ["Prepared On", "12 Feb 2026"],
            ["Expiry", "15 Aug 2026"],
          ]} />

          <SectionHeading icon="📦">Product & Billing</SectionHeading>
          <InfoCard rows={[
            ["Product Category", "Product Name"],
            ["Make", "Description"],
            ["Item Description", "Complete description"],
            ["Quantity", "NO"],
            ["Unit Pricing", "₹18,888"],
            ["GST %", "18%"],
            ["Tax Value", "Amount"],
            ["Total Amount", "Amount"],
          ]} />

          <SectionHeading icon="🚚">Order Status & Delivery</SectionHeading>
          <InfoCard rows={[
            ["Status", o.status || "Delayed"],
            ["Remarks", "Remarks"],
            ["Invoice", "INVOICE NUMBER"],
            ["Invoice Date", "Date"],
            ["Challan", "CHALLAN NUMBER"],
            ["Challan Date", "Date"],
            ["GeM Charges", "Amount"],
            ["GeM Charges Paid", "Amount"],
            ["Delivery Type", "SINGLE"],
            ["Billing Address", "BILLING ADDRESS"],
            ["Delivery Address", "DELIVERY ADDRESS"],
            ["Customer Payment Status", "STATUS"],
          ]} />

          <SectionHeading icon="🏭">Vendor Details</SectionHeading>
          <InfoCard rows={[
            ["Vendor Name", "VENDOR NAME"],
            ["PO No.", "PO-NUMBER"],
            ["PO Date", "16 Feb 2026"],
            ["Buyer", "BUYER NAME"],
            ["Vendor Pricing", "₹16,500"],
            ["Vendor GST %", "18%"],
            ["Vendor Remarks", "DELAY REASON"],
          ]} />

          <SectionHeading icon="📥">Material & Inventory</SectionHeading>
          <InfoCard rows={[
            ["Material Received", "No"],
            ["Inspection", "Pending"],
            ["Qty Received", "0"],
            ["Balance Qty", "45"],
          ]} />

          <SectionHeading icon="💳">Payment Tracking</SectionHeading>
          <InfoCard rows={[
            ["Payment Status", "Pending"],
            ["Invoice Details", "Pending"],
            ["Payment Terms", "30% Advance, 70% on Installation"],
            ["Payment Due Date", "15 May 2026"],
            ["Cheque Details", "NEFT-789456 dated 2026-02-17"],
          ]} />

          <SectionHeading icon="📈">Profitability</SectionHeading>
          <InfoCard rows={[
            ["Margin", "₹1,07,000"],
            ["Margin %", "12.6%"],
            ["Remarks", "REMARKS"],
          ]} />
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, padding: "14px 24px", borderTop: "1px solid #EAECF0", flexShrink: 0 }}>
          <button style={{
            flex: 1, padding: "11px 0", border: "none", borderRadius: 8,
            background: "#111827", color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: FONT,
          }}>
            Edit Order
          </button>
          <button style={{
            flex: 1, padding: "11px 0", border: "1px solid #E5E7EB", borderRadius: 8,
            background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: FONT,
          }}>
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPanel;
