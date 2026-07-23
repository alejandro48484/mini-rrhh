interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

function StatsBadge({ label, value, color = "#1e293b" }: StatsBadgeProps) {
  return (
    <div
      style={{
        border: `1px solid ${color}`,
        borderRadius: "8px",
        padding: "16px",
        minWidth: "140px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "28px", fontWeight: "bold", color }}>
        {value}
      </div>
      <div style={{ fontSize: "14px", color: "#6b7280" }}>{label}</div>
    </div>
  );
}

export default StatsBadge;