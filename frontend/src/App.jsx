import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/InventoryPage';
import CRMPage from './pages/CRMPage';
import SalesPage from './pages/SalesPage';
import PurchasePage from './pages/PurchasePage';
import AccountingPage from './pages/AccountingPage';
import HRPage from './pages/HRPage';
import { CircularProgress, Box } from '@mui/material';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        {/* Module Routes */}
        <Route path="crm" element={<CRMPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="purchase" element={<PurchasePage />} />
        <Route path="accounting" element={<AccountingPage />} />
        <Route path="hr" element={<HRPage />} />
      </Route>
    </Routes>
  );
}

export default App;
