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
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Redirect to dashboard if lack of permissions
  }

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
        <Route path="purchase" element={
          <ProtectedRoute allowedRoles={['admin', 'manager']}>
            <PurchasePage />
          </ProtectedRoute>
        } />
        <Route path="accounting" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AccountingPage />
          </ProtectedRoute>
        } />
        <Route path="hr" element={
          <ProtectedRoute allowedRoles={['admin', 'manager']}>
            <HRPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
