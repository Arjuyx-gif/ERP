// tagColors values can be a hex string (bg only) or { bg, color } object.
const Tag = ({ label, colors }) => {
  const cfg   = colors?.[label];
  const bg    = typeof cfg === "object" ? cfg.bg    : (cfg   || "#E3F0FB");
  const color = typeof cfg === "object" ? cfg.color : "#1565C0";

  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
      background: bg, color, marginRight: 4,
    }}>
      {label}
    </span>
  );
};

export default Tag;
