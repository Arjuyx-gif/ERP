import { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckCircle, Plus, X } from "lucide-react";
import { FONT, COLORS, inputStyle } from "../../styles/theme";

const DEPT_ROWS_DEFAULT = [
  { key: "purchase", label: "Purchase", badge: 1 },
  { key: "accounts", label: "Accounts", badge: 1 },
];

const DEPT_OPTIONS = ["Purchase", "Accounts", "Service Team", "Stores", "Sales", "Legal", "HR", "Finance"];

const DeptDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const ref = useRef();

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(v => !v)}
        style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: val ? COLORS.textSecondary : COLORS.textSubtle }}
      >
        <span>{val || "Select Dept."}</span>
        <ChevronDown size={14} color={COLORS.textSubtle} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, borderRadius: 6, zIndex: 50, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", marginTop: 2 }}>
          {DEPT_OPTIONS.map(opt => (
            <div
              key={opt}
              onClick={() => { setVal(opt); setOpen(false); onSelect(opt); }}
              style={{ padding: "9px 12px", fontSize: 13, color: COLORS.textSecondary, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.borderLight}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.bgWhite}
            >{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const ArrowIcon = () => (
  <svg width="12" height="12" fill="none" stroke={COLORS.textSubtle} strokeWidth="2">
    <line x1="2" y1="6" x2="10" y2="6"/>
    <polyline points="7 3 10 6 7 9"/>
  </svg>
);

const SOFConfirmForm = ({ onClose }) => {
  const [depts, setDepts] = useState(DEPT_ROWS_DEFAULT);
  const [pendingDepts, setPendingDepts] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [sent, setSent] = useState(false);
  const [sentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }) +
      ", " + now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
  });

  const addDept = () => setPendingDepts(p => [...p, { id: Date.now() }]);

  const confirmPending = (id, label) => {
    if (!label) return;
    setDepts(d => [...d, { key: `${label.toLowerCase()}_${id}`, label, badge: 0 }]);
    setPendingDepts(p => p.filter(x => x.id !== id));
  };

  const removePending = (id) => setPendingDepts(p => p.filter(x => x.id !== id));

  const fieldInput = (disabled) => ({
    ...inputStyle,
    background: disabled ? COLORS.bg : COLORS.bgWhite,
    color: disabled ? COLORS.textSubtle : COLORS.textSecondary,
    cursor: disabled ? "default" : "text",
  });

  const card = { background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" };
  const divider = { borderBottom: `1px solid ${COLORS.borderLight}` };
  const labelCss = { display: "block", fontSize: 12, fontWeight: 500, color: COLORS.textSecondary, marginBottom: 5 };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", paddingBottom: 80 }}>

        {/* Main card */}
        <div style={card}>

          {/* Header */}
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.text }}>Sales Order Form</span>
              <span style={{ fontSize: 13, color: COLORS.textSubtle }}>
                PID No. –&nbsp;<span style={{ borderBottom: `1px solid #D1D5DB`, paddingBottom: 1 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </span>
            </div>
            <button style={{ background: COLORS.primary, color: COLORS.bgWhite, border: "none", borderRadius: 6, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
              SOF Validation
            </button>
          </div>

          {/* Customer / Firm */}
          <div style={{ padding: "20px 24px", ...divider, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["Customer Name"], ["Firm Name"]].map(([label]) => (
              <div key={label}>
                <label style={labelCss}>{label}</label>
                <input type="text" disabled={sent} style={fieldInput(sent)} />
              </div>
            ))}
          </div>

          {/* Order Value + Priority */}
          <div style={{ padding: "16px 24px", ...divider, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: COLORS.primaryLight, border: `1px solid ${COLORS.primaryBorder}`, borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: COLORS.primary }}>₹</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>Order Value</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.primaryDeep }}>₹1,25,000</div>
            </div>
            <div style={{ background: COLORS.successLight, border: `1px solid ${COLORS.successBorder}`, borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.success }}>Priority</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.danger }}>High</div>
            </div>
          </div>

          {/* Products */}
          <div style={{ padding: "16px 24px", ...divider }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 10 }}>Products</div>
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              {["HP All-In-One Desktop (x15)", "HP LaserJet Pro Printer (x3)"].map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.textSecondary }}>
                  <span style={{ width: 6, height: 6, background: COLORS.primary, borderRadius: "50%", flexShrink: 0 }} />
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Department Notifications */}
          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Department Notifications Summary</div>
              {!sent && (
                <button
                  onClick={addDept}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 6, background: COLORS.bgWhite, fontSize: 13, fontWeight: 500, color: COLORS.textSecondary, cursor: "pointer", fontFamily: FONT }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                  onMouseLeave={e => e.currentTarget.style.background = COLORS.bgWhite}
                >
                  <Plus size={13} /> Add
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {depts.map((dept, idx) => {
                const isLast = idx === depts.length - 1 && pendingDepts.length === 0;
                return (
                  <div key={dept.key} style={{ borderBottom: !isLast ? `1px solid ${COLORS.borderLight}` : "none", paddingBottom: !isLast ? 16 : 0, marginBottom: !isLast ? 16 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary }}>{dept.label}</span>
                      {dept.badge > 0 && (
                        <span style={{ background: COLORS.primaryMid, color: COLORS.primaryDark, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{dept.badge} New</span>
                      )}
                    </div>
                    <label style={{ display: "block", fontSize: 12, color: COLORS.textMuted, marginBottom: 5 }}>Remarks</label>
                    <textarea
                      value={remarks[dept.key] || ""}
                      onChange={e => !sent && setRemarks(r => ({ ...r, [dept.key]: e.target.value }))}
                      disabled={sent}
                      style={{ ...fieldInput(sent), minHeight: 90, resize: sent ? "none" : "vertical" }}
                      placeholder="Add remarks..."
                    />
                  </div>
                );
              })}

              {!sent && pendingDepts.map((p, idx) => (
                <div key={p.id} style={{ borderTop: depts.length > 0 || idx > 0 ? `1px solid ${COLORS.borderLight}` : "none", paddingTop: depts.length > 0 || idx > 0 ? 16 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary }}>Select Dept.</span>
                    <button
                      onClick={() => removePending(p.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textSubtle, padding: 2, display: "flex", alignItems: "center" }}
                      onMouseEnter={e => e.currentTarget.style.color = COLORS.danger}
                      onMouseLeave={e => e.currentTarget.style.color = COLORS.textSubtle}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <DeptDropdown onSelect={label => confirmPending(p.id, label)} />
                </div>
              ))}
            </div>

            {/* Confirm & Send / Sent */}
            <div style={{ marginTop: 20 }}>
              {sent ? (
                <div style={{ width: "100%", padding: "13px 0", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, color: COLORS.textMuted, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: COLORS.bg }}>
                  <CheckCircle size={16} color={COLORS.textMuted} />
                  Sent
                </div>
              ) : (
                <button
                  onClick={() => setSent(true)}
                  style={{ width: "100%", padding: "13px 0", background: COLORS.success, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: COLORS.bgWhite, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.successDark}
                  onMouseLeave={e => e.currentTarget.style.background = COLORS.success}
                >
                  <CheckCircle size={16} />
                  Confirm &amp; Send
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Activity Log */}
        {sent && (
          <div style={{ background: COLORS.bgWhite, border: `1px solid ${COLORS.border}`, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginTop: 16, padding: "20px 24px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>Activity Log</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Approval entry */}
              <div style={{ border: `1px solid ${COLORS.successBorder}`, borderRadius: 8, padding: "12px 16px", background: COLORS.successLight }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5 5.5 4 8 8.5 2"/></svg>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textSecondary }}>ORDER ID</span>
                  <ArrowIcon />
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>Sales Coordination</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 2, marginLeft: 26 }}>SOF Validated and Approved</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 26 }}>Order value: ₹125,000, Customer: Customer Name</div>
                <div style={{ fontSize: 11, color: COLORS.textSubtle, marginLeft: 26, marginTop: 4 }}>NAME (Sales Coordinator) &nbsp;•&nbsp; {sentTime}</div>
              </div>

              {/* Per-dept entries */}
              {depts.map(dept => (
                <div key={dept.key} style={{ border: `1px solid ${COLORS.primaryBorder}`, borderRadius: 8, padding: "12px 16px", background: COLORS.primaryLight }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.primaryMid, border: "2px solid #93C5FD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="10" fill="none" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round"><circle cx="5" cy="5" r="4"/><line x1="5" y1="3" x2="5" y2="5"/><line x1="5" y1="7" x2="5.01" y2="7"/></svg>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textSecondary }}>ORDER ID</span>
                    <ArrowIcon />
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>{dept.label}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 2, marginLeft: 26 }}>Notification sent to {dept.label} Team</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 26 }}>
                    {remarks[dept.key] || "Action required: Review and process for SOF validation"}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textSubtle, marginLeft: 26, marginTop: 4 }}>NAME (Sales Coordinator) &nbsp;•&nbsp; {sentTime}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <button
                onClick={onClose}
                style={{ width: "100%", padding: "12px 0", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, fontWeight: 500, color: COLORS.textSecondary, background: COLORS.bgWhite, cursor: "pointer", fontFamily: FONT }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.bgWhite}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SOFConfirmForm;
