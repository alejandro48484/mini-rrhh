// src/store/EmployeesContext.tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Employee } from '../types';
import { mockEmployees } from '../utils/mockData';

interface EmployeesContextValue {
  employees: Employee[];
  loading: boolean;
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(undefined);

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const addEmployee = useCallback((employee: Employee) => {
    setEmployees(prev => [...prev, employee]);
  }, []);

  const deleteEmployee = useCallback((id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }, []);

  return (
    <EmployeesContext.Provider value={{ employees, loading, addEmployee, deleteEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmployees() {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error('useEmployees debe usarse dentro de un EmployeesProvider');
  }
  return context;
}