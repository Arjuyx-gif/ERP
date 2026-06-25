import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload, Plus } from "lucide-react";
import { FONT, COLORS } from "../../styles/theme";

const ProcessPOModal = ({ task, onClose }) => {
  const [procurementStatus, setProcurementStatus] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const STATUS_OPTIONS = [
    "PO Sent to Vendor",
    "Vendor Confirmed / Order Placed",
    "Material In Transit",
    "Dispatched",
    "Partial Material Received",
    "Material Received",
    "Delayed",
    "Billing Done"
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, fontFamily: FONT }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
      />
      
      {/* Right-Side Panel Container */}
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          bottom: 0, 
          width: 600, 
          background: COLORS.bgWhite, 
          boxShadow: "-10px 0 25px rgba(0,0,0,0.1)", 
          display: "flex", 
          flexDirection: "column",
          animation: "slideInRight 0.3s ease-out forwards"
        }}
      >
        
        {/* Header */}
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, margin: 0 }}>Process - PO-2026-001</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted }}>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }} className="thin-scrollbar">
          
          {/* Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px", marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>PID No.</div>
              <div 
                onClick={() => { onClose(); navigate("/purchase-sof-details"); }}
                style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, cursor: "pointer", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >PID-2026-001</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Customer Name</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Customer Name</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>PO Number</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, cursor: "pointer" }}>PO-2026-001</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Firm Name</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Firm Name</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Vendor Name</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Vendor Name</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Delivery Location</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Address</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Material Value</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Price</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Payment Terms</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>------------</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Expected Delivery Date</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>25-05-2026</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>Status</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Vendor Confirmed</div>
            </div>
          </div>

          {/* Update Procurement Status */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>Update Procurement Status</label>
            <select 
              value={procurementStatus}
              onChange={e => setProcurementStatus(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, color: COLORS.text, outline: "none", fontFamily: FONT, background: "#fff", appearance: "none" }}
            >
              <option value="">Select status</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Form Fields Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>
                {procurementStatus === "Delayed" ? "Delivery Date" : "Expected Delivery Date"}
              </label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Dispatch Date</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Tracking Number</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Tracking URL</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>

            {procurementStatus === "Delayed" && (
              <>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Delay Reason</label>
                  <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Updated ETA</label>
                  <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
                </div>
              </>
            )}

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Received Quantity</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Remaining Quantities</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
          </div>

          {/* Update Payment Status */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>Update Payment Status</label>
            <select style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, color: COLORS.text, outline: "none", fontFamily: FONT, background: "#fff", appearance: "none" }}>
              <option value="">Select status</option>
              <option value="Partial Payment">Partial Payment</option>
              <option value="Full Payment">Full Payment</option>
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Amount Paid</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Amount Remaining</label>
              <input type="text" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
            </div>
          </div>

          {/* Notifications */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>Notifications</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: COLORS.textSecondary }}>Select Teams to Notify</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, cursor: "pointer", display: "flex", alignItems: "center" }}>Add+</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Stores/Inventory", "Service Team", "Accounts", "Sales Coordinator"].map(team => (
                <label key={team} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#F8FAFC", border: `1px solid ${COLORS.borderLight}`, borderRadius: 6, cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: COLORS.primary }} />
                  <span style={{ fontSize: 13, color: COLORS.text }}>{team}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>Remarks</label>
            <input type="text" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 13, fontFamily: FONT }} />
          </div>

          {/* Upload Documents */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>Upload Documents</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, cursor: "pointer", display: "flex", alignItems: "center" }}>Add+</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { id: "po", label: "Upload PO Copy" },
                { id: "dispatch", label: "Upload Dispatch Slip" },
                { id: "invoice", label: "Upload Vendor Invoice" }
              ].map(doc => (
                <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.textSecondary }}>
                    <Upload size={14} />
                    {doc.label}
                  </div>
                  <button onClick={handleFileUpload} style={{ background: "#fff", border: `1px solid ${COLORS.primary}`, color: COLORS.primary, padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    Choose File
                  </button>
                </div>
              ))}
            </div>
            {/* Hidden file input */}
            <input type="file" ref={fileInputRef} style={{ display: "none" }} />
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button onClick={onClose} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 24px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onClose} style={{ background: COLORS.primary, border: "none", color: "#fff", padding: "8px 32px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProcessPOModal;
