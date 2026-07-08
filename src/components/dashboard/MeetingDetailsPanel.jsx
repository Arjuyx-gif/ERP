import { X, Paperclip, Edit2, RefreshCw, MessageSquarePlus, XCircle, CheckCircle2 } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const SectionHeading = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", letterSpacing: 0.4, textTransform: "uppercase", margin: "22px 0 10px" }}>
    {children}
  </div>
);

const InfoCard = ({ rows }) => (
  <div style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 8, padding: "4px 16px" }}>
    {rows.map(([label, value], i) => (
      <div key={label} style={{
        display: "flex", justifyContent: "space-between", gap: 16,
        padding: "10px 0", borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none",
      }}>
        <span style={{ fontSize: 13, color: "#6B7280", flexShrink: 0 }}>{label}</span>
        <span style={{ fontSize: 13, color: "#111827", fontWeight: 500, textAlign: "right" }}>{value}</span>
      </div>
    ))}
  </div>
);

const MeetingDetailsPanel = ({ open, onClose, meeting, onReschedule, onMeetingDone }) => {
  if (!open) return null;

  const m = meeting || {};

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 960,
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        }}
      />

      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 440, maxWidth: "94vw", zIndex: 961,
        background: "#fff", boxShadow: "-8px 0 40px rgba(0,0,0,0.14)",
        display: "flex", flexDirection: "column", fontFamily: FONT,
      }}>

        {/* Header */}
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #EAECF0", flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>{m.subject || "Meeting"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "#374151"} onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 24px" }}>

          {/* Badges */}
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#DBEAFE", color: "#1D4ED8" }}>Scheduled</span>
            {m.priority && (
              <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#FEE2E2", color: "#DC2626" }}>{m.priority} Priority</span>
            )}
          </div>

          <SectionHeading>Meeting Details</SectionHeading>
          <InfoCard rows={[
            ["Date", m.date || "-"],
            ["Time", m.time || "-"],
            ["Organization", "Ministry/Organization Name"],
            ["Address", "Full Address..."],
            ["Meeting Agenda", "Write full description.........."],
            ["Related Opportunity", "OPP-2026-012"],
            ["Related Tender", "TND-2026-045"],
            ["Remarks", "Remarks......."],
          ]} />

          <SectionHeading>Contact Person</SectionHeading>
          <InfoCard rows={[
            ["Name", "Contact Person"],
            ["Mobile", "+91 98100 11223"],
            ["Email", "Contact Person's Mail ID"],
          ]} />

          <SectionHeading>Previous Meeting History</SectionHeading>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <li style={{ fontSize: 13, color: "#374151" }}>25/06/2026 – Follow-up call, discussed specs</li>
            <li style={{ fontSize: 13, color: "#374151" }}>20/06/2026 – Initial cold call, showed interest</li>
          </ul>

          <SectionHeading>Attachments</SectionHeading>
          <button type="button" style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
            padding: "10px 14px", border: "1px dashed #D1D5DB", borderRadius: 8,
            background: "#fff", fontSize: 13, color: "#6B7280", cursor: "pointer", fontFamily: FONT,
          }}>
            <Paperclip size={14} color="#6B7280" /> Upload Attachment
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
              <Edit2 size={13} /> Edit Meeting
            </button>
            <button onClick={() => onReschedule?.(m)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "1px solid #FDE68A", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#B45309", cursor: "pointer", fontFamily: FONT }}>
              <RefreshCw size={13} /> Reschedule
            </button>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
              <MessageSquarePlus size={13} /> Add Remark
            </button>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", border: "1px solid #FECACA", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500, color: "#DC2626", cursor: "pointer", fontFamily: FONT }}>
              <XCircle size={13} /> Cancel Meeting
            </button>
          </div>

          <button onClick={() => onMeetingDone?.(m)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", marginTop: 12,
            padding: "12px 0", border: "none", borderRadius: 8, background: "#16A34A", fontSize: 14, fontWeight: 600,
            color: "#fff", cursor: "pointer", fontFamily: FONT,
          }}>
            <CheckCircle2 size={16} /> Mark Meeting Done
          </button>
        </div>
      </div>
    </>
  );
};

export default MeetingDetailsPanel;
