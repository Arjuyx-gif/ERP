import React from "react";
import { X } from "lucide-react";

const BidResultIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#EBF4FF" />
    <path d="M4 4V20H20" stroke="#93C5FD" strokeWidth="0.5" />
    <path d="M8 4V20" stroke="#93C5FD" strokeWidth="0.5" />
    <path d="M12 4V20" stroke="#93C5FD" strokeWidth="0.5" />
    <path d="M16 4V20" stroke="#93C5FD" strokeWidth="0.5" />
    <path d="M4 8H20" stroke="#93C5FD" strokeWidth="0.5" />
    <path d="M4 12H20" stroke="#93C5FD" strokeWidth="0.5" />
    <path d="M4 16H20" stroke="#93C5FD" strokeWidth="0.5" />
    <rect x="5" y="10" width="4" height="10" fill="#16A34A" />
    <rect x="10" y="13" width="4" height="7" fill="#DC2626" />
    <rect x="15" y="6" width="4" height="14" fill="#2563EB" />
  </svg>
);

const PostBidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="url(#docGradient)" />
    <path d="M14 2V8H20" fill="#D1D5DB" />
    <rect x="7" y="10" width="10" height="1" fill="#9CA3AF" />
    <rect x="7" y="13" width="10" height="1" fill="#9CA3AF" />
    <rect x="7" y="16" width="7" height="1" fill="#9CA3AF" />
    <defs>
      <linearGradient id="docGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3F4F6" />
        <stop offset="1" stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
  </svg>
);

const UpdateTenderModal = ({ card, onClose, onContinueResult, onContinueQuery }) => {
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
            <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 600, color: "#111827" }}>Update Tender</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#6B7280" }}>
              Tender ID: <span style={{ color: "#2563EB" }}>{card.id}</span>
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
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "#111827" }}>Select Action</h3>

          {/* Action 1: Update Bid Result */}
          <div style={{
            border: "1px solid #E5E7EB", borderRadius: 8, padding: 16, marginBottom: 16,
            display: "flex", alignItems: "flex-start", gap: 16,
          }}>
            <div style={{ background: "#F3F4F6", padding: 8, borderRadius: 8 }}>
              <BidResultIcon />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#111827" }}>Update Bid Result</h4>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6B7280", lineHeight: 1.4 }}>
                Update bid outcome such as L1, Won, Lost, PO Received, L2 Match, or Bid Cancelled.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => onContinueResult && onContinueResult(card)} style={{
                  background: "#2563EB", color: "#fff", border: "none", borderRadius: 6,
                  padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Action 2: Update Post-Bid Query */}
          <div style={{
            border: "1px solid #E5E7EB", borderRadius: 8, padding: 16,
            display: "flex", alignItems: "flex-start", gap: 16,
          }}>
            <div style={{ background: "#F3F4F6", padding: 8, borderRadius: 8 }}>
              <PostBidIcon />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#111827" }}>
                Update Post-Bid Query{card.isAwaitingResponse ? " Round 2" : ""}
              </h4>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6B7280", lineHeight: 1.4 }}>
                Upload customer clarification documents, manage multiple query rounds, upload response files, and notify stakeholders.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => onContinueQuery && onContinueQuery(card)} style={{
                  background: "#2563EB", color: "#fff", border: "none", borderRadius: 6,
                  padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>
                  Continue
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "#fff", color: "#111827", border: "1px solid #D1D5DB", borderRadius: 6,
            padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateTenderModal;
