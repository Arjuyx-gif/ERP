import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const ViewTenderModal = ({ open, onClose, prefillData }) => {
  const tenderId = prefillData?.id || "TND-2026-045";
  const firmName = prefillData?.firm || "Firm Name";
  const customer = prefillData?.customer || "Customer Name";
  const tenderTitle = prefillData?.title || "Tender Title";
  const assignee = prefillData?.assignedTo || "Pre-sales Members Name";
  const deadline = prefillData?.deadline || "5 Jul 2026";
  const currentStage = prefillData?.stage || "OEM Document Pending";
  const progress = prefillData?.progress || 55;

  const handleClose = () => {
    onClose?.();
  };

  const handleOpenTender = () => {
    // API call or redirect
    handleClose();
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes viewTenderBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes viewTenderModalIn {
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
          animation: "viewTenderBackdropIn 0.25s ease-out both",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 620,
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "viewTenderModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
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
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          
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
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>Current Stage</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{currentStage}</div>
            </div>
          </div>

          {/* OEM Status Box */}
          <div style={{ 
            border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 16px", 
            marginBottom: 24, display: "inline-block", minWidth: 120 
          }}>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6 }}>OEM Status</div>
            <span style={{ 
              fontSize: 12, fontWeight: 600, color: "#F59E0B", 
              background: "#FEF3C7", padding: "4px 10px", borderRadius: 12 
            }}>
              Pending
            </span>
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Overall Progress</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>{progress}%</span>
            </div>
            <div style={{ width: "100%", height: 6, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ 
                height: "100%", width: `${progress}%`, background: "#2563EB", 
                borderRadius: 4, transition: "width 0.3s ease" 
              }} />
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: "16px 24px",
          display: "flex", justifyContent: "flex-end", gap: 10,
          flexShrink: 0, flexWrap: "wrap"
        }}>
          <button
            style={{
              padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            View Checklist
          </button>
          <button
            style={{
              padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            View Pre-Bid Queries
          </button>
          <button
            style={{
              padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 8,
              background: "#fff", fontSize: 13, fontWeight: 500, color: "#4B5563",
              cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            View OEM Status
          </button>
          <button
            onClick={handleOpenTender}
            style={{
              padding: "9px 24px", border: "none", borderRadius: 8,
              background: "#2563EB", fontSize: 13, fontWeight: 600,
              color: "#fff", cursor: "pointer", fontFamily: FONT,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#1D4ED8"}
            onMouseLeave={e => e.currentTarget.style.background = "#2563EB"}
          >
            Open Tender
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewTenderModal;
