import { ChevronRight } from "lucide-react";
import Card from "../ui/Card";
import SectionLabel from "../ui/SectionLabel";
import { WORKFLOW_PIPELINE } from "../../services/mockData";

const StageCard = ({ stage }) => (
  <div style={{
    background: "#fff",
    border: "1px solid #E4E7EC",
    borderRadius: 10,
    padding: "12px 18px",
    minWidth: 130,
  }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: "#101828", marginBottom: 10, whiteSpace: "nowrap" }}>
      {stage.label}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
      <span style={{ fontSize: 12, color: "#667085" }}>Active</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#2979FF" }}>{stage.active}</span>
    </div>
    {stage.delayed != null && (
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: stage.cancelled != null ? 4 : 0,
      }}>
        <span style={{ fontSize: 12, color: "#667085" }}>Delayed</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#F04438" }}>{stage.delayed}</span>
      </div>
    )}
    {stage.cancelled != null && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#667085" }}>Cancelled</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#F04438" }}>{stage.cancelled}</span>
      </div>
    )}
  </div>
);

const WorkflowPipeline = () => (
  <div>
    <SectionLabel>Live Workflow Pipeline</SectionLabel>
    <Card style={{ padding: "18px 20px" }}>
      <div className="thin-scrollbar" style={{ overflowX: "auto", paddingBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "stretch", width: "max-content" }}>
          {WORKFLOW_PIPELINE.map(stage => (
            <div key={stage.label} style={{ display: "flex", alignItems: "center" }}>
              <StageCard stage={stage} />
              <div style={{ padding: "0 6px", flexShrink: 0 }}>
                <ChevronRight size={16} color="#D0D5DD" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

export default WorkflowPipeline;
