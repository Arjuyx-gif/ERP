import { useState } from "react";
import { X, Square, CheckSquare } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const ReviewModal = ({ open, onClose, prefillData }) => {
  const [checkedItems, setCheckedItems] = useState({
    "Tender Document": false,
    "Pre - Sales Checklist": false,
    "Pre - Bid Queries": false,
    "OEM Documents": false,
  });

  const tenderId = prefillData?.id || "TND-2026-045";
  const firmName = prefillData?.firm || "Firm Name";
  const customer = prefillData?.customer || "Customer Name";
  const tenderTitle = prefillData?.title || "Tender Title";
  const assignee = prefillData?.assignedTo || "Pre-sales Members Name";
  const deadline = prefillData?.deadline || "5 Jul 2026";

  const handleClose = () => {
    setCheckedItems({
      "Tender Document": false,
      "Pre - Sales Checklist": false,
      "Pre - Bid Queries": false,
      "OEM Documents": false,
    });
    onClose?.();
  };

  const handleApprove = () => {
    // API call for approve
    handleClose();
  };

  const handleNotApprove = () => {
    // API call for not approve
    handleClose();
  };

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes reviewModalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes reviewModalIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
          animation: "reviewModalBackdropIn 0.25s ease-out both",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 600,
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "reviewModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>
              Tender — {tenderId}
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"}
            onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}>
          
          {/* Info Card */}
          <div style={{
            padding: "16px", border: "1px solid #E5E7EB", borderRadius: 8, marginBottom: 20,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px",
          }}>
            <div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Tender ID</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{tenderId}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Firm</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{firmName}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Customer</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{customer}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Title</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{tenderTitle}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Assignee</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{assignee}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Submission Deadline</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{deadline}</div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingLeft: 4 }}>
            {Object.keys(checkedItems).map((item) => (
              <div
                key={item}
                onClick={() => toggleCheck(item)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                }}
              >
                {checkedItems[item] ? (
                  <CheckSquare size={16} color="#2563EB" />
                ) : (
                  <Square size={16} color="#9CA3AF" />
                )}
                <span style={{ fontSize: 13, fontWeight: 500, color: "#2563EB" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: "16px 24px",
          display: "flex", justifyContent: "flex-end", gap: 12,
          flexShrink: 0,
        }}>
          <button
            onClick={handleNotApprove}
            style={{
              padding: "10px 20px", border: "1px solid #E5E7EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            Not Approved
          </button>
          <button
            onClick={handleApprove}
            style={{
              padding: "10px 24px", border: "none", borderRadius: 8,
              background: "#059669", fontSize: 13, fontWeight: 600,
              color: "#fff", cursor: "pointer", fontFamily: FONT,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#047857"}
            onMouseLeave={e => e.currentTarget.style.background = "#059669"}
          >
            Approved
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
