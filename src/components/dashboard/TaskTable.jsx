import { TASK_TABLE_ROWS } from "../../services/mockData";

const COLUMNS = [
  { key: "id",       label: "Tender/ Order ID" },
  { key: "firm",     label: "Firm Name" },
  { key: "title",    label: "Tender Title" },
  { key: "customer", label: "Customer" },
  { key: "value",    label: "Value" },
  { key: "deadline", label: "Deadline" },
];

const ROW_BG = {
  yellow: "#FFFDE7",
  green:  "#E8F5E9",
};

const TaskTable = () => (
  <div style={{
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #E2E8F0",
    overflow: "hidden",
  }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
          {COLUMNS.map(col => (
            <th
              key={col.key}
              style={{
                padding: "12px 16px",
                fontSize: 13, fontWeight: 600, color: "#667085",
                textAlign: "left", whiteSpace: "nowrap",
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TASK_TABLE_ROWS.map((row, i) => (
          <tr
            key={i}
            style={{
              background: ROW_BG[row.highlight] ?? "#fff",
              borderBottom: i < TASK_TABLE_ROWS.length - 1 ? "1px solid #F2F4F7" : "none",
              transition: "background 0.1s",
            }}
          >
            {COLUMNS.map(col => (
              <td
                key={col.key}
                style={{
                  padding: "14px 16px",
                  fontSize: 13,
                  color: col.key === "id" ? "#2563EB" : "#344054",
                  fontWeight: col.key === "id" ? 600 : 400,
                }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TaskTable;
