// src/pages/DashboardPage.tsx

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEmployees } from "../hooks/useEmployees";

function DashboardPage() {
  const userName = useAuthStore((state) => state.user?.name) || "invitado";

  // Mismos datos que EmployeesPage — TanStack Query comparte el cache entre
  // ambas pantallas, así que esto no dispara una petición nueva si ya se
  // cargó la lista sin filtros en otra vista.
  const { data } = useEmployees({});
  const employees = data?.data || [];

  const total = employees.length;

  const active = employees.filter(
    (e) => e.status === "active"
  ).length;

  const onLeave = employees.filter(
    (e) => e.status === "on_leave"
  ).length;

  const stats = [
    {
      label: "Total empleados",
      value: total,
      color: "#dbeafe",
      textColor: "#1e40af",
    },
    {
      label: "Activos",
      value: active,
      color: "#dcfce7",
      textColor: "#166534",
    },
    {
      label: "En permiso",
      value: onLeave,
      color: "#fef9c3",
      textColor: "#854d0e",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2
        style={{
          color: "#1e293b",
          marginBottom: "8px",
        }}
      >
        Dashboard
      </h2>

      <p
        style={{
          color: "#64748b",
          marginBottom: "24px",
        }}
      >
        Bienvenido, {userName}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: stat.color,
              padding: "24px",
              borderRadius: "12px",
            }}
            className="flex-1 min-w-[160px] hover:shadow-lg transition-shadow duration-200"
          >
            <p
              style={{
                margin: "0 0 4px",
                color: stat.textColor,
                fontSize: "14px",
              }}
            >
              {stat.label}
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "36px",
                fontWeight: 700,
                color: stat.textColor,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link
          to="/empleados"
          style={{
            padding: "10px 20px",
            background: "#1e40af",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Ver empleados →
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;