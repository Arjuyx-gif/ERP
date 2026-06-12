import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SIDEBAR_NAV } from "../../services/mockData";
import DynamicIcon from "../ui/DynamicIcon";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-expand any parent whose child matches the current path
  const defaultExpanded = useMemo(() => {
    const map = {};
    SIDEBAR_NAV.forEach(item => {
      if (item.children?.some(c => c.path === location.pathname)) {
        map[item.label] = true;
      }
    });
    return map;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [expanded, setExpanded] = useState({ "Sales & Pre-sales": true, ...defaultExpanded });

  return (
    <div style={{
      width: 200, flexShrink: 0, background: "#101828",
      display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "inherit",
    }}>
      
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>ERP System</span>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {SIDEBAR_NAV.map(item => {
          const isActive = !!item.path && item.path === location.pathname;

          return (
            <div key={item.label}>
              <div
                onClick={() => {
                  if (item.expandable) {
                    setExpanded(p => ({ ...p, [item.label]: !p[item.label] }));
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 16px",
                  cursor: "pointer",
                  background: isActive ? "#2979FF" : "transparent",
                  borderRadius: isActive ? 8 : 0,
                  margin: "1px 8px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <DynamicIcon
                    name={item.iconName}
                    size={18}
                    color={isActive ? "#fff" : "#A0AEC0"}
                  />
                </span>
                <span style={{
                  fontSize: 13, flex: 1,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "#CBD5E0",
                }}>
                  {item.label}
                </span>
                {item.expandable && (
                  expanded[item.label]
                    ? <ChevronDown size={14} color="#718096" />
                    : <ChevronRight size={14} color="#718096" />
                )}
              </div>

              {item.children && expanded[item.label] && (
                <div>
                  {item.children.map(child => {
                    const isChildActive = !!child.path && child.path === location.pathname;
                    return (
                      <div
                        key={child.label}
                        onClick={() => { if (child.path) navigate(child.path); }}
                        style={{
                          padding: "7px 16px 7px 42px",
                          background: isChildActive ? "#2979FF" : "transparent",
                          borderRadius: isChildActive ? 8 : 0,
                          margin: isChildActive ? "1px 8px" : "0",
                          cursor: child.path ? "pointer" : "default",
                        }}
                      >
                        <span style={{
                          fontSize: 12,
                          color: isChildActive ? "#fff" : "#A0AEC0",
                          fontWeight: isChildActive ? 600 : 400,
                        }}>
                          {child.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "#2979FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: 12,
        }}>JD</div>
        <div>
          <div style={{ fontSize: 12, color: "#E2E8F0", fontWeight: 600 }}>Name</div>
          <div style={{ fontSize: 11, color: "#718096" }}>Sales Manager</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
