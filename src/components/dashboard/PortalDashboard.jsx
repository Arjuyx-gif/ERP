import { useState, useRef } from "react";
import {
  Edit3, Eye, Upload, FileText, UploadCloud, Plus, History, X
} from "lucide-react";

const FONT = "'Inter','Segoe UI',sans-serif";

const TABLE_DATA = [
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "-", results: "-", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Bid Submitted", deadline: "08/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Uploaded", results: "-", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Awaiting Response", deadline: "08/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Submitted", results: "-", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Awaiting Response", deadline: "08/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 2 - Uploaded", results: "Update", poStatus: "-", gemCharges: "-", addDocs: "-", revisedResults: "-", stage: "Awaiting Response", deadline: "09/06/2026", action: "Update", actionIcon: Edit3 },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 2 - Query & Response", results: "Won", poStatus: "PO Uploaded", gemCharges: "Amount", addDocs: "Uploaded", revisedResults: "NA", stage: "PO & Gem Charges Updated", deadline: "09/06/2026", action: "View", actionIcon: Eye, highlight: "green" },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Submitted", results: "Lost", poStatus: "NA", gemCharges: "NA", addDocs: "NA", revisedResults: "NA", stage: "-", deadline: "08/06/2026", action: "View", actionIcon: Eye },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 1 - Submitted", results: "Lost", poStatus: "Pending", gemCharges: "-", addDocs: "-", revisedResults: "L2", stage: "changed status to L2", deadline: "08/06/2026", action: "Upload PO", actionIcon: Upload },
  { id: "TND-2026-045", firm: "Firm Name", title: "Tender Title", customer: "Customer Name", portal: "Portal Name", pbq: "Round 2 - Query & Response", results: "Won", poStatus: "NA", gemCharges: "NA", addDocs: "NA", revisedResults: "Bid Canceled", stage: "Bid Canceled", deadline: "08/06/2026", action: "View", actionIcon: Eye },
];

const TIMELINE = [
  { title: "Post-Bid Query Uploaded", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "Result Updated to L1", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "Result Updated to Won", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "Customer PO Uploaded", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "GeM Charges Updated", tender: "TND-2026-045", time: "Today, 11:30 AM" },
  { title: "_________ changed LOST status to L2 - PO Awaiting", tender: "TND-2026-045", time: "Today, 11:30 AM" },
];

