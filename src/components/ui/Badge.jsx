
const Badge = ({ text, color, bg }) => (
  <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:12,
    background: bg || "#E8F5E9", color: color || "#4CAF50" }}>
    {text}
  </span>
);

export default Badge;