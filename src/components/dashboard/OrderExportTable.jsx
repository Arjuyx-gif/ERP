import { Download, Edit2, X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

export const COLUMNS = [
  ["PID No.", "pid"], ["Order No.", "orderNo"], ["Tender ID", "tenderId"], ["Tender Title", "tenderTitle"],
  ["Name of Customer", "customer"], ["Sales Person", "salesPerson"], ["Reporting Manager", "reportingManager"],
  ["LOB", "lob"], ["Type of Order", "typeOfOrder"], ["Supply Order No.", "supplyOrderNo"], ["Bid No.", "bidNo"], ["Company Name", "companyName"],
  ["Order Date", "orderDate"], ["EDD", "edd"], ["Execution Date", "executionDate"], ["SOF Date", "sofDate"], ["Due Date", "dueDate"],
  ["PBG", "pbg"], ["PBG Amount", "pbgAmount"], ["PBG Request Date", "pbgRequestDate"], ["PBG Submission Date", "pbgSubmissionDate"],
  ["Bank", "bank"], ["BG/DD Number", "bgddNo"], ["Prepared On", "preparedOn"], ["Expiry Date", "expiryDate"],
  ["Production Category", "productCategory"], ["Make", "make"], ["Item Description", "itemDescription"], ["Quantity", "qty"],
  ["Unit Price", "unitPrice"], ["GST%", "gstPct"], ["Tax Value", "taxValue"], ["Total Amount", "totalAmount"],
  ["Status", "status"], ["Remarks", "remarks"], ["Invoice", "invoice"], ["Invoice Date", "invoiceDate"], ["Challan No", "challanNo"], ["Challan Date", "challanDate"],
  ["GEM Charges", "gemCharges"], ["GEM Charges Paid", "gemChargesPaid"], ["Delivery Type", "deliveryType"],
  ["Billing Address", "billingAddress"], ["Delivery Address", "deliveryAddress"], ["Customer Payment Status", "customerPaymentStatus"],
  ["Vendor Name", "vendorName"], ["PO No.", "poNo"], ["PO Date", "poDate"], ["Buyer", "buyer"],
  ["Vendor Pricing", "vendorPricing"], ["Vendor GST%", "vendorGstPct"], ["Vendor Remarks", "vendorRemarks"],
  ["Material Received", "materialReceived"], ["Inspection", "inspection"], ["Qty Received", "qtyReceived"], ["Balance Qty", "balanceQty"],
  ["Payment Status", "paymentStatus"], ["Invoice Details", "invoiceDetails"], ["Payment Terms", "paymentTerms"],
  ["Payment Due Date", "paymentDueDate"], ["Cheque Details", "chequeDetails"],
  ["Margin", "margin"], ["Margin %", "marginPct"], ["Remarks", "profitRemarks"],
];

// Fills in the same placeholder-style values used elsewhere (OrderDetailsPanel) for
// any field a source row (e.g. an ORDER_TRACKER_ROWS entry) doesn't carry.
export const buildExportRow = (o = {}) => ({
  pid: o.pid || "PID-2026-002", orderNo: o.orderNo || "ORD-2026-002", tenderId: o.tenderId || "TND-2026-002", tenderTitle: o.tenderTitle || "Tender Title",
  customer: o.customer || "Name of Customer", salesPerson: o.salesPerson || "Sales Rep Name", reportingManager: "Manager Name",
  lob: "Hardware (or Software / Services)", typeOfOrder: "Tender", supplyOrderNo: "SO-2026-002", bidNo: "BID-2026-Q1-045", companyName: o.firm || "Name",
  orderDate: "15 Feb 2026", edd: "20 Apr 2026", executionDate: "20 Feb 2026", sofDate: "18 Feb 2026", dueDate: o.dueDate || "20 Apr 2026",
  pbg: "Yes", pbgAmount: "₹85,000", pbgRequestDate: "10 Feb 2026", pbgSubmissionDate: "14 Feb 2026",
  bank: "HDFC Bank", bgddNo: "BG-2026-002", preparedOn: "12 Feb 2026", expiryDate: "15 Aug 2026",
  productCategory: "Product Name", make: "Description", itemDescription: "Complete description", qty: "NO",
  unitPrice: "₹18,888", gstPct: "18%", taxValue: "Amount", totalAmount: "Amount",
  status: o.status || "Delayed", remarks: "Remarks", invoice: "INVOICE NUMBER", invoiceDate: "Date", challanNo: "CHALLAN NUMBER", challanDate: "Date",
  gemCharges: "Amount", gemChargesPaid: "Amount", deliveryType: "SINGLE",
  billingAddress: "BILLING ADDRESS", deliveryAddress: "DELIVERY ADDRESS", customerPaymentStatus: "STATUS",
  vendorName: "VENDOR NAME", poNo: "PO-NUMBER", poDate: "16 Feb 2026", buyer: "BUYER NAME",
  vendorPricing: "₹16,500", vendorGstPct: "18%", vendorRemarks: "DELAY REASON",
  materialReceived: "No", inspection: "Pending", qtyReceived: "0", balanceQty: "45",
  paymentStatus: "Pending", invoiceDetails: "Pending", paymentTerms: "30% Advance, 70% on Installation",
  paymentDueDate: "15 May 2026", chequeDetails: "NEFT-789456 dated 2026-02-17",
  margin: "₹1,07,000", marginPct: "12.6%", profitRemarks: "REMARKS",
  ...o,
});

const OrderExportTable = ({ open, rows, onClose, onEdit }) => {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 950, background: "#F7F8FA",
      display: "flex", flexDirection: "column", fontFamily: FONT,
    }}>
      <div style={{
        padding: "16px 28px", background: "#fff", borderBottom: "1px solid #E2E8F0",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0 }}>Order Export</h2>
          <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>All order fields in one row</p>
        </div>
        <button onClick={onClose} style={{
          background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8,
          padding: 8, cursor: "pointer", display: "flex",
        }}>
          <X size={16} color="#555" />
        </button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "20px 28px 8px" }}>
        <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
          <table style={{ borderCollapse: "collapse", minWidth: COLUMNS.length * 130 }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
                {COLUMNS.map(([label, key]) => (
                  <th key={key + label} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#667085", textAlign: "center", whiteSpace: "nowrap" }}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
                  {COLUMNS.map(([label, key]) => (
                    <td key={key + label} style={{ padding: "12px 14px", fontSize: 12, color: "#344054", textAlign: "center", whiteSpace: "nowrap" }}>{row[key] ?? "-"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ padding: "12px 28px 20px", display: "flex", justifyContent: "flex-end", gap: 16, flexShrink: 0 }}>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#2563EB", cursor: "pointer", fontFamily: FONT }}>
          <Download size={14} /> Download
        </button>
        {onEdit && rows.length === 1 && (
          <button onClick={() => onEdit(rows[0])} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
            <Edit2 size={13} /> Edit
          </button>
        )}
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#6B7280", cursor: "pointer", fontFamily: FONT }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderExportTable;
