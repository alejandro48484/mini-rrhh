// src/components/EmployeeCard.tsx

import type { Employee } from "../types";

interface EmployeeCardProps {
  employee: Employee;
  onSelect?: (employee: Employee) => void;
  onToggleStatus?: (employee: Employee) => void;
}

const statusConfig = {
  active: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Activo",
  },
  inactive: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Inactivo",
  },
  on_leave: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "En permiso",
  },
};

function EmployeeCard({
  employee,
  onSelect,
  onToggleStatus,
}: EmployeeCardProps) {
  const {
    name,
    position,
    department,
    status,
    avatarUrl,
  } = employee;

  const statusStyle = statusConfig[status];

  return (
    <div
      onClick={() => onSelect?.(employee)}
      className={`bg-white rounded-xl border border-slate-200 p-5 w-full
        hover:shadow-md hover:border-blue-300
        transition-all duration-200
        ${onSelect ? "cursor-pointer" : ""}`}
    >
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`Avatar de ${name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Información del empleado */}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 truncate">
            {name}
          </h3>

          <p className="text-sm text-slate-500 truncate">
            {position}
          </p>
        </div>
      </div>

      {/* Departamento y estado */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium truncate">
          {department}
        </span>

        <span
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus?.(employee);
          }}
          title={
            onToggleStatus
              ? "Clic para cambiar el estado"
              : undefined
          }
          className={`text-xs px-2.5 py-1 rounded-full font-medium
            ${statusStyle.bg}
            ${statusStyle.text}
            ${
              onToggleStatus
                ? "cursor-pointer hover:opacity-75"
                : ""
            }`}
        >
          {statusStyle.label}
        </span>
      </div>
    </div>
  );
}

export default EmployeeCard;