import { useState } from "react";
import { Search, Download, Edit, Save, Check, Eye, X } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import GlobalHeader from "../../components/layout/GlobalHeader";

const FONT = "'Inter','Segoe UI',sans-serif";

const COMPANY_LABELS = ["CIPL", "Vendor/company name", "Vendor/company name", "Vendor/company name", "Vendor/company name"];
const COMPANY_BG    = ["#DCFCE7", "#CFFAFE", "#CFFAFE", "#F3F4F6", "#F3F4F6"];
const COMPANY_COLOR = ["#16A34A", "#0891B2", "#0891B2", "#6B7280", "#6B7280"];
const COMPANY_BORDER= ["#DCFCE7", "#CFFAFE", "#CFFAFE", "#E5E7EB", "#E5E7EB"];
const L1_COMPANY = 0;

const TABLE_ROWS = [
  { sno: 1, tender: "Tender SITC", description: "Description", units: 12 },
  { sno: 2, tender: "Tender SITC", description: "Description", units: 12 },
  { sno: 3, tender: "Tender SITC", description: "description",  units: 25 },
  { sno: 4, tender: "Tender SITC", description: "Description", units: 12 },
  { sno: 5, tender: "Tender SITC", description: "description",  units: 20 },
];

const KPI_CARDS = [
  { icon: "🏆", bg: "#DCFCE7", label: "L1 Vendor (Most Competitive)", value: "L1 Vendor name", sub: "6 items lowest" },
  { icon: "💰", bg: "#CFFAFE", label: "Lowest Total Code",            value: "₹price",         sub: "Sum of all L1 prices" },
  { icon: "📦", bg: "#DBEAFE", label: "Average Price",                value: "₹price",         sub: "Across all vendors" },
  { icon: "📈", bg: "#FEF3C7", label: "Highest Price",                value: "₹price",         sub: "Across all vendors" },
  { icon: "📋", bg: "#F3E8FF", label: "Total Items",                  value: "Count",          sub: "Total items/Units" },
];

const INFO_CARDS = [
  { label: "Organization",     value: "Corporate Infotech Pvt. Ltd. (CIPL)" },
  { label: "Tender ID",        value: "TND-2026-—-" },
  { label: "Reference No.",    value: "ref no. —-" },
  { label: "Submission Mode",  value: "Online" },
  { label: "Tender Tile",      value: "Corporate Infotech Pvt. Ltd. (CIPL) project name" },
];

const TH = ({ children, style = {} }) => (
  <th style={{
    padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#fff",
    background: "#111827", textAlign: "center", whiteSpace: "nowrap",
    border: "1px solid #374151", ...style,
  }}>
    {children}
  </th>
);

const TD = ({ children, style = {} }) => (
  <td style={{
    padding: "10px 14px", fontSize: 12, color: "#374151",
    textAlign: "center", border: "1px solid #E5E7EB", ...style,
  }}>
    {children}
  </td>
);

const PQ_ROWS = [
  "Turnover (Past 3 yrs)", "Positive Net Worth",
  "Quality Certificates (Eg: ISO, CMMI etc.)", "Other Criteria Clause",
  "Blacklisting/Debarred/Banned - Undertaking", "Any Other Undertaking",
  "Bid Authorization Certificate", "MAF", "OEM Undertaking (Eg: Support, Spare, Warranty etc.)",
  "Service/Support Center List", "Page No & Indexing", "Other Highlights",
  "Details of any joint call with OEM", "Winning Strategy", "Reason to bid the tender",
];

const RFPField = ({ label, fullSpan }) => (
  <div style={{ gridColumn: fullSpan ? "1 / -1" : undefined }}>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 5, fontFamily: FONT }}>{label}</label>
    <input readOnly style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 6, outline: "none", fontSize: 13, fontFamily: FONT, background: "#fff", padding: "8px 12px", boxSizing: "border-box", color: "#111" }} />
  </div>
);

const RFPArea = ({ label }) => (
  <div style={{ gridColumn: "1 / -1" }}>
    <label style={{ display: "block", fontSize: 13, color: "#374151", marginBottom: 5, fontFamily: FONT }}>{label}</label>
    <textarea readOnly rows={3} style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 6, outline: "none", fontSize: 13, fontFamily: FONT, background: "#fff", padding: "8px 12px", boxSizing: "border-box", resize: "none" }} />
  </div>
);

const RFPBanner = ({ text }) => (
  <div style={{ gridColumn: "1 / -1", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "9px 14px", fontSize: 13, fontWeight: 600, color: "#DC2626" }}>{text}</div>
);


