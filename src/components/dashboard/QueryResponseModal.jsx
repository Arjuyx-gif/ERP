import { useState, useRef } from "react";
import { X, FileText, Upload } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const QueryResponseModal = ({ card, onClose, onUpdate }) => {
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [queryFile, setQueryFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreBidSubmitted, setIsPreBidSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const queryFileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const validFile = selectedFiles.find((f) => {
      const fileName = f.name.toLowerCase();
      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    });

    if (!validFile) {
      setErrorMsg("Only PDF or Word documents are allowed.");
      e.target.value = "";
      return;
    }

    setErrorMsg("");
    setFile(validFile);
    e.target.value = "";
  };

  const handleSubmit = () => {
    if (card?.isPreBidQueryPending && !isPreBidSubmitted) {
      setIsPreBidSubmitted(true);
      setErrorMsg("");
      return;
    }

    if (!file) {
      setErrorMsg("Please upload a response document before submitting.");
      return;
    }
    onUpdate?.({
      cardId: card.id,
      status: "Submitted",
      remarks,
      files: [file],
    });
  };

    // Query modal — either from Kanban or from Task Dashboard B (upload action)
    // Query modal is open, but we need to check if it's view mode or approval mode
  const isViewMode = card?.action === "View Submission";
  const isApprovalMode = !!(card?.isApprovalPending);

  if (!card) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 970,
          background: "rgba(0,0,0,0.22)",
        }}
      />

      {/* Modal Container */}
        <div style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
          zIndex: 971, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div
            style={{
              position: "relative",
              width: 540,
              maxWidth: "92vw",
              maxHeight: "90vh",
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
              fontFamily: FONT,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "qrmFadeIn 0.2s ease-out",
            }}
          >
        {/* ── Header ── */}
        <div
          style={{
            padding: "22px 28px 14px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
              {card.isPostBidQueryPending ? "Post-Bid Query" : "Pre-Bid Query"}
            </h2>
            <div style={{ fontSize: 13, color: "#4B5563", display: "flex", alignItems: "center", gap: 12 }}>
              <span>
                Tender ID: <strong style={{ color: card.isPostBidQueryPending || isPreBidSubmitted ? "#111827" : "#2563EB", fontWeight: 600 }}>{card.id}</strong>
              </span>
              <span style={{ color: "#6B7280" }}>
                {card.isPostBidQueryPending ? "Post-Bid Query Submission" : "Pre-Bid Query Submission"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", padding: 6, borderRadius: 6,
              cursor: "pointer", color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#E5E7EB", margin: "0 28px" }} />

        {/* ── Body ── */}
        <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "22px 28px 10px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Query Document */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 8 }}>
              Query Document
            </label>
            {!queryFile && card?.showQueryUploadZone && !isPreBidSubmitted && !isViewMode && !isApprovalMode ? (
              <div
                onClick={() => queryFileInputRef.current?.click()}
                style={{
                  border: "1px dashed #D1D5DB", borderRadius: 8, padding: "24px 16px",
                  background: "#fff", cursor: "pointer", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#2563EB";
                  e.currentTarget.style.background = "#F8FAFC";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#D1D5DB";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <Upload size={24} color="#6B7280" />
                <div style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>Click to Upload Query Document</div>
              </div>
            ) : queryFile && !isPreBidSubmitted && !isViewMode && !isApprovalMode ? (
              <div style={{
                border: "1px solid #D1D5DB", borderRadius: 8, padding: "16px",
                display: "flex", alignItems: "flex-start", gap: 12, background: "#F9FAFB"
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={18} color="#2563EB" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 4, wordBreak: "break-all" }}>{queryFile.name}</div>
                  <button onClick={() => setQueryFile(null)} style={{ background: "none", border: "none", padding: 0, color: "#DC2626", fontSize: 12, cursor: "pointer", fontWeight: 500, fontFamily: FONT }}>
                    Remove Document
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                border: "1px solid #D1D5DB", borderRadius: 8, padding: "16px",
                display: "flex", alignItems: "flex-start", gap: 12, background: "#F9FAFB"
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={18} color="#2563EB" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 4 }}>Query_Document_RFP_2026_006.pdf</div>
                  <button style={{ background: "none", border: "none", padding: 0, color: "#4B5563", fontSize: 12, cursor: "pointer", fontWeight: 500, fontFamily: FONT }}>
                    Download Document
                  </button>
                </div>
              </div>
            )}
            <input
              ref={queryFileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) setQueryFile(f);
                e.target.value = "";
              }}
              style={{ display: "none" }}
            />
          </div>
          
          {/* Response Document (Only shown in view mode or approval mode) */}
          {(isViewMode || isApprovalMode) && (
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 8 }}>
                Response Document
              </label>
              <div style={{
                border: "1px solid #D1D5DB", borderRadius: 8, padding: "16px",
                display: "flex", alignItems: "flex-start", gap: 12, background: "#F9FAFB"
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={18} color="#2563EB" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 4 }}>Query_Document_RFP_2026_006.pdf</div>
                  <button style={{ background: "none", border: "none", padding: 0, color: "#4B5563", fontSize: 12, cursor: "pointer", fontWeight: 500, fontFamily: FONT }}>
                    Download Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Remarks */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 8 }}>
              Remarks
            </label>
            {isViewMode ? (
              <div style={{
                width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 14px",
                fontSize: 14, color: "#6B7280", fontFamily: FONT, boxSizing: "border-box",
                background: "#F9FAFB", minHeight: 80,
              }}>
                Remarks by team or manager...
              </div>
            ) : (
              <textarea
                rows={4}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="Add your remarks here..."
                style={{
                  width: "100%", border: "1px solid #D1D5DB", borderRadius: 8, padding: "12px 14px",
                  fontSize: 14, color: "#111827", fontFamily: FONT, boxSizing: "border-box",
                  outline: "none", resize: "vertical", background: "#F9FAFB",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
                onFocus={e => {
                  e.target.style.borderColor = "#2563EB";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                  e.target.style.background = "#fff";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#D1D5DB";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#F9FAFB";
                }}
              />
            )}
          </div>

          {/* Upload Response Document (Not in view mode or approval mode) */}
          {!isViewMode && !isApprovalMode && (
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 8 }}>
                Upload Response Document (PDF/Word)
              </label>
              {errorMsg && (
                <div style={{ marginBottom: 12, fontSize: 13, color: "#D92D20", display: "flex", alignItems: "center", gap: 6 }}>
                  {errorMsg}
                </div>
              )}
              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: "1px dashed #D1D5DB", borderRadius: 8, padding: "24px 16px",
                    background: "#fff", cursor: "pointer", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.background = "#F8FAFC";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#D1D5DB";
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  <Upload size={24} color="#6B7280" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 4 }}>Click to upload response document</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>PDF or Word files accepted</div>
                  </div>
                </div>
              ) : (
                <div style={{
                  border: "1px solid #D1D5DB", borderRadius: 8, padding: "16px",
                  display: "flex", alignItems: "flex-start", gap: 12, background: "#F9FAFB"
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={18} color="#2563EB" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 4, wordBreak: "break-all" }}>{file.name}</div>
                    <button onClick={() => setFile(null)} style={{ background: "none", border: "none", padding: 0, color: "#DC2626", fontSize: 12, cursor: "pointer", fontWeight: 500, fontFamily: FONT }}>
                      Remove Document
                    </button>
                  </div>
                </div>
              )}
              <input onChange={handleFileChange} ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} />
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding: "16px 28px 22px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            justifyContent: isViewMode ? "center" : "flex-end",
            flexShrink: 0,
          }}
        >
         {isViewMode ? (
            <button
              type="button"
              onClick={onClose}
              style={{
                width: "100%", padding: "10px 0", border: "1px solid #E5E7EB", borderRadius: 8,
                background: "#fff", fontSize: 14, fontWeight: 600, color: "#111827",
                cursor: "pointer", fontFamily: FONT,
              }}
            >
              Approved
            </button>
          ) : isApprovalMode ? (
            <>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1, padding: "10px 0", border: "none", borderRadius: 8,
                  background: "#DC2626", fontSize: 14, fontWeight: 600, color: "#fff",
                  cursor: "pointer", fontFamily: FONT,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#B91C1C"}
                onMouseLeave={e => e.currentTarget.style.background = "#DC2626"}
              >
                Reject
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1, padding: "10px 0", border: "none", borderRadius: 8,
                  background: "#16A34A", fontSize: 14, fontWeight: 600, color: "#fff",
                  cursor: "pointer", fontFamily: FONT,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#15803D"}
                onMouseLeave={e => e.currentTarget.style.background = "#16A34A"}
              >
                Approve
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "10px 28px", border: "1px solid #D1D5DB", borderRadius: 8,
                  background: "#fff", fontSize: 14, fontWeight: 600, color: "#374151",
                  cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  padding: card.isPostBidQueryPending ? "10px 36px" : "10px 24px", border: "none", borderRadius: 8,
                  background: "#2563EB", fontSize: 14, fontWeight: 600, color: "#fff",
                  cursor: "pointer", fontFamily: FONT, boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                  transition: "background 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#1D4ED8";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.35)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#2563EB";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(37,99,235,0.25)";
                }}
              >
                {card.isPostBidQueryPending || (card.isPreBidQueryPending && !isPreBidSubmitted) ? "Submit" : "Submit & Send for Review"}
              </button>
            </>
          )}
        </div>
        </div>
      </div>

      <style>{`
        @keyframes qrmFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default QueryResponseModal;
