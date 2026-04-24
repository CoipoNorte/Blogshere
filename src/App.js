// src/App.js
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AppContent = () => {
  const { user } = useAuth();
  const [authPage, setAuthPage] = useState('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [profileUserId, setProfileUserId] = useState(null);

  // ── No autenticado ──
  if (!user) {
    if (authPage === 'register') {
      return <Register onSwitchToLogin={() => setAuthPage('login')} />;
    }
    return <Login onSwitchToRegister={() => setAuthPage('register')} />;
  }

  // ── Navegación interna ──
  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== 'profile') {
      setProfileUserId(null);
    }
  };

  const handleViewProfile = (userId) => {
    setProfileUserId(userId);
    setCurrentPage('profile');
  };

  // ── Renderizar página actual ──
  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile profileUserId={profileUserId} />;
      case 'dashboard':
      default:
        return <Dashboard onViewProfile={handleViewProfile} />;
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />

      <main
        style={{
          paddingTop: '75px',
          paddingBottom: '20px',
          transition: 'margin 0.3s ease',
        }}
      >
        <div className="d-none d-lg-block" style={{ marginLeft: '260px' }}>
          {renderPage()}
        </div>
        <div className="d-block d-lg-none">
          {renderPage()}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="d-flex d-lg-none justify-content-around align-items-center bg-white border-top position-fixed bottom-0 start-0 end-0"
        style={{ height: '56px', zIndex: 1040 }}
      >
        <button
          className={`btn btn-link text-decoration-none ${
            currentPage === 'dashboard' ? 'text-dark' : 'text-muted'
          }`}
          onClick={() => handleNavigate('dashboard')}
          style={{ fontSize: '1.3rem' }}
        >
          🏠
        </button>
        <button className="btn btn-link text-decoration-none text-muted" style={{ fontSize: '1.3rem' }}>
          🔍
        </button>
        <button className="btn btn-link text-decoration-none text-muted" style={{ fontSize: '1.3rem' }}>
          ➕
        </button>
        <button className="btn btn-link text-decoration-none text-muted position-relative" style={{ fontSize: '1.3rem' }}>
          🔔
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: '0.5rem' }}
          >
            3
          </span>
        </button>
        <button
          className={`btn btn-link text-decoration-none ${
            currentPage === 'profile' ? 'text-dark' : 'text-muted'
          }`}
          onClick={() => {
            setProfileUserId(null);
            handleNavigate('profile');
          }}
          style={{ fontSize: '1.3rem' }}
        >
          👤
        </button>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;