const BID_DOCS = [
  { name: "Tender file (RFP)" },
  { name: "ATC" },
  { name: "GeM" },
  { name: "RFP Analysis" },
  { name: "EMD" },
  { name: "OEM" },
];

const ComparisonSheetDetail = () => {
  const [includeTax, setIncludeTax] = useState(true);
  const [tableExpanded, setTableExpanded] = useState(false);
  const [showBidDetails, setShowBidDetails] = useState(false);
  const [showRFP, setShowRFP] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: FONT, background: "#F9FAFB" }}>
      <Sidebar />

      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <GlobalHeader />

        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ── Page Title Bar ── */}
          <div style={{
            background: "#fff", padding: "20px 32px",
            borderBottom: "1px solid #E5E7EB",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Comparison Sheet</h1>
              <p style={{ fontSize: 12, color: "#16A34A", fontWeight: 500, margin: "3px 0 0" }}>
                Vendor Analysis &amp; Decision Support
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", border: "1px solid #E5E7EB", borderRadius: 6,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: FONT,
              }}>
                <Save size={14} /> Save Draft
              </button>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 20px", border: "none", borderRadius: 6,
                background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: FONT,
              }}>
                <Check size={14} strokeWidth={3} /> Submit
              </button>
            </div>
          </div>

          {/* ── Content Area ── */}
          <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Info Cards */}
            <div style={{ display: "flex", gap: 12 }}>
              {INFO_CARDS.map((card, i) => (
                <div key={i} style={{
                  flex: 1, background: "#fff", border: "1px solid #E5E7EB",
                  borderRadius: 8, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginBottom: 6 }}>{card.label}</div>
                  <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div style={{
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
              display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
            }}>
              <Search size={16} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search Tender ID or Vendors...."
                style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#374151", fontFamily: FONT }}
              />
            </div>

            {/* Vendors Row */}
            <div style={{
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
              padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Vendors:</span>
              {COMPANY_LABELS.map((name, i) => (
                <div key={i} style={{
                  padding: "8px 18px", borderRadius: 6, fontSize: 13, fontWeight: 600,
                  background: COMPANY_BG[i], color: COMPANY_COLOR[i],
                  border: `1px solid ${COMPANY_BORDER[i]}`, cursor: "pointer",
                  textAlign: "center",
                }}>
                  {name}
                </div>
              ))}
            </div>

            {/* Two-Column: KPI + Quick Actions */}
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

              {/* LEFT — KPI cards + table */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

                {/* KPI Cards */}
                <div style={{ display: "flex", gap: 12 }}>
                  {KPI_CARDS.map((k, i) => (
                    <div key={i} style={{
                      flex: 1, background: "#fff", border: "1px solid #E5E7EB",
                      borderRadius: 10, padding: "16px 12px",
                      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6,
                    }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: k.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                        {k.icon}
                      </div>
                      <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, lineHeight: 1.4 }}>{k.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{k.value}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{k.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Edit / View buttons */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
                    border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff",
                    fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT,
                  }}>
                    <Edit size={13} /> Edit
                  </button>
                  <button
                    onClick={() => setTableExpanded(v => !v)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
                      border: "1px solid #E5E7EB", borderRadius: 6,
                      background: tableExpanded ? "#EFF6FF" : "#fff",
                      fontSize: 13, fontWeight: 500,
                      color: tableExpanded ? "#2563EB" : "#374151",
                      cursor: "pointer", fontFamily: FONT,
                    }}
                  >
                    <Eye size={13} /> {tableExpanded ? "Hide" : "View"}
                  </button>
                </div>

                {/* Always-visible base table */}
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "auto" }}>
                  <table style={{ borderCollapse: "collapse", fontSize: 12, width: "100%" }}>
                    <thead>
                      <tr>
                        <TH style={{ width: 50 }}>S.No</TH>
                        <TH style={{ width: 110 }}>Tender</TH>
                        <TH style={{ textAlign: "left", width: 220 }}>Description of Work / Item(s)</TH>
                        <TH style={{ width: 60 }}>Units</TH>
                        {COMPANY_LABELS.map((name, i) => (
                          <TH key={i} colSpan={tableExpanded ? 3 : 1} style={{ borderLeft: "2px solid #4B5563" }}>
                            {name}
                          </TH>
                        ))}
                      </tr>
                      <tr>
                        <th colSpan={4} style={{ background: "#111827", border: "1px solid #374151" }} />
                        {COMPANY_LABELS.flatMap((_, i) =>
                          tableExpanded ? [
                            <TH key={`${i}-mm`} style={{ fontWeight: 500, borderLeft: "2px solid #4B5563" }}>Make &amp; Model</TH>,
                            <TH key={`${i}-ex`} style={{ fontWeight: 500 }}>Rate (excl. Tax)</TH>,
                            <TH key={`${i}-in`} style={{ fontWeight: 500 }}>Rate (incl. Tax)</TH>,
                          ] : [
                            <TH key={`${i}-mm`} style={{ fontWeight: 500, borderLeft: "2px solid #4B5563" }}>Make &amp; Model</TH>,
                          ]
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {TABLE_ROWS.map((row, ri) => (
                        <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                          <TD>{row.sno}</TD>
                          <TD>
                            <span style={{ background: "#DBEAFE", color: "#1D4ED8", padding: "3px 8px", borderRadius: 4, fontWeight: 600, fontSize: 11 }}>
                              {row.tender}
                            </span>
                          </TD>
                          <TD style={{ textAlign: "left" }}>{row.description}</TD>
                          <TD>{row.units}</TD>
                          {COMPANY_LABELS.flatMap((_, ci) => {
                            const isL1 = ci === L1_COMPANY;
                            if (tableExpanded) {
                              return [
                                <TD key={`${ri}-${ci}-mm`} style={{ borderLeft: "2px solid #E5E7EB" }}>text input</TD>,
                                <TD key={`${ri}-${ci}-ex`}>₹1,30,000</TD>,
                                <TD key={`${ri}-${ci}-in`} style={{ whiteSpace: "nowrap" }}>
                                  <span style={{ fontWeight: 700, color: "#111827" }}>₹1,50,000</span>
                                  {isL1
                                    ? <span style={{ marginLeft: 6, background: "#16A34A", color: "#fff", borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 700 }}>L1</span>
                                    : <span style={{ marginLeft: 6, color: "#DC2626", fontSize: 11, fontWeight: 600 }}>+6.0%</span>
                                  }
                                </TD>,
                              ];
                            }
                            return [
                              <TD key={`${ri}-${ci}-mm`} style={{ borderLeft: "2px solid #E5E7EB" }}>text input</TD>,
                            ];
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend / Footer bar — only when expanded */}
                {tableExpanded && (
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "12px 20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "#6B7280" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 14, height: 14, background: "#DCFCE7", border: "1px solid #16A34A", borderRadius: 3, display: "inline-block" }} />
                        Lowest Price (L1)
                      </span>
                      <span>🏆 Best Offer</span>
                      <span>
                        <span style={{ color: "#DC2626", fontWeight: 600 }}>+X%</span> Price Difference from L1
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                        <div
                          onClick={() => setIncludeTax(!includeTax)}
                          style={{ width: 36, height: 20, background: includeTax ? "#16A34A" : "#E5E7EB", borderRadius: 10, position: "relative", cursor: "pointer", transition: "all 0.2s" }}
                        >
                          <div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: includeTax ? 18 : 2, transition: "all 0.2s" }} />
                        </div>
                        Include Tax (GST 18%)
                      </div>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
                        <Download size={13} /> Download
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
                        <Edit size={13} /> Edit
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT }}>
                        <Save size={13} /> Save Draft
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", border: "none", borderRadius: 6, background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
                        <Check size={13} strokeWidth={3} /> Submit
                      </button>
                    </div>
                  </div>
                )}

                {/* Always-visible legend (collapsed state) */}
                {!tableExpanded && (
                  <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "#6B7280", padding: "4px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 14, height: 14, background: "#DCFCE7", border: "1px solid #16A34A", borderRadius: 3, display: "inline-block" }} />
                      Lowest Price (L1)
                    </span>
                    <span>🏆 Best Offer</span>
                    <span>
                      <span style={{ color: "#DC2626", fontWeight: 600 }}>+X%</span> Price Difference from L1
                    </span>
                  </div>
                )}
              </div>

              {/* RIGHT — Quick Actions + Recent Activity */}
              <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Quick Actions */}
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
                    ⚡ Quick Actions
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: FONT, width: "100%", textAlign: "left" }}>
                      ⭐ Auto-Select L1 Vendors
                    </button>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>Mark Final Vendor</label>
                      <input type="text" style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, fontFamily: FONT, outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>💬 Add Notes / Remarks</label>
                      <textarea
                        placeholder="Enter decision notes, remarks, or special conditions..."
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 13, fontFamily: FONT, outline: "none", resize: "vertical", minHeight: 72, boxSizing: "border-box", color: "#6B7280" }}
                      />
                    </div>
                    <button onClick={() => setShowBidDetails(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: FONT, width: "100%", textAlign: "left" }}>
                      📄 Bid Details
                    </button>
                    <button onClick={() => setShowRFP(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: FONT, width: "100%", textAlign: "left" }}>
                      📄 View RFP
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
                    🕐 Recent Activity
                  </h3>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>👤</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#111827", margin: "0 0 2px" }}>Comparison sheet created - TENDER ID</p>
                      <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>Dept/Team · 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── View RFP Drawer ── */}
      {showRFP && (
        <>
          <div onClick={() => setShowRFP(false)} style={{
            position: "fixed", inset: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)", zIndex: 999,
          }} />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: "68%",
            background: "#F3F4F6", zIndex: 1000, fontFamily: FONT,
            display: "flex", flexDirection: "column",
            boxShadow: "-6px 0 40px rgba(0,0,0,0.18)",
          }}>
            {/* Header */}
            <div style={{
              background: "#fff", borderBottom: "1px solid #E5E7EB",
              padding: "16px 28px", flexShrink: 0,
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0 }}>
                  <Check size={15} color="#16A34A" strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>RFP Details – TDN-2026-001</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Tender Title</div>
                </div>
              </div>
              <button onClick={() => setShowRFP(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4, marginTop: 2 }}>
                <X size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Details */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827", borderLeft: "4px solid #2563EB", paddingLeft: 10, margin: "0 0 18px", lineHeight: 1.4 }}>Details</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
                  <RFPField label="Name of Sales Rep" />
                  <RFPField label="Funnel Ref No." />
                  <RFPField label="Name of Department" />
                  <RFPField label="Existing Customer" />
                  <RFPArea label="Address" />
                </div>
              </div>

              {/* Contact Details */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827", borderLeft: "4px solid #2563EB", paddingLeft: 10, margin: "0 0 18px", lineHeight: 1.4 }}>Contact Details of the Customer</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
                  <RFPField label="Category" />
                  <RFPField label="Customer's Name" />
                  <RFPField label="Mail ID" />
                  <RFPField label="Mobile Number" />
                </div>
              </div>

              {/* Tender Details */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827", borderLeft: "4px solid #F59E0B", paddingLeft: 10, margin: "0 0 18px", lineHeight: 1.4 }}>Tender Details</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
                  <RFPField label="Tender Title" />
                  <RFPField label="RFP No." />
                  <RFPField label="Tender ID" fullSpan />
                  <RFPField label="Estimated Bid Value" fullSpan />
                  <RFPField label="Reverse Auction" fullSpan />
                  <RFPField label="RFP Issue Date" />
                  <RFPField label="Submission Portal Address" />
                  <RFPField label="Tender Type" />
                  <RFPField label="Bid/Tender Validity" />
                  <RFPField label="Query Submission Date" />
                  <RFPField label="Mode of Submission - Query" />
                  <RFPField label="Pre-Bid Meeting Date & Time" />
                  <RFPField label="Pre-Bid Meeting Venue" />
                  <RFPField label="Bid Submission Date" />
                  <RFPField label="Bid Opening Date" />
                  <RFPField label="Mode of Submission - Tender" />
                  <RFPField label="Price Validity" />
                  <RFPField label="Tender Fee Amount" />
                  <RFPField label="Mode of Tender Fee Payment" />
                  <RFPField label="EMD Required" fullSpan />
                  <RFPField label="EMD Amount" />
                  <RFPField label="Date of Submission - EMD" />
                  <RFPBanner text="In case EMD is required in the form of BG" />
                  <RFPField label="Reason for Exemption of EMD/Tender Fee" fullSpan />
                  <RFPField label="Payment T&C" />
                  <RFPField label="Payment Schedule" />
                  <RFPField label="PBG%" />
                  <RFPField label="PBG Validity" />
                  <RFPField label="AMC Reqd" />
                  <RFPField label="Duration of AMC" />
                  <RFPBanner text="Manpower Details" />
                  <RFPField label="Manpower Reqd for Support" />
                  <RFPField label="Duration" />
                  <RFPField label="Qualification" />
                  <RFPField label="Certification" />
                  <RFPField label="Quantity" />
                  <RFPField label="Experience" />
                </div>
              </div>

              {/* PQ Criteria */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827", borderLeft: "4px solid #6B7280", paddingLeft: 10, margin: "0 0 18px", lineHeight: 1.4 }}>PQ Criteria</h2>
                <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC" }}>
                        {["Particulars", "Bidder", "OEM", "Evidence Required"].map(h => (
                          <th key={h} style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#374151", textAlign: "center", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PQ_ROWS.map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < PQ_ROWS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                          <td style={{ padding: "10px 14px", fontSize: 12, color: "#374151", borderRight: "1px solid #E5E7EB" }}>{row}</td>
                          {["Bidder", "OEM", "Evidence"].map(col => (
                            <td key={col} style={{ padding: "8px 10px", borderRight: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                              <input readOnly style={{ width: "100%", border: "none", outline: "none", fontSize: 12, fontFamily: FONT, background: "transparent" }} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Approval */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827", borderLeft: "4px solid #16A34A", paddingLeft: 10, margin: "0 0 18px", lineHeight: 1.4 }}>Approval</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
                  <RFPField label="Prepared By" />
                  <RFPField label="Approved By" />
                  <RFPField label="Pre-sales Rep" />
                  <RFPField label="Date" />
                </div>
              </div>

              {/* Remarks */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #E5E7EB" }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827", borderLeft: "4px solid #9CA3AF", paddingLeft: 10, margin: "0 0 18px", lineHeight: 1.4 }}>Remarks</h2>
                <textarea readOnly placeholder="Enter any additional remarks..." rows={4} style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: 6, outline: "none", fontSize: 13, fontFamily: FONT, background: "#fff", resize: "none", padding: "10px 12px", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* Footer */}
            <div style={{
              background: "#fff", borderTop: "1px solid #E5E7EB",
              padding: "14px 28px", flexShrink: 0, display: "flex", justifyContent: "flex-end",
            }}>
              <button onClick={() => setShowRFP(false)} style={{
                padding: "9px 28px", border: "1px solid #E5E7EB", borderRadius: 8,
                background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151",
                cursor: "pointer", fontFamily: FONT,
              }}>
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Bid Details Modal ── */}
      {showBidDetails && (
        <>
          <div
            onClick={() => setShowBidDetails(false)}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 999,
            }}
          />
          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff", borderRadius: 12, width: 860,
            maxHeight: "85vh", overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            zIndex: 1000, fontFamily: FONT,
          }}>
            {/* Modal Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 24px", borderBottom: "1px solid #E5E7EB",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={14} color="#16A34A" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Bid Details</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
                  border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff",
                  fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: FONT,
                }}>
                  <Download size={13} /> Download Summary
                </button>
                <button
                  onClick={() => setShowBidDetails(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Bid Info Grid */}
            <div style={{ padding: "20px 24px 0" }}>
              <div style={{
                border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 24px",
                display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 18, columnGap: 32,
              }}>
                {[
                  { label: "Tender ID",      value: "TND-2026-001", valueColor: "#2563EB" },
                  { label: "Customer Name",   value: "Customer Name" },
                  { label: "Tender Title",    value: "Tender Title" },
                  { label: "Bid Value",       value: "Price" },
                  { label: "Firms",           value: "Firm Names" },
                ].map(({ label, value, valueColor }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: valueColor || "#111827" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Table */}
            <div style={{ padding: "20px 24px 24px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 12 }}>Documents</div>
              <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB" }}>
                      {["File Name", "Uploaded By", "Upload Date & Time", "Actions"].map(col => (
                        <th key={col} style={{
                          padding: "10px 16px", textAlign: col === "Actions" ? "center" : "left",
                          fontWeight: 600, color: "#374151",
                          borderBottom: "1px solid #E5E7EB",
                          borderRight: "1px solid #E5E7EB", fontSize: 12,
                        }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BID_DOCS.map((doc, i) => (
                      <tr key={i} style={{ borderBottom: i < BID_DOCS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                        <td style={{ padding: "11px 16px", borderRight: "1px solid #E5E7EB", color: "#374151" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14 }}>📄</span>
                            {doc.name}
                          </span>
                        </td>
                        <td style={{ padding: "11px 16px", borderRight: "1px solid #E5E7EB", color: "#6B7280" }}>Team/ Person Name</td>
                        <td style={{ padding: "11px 16px", borderRight: "1px solid #E5E7EB", color: "#6B7280" }}>Date &amp; Time</td>
                        <td style={{ padding: "11px 16px", textAlign: "center" }}>
                          <button style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            background: "none", border: "none", color: "#6B7280",
                            fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT,
                          }}>
                            <Eye size={14} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ComparisonSheetDetail;