const QUICK_ACTIONS = [
  { label: "Update Result", icon: FileText, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Upload Post-Bid Queries", icon: UploadCloud, color: "#D97706", bg: "#FEF3C7" },
  { label: "Upload PO & Additional Charges", icon: FileText, color: "#DC2626", bg: "#FEE2E2" },
  { label: "Update GeM Charges", icon: Plus, color: "#9333EA", bg: "#F3E8FF" },
  { label: "View Historical Queries", icon: History, color: "#4B5563", bg: "#F3F4F6" },
  { label: "Open Assigned Tender", icon: Eye, color: "#059669", bg: "#ECFDF5" },
];

// ── Documents view modal ("View" action) ────────────────────────────────────
const DocRow = ({ fileName }) => (
  <div style={{
    border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 14px",
    display: "flex", alignItems: "center", gap: 12, background: "#F9FAFB", marginBottom: 10,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 6, background: "#EFF6FF",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <FileText size={18} color="#2563EB" />
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 3 }}>{fileName}</div>
      <button style={{ background: "none", border: "none", padding: 0, color: "#2563EB", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>
        View Document
      </button>
    </div>
  </div>
);

const DocSection = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>{title}</h3>
    {children}
  </div>
);

const DocumentsModal = ({ row, onClose }) => {
  if (!row) return null;

  const hasRound1 = row.pbq && row.pbq !== "-";
  const hasRound2 = row.pbq && row.pbq.includes("Round 2");
  const hasPO = row.poStatus && row.poStatus !== "-" && row.poStatus !== "NA";
  const hasGem = row.gemCharges && row.gemCharges !== "-" && row.gemCharges !== "NA";
  const hasAddDocs = row.addDocs && row.addDocs !== "-" && row.addDocs !== "NA";

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 970, background: "rgba(0,0,0,0.22)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 971, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 520, maxWidth: "92vw", maxHeight: "88vh", background: "#fff", borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
          fontFamily: FONT, display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{ padding: "22px 28px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>Documents</h2>
              <div style={{ fontSize: 13, color: "#2563EB" }}>Tender ID: <strong>{row.id}</strong></div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", padding: 6, borderRadius: 6, cursor: "pointer", color: "#6B7280", display: "flex" }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ height: 1, background: "#E5E7EB", margin: "0 28px" }} />

          <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "22px 28px 8px" }}>
            {hasRound1 && (
              <DocSection title="Post-Bid Query & Response - ROUND 1">
                <DocRow fileName="Query_Document_RFP_2026_006.pdf" />
                <DocRow fileName="Query_Document_RFP_2026_006.pdf" />
              </DocSection>
            )}
            {hasRound2 && (
              <DocSection title="Post-Bid Query & Response - ROUND 2">
                <DocRow fileName="Query_Document_RFP_2026_006.pdf" />
                <DocRow fileName="Query_Document_RFP_2026_006.pdf" />
              </DocSection>
            )}
            {hasPO && (
              <DocSection title="PO">
                <DocRow fileName="PO Document.pdf" />
              </DocSection>
            )}
            {hasGem && (
              <DocSection title="Gem Charges">
                <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 14px", background: "#F9FAFB", fontSize: 13, color: "#374151" }}>
                  {row.gemCharges}
                </div>
              </DocSection>
            )}
            {hasAddDocs && (
              <DocSection title="Additional Documents">
                <DocRow fileName="Additional Document.pdf" />
              </DocSection>
            )}
          </div>

          <div style={{ padding: "16px 28px 22px", flexShrink: 0 }}>
            <button onClick={onClose} style={{
              width: "100%", padding: "10px 0", border: "1px solid #D1D5DB", borderRadius: 8,
              background: "#fff", fontSize: 14, fontWeight: 600, color: "#111827",
              cursor: "pointer", fontFamily: FONT,
            }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Upload PO / GeM Charges / Additional Doc modal ("Upload PO" action) ─────
const UploadField = ({ label, fileName, onChange }) => {
  const inputRef = useRef(null);
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>{label}</h3>
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 14px",
          display: "flex", alignItems: "center", gap: 10, background: "#F9FAFB", cursor: "pointer",
        }}
      >
        <Upload size={15} color="#6B7280" />
        <span style={{ fontSize: 13, color: fileName ? "#111827" : "#6B7280" }}>
          {fileName || `Upload ${label.replace("Upload ", "")}`}
        </span>
      </div>
      <input ref={inputRef} type="file" style={{ display: "none" }} onChange={e => onChange?.(e.target.files?.[0] || null)} />
    </div>
  );
};

