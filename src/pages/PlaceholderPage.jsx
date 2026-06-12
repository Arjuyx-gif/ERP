// src/pages/PlaceholderPage.jsx
import Sidebar from "../components/layout/Sidebar";

const PlaceholderPage = ({ title }) => (
  <div style={{
    display: "flex", minHeight: "100vh",
    fontFamily: "'Inter',system-ui,sans-serif", background: "#F8F9FB",
  }}>
    <Sidebar />
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, background: "#EFF6FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <svg width="24" height="24" fill="none" stroke="#2979FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#101828", marginBottom: 6 }}>{title}</h1>
        <p style={{ fontSize: 13, color: "#667085" }}>This page is under construction and will be available soon.</p>
      </div>
    </div>
  </div>
);

export default PlaceholderPage;
