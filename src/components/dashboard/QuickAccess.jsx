import { useNavigate } from "react-router-dom";
import SectionLabel from "../ui/SectionLabel";
import DynamicIcon from "../ui/DynamicIcon";
import { QUICK_ACCESS } from "../../services/mockData";

const FONT = "'Inter','Segoe UI',sans-serif";

const QuickAccessButton = ({ item, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "#fff", border: "1px solid #EAECF0", borderRadius: 12,
      padding: "18px 10px 16px", cursor: "pointer", fontFamily: FONT,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
    }}
  >
    <div style={{
      width: 42, height: 42, borderRadius: 10, background: item.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <DynamicIcon name={item.icon} size={20} color={item.color} />
    </div>
    <span style={{ fontSize: 11, fontWeight: 500, color: "#344054", textAlign: "center", lineHeight: 1.4 }}>
      {item.label}
    </span>
  </button>
);

const QuickAccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <SectionLabel>Quick Access</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
        {QUICK_ACCESS.map(item => (
          <QuickAccessButton key={item.label} item={item} onClick={() => navigate(item.path)} />
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