const UploadPOModal = ({ row, onClose }) => {
  const [poFile, setPoFile] = useState(null);
  const [gemCharges, setGemCharges] = useState("");
  const [addDocFile, setAddDocFile] = useState(null);
  const [remarks, setRemarks] = useState("");

  if (!row) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 970, background: "rgba(0,0,0,0.22)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 971, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 520, maxWidth: "92vw", maxHeight: "88vh", background: "#fff", borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
          fontFamily: FONT, display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          <div style={{ padding: "22px 28px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>{row.id} - Upload Additional Doc.</h2>
              <div style={{ fontSize: 13, color: "#4B5563" }}>
                Tender ID: <strong style={{ color: "#111827" }}>{row.id}</strong>&nbsp;&nbsp;Firm Name: <strong style={{ color: "#111827" }}>{row.firm}</strong>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", padding: 6, borderRadius: 6, cursor: "pointer", color: "#6B7280", display: "flex" }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ height: 1, background: "#E5E7EB", margin: "0 28px" }} />

          <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "22px 28px 8px" }}>
            <UploadField label="Upload PO Received" fileName={poFile?.name} onChange={setPoFile} />

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>Enter GeM Charges</h3>
              <input
                type="text" value={gemCharges} onChange={e => setGemCharges(e.target.value)} placeholder="Enter GeM Charges"
                style={{
                  width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 14px",
                  fontSize: 13, color: "#111827", fontFamily: FONT, boxSizing: "border-box",
                  outline: "none", background: "#F9FAFB",
                }}
              />
            </div>

            <UploadField label="Upload Additional Doc." fileName={addDocFile?.name} onChange={setAddDocFile} />

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>Remarks</h3>
              <textarea
                rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Add your remark here........"
                style={{
                  width: "100%", border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 14px",
                  fontSize: 13, color: "#111827", fontFamily: FONT, boxSizing: "border-box",
                  outline: "none", resize: "vertical", background: "#F9FAFB",
                }}
              />
            </div>

            <div style={{ background: "#FEF3E2", border: "1px solid #FDE4B0", borderRadius: 8, padding: "16px 18px", marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>Send Alert on SOF</div>
              <div style={{ fontSize: 13, color: "#B45309", marginBottom: 14 }}>Bid Value: {row.bidValue || "Amount"}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>Send Alert on Accounts</div>
              <div style={{ fontSize: 13, color: "#B45309" }}>GeM Charges: {gemCharges || "Amount"}</div>
            </div>
          </div>

          <div style={{ padding: "16px 28px 22px", flexShrink: 0 }}>
            <button onClick={onClose} style={{
              width: "100%", padding: "10px 0", border: "none", borderRadius: 8,
              background: "#2563EB", fontSize: 14, fontWeight: 600, color: "#fff",
              cursor: "pointer", fontFamily: FONT,
            }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PortalDashboard = ({ fullscreen, onUpdate }) => {
  const [docsRow, setDocsRow] = useState(null);
  const [uploadPoRow, setUploadPoRow] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: FONT }}>
      
      {/* ── Table ── */}
      <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400 }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
              {["Tender ID", "Firm Name", "Tender Title", "Customer", "Portal", "Post-Bid Queries", "Results", "PO Status", "Gem Charges", "Additional Docs.", "Revised Results", "Stage", "Deadline", "Actions"].map(col => (
                <th key={col} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center", borderRight: "1px solid #F1F5F9", whiteSpace: "nowrap" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #E5E7EB", background: row.highlight === "green" ? "#E8F5E9" : "#fff" }}>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.firm}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.title}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.customer}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.portal}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.pbq}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>
                  {row.results === "Won" && <span style={{ padding: "2px 8px", borderRadius: 12, background: "#DCFCE7", color: "#16A34A", fontSize: 12, fontWeight: 500 }}>Won</span>}
                  {row.results === "Lost" && <span style={{ padding: "2px 8px", borderRadius: 12, background: "#FEE2E2", color: "#DC2626", fontSize: 12, fontWeight: 500 }}>Lost</span>}
                  {row.results !== "Won" && row.results !== "Lost" && <span style={{ color: "#4B5563" }}>{row.results}</span>}
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.poStatus}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.gemCharges}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.addDocs}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.revisedResults}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.stage}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#4B5563", textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid #F1F5F9" }}>{row.deadline}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, textAlign: "center", whiteSpace: "nowrap" }}>
                  <button onClick={() => {
                    if (row.action === "Update" && onUpdate) onUpdate(row);
                    else if (row.action === "View") setDocsRow(row);
                    else if (row.action === "Upload PO") setUploadPoRow(row);
                  }} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", border: "none", background: "none", cursor: "pointer",
                    color: "#111827", fontWeight: 600, fontSize: 13,
                  }}>
                    <row.actionIcon size={14} /> {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Bottom Section ── */}
      {!fullscreen && (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          
          {/* Activity Timeline */}
          <div style={{ flex: "1 1 500px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "20px 24px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#111827" }}>Activity Timeline</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TIMELINE.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", marginTop: 6, marginRight: 12 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#3B82F6", fontWeight: 500 }}>
                      {item.tender} <span style={{ color: "#9CA3AF", fontWeight: 400, marginLeft: 4 }}>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ flex: "1 1 350px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "20px 24px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#111827" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUICK_ACTIONS.map((action, idx) => (
                <button key={idx} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", background: action.bg, border: "none", borderRadius: 8,
                  cursor: "pointer", transition: "opacity 0.2s"
                }} onMouseEnter={e => e.currentTarget.style.opacity = 0.9} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                  <action.icon size={16} color={action.color} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: action.color }}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      <DocumentsModal row={docsRow} onClose={() => setDocsRow(null)} />
      <UploadPOModal row={uploadPoRow} onClose={() => setUploadPoRow(null)} />
    </div>
  );
};

export default PortalDashboard;
