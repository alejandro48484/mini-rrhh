// src/pages/EmployeesPage.tsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Department, EmployeeStatus, Employee } from '../types';
import { useEmployees } from '../store/EmployeesContext';
import EmployeeCard from '../components/EmployeeCard';
import StatsBadge from '../components/StatsBadge';
import FormField from '../components/FormField';

function EmployeesPage() {
  const { employees, loading, deleteEmployee } = useEmployees();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<EmployeeStatus | ''>('');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                           emp.email.toLowerCase().includes(search.toLowerCase()) ||
                           emp.position.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = !selectedDepartment || emp.department === selectedDepartment;
    const matchesStatus = !selectedStatus || emp.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const onLeaveEmployees = employees.filter(emp => emp.status === 'on_leave').length;
  const inactiveEmployees = employees.filter(emp => emp.status === 'inactive').length;

  const handleSelectEmployee = useCallback((employee: Employee) => {
    alert(`Empleado: ${employee.name}\nCargo: ${employee.position}\nDepartamento: ${employee.department}`);
  }, []);

  const departments: Department[] = ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Ventas'];
  const statuses: EmployeeStatus[] = ['active', 'inactive', 'on_leave'];
  const statusLabels: Record<EmployeeStatus, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    on_leave: 'En permiso',
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Gestión de Empleados</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>
            {filteredEmployees.length} de {employees.length} empleados
          </p>
        </div>
        <button
          onClick={() => navigate('/nuevo-empleado')}
          style={{
            padding: '8px 16px', background: '#1e40af', color: 'white',
            border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
          }}
        >
          + Agregar empleado
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatsBadge label="Total de empleados" value={totalEmployees} color="#2563eb" />
        <StatsBadge label="Empleados activos" value={activeEmployees} color="#16a34a" />
        <StatsBadge label="Empleados en permiso" value={onLeaveEmployees} color="#ca8a04" />
        <StatsBadge label="Empleados inactivos" value={inactiveEmployees} color="#d44444" />
      </div>

      <div style={{
        display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end',
        marginBottom: '24px', padding: '16px',
        background: 'white', borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <FormField label="Buscar" style={{ flex: '1', minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre, email o cargo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #cbd5e1',
              borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white'
            }}
          />
        </FormField>

        <FormField label="Departamento" style={{ minWidth: '180px' }}>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value as Department | '')}
            style={{
              padding: '8px 12px', border: '1px solid #cbd5e1',
              borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white'
            }}
          >
            <option value="">Todos los departamentos</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Estado" style={{ minWidth: '160px' }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as EmployeeStatus | '')}
            style={{
              padding: '8px 12px', border: '1px solid #cbd5e1',
              borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white'
            }}
          >
            <option value="">Todos los estados</option>
            {statuses.map(status => (
              <option key={status} value={status}>{statusLabels[status]}</option>
            ))}
          </select>
        </FormField>

        {(search || selectedDepartment || selectedStatus) && (
          <button
            onClick={() => { setSearch(''); setSelectedDepartment(''); setSelectedStatus(''); }}
            style={{
              padding: '8px 12px', background: '#fee2e2', color: '#dc2626',
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
          <p>Cargando empleados...</p>
        </div>
      )}

      {!loading && filteredEmployees.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
          <p>No se encontraron empleados con los filtros aplicados.</p>
        </div>
      )}

      {!loading && filteredEmployees.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {filteredEmployees.map(employee => (
            <div key={employee.id} style={{ position: 'relative' }}>
              <button
                onClick={() => deleteEmployee(employee.id)}
                aria-label="Eliminar empleado"
                title="Eliminar empleado"
                style={{
                  position: 'absolute', top: '-10px', right: '-10px', zIndex: 1,
                  width: '24px', height: '24px', borderRadius: '50%',
                  border: '2px solid white', background: '#ef4444', color: 'white',
                  cursor: 'pointer', fontSize: '14px', lineHeight: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                ×
              </button>
              <EmployeeCard
                employee={employee}
                onSelect={handleSelectEmployee}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeesPage;