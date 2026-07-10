import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const UpdateBidResultModal = ({ card, onClose }) => {
  const [result, setResult] = useState("Result Awaited");

  if (!card) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>
      <div style={{
        background: "#fff", width: 500, borderRadius: 12,
        display: "flex", flexDirection: "column",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      }}>
        
        {/* ── Header ── */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "#111827" }}>
              Tender ID - {card.id || "TND-"}
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: "#6B7280" }}>
              {card.customer || "Customer Name"}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", padding: 4, color: "#6B7280",
          }}>
            <X size={20} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "20px 24px" }}>
          
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#111827" }}>Firm - Wise Result</h3>
          
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, marginBottom: 20, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#6B7280", width: "40%" }}>Firm</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#6B7280" }}>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ 
                      padding: "4px 10px", background: "#EFF6FF", color: "#2563EB", 
                      borderRadius: 6, fontSize: 13, fontWeight: 600 
                    }}>
                      {card.firm || "CIPL"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ position: "relative", width: "fit-content" }}>
                      <select 
                        value={result} 
                        onChange={(e) => setResult(e.target.value)}
                        style={{
                          appearance: "none",
                          background: result === "Won" ? "#DCFCE7" : "#FEF3C7",
                          color: result === "Won" ? "#16A34A" : "#B45309",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 28px 6px 12px",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          outline: "none"
                        }}
                      >
                        <option value="Result Awaited">Result Awaited</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                        <option value="PO Received">PO Received</option>
                      </select>
                      <ChevronDown size={14} style={{ 
                        position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", 
                        color: result === "Won" ? "#16A34A" : "#B45309", pointerEvents: "none" 
                      }} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {result !== "Won" ? (
            <div>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#111827" }}>Remarks</h3>
              <textarea 
                placeholder="Add your remarks here..."
                style={{
                  width: "100%", height: 100, padding: "12px 16px",
                  border: "1px solid #E5E7EB", borderRadius: 8, background: "#F9FAFB",
                  fontSize: 14, color: "#374151", fontFamily: "inherit",
                  resize: "none", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
          ) : (
            <div style={{
              border: "1px solid #E5E7EB", borderRadius: 8, padding: "16px", background: "#F9FAFB"
            }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#475569" }}>
                Notification will be sent to:
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                <li style={{ fontSize: 14, color: "#6B7280" }}>Sales Person</li>
                <li style={{ fontSize: 14, color: "#6B7280" }}>Sales Coordinator</li>
                <li style={{ fontSize: 14, color: "#6B7280" }}>Accounts Department</li>
              </ul>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid #E5E7EB", display: "flex" }}>
          <button style={{
            flex: 1, background: "#2563EB", color: "#fff", border: "none", borderRadius: 8,
            padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            {result === "Won" ? "Submit" : "Update Result"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateBidResultModal;
