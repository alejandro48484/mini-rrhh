// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import EmployeesPage from './pages/EmployeesPage';
import NewEmployeePage from './pages/NewEmployeePage';
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
              <Route path="/" element={<EmployeesPage />} />
              <Route path="/nuevo-empleado" element={<NewEmployeePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </EmployeesProvider>
  );
}

export default App;