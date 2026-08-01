// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import EmployeesPage from './pages/EmployeesPage';
import NewEmployeePage from './pages/NewEmployeePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { EmployeesProvider } from './store/EmployeesContext';

function App() {
  return (
    <EmployeesProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            background: '#f8fafc',
          }}
        >
          <Header />
          <main style={{ padding: '24px' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <EmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nuevo-empleado"
                element={
                  <ProtectedRoute>
                    <NewEmployeePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </EmployeesProvider>
  );
}

export default App;