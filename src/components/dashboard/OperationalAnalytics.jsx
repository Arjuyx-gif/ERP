import Card from "../ui/Card";
import SectionLabel from "../ui/SectionLabel";
import PieChart from "../charts/PieChart";
import { TENDER_STATUS_DATA, DEPT_WORKLOAD_DATA } from "../../services/mockData";

const Legend = ({ data }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "6px 24px", marginTop: 16,
    borderTop: "1px solid #F2F4F7", paddingTop: 14,
  }}>
    {data.map(d => (
      <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#344054" }}>
          {d.label}: <strong>{d.count}</strong>
        </span>
      </div>
    ))}
  </div>
);

const OperationalAnalytics = () => (
  <div>
    <SectionLabel>Operational Analytics</SectionLabel>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

      <Card style={{ padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 12 }}>
          Tender Status Distribution
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PieChart data={TENDER_STATUS_DATA} size={150} donut />
        </div>
        <Legend data={TENDER_STATUS_DATA} />
      </Card>

      <Card style={{ padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#344054", marginBottom: 12 }}>
          Department Workload Distribution
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PieChart data={DEPT_WORKLOAD_DATA} size={150} />
        </div>
      </Card>

    </div>
  </div>
);

export default OperationalAnalytics;
