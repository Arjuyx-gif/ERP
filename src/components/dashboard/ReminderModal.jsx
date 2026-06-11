// ─── REMINDER MODAL ───────────────────────────────────────────────────────────


const Modal = ({ modal, onClose }) => {
  if (!modal) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.2)" }} />
      <div style={{ position:"relative", zIndex:1, background:"#fff", borderRadius:12,
        padding:"24px 28px 20px", width:430, maxWidth:"90vw",
        boxShadow:"0 8px 40px rgba(0,0,0,0.15)" }}>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:18 }}>🔴</span>
          <strong style={{ fontSize:15, color:"#111" }}>{modal.title}</strong>
        </div>
        <p style={{ fontSize:13, color:"#555", marginBottom:12 }}>{modal.subtitle}</p>

        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
          <span style={{ background:"#E3F0FB", color:"#1565C0", padding:"3px 10px",
            borderRadius:6, fontSize:12, fontWeight:600 }}>{modal.rfpId}</span>
          <span style={{ fontSize:13, color:"#333" }}>{modal.tenderTitle}</span>
        </div>
        <p style={{ fontSize:13, color:"#555", marginBottom:12 }}>{modal.customer}</p>

        {modal.details && (
          <div style={{ background:"#F5F7FA", borderRadius:8, padding:"10px 14px",
            fontSize:12, marginBottom:16, display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
            {modal.details.map((d,i) => (
              <span key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                {d.icon && <span>{d.icon}</span>}
                <span style={{ color: d.highlight?"#2979FF":"#333", fontWeight: d.highlight?600:400 }}>{d.text}</span>
                {i < modal.details.length-1 && <span style={{ color:"#ccc", margin:"0 4px" }}>|</span>}
              </span>
            ))}
          </div>
        )}

        {modal.deadlinePill && (
          <div style={{ marginBottom:16 }}>
            <span style={{ background:"#F5F7FA", border:"1px solid #ddd", borderRadius:6,
              padding:"6px 14px", fontSize:13, color:"#333", fontWeight:500 }}>
              Deadline - {modal.deadlinePill}
            </span>
          </div>
        )}

        <button onClick={onClose} style={{ width:"100%", padding:"11px 0",
          background:"#2979FF", color:"#fff", border:"none", borderRadius:8,
          fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
          Acknowledge
        </button>
      </div>
    </div>
  );
};

export default Modal;
