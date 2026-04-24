// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockData';

const Navbar = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Buscar usuarios al escribir
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = mockUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery]);

  // Cerrar búsqueda al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className="navbar navbar-dark bg-dark fixed-top shadow"
      style={{ zIndex: 1050, height: '60px' }}
    >
      <div className="container-fluid px-3">
        {/* Logo */}
        <button
          className="navbar-brand btn btn-link text-decoration-none text-white fw-bold p-0 m-0"
          onClick={() => onNavigate('dashboard')}
        >
          🌐 <span className="d-none d-sm-inline">BlogSphere</span>
        </button>

        {/* Search bar */}
        <div
          className="d-none d-md-flex flex-grow-1 justify-content-center mx-4 position-relative"
          ref={searchRef}
        >
          <div className="input-group" style={{ maxWidth: '440px' }}>
            <span
              className="input-group-text border-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <span style={{ filter: 'invert(1)' }}>🔍</span>
            </span>
            <input
              type="text"
              className="form-control border-0 text-white"
              placeholder="Buscar personas, tags, posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSearch(true)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '0 20px 20px 0',
              }}
            />
            {searchQuery && (
              <button
                className="btn btn-link text-white position-absolute end-0 top-50 translate-middle-y"
                onClick={() => {
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                style={{ zIndex: 5 }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          {showSearch && (
            <div
              className="position-absolute bg-white rounded-3 shadow-lg mt-1 w-100"
              style={{ top: '100%', maxWidth: '440px', zIndex: 1060 }}
            >
              {searchResults.length > 0 ? (
                <>
                  <p className="text-muted small px-3 pt-3 mb-2">
                    {searchResults.length} resultado(s)
                  </p>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="d-flex align-items-center gap-3 px-3 py-2"
                      style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearch(false);
                      }}
                    >
                      <img
                        src={result.avatar}
                        alt={result.name}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      <div>
                        <p className="fw-semibold mb-0 small">{result.name}</p>
                        <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>
                          @{result.username} · {result.followers.toLocaleString()} seguidores
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-4 text-muted">
                  <p className="mb-1">🔍</p>
                  <p className="small mb-0">Sin resultados para "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-2">
          {/* Notificaciones */}
          <button className="btn btn-link text-white position-relative p-1">
            🔔
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.6rem' }}
            >
              3
            </span>
          </button>

          {/* Mensajes */}
          <button className="btn btn-link text-white position-relative p-1 d-none d-sm-block">
            💬
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
              style={{ fontSize: '0.6rem' }}
            >
              5
            </span>
          </button>

          {/* Avatar dropdown */}
          <div className="position-relative">
            <button
              className="btn p-0 d-flex align-items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="rounded-circle border border-2 border-secondary"
                style={{ width: '34px', height: '34px', objectFit: 'cover' }}
              />
              <span className="text-white small d-none d-lg-inline">
                {user?.name?.split(' ')[0]}
              </span>
              <span className="text-secondary small">▼</span>
            </button>

            {showDropdown && (
              <>
                <div
                  className="position-fixed top-0 start-0 w-100 h-100"
                  style={{ zIndex: 1 }}
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div
                  className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border-0 py-2"
                  style={{ width: '240px', zIndex: 2 }}
                >
                  {/* User info header */}
                  <div className="px-3 py-2 border-bottom d-flex align-items-center gap-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="rounded-circle"
                      style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                    />
                    <div>
                      <p className="fw-semibold mb-0 small">{user?.name}</p>
                      <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>
                        @{user?.username}
                      </p>
                    </div>
                  </div>

                  {[
                    { icon: '👤', label: 'Mi Perfil', action: () => onNavigate('profile') },
                    { icon: '📊', label: 'Analytics', action: () => {} },
                    { icon: '⚙️', label: 'Configuración', action: () => {} },
                    { icon: '🎨', label: 'Apariencia', action: () => {} },
                    { icon: '❓', label: 'Ayuda y Soporte', action: () => {} },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="dropdown-item py-2 px-3 small d-flex align-items-center gap-2"
                      onClick={() => {
                        item.action();
                        setShowDropdown(false);
                      }}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}

                  <div className="dropdown-divider"></div>

                  <button
                    className="dropdown-item py-2 px-3 small text-danger d-flex align-items-center gap-2"
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                  >
                    <span>🚪</span>
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;