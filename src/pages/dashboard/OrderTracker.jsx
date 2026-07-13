import { useState } from "react";
import { Search, Filter, ChevronDown, Download } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";
import DynamicIcon from "../../components/ui/DynamicIcon";
import OrderDetailsPanel from "../../components/dashboard/OrderDetailsPanel";
import { ORDER_TRACKER_KPI_CARDS, ORDER_TRACKER_ROWS } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";
const ROW_BG = { red: "#FEF2F2", green: "#F0FDF4" };

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onMouseLeave={() => setIsOpen(false)}>
      <button
        onClick={() => setIsOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
          background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
          cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
        }}
      >
        {value || label} <ChevronDown size={14} color="#6B7280" />
      </button>
      {isOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, marginTop: 4,
          background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 20,
          minWidth: 160, overflow: "hidden",
        }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", color: "#374151" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OrdersTable = ({ rows, onSelectOrder }) => (
  <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
    <table style={{ width: "100%", minWidth: 1000, borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", position: "sticky", top: 0, zIndex: 2 }}>
          {["PID Number", "Tender ID (Tender title)", "Customer Name", "Firm Name", "Sales Person", "Order Value", "Status", "Stage", "Due Date"].map(col => (
            <th key={col} style={{ padding: "13px 16px", fontSize: 12, fontWeight: 600, color: "#667085", textAlign: "center", whiteSpace: "nowrap", background: "#F8FAFC" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: ROW_BG[row.highlight] ?? "#fff", borderBottom: i < rows.length - 1 ? "1px solid #F2F4F7" : "none" }}>
            <td style={{ padding: "15px 16px", textAlign: "center" }}>
              <button
                onClick={() => onSelectOrder(row)}
                style={{ background: "none", border: "none", padding: 0, fontSize: 13, color: "#2563EB", fontWeight: 600, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap" }}
              >
                {row.pid}
              </button>
            </td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>
              <div>{row.tenderId}</div>
              <div style={{ color: "#9CA3AF" }}>{row.tenderTitle}</div>
            </td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.customer}</td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.firm}</td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.salesPerson}</td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", whiteSpace: "nowrap", textAlign: "center" }}>{row.value}</td>
            <td style={{ padding: "15px 16px", fontSize: 13, fontWeight: 600, color: row.statusColor, textAlign: "center" }}>{row.status}</td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.stage}</td>
            <td style={{ padding: "15px 16px", fontSize: 13, color: "#344054", textAlign: "center" }}>{row.dueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderTracker = () => {
  const [firmFilter, setFirmFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F7F8FA" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Header */}
          <div style={{ padding: "20px 28px 0" }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>Order Tracker</h1>
            <p style={{ fontSize: 12, color: "#888", margin: "0 0 16px" }}>Last updated: 2 hours ago</p>

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
              <FilterDropdown label="Firm" options={["Firm Name"]} value={firmFilter} onChange={setFirmFilter} />
              <FilterDropdown label="Delivery Type" options={["Standard", "Express"]} value={deliveryFilter} onChange={setDeliveryFilter} />
              <FilterDropdown label="Payment Status" options={["Paid", "Pending", "Overdue"]} value={paymentFilter} onChange={setPaymentFilter} />
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ margin: "0 28px 20px", padding: 20, background: "#F1F5F9", borderRadius: 12 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {ORDER_TRACKER_KPI_CARDS.map(kpi => (
                <div key={kpi.label} style={{
                  flex: "1 1 160px", background: "#fff", borderRadius: 12,
                  padding: "20px 18px", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", background: kpi.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <DynamicIcon name={kpi.iconName} size={20} color={kpi.color} />
                  </div>
                  <span style={{ fontSize: 13, color: "#667085" }}>{kpi.label}</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{kpi.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders table */}
          <div style={{ margin: "0 28px 28px", background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>Orders ({ORDER_TRACKER_ROWS.length})</h2>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", border: "1px solid #E2E8F0", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                <Download size={14} /> Download All
              </button>
            </div>
            <OrdersTable rows={ORDER_TRACKER_ROWS} onSelectOrder={setSelectedOrder} />
          </div>
        </div>
      </div>

      <OrderDetailsPanel
        open={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrderTracker;
