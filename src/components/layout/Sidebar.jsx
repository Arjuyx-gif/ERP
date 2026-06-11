import { useState } from "react";
import { SIDEBAR_NAV } from "../../services/mockData";

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

const Sidebar = () => {
  const [expanded, setExpanded] = useState({ "Sales & Pre-sales": true });
  return (
    <div style={{ width:200, flexShrink:0, background:"#2D3748",
      display:"flex", flexDirection:"column", minHeight:"100vh", fontFamily:"inherit" }}>

      <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:15 }}>ERP System</span>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
        {SIDEBAR_NAV.map(item => (
          <div key={item.label}>
            <div onClick={() => item.expandable && setExpanded(p=>({...p,[item.label]:!p[item.label]}))}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 16px",
                cursor: item.expandable?"pointer":"default",
                background: item.active&&!item.expandable?"#2979FF":"transparent",
                borderRadius: item.active&&!item.expandable?8:0, margin:"1px 8px" }}>
              <span style={{ fontSize:14 }}>{item.icon}</span>
              <span style={{ fontSize:13, color:"#CBD5E0", flex:1, fontWeight:item.active?600:400 }}>{item.label}</span>
              {item.expandable && <span style={{ color:"#718096", fontSize:10 }}>{expanded[item.label]?"▼":"›"}</span>}
            </div>
            {item.children && expanded[item.label] && (
              <div>
                {item.children.map(child => (
                  <div key={child.label} style={{ padding:"7px 16px 7px 42px",
                    background: child.active?"#2979FF":"transparent",
                    borderRadius: child.active?8:0, margin: child.active?"1px 8px":"0", cursor:"pointer" }}>
                    <span style={{ fontSize:12, color:child.active?"#fff":"#A0AEC0", fontWeight:child.active?600:400 }}>
                      {child.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,0.08)",
        display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:32, height:32, borderRadius:"50%", background:"#2979FF",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontWeight:700, fontSize:12 }}>JD</div>
        <div>
          <div style={{ fontSize:12, color:"#E2E8F0", fontWeight:600 }}>Name</div>
          <div style={{ fontSize:11, color:"#718096" }}>Sales Manager</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
