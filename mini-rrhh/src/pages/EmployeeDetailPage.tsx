import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployees';

function EmployeeDetailPage() {
  // useParams obtiene el :id de la URL (/empleados/123 → id = "123")
  const { id } = useParams();
  const navigate = useNavigate();

  // Convierte el id de string a número y lo pasa al hook
  const { data: employee, isLoading, isError, error } = useEmployee(Number(id));

  // Formatea el salario como moneda (igual que Intl en JS puro)
  const salarioFormateado = employee
    ? new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
      }).format(employee.salary)
    : '';

  const fechaIngreso = employee
    ? new Date(employee.hireDate).toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
        <span>Cargando empleado...</span>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">Error al cargar el empleado</p>
          <p className="text-red-500 text-sm mt-1">
            {(error as Error)?.message || 'Error desconocido'}
          </p>
          <button
            onClick={() => navigate('/empleados')}
            className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg transition-colors"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }


  if (!employee) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Botón volver */}
      <button
        onClick={() => navigate('/empleados')}
        className="mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg transition-colors"
      >
        ← Volver
      </button>

      {/* Tarjeta de detalle */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {/* Foto y nombre */}
        <div className="flex items-center gap-4 mb-6">
          {employee.avatarUrl ? (
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {employee.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{employee.name}</h2>
            <p className="text-slate-500">{employee.position}</p>
          </div>
        </div>

        {/* Información */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Email</p>
            <p className="text-slate-700">{employee.email}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Departamento</p>
            <p className="text-slate-700">{employee.department}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Salario mensual</p>
            <p className="text-slate-700">{salarioFormateado}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Fecha de ingreso</p>
            <p className="text-slate-700">{fechaIngreso}</p>
          </div>
          {employee.phone && (
            <div>
              <p className="text-xs text-slate-400 uppercase font-medium">Teléfono</p>
              <p className="text-slate-700">{employee.phone}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Estado</p>
            <p className="text-slate-700">{employee.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailPage;