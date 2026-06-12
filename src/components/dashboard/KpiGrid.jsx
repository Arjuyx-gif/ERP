import { MAIN_KPI_TOP, MAIN_KPI_BOT } from "../../services/mockData";

const KpiCard = ({ kpi, trackColor }) => (
  <div style={{
    background: kpi.cardBg,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }}>
    <div style={{ padding: "18px 20px 16px", flex: 1 }}>
      <div style={{ fontSize: 12, color: kpi.color, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
        {kpi.label}
      </div>
      <div style={{ fontSize: 34, fontWeight: 700, color: kpi.color, lineHeight: 1, marginBottom: 8 }}>
        {kpi.value}
      </div>
      <div style={{ fontSize: 12, color: kpi.color, opacity: 0.55 }}>{kpi.sub}</div>
    </div>
    <div style={{ height: 4, background: trackColor ?? kpi.barTrack }}>
      <div style={{ height: "100%", width: `${kpi.barPct}%`, background: kpi.bar }} />
    </div>
  </div>
);

const KpiGrid = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {MAIN_KPI_TOP.map(kpi => <KpiCard key={kpi.label} kpi={kpi} />)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {MAIN_KPI_BOT.map(kpi => <KpiCard key={kpi.label} kpi={kpi} trackColor="rgba(0,0,0,0.08)" />)}
    </div>
  </div>
);

export default KpiGrid;
