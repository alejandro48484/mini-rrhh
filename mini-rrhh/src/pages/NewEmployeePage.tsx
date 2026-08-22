// src/pages/NewEmployeePage.tsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Employee, Department, EmployeeStatus, EmployeeRole } from '../types';
import { useEmployees } from '../store/EmployeesContext';
import FormField from '../components/FormField';

function NewEmployeePage() {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();

  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPosition, setNewPosition] = useState<string>('');
  const [newDepartment, setNewDepartment] = useState<Department>('Tecnología');
  const [newSalary, setNewSalary] = useState<string>('');
  const [newHireDate, setNewHireDate] = useState<string>('');
  const [newStatus, setNewStatus] = useState<EmployeeStatus>('active');
  const [newRole, setNewRole] = useState<EmployeeRole>('employee');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>('');

  const departments: Department[] = ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Ventas'];
  const statuses: EmployeeStatus[] = ['active', 'inactive', 'on_leave'];
  const statusLabels: Record<EmployeeStatus, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    on_leave: 'En permiso',
  };
  const roles: EmployeeRole[] = ['employee', 'hr', 'admin'];
  const roleLabels: Record<EmployeeRole, string> = {
    employee: 'Empleado',
    hr: 'Recursos Humanos',
    admin: 'Administrador',
  };
  const formFieldStyle = {
    padding: '8px 12px', border: '1px solid #cbd5e1',
    borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white', width: '100%',
    boxSizing: 'border-box' as const,
  };

  const handleAddEmployee = useCallback(() => {
    if (!newName.trim() || !newEmail.trim() || !newPosition.trim() || !newHireDate) return;

    const newEmployee: Employee = {
      id: Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      position: newPosition.trim(),
      department: newDepartment,
      salary: Number(newSalary) || 0,
      hireDate: newHireDate,
      status: newStatus,
      role: newRole,
      ...(newPhone.trim() && { phone: newPhone.trim() }),
      ...(newAvatarUrl.trim() && { avatarUrl: newAvatarUrl.trim() }),
    };

    addEmployee(newEmployee);
    navigate('/');
  }, [newName, newEmail, newPosition, newDepartment, newSalary, newHireDate, newStatus, newRole, newPhone, newAvatarUrl, addEmployee, navigate]);

  return (
    <div style={{
      padding: '16px', marginBottom: '24px',
      background: 'white', borderRadius: '8px', border: '1px solid #bfdbfe'
    }}>
      <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#1e293b' }}>Nuevo empleado</p>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px', marginBottom: '16px'
      }}>
        <FormField label="Nombre *">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Ej. Juan Pérez"
            autoFocus
            style={formFieldStyle}
          />
        </FormField>

        <FormField label="Email *">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="juan.perez@empresa.com"
            style={formFieldStyle}
          />
        </FormField>

        <FormField label="Cargo *">
          <input
            type="text"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            placeholder="Ej. Analista de Ventas"
            style={formFieldStyle}
          />
        </FormField>

        <FormField label="Departamento *">
          <select
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value as Department)}
            style={formFieldStyle}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Salario mensual *">
          <input
            type="number"
            min="0"
            value={newSalary}
            onChange={(e) => setNewSalary(e.target.value)}
            placeholder="Ej. 8500"
            style={formFieldStyle}
          />
        </FormField>

        <FormField label="Fecha de ingreso *">
          <input
            type="date"
            value={newHireDate}
            onChange={(e) => setNewHireDate(e.target.value)}
            style={formFieldStyle}
          />
        </FormField>

        <FormField label="Estado *">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as EmployeeStatus)}
            style={formFieldStyle}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{statusLabels[status]}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Rol *">
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as EmployeeRole)}
            style={formFieldStyle}
          >
            {roles.map(role => (
              <option key={role} value={role}>{roleLabels[role]}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Teléfono (opcional)">
          <input
            type="text"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="Ej. 5555-5555"
            style={formFieldStyle}
          />
        </FormField>

        <FormField label="URL de foto (opcional)">
          <input
            type="text"
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
            placeholder="https://..."
            style={formFieldStyle}
          />
        </FormField>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleAddEmployee} style={{
          padding: '8px 16px', background: '#16a34a', color: 'white',
          border: 'none', borderRadius: '6px', cursor: 'pointer'
        }}>
          Guardar
        </button>
        <button onClick={() => navigate('/')} style={{
          padding: '8px 16px', background: '#e2e8f0', color: '#475569',
          border: 'none', borderRadius: '6px', cursor: 'pointer'
        }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default NewEmployeePage;