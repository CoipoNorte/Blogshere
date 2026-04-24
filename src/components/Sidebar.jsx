// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const mainMenu = [
  { icon: '🏠', label: 'Inicio', page: 'dashboard' },
  { icon: '🔍', label: 'Explorar', page: 'explore' },
  { icon: '🔔', label: 'Notificaciones', page: 'notifications', badge: 3 },
  { icon: '💬', label: 'Mensajes', page: 'messages', badge: 5 },
  { icon: '🔖', label: 'Guardados', page: 'saved' },
  { icon: '👤', label: 'Mi Perfil', page: 'profile' },
];

const secondaryMenu = [
  { icon: '📊', label: 'Analytics', page: 'analytics' },
  { icon: '⚙️', label: 'Configuración', page: 'settings' },
  { icon: '🎨', label: 'Apariencia', page: 'theme' },
  { icon: '❓', label: 'Ayuda', page: 'help' },
];

const Sidebar = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [showMore, setShowMore] = useState(false);

  const isActive = (page) => currentPage === page;

  return (
    <div
      className="d-none d-lg-flex flex-column bg-white border-end position-fixed"
      style={{
        top: '60px',
        left: 0,
        width: '260px',
        height: 'calc(100vh - 60px)',
        zIndex: 1000,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
      }}
    >
      {/* Profile card mini */}
      <div className="p-3 border-bottom">
        <div
          className="d-flex align-items-center gap-3 p-2 rounded-3"
          style={{ cursor: 'pointer', transition: 'background 0.2s' }}
          onClick={() => onNavigate('profile')}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="rounded-circle"
            style={{ width: '44px', height: '44px', objectFit: 'cover' }}
          />
          <div style={{ minWidth: 0 }}>
            <p className="fw-semibold mb-0 small text-truncate">{user?.name}</p>
            <p className="text-muted mb-0 text-truncate" style={{ fontSize: '0.75rem' }}>
              @{user?.username}
            </p>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="p-2">
        <p className="text-muted px-3 mb-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Menú
        </p>
        {mainMenu.map((item) => (
          <button
            key={item.label}
            className={`btn w-100 text-start d-flex align-items-center gap-3 py-2 px-3 mb-1 rounded-3 position-relative ${
              isActive(item.page) ? 'btn-dark' : 'btn-light'
            }`}
            onClick={() => onNavigate(item.page)}
            style={{
              border: 'none',
              fontWeight: isActive(item.page) ? '600' : '400',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '1.2rem', width: '28px', textAlign: 'center' }}>
              {item.icon}
            </span>
            <span className="small">{item.label}</span>
            {item.badge && (
              <span className="badge bg-danger rounded-pill ms-auto" style={{ fontSize: '0.65rem' }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Secondary - Expandible */}
      <div className="p-2 border-top">
        <button
          className="btn btn-light w-100 text-start d-flex align-items-center gap-3 py-2 px-3 mb-1 rounded-3"
          onClick={() => setShowMore(!showMore)}
          style={{ border: 'none' }}
        >
          <span style={{ fontSize: '1.2rem', width: '28px', textAlign: 'center' }}>
            {showMore ? '🔽' : '▶️'}
          </span>
          <span className="small">Ver más</span>
        </button>

        {showMore && secondaryMenu.map((item) => (
          <button
            key={item.label}
            className="btn btn-light w-100 text-start d-flex align-items-center gap-3 py-2 px-3 mb-1 rounded-3"
            onClick={() => onNavigate(item.page)}
            style={{ border: 'none', transition: 'all 0.2s' }}
          >
            <span style={{ fontSize: '1.2rem', width: '28px', textAlign: 'center' }}>
              {item.icon}
            </span>
            <span className="small">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Crear post grande */}
      <div className="p-3 mt-auto">
        <button
          className="btn btn-dark w-100 py-2 fw-semibold rounded-pill shadow-sm"
          onClick={() => onNavigate('dashboard')}
        >
          ✏️ Crear Post
        </button>
      </div>

      {/* Stats mini */}
      <div className="p-3 border-top">
        <div className="d-flex justify-content-around text-center">
          <div>
            <p className="fw-bold mb-0 small">{user?.posts}</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>Posts</p>
          </div>
          <div>
            <p className="fw-bold mb-0 small">{user?.followers?.toLocaleString()}</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>Seguidores</p>
          </div>
          <div>
            <p className="fw-bold mb-0 small">{user?.following}</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>Siguiendo</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-2 border-top">
        <button
          className="btn btn-outline-danger w-100 btn-sm rounded-3 d-flex align-items-center justify-content-center gap-2"
          onClick={logout}
        >
          <span>🚪</span>
          <span className="small">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;