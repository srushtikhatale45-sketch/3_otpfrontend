import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { useAuthCheck } from './hooks/useAuth';
import LoginChoice from './pages/LoginChoice';
import SMSAuthPage from './pages/SMSAuthPage';
import WhatsAppAuthPage from './pages/WhatsAppAuthPage';
import EmailAuthPage from './pages/EmailAuthPage';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/common/LoadingSpinner';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { data: authData, isLoading } = useAuthCheck();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!authData?.authenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppContent() {
  const { data: authData, isLoading } = useAuthCheck();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginChoice />} />
      <Route path="/login/sms" element={<SMSAuthPage />} />
      <Route path="/login/whatsapp" element={<WhatsAppAuthPage />} />
      <Route path="/login/email" element={<EmailAuthPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard user={authData?.user} />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;