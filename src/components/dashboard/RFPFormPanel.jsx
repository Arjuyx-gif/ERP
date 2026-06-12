import { useRef, useState, useEffect } from "react";
import { X, XCircle, CheckCircle } from "lucide-react";
import ApprovalNotificationModal from "./ApprovalNotificationModal";

const FONT = "'Inter','Segoe UI',sans-serif";

const PQ_ROWS = [
  "Turnover (Past 3 yrs)",
  "Positive Net Worth",
  "Quality Certificates (Eg. ISO, CMM etc.)",
  "Other Criteria Clause",
  "Blacklisting/Debarred/ Banned – Undertaking",
  "Any Other Undertaking",
  "Bid Authorization Certificate",
  "MAF",
  "OEM Undertaking (Eg. Support, Spare, Warranty etc.)",
  "Service/Support Center List",
  "Page No & Indexing",
  "Other Highlights",
  "Details of any joint call with OEM",
  "Winning Strategy",
  "Reason to bid the tender",
];

// ─── Field ─────────────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", border: "1px solid #E5E7EB", borderRadius: 7,
  padding: "8px 11px", fontSize: 13, color: "#374151", fontFamily: FONT,
  boxSizing: "border-box", outline: "none", background: "#F9FAFB",
  cursor: "default", userSelect: "text",
};

