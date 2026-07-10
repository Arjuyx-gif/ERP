import { useState, useRef } from "react";
import { X, FileText, Upload } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const SECTIONS = [
  {
    title: "Pre-Sales Checklist",
    items: [{ primary: "Pre-Sales Checklist", secondary: "View Document" }],
  },
  {
    title: "Alert & Notify",
    items: [{ primary: "View List", secondary: null }],
  },
  {
    title: "OEM Document",
    items: [{ primary: "OEM Document", secondary: "View Document" }],
  },
  {
    title: "Pre-Bid Query",
    items: [{ primary: "Query & Response", secondary: "View Document" }],
  },
  {
    title: "Post-Bid Query & Response",
    items: [{ primary: "Query & Response", secondary: "View Document" }],
  },
];

const TEAMS = ["Purchase", "Service Team", "Accounts", "DTSS"];

const PSDocumentsModal = ({ row, onClose }) => {
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditingTeams, setIsEditingTeams] = useState(false);
  const fileInputRef = useRef(null);

  if (!row) return null;

  const tenderId = row.id || "TND-2024-1523";
  const isWonUpload = row.isWonUpload === true;

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
    e.target.value = "";
  };

  const toggleTeam = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  return (
    <>
      <style>{`
        @keyframes psDocsBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes psDocsModalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Wrapper to center over the right 68% panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
        zIndex: 1100,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Backdrop (covers the entire wrapper, or could cover entire screen via another element) */}
        <div
          onClick={() => onClose?.()}
          style={{
            position: "fixed", inset: 0, zIndex: 1099,
            background: "rgba(0,0,0,0.30)",
            animation: "psDocsBackdropIn 0.25s ease-out both",
          }}
        />

        {/* Modal */}
        <div style={{
          position: "relative", zIndex: 1101,
          background: "#fff", borderRadius: 14, width: 520,
          maxHeight: "85vh", display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.1)",
          fontFamily: FONT, overflow: "hidden",
          animation: "psDocsModalIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
        }}>

          {/* ── Header ── */}
        <div style={{
          padding: "22px 24px 14px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#111827" }}>
              Documents
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>
              Tender ID: {tenderId}
            </p>
          </div>
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

        <div style={{ height: 1, background: "#E5E7EB", margin: "0 24px" }} />

        {/* ── Body ── */}
        <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "20px 24px 4px" }}>
          {SECTIONS.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: 20 }}>
              {/* Section title */}
              <div style={{
                fontSize: 14, fontWeight: 600, color: "#111827",
                marginBottom: 10,
              }}>
                {section.title}
              </div>

              {/* Document cards */}
              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  style={{
                    background: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 12,
                    cursor: "pointer",
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#DBEAFE";
                    e.currentTarget.style.borderColor = "#93C5FD";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#EFF6FF";
                    e.currentTarget.style.borderColor = "#BFDBFE";
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "#2563EB", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <FileText size={18} color="#fff" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 600, color: "#1E3A5F",
                      marginBottom: item.secondary ? 2 : 0,
                    }}>
                      {item.primary}
                    </div>
                    {item.secondary && (
                      <div style={{
                        fontSize: 12, color: "#3B82F6", fontWeight: 500,
                      }}>
                        {item.secondary}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* ── Won Upload Sections ── */}
          {isWonUpload && (
            <div style={{ marginTop: 24 }}>
              {!isSubmitted ? (
                <>
                  {/* Upload Document */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 10 }}>
                      Upload Document
                    </div>
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
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>Click to Upload Document</div>
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
                    <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{ display: "none" }} />
                  </div>

                  {/* Remarks */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 10 }}>
                      Remarks
                    </div>
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
                        e.target.style.background = "#fff";
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = "#D1D5DB";
                        e.target.style.background = "#F9FAFB";
                      }}
                    />
                  </div>

                  {/* Select Teams */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Select Teams - Send File & Notify</div>
                      <button style={{ background: "none", border: "none", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
                        Add+
                      </button>
                    </div>
                    <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                      {TEAMS.map((team, idx) => (
                        <div key={team} style={{
                          padding: "12px 14px", borderBottom: idx < TEAMS.length - 1 ? "1px solid #E5E7EB" : "none",
                          display: "flex", alignItems: "center", gap: 10, background: "#F9FAFB",
                        }}>
                          <input
                            type="checkbox"
                            checked={selectedTeams.includes(team)}
                            onChange={() => toggleTeam(team)}
                            style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#00A63E" }}
                          />
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{team}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Submitted State View */
                <div>
                  {/* Remarks - only visible when editing */}
                  {isEditingTeams && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 10 }}>
                        Remarks
                      </div>
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
                          e.target.style.background = "#fff";
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = "#D1D5DB";
                          e.target.style.background = "#F9FAFB";
                        }}
                      />
                    </div>
                  )}

                  {/* Summary Box */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Document sent & Teams Notify</div>
                      <button 
                        onClick={() => setIsEditingTeams(!isEditingTeams)}
                        style={{ background: "none", border: "none", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}
                      >
                        Add+
                      </button>
                    </div>
                    <div style={{ 
                      background: "#FFF7ED", border: "1px solid #FFEDD5", 
                      borderRadius: 8, padding: "16px 20px",
                      fontSize: 13, fontWeight: 500, color: "#4B5563" 
                    }}>
                      Document sent to {selectedTeams.length > 0 ? selectedTeams.join(" and ") : "Purchase and Service Team"}
                    </div>
                  </div>

                  {/* Select Teams - only visible when editing */}
                  {isEditingTeams && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Select Teams - Send File & Notify</div>
                        <button style={{ background: "none", border: "none", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
                          Add+
                        </button>
                      </div>
                      <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                        {TEAMS.map((team, idx) => (
                          <div key={team} style={{
                            padding: "12px 14px", borderBottom: idx < TEAMS.length - 1 ? "1px solid #E5E7EB" : "none",
                            display: "flex", alignItems: "center", gap: 10, background: "#F9FAFB",
                          }}>
                            <input
                              type="checkbox"
                              checked={selectedTeams.includes(team)}
                              onChange={() => toggleTeam(team)}
                              style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#00A63E" }}
                            />
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{team}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ padding: "12px 24px 20px", flexShrink: 0 }}>
          {isWonUpload && (!isSubmitted || isEditingTeams) ? (
            <button
              onClick={() => {
                console.log("Submit & Send:", { file, remarks, selectedTeams });
                setIsSubmitted(true);
                setIsEditingTeams(false);
              }}
              style={{
                width: "100%", padding: "12px 0",
                border: "none", borderRadius: 8,
                background: "#00A63E", fontSize: 14, fontWeight: 600,
                color: "#fff", cursor: "pointer", fontFamily: FONT,
                transition: "background 0.15s, box-shadow 0.15s",
                boxShadow: "0 2px 8px rgba(0,166,62,0.25)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#008B34";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,166,62,0.35)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#00A63E";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,166,62,0.25)";
              }}
            >
              Submit & Send
            </button>
          ) : (
            <button
              onClick={() => onClose?.()}
              style={{
                width: "100%", padding: "11px 0",
                border: "1px solid #D1D5DB", borderRadius: 10,
                background: "#fff", fontSize: 14, fontWeight: 600,
                color: "#111827", cursor: "pointer", fontFamily: FONT,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              Close
            </button>
          )}
        </div>

      </div>
      </div>
    </>
  );
};

export default PSDocumentsModal;
