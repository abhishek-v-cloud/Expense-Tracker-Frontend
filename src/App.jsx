import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TransactionExplorer from './pages/TransactionExplorer';
import Charts from './pages/Charts';
import './index.css';

const Header = () => {
  const { user, token, logout } = useAuth();

  if (!token) {
    return null;
  }

  return (
    <div className="header">
      <h1>💰 Bellcorp Expense Tracker</h1>
      <div className="nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/explorer">Explorer</a>
        <a href="/charts">Analytics</a>
        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Welcome, {user?.username}!</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explorer"
            element={
              <ProtectedRoute>
                <TransactionExplorer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/charts"
            element={
              <ProtectedRoute>
                <Charts />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
