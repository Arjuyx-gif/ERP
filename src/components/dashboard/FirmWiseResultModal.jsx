import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown, Paperclip } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const RESULT_OPTIONS = ["Result Awaited", "Won", "Lost", "Canceled", "Disqualified"];
const REVISE_OPTIONS = ["Won", "Canceled", "Disqualified"];

const resultStyle = (value) => {
  switch (value) {
    case "Won":          return { bg: "#D1FAE5", color: "#059669" };
    case "Lost":         return { bg: "#FEE2E2", color: "#DC2626" };
    case "Canceled":     return { bg: "#F3F4F6", color: "#6B7280" };
    case "Disqualified": return { bg: "#FEF3C7", color: "#B45309" };
    default:             return { bg: "#FEF9E7", color: "#D97706" };
  }
};

// ── Portal dropdown menu — rendered at document.body to escape overflow:hidden ──
const DropdownPortal = ({ triggerRef, options = RESULT_OPTIONS, onSelect, onClose }) => {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
  }, [triggerRef]);

  if (!rect) return null;

  return createPortal(
    <>
      {/* Click-away backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998 }} />
      <div style={{
        position: "fixed",
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
        background: "#FFFDE7",
        border: "1px solid #E9D89A",
        borderTop: "none",
        borderRadius: "0 0 6px 6px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.14)",
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: FONT,
      }}>
        {options.map((opt, idx) => (
          <div
            key={opt}
            onClick={() => { onSelect(opt); onClose(); }}
            onMouseEnter={e => { e.currentTarget.style.background = "#BFDBFE"; e.currentTarget.style.color = "#1E3A5F"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#92400E"; }}
            style={{
              padding: "9px 12px",
              fontSize: 13, fontWeight: 500, color: "#92400E",
              cursor: "pointer",
              borderBottom: idx < options.length - 1 ? "1px solid #E9D89A" : "none",
              transition: "background 0.12s, color 0.12s",
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </>,
    document.body
  );
};

// ── Per-firm editable row (needs its own ref for portal positioning) ────────────
const FirmRow = ({ firm, value, tagColor, isLast, onChange }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const { bg, color } = resultStyle(value);

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr",
      padding: "12px 14px", alignItems: "center",
      borderBottom: isLast ? "none" : "1px solid #EAECF0",
      background: "#fff",
    }}>
      {/* Firm tag */}
      <span style={{
        display: "inline-block", width: "fit-content",
        fontSize: 12, fontWeight: 600,
        padding: "3px 10px", borderRadius: 6,
        background: tagColor || "#E3F0FB", color: "#344054",
      }}>
        {firm}
      </span>

      {/* Custom dropdown trigger */}
      <div style={{ position: "relative" }}>
        <div
          ref={triggerRef}
          onClick={() => setOpen(o => !o)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#FFFDE7",
            border: "1px solid #E9D89A",
            borderRadius: open ? "6px 6px 0 0" : 6,
            padding: "6px 10px",
            cursor: "pointer", userSelect: "none",
            minWidth: 148,
          }}
        >
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#92400E" }}>
            {value}
          </span>
          <ChevronDown
            size={14} color="#92400E"
            style={{
              flexShrink: 0,
              transition: "transform 0.15s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>

        {open && (
          <DropdownPortal
            triggerRef={triggerRef}
            onSelect={onChange}
            onClose={() => setOpen(false)}
          />
        )}
      </div>

      <div /> {/* EMD Return column — empty while editing */}
    </div>
  );
};

