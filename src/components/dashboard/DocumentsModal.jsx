import { X, CheckCircle2, Circle } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const STEPS_COMPLETED = [
  { label: "RFP Document Received", done: true },
  { label: "Pre - Checklist", done: true },
  { label: "Pre - Bid Query Raised", done: true },
  { label: "OEM Document Prepared", done: true },
  { label: "Post-Bid Queries", done: true },
];

const STEPS_IN_PROGRESS = [
  { label: "RFP Document Received", done: true },
  { label: "Pre - Checklist", done: true },
  { label: "Pre - Bid Query Raised", done: true },
  { label: "OEM Document Prepared", done: true },
  { label: "Post-Bid Queries", done: false },
  { label: "Final Submission Approval", done: false },
];

const DocumentsModal = ({ open, onClose, prefillData }) => {
  const tenderId = prefillData?.id || "TND-2026-045";
  const isCompleted = prefillData?.highlight === "green" || prefillData?.stage === "-";

  const steps = isCompleted ? STEPS_COMPLETED : STEPS_IN_PROGRESS;
  const progress = isCompleted ? 100 : 80;

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes docsModalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes docsModalIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={() => onClose?.()}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
          animation: "docsModalBackdropIn 0.25s ease-out both",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 12, width: 480,
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "docsModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "20px 24px 16px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>
            Documents — {tenderId}
          </h2>
          <button
            onClick={() => onClose?.()}
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
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 6, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "#2563EB", borderRadius: 4,
                transition: "width 0.3s ease",
              }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", whiteSpace: "nowrap" }}>
              {progress}%
            </span>
          </div>

          {/* Steps list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((step, i) => (
              <div key={i}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 0",
                }}>
                  {step.done ? (
                    <CheckCircle2 size={20} color="#10B981" fill="#10B981" style={{ flexShrink: 0 }} />
                  ) : (
                    <Circle size={20} color="#D1D5DB" style={{ flexShrink: 0 }} />
                  )}
                  <span style={{
                    fontSize: 14, fontWeight: 500,
                    color: step.done ? "#10B981" : "#6B7280",
                  }}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ height: 1, background: "#F3F4F6", marginLeft: 10 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsModal;
