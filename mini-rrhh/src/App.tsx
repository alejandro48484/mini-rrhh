// src/App.tsx

import type { ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import Header from "./layouts/Header";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAuthStore } from "./store/authStore";
import { useState, useEffect } from "react";

// Layout con Header para páginas autenticadas
function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // Obtener usuario y logout desde Zustand
  const { user, logout } = useAuthStore();

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Header
        user={user ?? undefined}
        onLogout={handleLogout}
        showWelcome={showWelcome}
      />

      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta pública */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/empleados"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EmployeesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirigir raíz según autenticación */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                background: "#f8fafc",
                textAlign: "center",
                padding: "80px",
              }}
            >
              <h2 style={{ color: "#1e293b" }}>
                404 — Página no encontrada
              </h2>

              <Link to="/dashboard">
                Volver al inicio
              </Link>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;