// ── Per-firm revise row ─────────────────────────────────────────────────────────
const ReviseFirmRow = ({ firm, value, tagColor, isLast, onChange }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const { bg, color } = resultStyle(value);

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr",
      padding: "12px 14px", alignItems: "center",
      borderBottom: isLast ? "none" : "1px solid #EAECF0",
      background: "#fff",
    }}>
      <span style={{
        display: "inline-block", width: "fit-content",
        fontSize: 12, fontWeight: 600,
        padding: "3px 10px", borderRadius: 6,
        background: tagColor || "#E3F0FB", color: "#344054",
      }}>
        {firm}
      </span>
      <span style={{
        display: "inline-block", width: "fit-content",
        fontSize: 12, fontWeight: 600,
        padding: "4px 14px", borderRadius: 8, background: "#FEE2E2", color: "#DC2626",
      }}>
        Lost
      </span>
      <div style={{ position: "relative" }}>
        <div
          ref={triggerRef}
          onClick={() => setOpen(o => !o)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: bg,
            border: "1px solid #E9D89A",
            borderRadius: open ? "6px 6px 0 0" : 6,
            padding: "6px 10px",
            cursor: "pointer", userSelect: "none",
            minWidth: 148,
          }}
        >
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color }}>
            {value}
          </span>
          <ChevronDown
            size={14} color={color}
            style={{ flexShrink: 0, transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
        {open && (
          <DropdownPortal
            triggerRef={triggerRef}
            options={REVISE_OPTIONS}
            onSelect={onChange}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

// ── Main modal ──────────────────────────────────────────────────────────────────
const FirmWiseResultModal = ({ card, onClose, onSubmit }) => {
  const isReviseMode = card.status === "Lost";
  const firms = card.tags?.filter(t => t !== "Lost") || [];

  const [phase, setPhase] = useState("edit");
  const [results, setResults] = useState(
    firms.reduce((acc, firm) => ({ ...acc, [firm]: isReviseMode ? "Revised Result" : "Result Awaited" }), {})
  );
  const [editRemarks,    setEditRemarks]    = useState("");
  const [refundDetails,  setRefundDetails]  = useState("");
  const [reviewRemarks,  setReviewRemarks]  = useState("");

  const lostFirms = firms.filter(f => results[f] === "Lost");
  const hasLost   = lostFirms.length > 0;

  // ── Shared overlay + card shell ─────────────────────────────────────────────
  const Wrapper = ({ children }) => (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
      zIndex: 975,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.30)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: 510,
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        fontFamily: FONT, overflow: "hidden",
        maxHeight: "92vh", display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ padding: "18px 22px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#101828" }}>
              {isReviseMode ? "Revise Result" : `Tender ID - ${card.id} -`}
            </div>
            <div style={{ fontSize: 12, color: "#667085", marginTop: 3 }}>
              {isReviseMode ? `Tender ID: ${card.id}` : (card.customer || "Customer Name")}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#667085", padding: 4, borderRadius: 6, display: "flex", marginLeft: 12, flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ borderTop: "1px solid #EAECF0", flexShrink: 0 }} />
        {children}
      </div>
    </div>
  );

  // ── Read-only firm table (phase 2) ──────────────────────────────────────────
  const FirmTableReadOnly = () => (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#101828", marginBottom: 10 }}>
        Firm - Wise Result
      </div>
      <div style={{ border: "1px solid #EAECF0", borderRadius: 10, overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr",
          background: "#F9FAFB", padding: "9px 14px", borderBottom: "1px solid #EAECF0",
        }}>
          {["Firm", "Result", "EMD Return"].map(h => (
            <span key={h} style={{ fontSize: 12, fontWeight: 600, color: "#667085" }}>{h}</span>
          ))}
        </div>
        {/* Rows */}
        {firms.map((firm, i) => {
          const { bg, color } = resultStyle(results[firm]);
          return (
            <div key={firm} style={{
              display: "grid", gridTemplateColumns: "1fr 1.5fr 1.2fr",
              padding: "12px 14px", alignItems: "center",
              borderBottom: i < firms.length - 1 ? "1px solid #EAECF0" : "none",
              background: "#fff",
            }}>
              <span style={{
                display: "inline-block", width: "fit-content",
                fontSize: 12, fontWeight: 600,
                padding: "3px 10px", borderRadius: 6,
                background: card.tagColors?.[firm] || "#E3F0FB", color: "#344054",
              }}>
                {firm}
              </span>
              <span style={{
                display: "inline-block", width: "fit-content",
                fontSize: 12, fontWeight: 600,
                padding: "4px 14px", borderRadius: 8, background: bg, color,
              }}>
                {results[firm]}
              </span>
              <div>
                {results[firm] === "Lost" && (
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", cursor: "pointer" }}>
                    Initiate Refund
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Phase 1: Edit ───────────────────────────────────────────────────────────
  if (phase === "edit") {
    return (
      <Wrapper>
        <div style={{ overflowY: "auto", flex: 1, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Editable firm table — uses FirmRow with portal dropdowns */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#101828", marginBottom: 10 }}>
              {isReviseMode ? "Revise Result" : "Firm - Wise Result"}
            </div>
            <div style={{ border: "1px solid #EAECF0", borderRadius: 10, overflow: "visible" }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: isReviseMode ? "1fr 1fr 1.5fr" : "1fr 1.5fr 1.2fr",
                background: "#F9FAFB", padding: "9px 14px", borderBottom: "1px solid #EAECF0",
                borderRadius: "10px 10px 0 0",
              }}>
                {(isReviseMode ? ["Firm", "Result", "Revised Result"] : ["Firm", "Result", "EMD Return"]).map(h => (
                  <span key={h} style={{ fontSize: 12, fontWeight: 600, color: "#667085" }}>{h}</span>
                ))}
              </div>
              {/* Rows — each one has its own ref for portal positioning */}
              {firms.map((firm, i) => {
                if (isReviseMode) {
                  return (
                    <ReviseFirmRow
                      key={firm}
                      firm={firm}
                      value={results[firm]}
                      tagColor={card.tagColors?.[firm]}
                      isLast={i === firms.length - 1}
                      onChange={val => setResults(prev => ({ ...prev, [firm]: val }))}
                    />
                  );
                }
                return (
                  <FirmRow
                    key={firm}
                    firm={firm}
                    value={results[firm]}
                    tagColor={card.tagColors?.[firm]}
                    isLast={i === firms.length - 1}
                    onChange={val => setResults(prev => ({ ...prev, [firm]: val }))}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Remarks</div>
            <textarea
              rows={4}
              value={editRemarks}
              onChange={e => setEditRemarks(e.target.value)}
              placeholder="Add your remarks here..."
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F9FAFB",
                resize: "none", lineHeight: 1.6,
              }}
            />
          </div>
        </div>
        <div style={{ padding: "14px 22px 20px", borderTop: "1px solid #EAECF0", flexShrink: 0 }}>
          <button
            onClick={() => {
              if (isReviseMode) {
                onSubmit({ results, remarks: editRemarks });
              } else {
                setPhase("review");
              }
            }}
            style={{
              width: "100%", padding: "13px 0", border: "none", borderRadius: 12,
              background: "#2979FF", fontSize: 14, fontWeight: 700, color: "#fff",
              cursor: "pointer", fontFamily: FONT,
            }}
          >
            Update Result
          </button>
        </div>
      </Wrapper>
    );
  }

  // ── Phase 2: Post-update review ─────────────────────────────────────────────
  return (
    <Wrapper>
      <div style={{ overflowY: "auto", flex: 1, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 18 }}>

        <FirmTableReadOnly />

        {/* EMD Refund Request */}
        {hasLost && (
          <div style={{
            background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10,
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#C2410C", marginBottom: 4 }}>
              EMD Refund Request
            </div>
            <div style={{ fontSize: 12, color: "#9A3412" }}>
              EMD Amount: ₹50,000 ({lostFirms.join(", ")})
            </div>
          </div>
        )}

        {/* Per-firm lost warning */}
        {lostFirms.map(firm => (
          <div key={firm} style={{
            background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10,
            padding: "12px 14px", fontSize: 12, color: "#92400E",
          }}>
            {firm} bid marked as Lost. Proceed with EMD Return.
          </div>
        ))}

        {/* Refund Request Details */}
        {hasLost && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>
              Refund Request Details
            </div>
            <textarea
              rows={3}
              value={refundDetails}
              onChange={e => setRefundDetails(e.target.value)}
              placeholder="Add refund details here..."
              style={{
                width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
                padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
                boxSizing: "border-box", outline: "none", background: "#F9FAFB",
                resize: "none", lineHeight: 1.6,
              }}
            />
          </div>
        )}

        {/* Supporting Documents */}
        {hasLost && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>
              Supporting Documents
            </div>
            <div style={{
              border: "1.5px solid #E5E7EB", borderRadius: 10,
              padding: "12px 14px", background: "#F9FAFB",
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, color: "#9CA3AF", cursor: "pointer",
            }}>
              <Paperclip size={14} color="#9CA3AF" />
              EMD for Tender ID
            </div>
          </div>
        )}

        {/* Remarks */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Remarks</div>
          <textarea
            rows={4}
            value={reviewRemarks}
            onChange={e => setReviewRemarks(e.target.value)}
            placeholder="Add your remarks here..."
            style={{
              width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10,
              padding: "10px 12px", fontSize: 13, color: "#374151", fontFamily: FONT,
              boxSizing: "border-box", outline: "none", background: "#F9FAFB",
              resize: "none", lineHeight: 1.6,
            }}
          />
        </div>

        {/* Notification info */}
        <div style={{
          border: "1px solid #E5E7EB", borderRadius: 10,
          padding: "14px 16px", background: "#F9FAFB",
          fontSize: 12, color: "#667085", lineHeight: 2,
        }}>
          <div style={{ fontWeight: 600, color: "#344054", marginBottom: 4 }}>
            Notification will be sent to:
          </div>
          <div>Sales Person</div>
          <div>Sales Coordinator</div>
          <div>Accounts Department</div>
        </div>
      </div>

      <div style={{ padding: "14px 22px 20px", borderTop: "1px solid #EAECF0", flexShrink: 0 }}>
        <button
          onClick={() => onSubmit({ results })}
          style={{
            width: "100%", padding: "13px 0", border: "none", borderRadius: 12,
            background: "#2979FF", fontSize: 14, fontWeight: 700, color: "#fff",
            cursor: "pointer", fontFamily: FONT,
          }}
        >
          Submit
        </button>
      </div>
    </Wrapper>
  );
};

export default FirmWiseResultModal;
