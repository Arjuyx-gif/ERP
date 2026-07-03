import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Search, CheckCircle2 } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── Shared input style ────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", border: "1px solid #E5E7EB", borderRadius: 8,
  padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
  boxSizing: "border-box", outline: "none", background: "#fff",
  transition: "border-color 0.15s",
};

// ─── Team members for step 2 ──────────────────────────────────────────────────
const TEAM_MEMBERS = [
  { id: 1, name: "Pre-Sales Member Name", initials: "AK", statusColor: "#EF4444", loadColor: "#EF4444", workload: 92, active: 5, pending: 8, expertise: "OEM Coordination, BOQ" },
  { id: 2, name: "Pre-Sales Member Name", initials: "RV", statusColor: "#10B981", loadColor: "#10B981", workload: 60, active: 3, pending: 4, expertise: "Pre-Bid Queries, Compliance" },
  { id: 3, name: "Pre-Sales Member Name", initials: "PM", statusColor: "#10B981", loadColor: "#10B981", workload: 45, active: 2, pending: 3, expertise: "Automation, Safety Systems" },
  { id: 4, name: "Pre-Sales Member Name", initials: "PM", statusColor: "#10B981", loadColor: "#10B981", workload: 45, active: 2, pending: 3, expertise: "Automation, Safety Systems" },
];

// ─── AssignTenderModal ─────────────────────────────────────────────────────────

const AssignTenderModal = ({ open, onClose, prefillData }) => {
  const [step, setStep] = useState(prefillData?.highlight === "green" ? 2 : 1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberSearch, setMemberSearch] = useState("");

  // Form state for step 1
  const [form, setForm] = useState({
    tenderId: prefillData?.id || "TND-2026-XXX",
    firmName: prefillData?.firm || "",
    customer: prefillData?.customer || "",
    tenderTitle: prefillData?.title || "",
    deadline: "",
    priority: "",
  });

  useEffect(() => {
    if (open) {
      setStep(prefillData?.highlight === "green" ? 2 : 1);
      setForm({
        tenderId: prefillData?.id || "TND-2026-XXX",
        firmName: prefillData?.firm || "",
        customer: prefillData?.customer || "",
        tenderTitle: prefillData?.title || "",
        deadline: "",
        priority: "",
      });
    }
  }, [open, prefillData]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setStep(1);
    setSelectedMember(null);
    setMemberSearch("");
    setForm({
      tenderId: "TND-2026-XXX", firmName: "", customer: "",
      tenderTitle: "", deadline: "", priority: "",
    });
    onClose?.();
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleAssign = () => {
    // In a real app, this would call an API
    handleClose();
  };

  const filteredMembers = TEAM_MEMBERS.filter(m =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(memberSearch.toLowerCase())
  );

  if (!open) return null;

  return (
    <>
      {/* Animation keyframes */}
      <style>{`
        @keyframes assignModalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes assignModalIn {
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
          animation: "assignModalBackdropIn 0.25s ease-out both",
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
        animation: "assignModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>
              Assign Tender
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

        {/* ── Stepper ── */}
        <div style={{ padding: "16px 24px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {/* Step 1 */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step >= 1 ? "#2563EB" : "#E5E7EB",
                color: step >= 1 ? "#fff" : "#9CA3AF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
                transition: "all 0.2s",
              }}>
                {step > 1 ? <CheckCircle2 size={16} /> : "1"}
              </div>
              <span style={{
                fontSize: 13, fontWeight: step === 1 ? 700 : 500,
                color: step >= 1 ? "#111827" : "#9CA3AF",
              }}>
                Tender Details
              </span>
            </div>

            {/* Connector */}
            <div style={{
              flex: "0 0 40px", height: 2, margin: "0 8px",
              background: step > 1 ? "#2563EB" : "#E5E7EB",
              borderRadius: 1, transition: "background 0.2s",
            }} />

            {/* Step 2 */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step >= 2 ? "#2563EB" : "#E5E7EB",
                color: step >= 2 ? "#fff" : "#9CA3AF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
                transition: "all 0.2s",
              }}>
                2
              </div>
              <span style={{
                fontSize: 13, fontWeight: step === 2 ? 700 : 500,
                color: step >= 2 ? "#111827" : "#9CA3AF",
              }}>
                Assign Member
              </span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}>

          {/* ──── Step 1: Tender Details ──── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Tender ID + Firm Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6, display: "block" }}>
                    Tender ID <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.tenderId}
                    onChange={e => handleChange("tenderId", e.target.value)}
                    placeholder="TND-2026-XXX"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#2563EB"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6, display: "block" }}>
                    Firm Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.firmName}
                    onChange={e => handleChange("firmName", e.target.value)}
                    placeholder="e.g. CIPL"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#2563EB"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
              </div>

              {/* Customer */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6, display: "block" }}>
                  Customer <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.customer}
                  onChange={e => handleChange("customer", e.target.value)}
                  placeholder="e.g. ONGC"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#2563EB"}
                  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>

              {/* Tender Title */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6, display: "block" }}>
                  Tender Title <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.tenderTitle}
                  onChange={e => handleChange("tenderTitle", e.target.value)}
                  placeholder="e.g. Instrumentation Supply Package"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#2563EB"}
                  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                />
              </div>

              {/* Submission Deadline + Priority */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6, display: "block" }}>
                    Submission Deadline <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={e => handleChange("deadline", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={e => e.target.style.borderColor = "#2563EB"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6, display: "block" }}>
                    Priority
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={form.priority}
                      onChange={e => handleChange("priority", e.target.value)}
                      style={{
                        ...inputStyle, cursor: "pointer", appearance: "none",
                        paddingRight: 32,
                      }}
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <ChevronDown size={14} color="#9CA3AF" style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──── Step 2: Assign Member ──── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
                Assigning: <span style={{ fontWeight: 700, color: "#111827" }}>{form.tenderId}</span> · {form.tenderTitle || "Tender ID"}
              </div>

              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12, display: "block" }}>
                Select Team Member <span style={{ color: "#EF4444" }}>*</span>
              </label>

              {/* Member list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: "16px 24px 20px",
          borderTop: "1px solid #F3F4F6",
          display: "flex", gap: 12,
          flexShrink: 0,
        }}>
          {step === 1 ? (
            <>
              <button
                onClick={handleClose}
                style={{
                  flex: 1, padding: "11px 0", border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT, transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                style={{
                  flex: 2, padding: "11px 0", border: "none", borderRadius: 8,
                  background: "#2563EB", fontSize: 13, fontWeight: 700, color: "#fff",
                  cursor: "pointer", fontFamily: FONT,
                  boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#1D4ED8";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#2563EB";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(37,99,235,0.3)";
                }}
              >
                Next →
              </button>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button
                onClick={handleBack}
                style={{
                  padding: "9px 16px", border: "1px solid #E5E7EB", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT, transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
              >
                ← Back
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedMember}
                style={{
                  padding: "10px 24px", border: "none", borderRadius: 8,
                  background: selectedMember ? "#2563EB" : "#93C5FD",
                  fontSize: 13, fontWeight: 600,
                  color: "#fff",
                  cursor: selectedMember ? "pointer" : "not-allowed",
                  fontFamily: FONT,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  if (selectedMember) {
                    e.currentTarget.style.background = "#1D4ED8";
                  }
                }}
                onMouseLeave={e => {
                  if (selectedMember) {
                    e.currentTarget.style.background = "#2563EB";
                  }
                }}
              >
                Assign Tender
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AssignTenderModal;
