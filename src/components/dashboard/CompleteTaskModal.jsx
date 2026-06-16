import { useState, useRef } from "react";
import { X, Paperclip, ChevronRight, FileText, Trash2, ChevronLeft, UploadCloud, Edit, Download, Save, Send } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

// ─── OEM Docs Table Data ───────────────────────────────────────────────────────
const OEM_DOCS_COLUMNS = [
  "S.No.",
  "Item Description",
  "Qty",
  "Make",
  "Modal",
  "R&R",
  "Mail Sent",
  "MAF",
  "Technical Compliance (on OEM Letter Head)",
  "BOM ON OEM Letter head",
  "MII Declaration",
  "Datasheet",
  "OEM Backend Support Undertaking Annexure - VI",
  "List of Software Components to be used in NGET DR System",
  "Management & Monitoring Platform",
  "Land Border Declaration",
  "No Deviation",
  "ISO 9001:2015 Quality Management System Certification",
  "NON EOS/EOL",
  "Escalation/Support Matrix",
  "Non-Malicious Dec...",
  "Solution Document",
  "Service Centre Support",
  "Commercial Support 5 years 24 X 7 6hr CTR",
  "OEM Experience Certificates",
];

const OEM_DOCS_ROWS = [
  ["1", "NA", "", "NA", "", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA"],
  ["2", "NA", "", "NA", "", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA"],
];

// ─── OEM Docs Full-Screen View ─────────────────────────────────────────────────
const OEMDocsView = ({ onBack }) => {
  const thStyle = {
    padding: "10px 14px",
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#6B7280",
    background: "#F8FAFC",
    borderBottom: "2px solid #E5E7EB",
    borderRight: "1px solid #E5E7EB",
    whiteSpace: "nowrap",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 2,
    minWidth: 100,
  };

  const tdStyle = (isEven) => ({
    padding: "10px 14px",
    fontSize: 12,
    color: "#374151",
    borderBottom: "1px solid #F3F4F6",
    borderRight: "1px solid #E5E7EB",
    verticalAlign: "middle",
    background: isEven ? "#FFFBEB" : "#fff",
    whiteSpace: "nowrap",
  });

  const statusPill = (text) => {
    const isSubmitted = /submitted|✓/i.test(text);
    const isPending = /pending/i.test(text);
    return (
      <span style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 600,
        background: isSubmitted ? "#DCFCE7" : isPending ? "#FEF3C7" : "#F1F5F9",
        color: isSubmitted ? "#15803D" : isPending ? "#B45309" : "#475569",
      }}>
        {text}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onBack}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 980,
          background: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Full-width modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 981,
          width: "min(96vw, 1400px)",
          maxHeight: "86vh",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 24px 64px rgba(0,0,0,0.20)",
          fontFamily: FONT,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "oemSlideIn 0.2s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={onBack}
              style={{
                background: "#F3F4F6",
                border: "none",
                borderRadius: 8,
                width: 34,
                height: 34,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E5E7EB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F3F4F6")}
            >
              <ChevronLeft size={18} color="#374151" />
            </button>
            <div>
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9CA3AF",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                OEM Documents
              </p>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
                OEM Documentation Status
              </span>
            </div>
          </div>
          <button
            onClick={onBack}
            style={{
              background: "#F3F4F6",
              border: "none",
              borderRadius: 8,
              width: 32,
              height: 32,
              color: "#6B7280",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable table */}
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            flex: 1,
            margin: 16,
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
            <thead>
              <tr>
                {OEM_DOCS_COLUMNS.map((h, i) => (
                  <th key={i} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OEM_DOCS_ROWS.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={tdStyle(i % 2 === 0)}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 24px 16px",
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexShrink: 0,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                padding: "9px 16px", border: "none", borderRadius: 8, background: "none",
                fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6
              }}
            >
              <UploadCloud size={14} /> Upload
            </button>
            <button
              style={{
                padding: "9px 16px", border: "none", borderRadius: 8, background: "none",
                fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6
              }}
            >
              <Edit size={14} /> Edit
            </button>
            <button
              style={{
                padding: "9px 16px", border: "none", borderRadius: 8, background: "none",
                fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6
              }}
            >
              <Download size={14} /> Download
            </button>
            <button
              style={{
                padding: "9px 16px", border: "none", borderRadius: 8, background: "none",
                fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6
              }}
            >
              <Save size={14} /> Save Draft
            </button>
            <button
              onClick={onBack}
              style={{
                padding: "9px 24px",
                border: "none",
                borderRadius: 8,
                background: "#2979FF",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
                fontFamily: FONT,
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              <Send size={14} /> Submit
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes oemSlideIn {
          from { opacity: 0; transform: translate(-50%, -48%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
};

// ─── CompleteTaskModal ─────────────────────────────────────────────────────────

const CompleteTaskModal = ({ card, onClose, onUpdate }) => {
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [files, setFiles] = useState([]);
  const [oemStatus, setOemStatus] = useState("100% Completed");
  const [showOEMDocs, setShowOEMDocs] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  if (!card) return null;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      setErrorMsg("");
    }
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdate = () => {
    if (files.length === 0) {
      setErrorMsg("Please attach files before submitting.");
      return;
    }
    onUpdate?.({
      cardId: card.id,
      status,
      remarks,
      files,
      oemStatus,
    });
    onClose?.();
  };

  // If OEM Docs are open, render them instead
  if (showOEMDocs) {
    return <OEMDocsView onBack={() => setShowOEMDocs(false)} />;
  }

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

      {/* Modal — right-aligned over the RFP form panel */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "20%",
          transform: "translateY(-50%)",
          zIndex: 971,
          width: 480,
          maxWidth: "42vw",
          maxHeight: "88vh",
          background: "#fff",
          borderRadius: 14,
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
          fontFamily: FONT,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "ctmFadeIn 0.2s ease-out",
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
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#101828",
                marginBottom: 4,
              }}
            >
              Complete Task
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#667085",
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              <span>
                Tender ID:{" "}
                <strong style={{ color: "#101828", fontWeight: 600 }}>
                  {card.id}
                </strong>
              </span>
              <span style={{ marginLeft: 8 }}>
                Customer:{" "}
                <strong style={{ color: "#101828", fontWeight: 600 }}>
                  {card.customer || "Customer Name"}
                </strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#98A2B3",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "#EAECF0",
            margin: "0 28px",
          }}
        />

        {/* ── Body ── */}
        <div
          className="thin-scrollbar"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "22px 28px 10px",
          }}
        >
          {/* Status */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101828",
                display: "block",
                marginBottom: 8,
              }}
            >
              Status
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #D0D5DD",
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: 14,
                color: "#101828",
                fontFamily: FONT,
                boxSizing: "border-box",
                outline: "none",
                background: "#fff",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2979FF";
                e.target.style.boxShadow = "0 0 0 3px rgba(41,121,255,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#D0D5DD";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Remarks */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101828",
                display: "block",
                marginBottom: 8,
              }}
            >
              Remarks
            </label>
            <textarea
              rows={5}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add your remarks here..."
              style={{
                width: "100%",
                border: "1px solid #D0D5DD",
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: 14,
                color: "#101828",
                fontFamily: FONT,
                boxSizing: "border-box",
                outline: "none",
                resize: "vertical",
                background: "#fff",
                lineHeight: 1.6,
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2979FF";
                e.target.style.boxShadow = "0 0 0 3px rgba(41,121,255,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#D0D5DD";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Attach Files */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101828",
                display: "block",
                marginBottom: 8,
              }}
            >
              Attach Files<span style={{ color: "#F04438" }}>*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                border: "1px solid #D0D5DD",
                borderRadius: 8,
                padding: "14px 16px",
                background: "#F9FAFB",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: FONT,
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#2979FF";
                e.currentTarget.style.background = "#F5F8FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#D0D5DD";
                e.currentTarget.style.background = "#F9FAFB";
              }}
            >
              <Paperclip size={18} color="#667085" />
              <span style={{ fontSize: 13, color: "#98A2B3" }}>
                Click to attach files...
              </span>
            </button>

            {/* Attached file list */}
            {files.length > 0 && (
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      background: "#F9FAFB",
                      borderRadius: 8,
                      border: "1px solid #EAECF0",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FileText size={14} color="#2979FF" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: "#344054",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {file.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#98A2B3" }}>
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 4,
                        borderRadius: 6,
                        display: "flex",
                        color: "#F04438",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div style={{ marginTop: 8, fontSize: 13, color: "#D92D20", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
                {errorMsg}
              </div>
            )}
          </div>

          {/* OEM Status — clickable arrow opens OEM docs */}
          <div style={{ marginBottom: 12 }}>
            <button
              type="button"
              onClick={() => setShowOEMDocs(true)}
              style={{
                width: "100%",
                border: "none",
                background: "none",
                padding: "10px 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: FONT,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#101828",
                }}
              >
                OEM Status
              </span>
              <ChevronRight
                size={18}
                color="#667085"
                style={{ transition: "transform 0.2s ease" }}
              />
            </button>

            {/* OEM Status value */}
            <div
              style={{
                border: "1px solid #D0D5DD",
                borderRadius: 8,
                padding: "12px 14px",
                background: "#F9FAFB",
                fontSize: 14,
                color: "#101828",
                marginTop: 4,
              }}
            >
              {oemStatus}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding: "16px 28px 22px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            justifyContent: "flex-end",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "11px 32px",
              border: "1px solid #D0D5DD",
              borderRadius: 8,
              background: "#fff",
              fontSize: 14,
              fontWeight: 500,
              color: "#344054",
              cursor: "pointer",
              fontFamily: FONT,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#F9FAFB")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#fff")
            }
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            style={{
              padding: "11px 40px",
              border: "none",
              borderRadius: 8,
              background: "#2979FF",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              fontFamily: FONT,
              boxShadow: "0 2px 8px rgba(41,121,255,0.28)",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1565C0";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(41,121,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2979FF";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(41,121,255,0.28)";
            }}
          >
            Update
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes ctmFadeIn {
          from { opacity: 0; transform: translateY(-48%); }
          to   { opacity: 1; transform: translateY(-50%); }
        }
      `}</style>
    </>
  );
};

export default CompleteTaskModal;