const Field = ({ label, fullWidth, textarea }) => (
  <div style={{ gridColumn: fullWidth ? "1 / -1" : undefined }}>
    <div style={{ fontSize: 11.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      {label}
    </div>
    {textarea ? (
      <textarea rows={3} readOnly style={{ ...inputStyle, resize: "none" }} />
    ) : (
      <input type="text" readOnly style={inputStyle} />
    )}
  </div>
);

// ─── Banner (informational stripe inside a grid) ────────────────────────────────
const Banner = ({ children, color }) => (
  <div style={{
    gridColumn: "1 / -1",
    background: `${color}12`,
    border: `1px solid ${color}30`,
    borderRadius: 7, padding: "9px 14px",
    fontSize: 12, fontWeight: 600, color,
  }}>
    {children}
  </div>
);

// ─── Section card ───────────────────────────────────────────────────────────────
const Section = ({ title, children, accent = "#2979FF" }) => (
  <div style={{
    background: "#fff",
    border: "1px solid #EAECF0",
    borderRadius: 10,
    boxShadow: "0 1px 4px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
    overflow: "hidden",
    marginBottom: 14,
  }}>
    {/* Card header */}
    <div style={{
      padding: "10px 16px",
      background: "#F9FAFB",
      borderBottom: "1px solid #EAECF0",
      display: "flex", alignItems: "center", gap: 9,
    }}>
      <div style={{ width: 3, height: 14, background: accent, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: "#101828" }}>{title}</span>
    </div>
    {/* Card body */}
    <div style={{ padding: "16px 18px" }}>
      {children}
    </div>
  </div>
);

// ─── PQ Criteria table ─────────────────────────────────────────────────────────
const PQTable = () => (
  <div style={{
    border: "1px solid #EAECF0", borderRadius: 8, overflow: "hidden",
    boxShadow: "0 1px 3px rgba(16,24,40,0.05)",
  }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#F9FAFB" }}>
          {["Particulars", "Bidder", "OEM", "Evidence Required"].map(h => (
            <th key={h} style={{
              padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#667085",
              textAlign: "left", borderBottom: "1px solid #EAECF0", whiteSpace: "nowrap",
            }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PQ_ROWS.map((row, i) => (
          <tr key={i} style={{ borderBottom: i < PQ_ROWS.length - 1 ? "1px solid #F2F4F7" : "none" }}>
            <td style={{ padding: "9px 14px", fontSize: 12, color: "#344054", width: "34%" }}>
              {row}
            </td>
            {[0, 1, 2].map(j => (
              <td key={j} style={{ padding: "5px 8px" }}>
                <input
                  type="text"
                  readOnly
                  style={{
                    width: "100%", border: "1px solid #E5E7EB", borderRadius: 5,
                    padding: "5px 8px", fontSize: 12, outline: "none",
                    fontFamily: FONT, boxSizing: "border-box", background: "#F9FAFB",
                    cursor: "default",
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── RejectModal ───────────────────────────────────────────────────────────────
const RejectModal = ({ onCancel, onConfirm }) => {
  const [reason, setReason] = useState("");

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 970,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.35)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 14, width: 460,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 22px 16px",
          borderBottom: "1px solid #EAECF0",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#101828" }}>Reject RFP</div>
            <div style={{ fontSize: 13, color: "#667085", marginTop: 3 }}>
              Provide detailed feedback for rework
            </div>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#667085", padding: 4, borderRadius: 6, display: "flex",
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>
            Rejection Reason
          </div>
          <textarea
            rows={5}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Explain what needs to be corrected..."
            style={{
              ...inputStyle, resize: "none", fontSize: 13,
              color: "#111827", lineHeight: 1.5,
            }}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 22px 20px",
          display: "flex", gap: 12,
        }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "11px 0", border: "1px solid #D1D5DB",
              borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 500,
              color: "#374151", cursor: "pointer", fontFamily: FONT,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            style={{
              flex: 2, padding: "11px 0", border: "none", borderRadius: 8,
              background: "#C0392B", fontSize: 13, fontWeight: 700,
              color: "#fff", cursor: "pointer", fontFamily: FONT,
              boxShadow: "0 2px 6px rgba(192,57,43,0.3)",
            }}
          >
            Reject &amp; Send Back
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── RFPFormPanel ──────────────────────────────────────────────────────────────

const RFPFormPanel = ({ card, onClose, onReject, onSendNotification }) => {
  const formRef = useRef(null);
  const [showRejectModal,   setShowRejectModal]   = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  useEffect(() => {
    setShowApprovalModal(card?.action === "Send Notification");
  }, [card]);

  if (!card) return null;

  const handleSubmit = e => {
    e.preventDefault();
    onClose?.();
  };


  return (
    <>
      {/* Blurred backdrop — left portion shows kanban through this */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 960,
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      />

      {/* Panel — 68% wide, right edge (shifted right vs before) */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "68%", zIndex: 961,
        background: "#F8F9FB",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.14)",
        display: "flex", flexDirection: "column",
        fontFamily: FONT,
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "14px 20px 12px",
          borderBottom: "1px solid #EAECF0",
          flexShrink: 0, background: "#fff",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "#4CAF50", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1.5 6 4.5 9 9.5 3" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#101828" }}>
                  RFP Details – {card.id}
                </div>
                <div style={{ fontSize: 11.5, color: "#667085", marginTop: 1 }}>{card.tender}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#667085", display: "flex", alignItems: "center", padding: 6, borderRadius: 6,
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* ── Form (flex child: scrollable body + sticky footer) ── */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
          noValidate={false}
        >
          {/* Scrollable body */}
          <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "14px 18px 8px" }}>

            {/* Details */}
            <Section title="Details">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
                <Field label="Name of Sales Rep" />
                <Field label="Funnel Ref No." />
                <Field label="Name of Department" />
                <Field label="Existing Customer" />
                <Field label="Address" fullWidth textarea />
              </div>
            </Section>

            {/* Contact Details */}
            <Section title="Contact Details of the Customer" accent="#10B981">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
                <Field label="Category" />
                <Field label="Customer's Name" />
                <Field label="Mail ID" />
                <Field label="Mobile Number" />
              </div>
            </Section>

            {/* Tender Details */}
            <Section title="Tender Details" accent="#F59E0B">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
                <Field label="Tender Title" />
                <Field label="RFP No." />
                <Field label="Tender ID" fullWidth />
                <Field label="Estimated Bid Value" fullWidth />
                <Field label="Reverse Auction" fullWidth />
                <Field label="RFP Issue Date" />
                <Field label="Submission Portal Address" />
                <Field label="Tender Type" />
                <Field label="Bid/Tender Validity" />
                <Field label="Query Submission Date" />
                <Field label="Mode of Submission – Query" />
                <Field label="Pre-Bid Meeting Date & Time" />
                <Field label="Pre-Bid Meeting Venue" />
                <Field label="Bid Submission Date" />
                <Field label="Bid Opening Date" />
                <Field label="Mode of Submission – Tender" />
                <Field label="Price Validity" />
                <Field label="Tender Fee Amount" />
                <Field label="Mode of Tender Fee Payment" />
                <Field label="EMD Required" fullWidth />
                <Field label="EMD Amount" />
                <Field label="Date of Submission – EMD" />
                <Banner color="#EF4444">In case EMD is required in the form of BG</Banner>
                <Field label="Reason for Exemption of EMD/Tender Fee" fullWidth />
                <Field label="Payment T&C" />
                <Field label="Payment Schedule" />
                <Field label="PBG%" />
                <Field label="PBG Validity" />
                <Field label="AMC Reqt" />
                <Field label="Duration of AMC" />
                <Banner color="#EF4444">Manpower Details</Banner>
                <Field label="Manpower Reqt for Support" />
                <Field label="Duration" />
                <Field label="Qualification" />
                <Field label="Certification" />
                <Field label="Quantity" />
                <Field label="Experience" />
              </div>
            </Section>

            {/* PQ Criteria */}
            <Section title="PQ Criteria" accent="#8B5CF6">
              <PQTable />
            </Section>

            {/* Approval */}
            <Section title="Approval" accent="#2563EB">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
                <Field label="Prepared By" />
                <Field label="Approved By" />
                <Field label="Pre-sales Rep" />
                <Field label="Date" />
              </div>
            </Section>

            {/* Remarks */}
            <Section title="Remarks" accent="#6B7280">
              <div style={{ fontSize: 11.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>
                Additional Remarks
              </div>
              <textarea
                rows={4}
                readOnly
                placeholder="Enter any additional remarks..."
                style={{ ...inputStyle, resize: "none" }}
              />
            </Section>

            {/* Remark - Rejection (only on rejected cards) */}
            {card.rejectionRemark && (
              <Section title="Remark - Rejection" accent="#C62828">
                <div style={{ fontSize: 11.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>
                  Rejection Remarks
                </div>
                <textarea
                  rows={4}
                  readOnly
                  defaultValue={card.rejectionRemark}
                  placeholder="Enter any additional remarks..."
                  style={{ ...inputStyle, resize: "none" }}
                />
              </Section>
            )}

          </div>

          {/* Sticky footer */}
          <div style={{
            padding: "12px 18px",
            borderTop: "1px solid #EAECF0",
            background: "#fff",
            flexShrink: 0,
            display: "flex", alignItems: "center", gap: 10,
            justifyContent: (!card.rejectionRemark && card.action === "Review Now") ? "stretch" : "flex-end",
          }}>
            {card.action === "Send Notification" ? (
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "9px 28px", border: "1px solid #D1D5DB", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                Close
              </button>
            ) : card.rejectionRemark ? (
              /* Rejected card — read-only view, just close */
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "9px 28px", border: "1px solid #D1D5DB", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                  display: "flex", alignItems: "center", gap: 7,
                }}
              >
                <XCircle size={15} color="#667085" /> Close
              </button>
            ) : card.action === "Review Now" ? (
              /* First-time review — Re-check or Approve */
              <>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(true)}
                  style={{
                    flex: 1, padding: "12px 0", border: "none", borderRadius: 8,
                    background: "#B71C1C", fontSize: 13, fontWeight: 700, color: "#fff",
                    cursor: "pointer", fontFamily: FONT,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: "0 2px 6px rgba(183,28,28,0.3)",
                  }}
                >
                  <XCircle size={16} /> Re-check
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1, padding: "12px 0", border: "none", borderRadius: 8,
                    background: "#1B5E20", fontSize: 13, fontWeight: 700, color: "#fff",
                    cursor: "pointer", fontFamily: FONT,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: "0 2px 6px rgba(27,94,32,0.3)",
                  }}
                >
                  <CheckCircle size={16} /> Approved
                </button>
              </>
            ) : (
              /* View-only — just close */
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "9px 28px", border: "1px solid #D1D5DB", borderRadius: 8,
                  background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                Close
              </button>
            )}
          </div>
        </form>

      </div>

      {showRejectModal && (
        <RejectModal
          onCancel={() => setShowRejectModal(false)}
          onConfirm={reason => { setShowRejectModal(false); onReject?.(card, reason); onClose?.(); }}
        />
      )}

      {showApprovalModal && (
        <ApprovalNotificationModal
          card={card}
          onClose={() => { setShowApprovalModal(false); onClose?.(); }}
          onSend={checkedDepts => {
            setShowApprovalModal(false);
            onSendNotification?.(card, checkedDepts);
            onClose?.();
          }}
        />
      )}
    </>
  );
};

export default RFPFormPanel;
