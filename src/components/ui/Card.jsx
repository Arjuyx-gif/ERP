const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #EAECF0",
    boxShadow: "0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
    ...style,
  }}>
    {children}
  </div>
);

export default Card;
