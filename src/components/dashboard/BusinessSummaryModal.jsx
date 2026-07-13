import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const BusinessSummaryModal = ({ onClose }) => {
  const MONTHLY_TREND = [
    { month: "April", ach: 18, tgt: 20, pct: 90 },
    { month: "May", ach: 22, tgt: 25, pct: 88 },
    { month: "June", ach: 16, tgt: 20, pct: 80 },
    { month: "July (MTD)", ach: 6, tgt: 15, pct: 40 },
  ];

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
        }}
      />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 520, background: "#fff", borderRadius: 12, zIndex: 1001,
        fontFamily: FONT, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid #E2E8F0"
        }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Business Summary Report</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, display: "flex"
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 20 }}>
          {/* Top Cards */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, background: "#EFF6FF", padding: 16, borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#475569", marginBottom: 4 }}>Total Business</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1D4ED8" }}>₹26.5 Cr.</div>
            </div>
            <div style={{ flex: 1, background: "#F0FDF4", padding: 16, borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#475569", marginBottom: 4 }}>Won Business</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#15803D" }}>₹4.7 Cr.</div>
            </div>
            <div style={{ flex: 1, background: "#FAF5FF", padding: 16, borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#475569", marginBottom: 4 }}>Pipeline Value</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#7E22CE" }}>₹17.3 Cr.</div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, color: "#374151" }}>Monthly Trend</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MONTHLY_TREND.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 80, fontSize: 13, color: "#475569" }}>{item.month}</div>
                  
                  <div style={{ flex: 1, position: "relative", height: 6, background: "#F1F5F9", borderRadius: 3, margin: "0 16px", overflow: "hidden" }}>
                    <div style={{ 
                      position: "absolute", top: 0, left: 0, bottom: 0, width: `${item.pct}%`, 
                      background: "#2563EB", borderRadius: 3 
                    }} />
                  </div>

                  <div style={{ width: 100, fontSize: 12, color: "#64748B", textAlign: "right" }}>
                    ₹{item.ach}Cr / ₹{item.tgt}Cr
                  </div>
                  <div style={{ width: 40, fontSize: 13, fontWeight: 600, color: "#EF4444", textAlign: "right" }}>
                    {item.pct}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSummaryModal;
