import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Plus } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 6,
  fontSize: 13, color: "#374151", fontFamily: FONT, outline: "none",
  boxSizing: "border-box", background: "#fff",
};

const DEPT_ROWS = [
  { key: "purchase", label: "Purchase", badge: 1 },
  { key: "accounts", label: "Accounts", badge: 1 },
];

const SOFConfirmPage = () => {
  const navigate = useNavigate();
  const [depts, setDepts] = useState(DEPT_ROWS);
  const [remarks, setRemarks] = useState({});

  const addDept = () => {
    const label = prompt("Department name:");
    if (label) setDepts(d => [...d, { key: label.toLowerCase(), label, badge: 0 }]);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F9FAFB" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 32px" }}>

            {/* Card */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>

              {/* Card header */}
              <div style={{ padding: "18px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Sales Order Form</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF" }}>PID No. – <span style={{ borderBottom: "1px solid #9CA3AF", paddingBottom: 1 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
                </div>
                <button style={{
                  background: "#2563EB", color: "#fff", border: "none", borderRadius: 6,
                  padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                }}>
                  SOF Validation
                </button>
              </div>

              {/* Customer / Firm */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Customer Name</label>
                  <input type="text" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Firm Name</label>
                  <input type="text" style={inputStyle} />
                </div>
              </div>

              {/* Order Value + Priority */}
              <div style={{ padding: "0 24px 20px", borderBottom: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 16 }}>
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, color: "#2563EB" }}>₹</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#2563EB" }}>Order Value</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1E40AF" }}>₹1,25,000</div>
                </div>
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#16A34A" }}>Priority</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#DC2626" }}>High</div>
                </div>
              </div>

              {/* Products */}
              <div style={{ padding: "16px 24px", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Products</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {["HP All-In-One Desktop (x15)", "HP LaserJet Pro Printer (x3)"].map((p, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                      <span style={{ width: 6, height: 6, background: "#2563EB", borderRadius: "50%", flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Department Notifications Summary */}
              <div style={{ padding: "16px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Department Notifications Summary</div>
                  <button
                    onClick={addDept}
                    style={{
                      display: "flex", alignItems: "center", gap: 5, padding: "6px 12px",
                      border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff",
                      fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >
                    <Plus size={13} />
                    Add
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {depts.map((dept, idx) => (
                    <div key={dept.key} style={{ borderBottom: idx < depts.length - 1 ? "1px solid #F3F4F6" : "none", paddingBottom: idx < depts.length - 1 ? 16 : 0, marginBottom: idx < depts.length - 1 ? 16 : 0 }}>
                      {/* Dept label + badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{dept.label}</span>
                        {dept.badge > 0 && (
                          <span style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>
                            {dept.badge} New
                          </span>
                        )}
                      </div>
                      {/* Remarks */}
                      <label style={{ display: "block", fontSize: 12, color: "#6B7280", marginBottom: 5 }}>Remarks</label>
                      <textarea
                        value={remarks[dept.key] || ""}
                        onChange={e => setRemarks(r => ({ ...r, [dept.key]: e.target.value }))}
                        style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                        placeholder="Add remarks..."
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div style={{
          position: "sticky", bottom: 0, background: "#fff",
          borderTop: "1px solid #E5E7EB", padding: "12px 32px",
          flexShrink: 0, boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: "100%", maxWidth: 800, margin: "0 auto", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 8,
              padding: "12px 0", background: "#16A34A", border: "none",
              borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#fff",
              cursor: "pointer", fontFamily: FONT,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#15803D"}
            onMouseLeave={e => e.currentTarget.style.background = "#16A34A"}
          >
            <CheckCircle size={16} />
            Confirm &amp; Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default SOFConfirmPage;
