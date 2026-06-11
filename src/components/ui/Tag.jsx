
const Tag = ({ label, colors }) => (
  <span style={{ fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:4,
    background: colors?.[label] || "#E3F0FB", color:"#1565C0", marginRight:4 }}>
    {label}
  </span>
);

export default Tag;