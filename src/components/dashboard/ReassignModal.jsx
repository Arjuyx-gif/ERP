import { useState } from "react";
import { X } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const inputStyle = {
  width: "100%", border: "1px solid #E5E7EB", borderRadius: 8,
  padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
  boxSizing: "border-box", outline: "none", background: "#fff",
  transition: "border-color 0.15s",
};

const TEAM_MEMBERS = [
  { id: 1, name: "Pre-Sales Member Name", initials: "AK", statusColor: "#EF4444", loadColor: "#EF4444", workload: 92, active: 5, pending: 8, expertise: "OEM Coordination, BOQ" },
  { id: 2, name: "Pre-Sales Member Name", initials: "RV", statusColor: "#10B981", loadColor: "#10B981", workload: 60, active: 3, pending: 4, expertise: "Pre-Bid Queries, Compliance" },
  { id: 3, name: "Pre-Sales Member Name", initials: "PM", statusColor: "#10B981", loadColor: "#10B981", workload: 45, active: 2, pending: 3, expertise: "Automation, Safety Systems" },
  { id: 4, name: "Pre-Sales Member Name", initials: "PM", statusColor: "#10B981", loadColor: "#10B981", workload: 45, active: 2, pending: 3, expertise: "Automation, Safety Systems" },
];

const ReassignModal = ({ open, onClose, prefillData }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [reason, setReason] = useState("");

  const tenderId = prefillData?.id || "TND-2026-045";
  const tenderTitle = prefillData?.title || "Instrument Supply Package";
  const firmName = prefillData?.firm || "Larsen & Toubro";
  const customer = prefillData?.customer || "ONGC";
  const currentAssignee = prefillData?.assignedTo || "Riya Shah";

  const handleClose = () => {
    setSelectedMember(null);
    setReason("");
    onClose?.();
  };

  const handleConfirm = () => {
    // API call goes here
    handleClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Animation keyframes */}
      <style>{`
        @keyframes reassignModalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes reassignModalIn {
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
          animation: "reassignModalBackdropIn 0.25s ease-out both",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 1001,
        background: "#fff", borderRadius: 16, width: 560,
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: FONT, overflow: "hidden",
        animation: "reassignModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>
              Reassign — {tenderId}
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
            padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: 8, marginBottom: 18,
            background: "#FAFAFA"
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{tenderTitle}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>
              {firmName} · {customer} · Current: <span style={{ fontWeight: 600, color: "#374151" }}>{currentAssignee}</span>
            </div>
          </div>

          {/* Members Label */}
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12, display: "block" }}>
            Reassign To
          </label>

          {/* Member list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {TEAM_MEMBERS.map(m => {
              const isSelected = selectedMember === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                    border: isSelected ? "1px solid #2563EB" : "1px solid #E5E7EB",
                    background: isSelected ? "#F8FAFF" : "#fff",
                    transition: "all 0.15s",
                    boxShadow: isSelected ? "0 2px 8px rgba(37,99,235,0.06)" : "0 1px 2px rgba(0,0,0,0.02)",
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#D1D5DB";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#E5E7EB";
                    }
                  }}
                >
                  {/* Status Dot */}
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.statusColor, flexShrink: 0 }} />

                  {/* Avatar */}
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "#EFF6FF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                    color: "#2563EB",
                    flexShrink: 0,
                  }}>
                    {m.initials}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{m.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: m.loadColor }}>{m.workload}% load</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>
                      {m.active} Active · {m.pending} Pending · {m.expertise}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reason */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, display: "block" }}>
              Reason <span style={{ fontWeight: 400, color: "#6B7280" }}>(optional)</span>
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. Workload redistribution"
              rows={2}
              style={{ ...inputStyle, resize: "none" }}
              onFocus={e => e.target.style.borderColor = "#2563EB"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: "16px 24px 20px",
          display: "flex", justifyContent: "flex-end",
          flexShrink: 0,
        }}>
          <button
            onClick={handleConfirm}
            disabled={!selectedMember}
            style={{
              padding: "10px 24px", border: "none", borderRadius: 8,
              background: selectedMember ? "#93C5FD" : "#D1D5DB", // Note: The screenshot uses a lighter blue for Confirm
              fontSize: 13, fontWeight: 600,
              color: selectedMember ? "#2563EB" : "#fff",
              cursor: selectedMember ? "pointer" : "not-allowed",
              fontFamily: FONT,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              if (selectedMember) {
                e.currentTarget.style.background = "#BFDBFE";
              }
            }}
            onMouseLeave={e => {
              if (selectedMember) {
                e.currentTarget.style.background = "#93C5FD";
              }
            }}
          >
            Confirm Reassign
          </button>
        </div>
      </div>
    </>
  );
};

export default ReassignModal;
