import { useState } from "react";
import { X, CheckCircle2, Download, FileText, DownloadCloud, Eye } from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const FIRMS = [
  { name: "CIPL", status: "Submitted", emd: "Submitted" },
  { name: "UV", status: "Submitted", emd: "Submitted" },
  { name: "NIPL", status: "Submitted", emd: "Submitted" },
];

const DOCUMENTS = [
  { name: "Tender file (RFP)", uploader: "Team/ Person Name", date: "Date & Time" },
  { name: "ATC", uploader: "Team/ Person Name", date: "Date & Time" },
  { name: "GeM", uploader: "Team/ Person Name", date: "Date & Time" },
  { name: "RFP Analysis", uploader: "Team/ Person Name", date: "Date & Time" },
  { name: "EMD", uploader: "Team/ Person Name", date: "Date & Time" },
  { name: "OEM", uploader: "Team/ Person Name", date: "Date & Time" },
];

const BidSubmissionModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 990,
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 991,
          width: 860,
          maxWidth: "96vw",
          maxHeight: "90vh",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)",
          fontFamily: FONT,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "bsmFadeIn 0.2s ease-out",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid #EAECF0",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 size={24} color="#16A34A" />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Bid Submission Details
              </h2>
              <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
                Tender Submission & Uploaded Document Summary
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", border: "1px solid #D1D5DB", borderRadius: 8,
                background: "#fff", fontSize: 13, fontWeight: 600, color: "#374151",
                cursor: "pointer", fontFamily: FONT, transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              <Download size={15} /> Download Summary
            </button>
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
        </div>

        {/* ── Body ── */}
        <div className="thin-scrollbar" style={{ padding: "24px 28px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Details Card */}
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px", background: "#F9FAFB" }}>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Tender ID</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2563EB" }}>TND-2026-001</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Customer Name</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Customer Name</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Tender Title</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Tender Title</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Bid Value</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Price</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Submission Date</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Date</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Submission By</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Name</div>
            </div>
          </div>

          {/* Participating Firms */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 14px" }}>Participating Firms</h3>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4 }}>
              {FIRMS.map(firm => (
                <div key={firm.name} style={{ flex: 1, minWidth: 200, border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, background: "#fff" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 12 }}>{firm.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ padding: "2px 8px", background: "#DCFCE7", color: "#16A34A", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{firm.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#4B5563" }}>EMD: <span style={{ color: "#111827", fontWeight: 500 }}>{firm.emd}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 14px" }}>Documents</h3>
            <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                  <tr style={{ background: "#F3F4F6" }}>
                    <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#4B5563", borderBottom: "1px solid #E5E7EB" }}>File Name</th>
                    <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#4B5563", borderBottom: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>Uploaded By</th>
                    <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#4B5563", borderBottom: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>Upload Date & Time</th>
                    <th style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#4B5563", borderBottom: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {DOCUMENTS.map((doc, i) => (
                    <tr key={i} style={{ background: "#fff", transition: "background 0.15s" }}>
                      <td style={{ padding: "12px 16px", borderBottom: i === DOCUMENTS.length - 1 ? "none" : "1px solid #E5E7EB", textAlign: "left" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#111827", fontWeight: 500 }}>
                          <FileText size={16} color="#6B7280" /> {doc.name}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#4B5563", borderBottom: i === DOCUMENTS.length - 1 ? "none" : "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>
                        {doc.uploader}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#4B5563", borderBottom: i === DOCUMENTS.length - 1 ? "none" : "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>
                        {doc.date}
                      </td>
                      <td style={{ padding: "12px 16px", borderBottom: i === DOCUMENTS.length - 1 ? "none" : "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>
                        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: FONT }}>
                          <Eye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bsmFadeIn {
          from { opacity: 0; transform: translate(-50%, -48%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
};

export default BidSubmissionModal;
