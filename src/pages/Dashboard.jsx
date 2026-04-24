// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import StoryBar from '../components/StoryBar';
import CreatePostModal from '../components/CreatePostModal';
import PostCard from '../components/PostCard';
import TrendingPanel from '../components/TrendingPanel';
import SuggestedUsers from '../components/SuggestedUsers';
import { mockPosts } from '../data/mockData';

const Dashboard = ({ onViewProfile }) => {
  const [posts, setPosts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState('forYou');

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container-fluid" style={{ height: 'calc(100vh - 75px)' }}>
      <div className="row h-100">

        {/* ── FEED CENTRAL — scroll independiente ── */}
        <div
          className="col-12 col-lg-7 col-xl-6 px-2 px-md-3"
          style={{
            height: '100%',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          {/* Tabs */}
          <div className="bg-white rounded-3 shadow-sm border mb-3 position-sticky top-0"
            style={{ zIndex: 10 }}
          >
            <div className="d-flex">
              {['forYou', 'following', 'trending'].map((tab) => (
                <button
                  key={tab}
                  className={`btn flex-fill py-3 rounded-0 border-0 small fw-semibold ${
                    activeTab === tab
                      ? 'text-dark border-bottom border-3 border-dark'
                      : 'text-muted'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'forYou' && 'Para ti'}
                  {tab === 'following' && 'Siguiendo'}
                  {tab === 'trending' && 'Tendencia'}
                </button>
              ))}
            </div>
          </div>

          <StoryBar />
          <CreatePostModal onPost={handleNewPost} />

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onViewProfile={onViewProfile}
            />
          ))}

          <div className="text-center py-5 text-muted">
            <p className="display-6 mb-2">✅</p>
            <p className="small">Ya viste todas las publicaciones</p>
            <button
              className="btn btn-outline-dark btn-sm rounded-pill px-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ⬆️ Volver arriba
            </button>
          </div>
        </div>

        {/* ── PANEL DERECHO — scroll independiente ── */}
        <div
          className="d-none d-xl-block col-xl-3"
          style={{
            height: '100%',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <TrendingPanel />
          <SuggestedUsers />
          <QuickLinks />
          <OnlineUsers />
          <FooterMini />
        </div>

      </div>
    </div>
  );
};

// ── Componentes adicionales del panel derecho ──

const QuickLinks = () => (
  <div className="bg-white rounded-3 shadow-sm border p-3 mb-3">
    <h6 className="fw-bold mb-3">⚡ Accesos Rápidos</h6>
    {[
      { icon: '📸', label: 'Subir Foto', desc: 'Comparte un momento' },
      { icon: '✍️', label: 'Escribir Blog', desc: 'Crea un artículo' },
      { icon: '🎙️', label: 'Iniciar Espacio', desc: 'Audio en vivo' },
      { icon: '📊', label: 'Crear Encuesta', desc: 'Pregunta algo' },
    ].map((item, i) => (
      <div
        key={i}
        className="d-flex align-items-center gap-3 p-2 rounded-3 mb-1"
        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span
          className="d-flex align-items-center justify-content-center bg-light rounded-circle"
          style={{ width: '40px', height: '40px', fontSize: '1.1rem', flexShrink: 0 }}
        >
          {item.icon}
        </span>
        <div>
          <p className="fw-semibold mb-0" style={{ fontSize: '0.8rem' }}>{item.label}</p>
          <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const OnlineUsers = () => {
  const onlineUsers = [
    { name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=5', status: 'Publicó hace 2min' },
    { name: 'Miguel T.', avatar: 'https://i.pravatar.cc/150?img=12', status: 'En línea' },
    { name: 'Diego R.', avatar: 'https://i.pravatar.cc/150?img=53', status: 'Escribiendo...' },
    { name: 'Sofía H.', avatar: 'https://i.pravatar.cc/150?img=32', status: 'En línea' },
    { name: 'Laura S.', avatar: 'https://i.pravatar.cc/150?img=9', status: 'Hace 5min' },
  ];

  return (
    <div className="bg-white rounded-3 shadow-sm border p-3 mb-3">
      <h6 className="fw-bold mb-3">🟢 Contactos Activos</h6>
      {onlineUsers.map((u, i) => (
        <div
          key={i}
          className="d-flex align-items-center gap-2 p-2 rounded-3 mb-1"
          style={{ cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div className="position-relative flex-shrink-0">
            <img
              src={u.avatar}
              alt={u.name}
              className="rounded-circle"
              style={{ width: '36px', height: '36px', objectFit: 'cover' }}
            />
            <span
              className="position-absolute bottom-0 end-0 rounded-circle"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: u.status === 'En línea' ? '#22c55e' : '#facc15',
                border: '2px solid white',
              }}
            ></span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p className="fw-semibold mb-0 text-truncate" style={{ fontSize: '0.8rem' }}>{u.name}</p>
            <p className="text-muted mb-0 text-truncate" style={{ fontSize: '0.65rem' }}>{u.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const FooterMini = () => (
  <div className="p-3 mb-5">
    <div className="d-flex flex-wrap gap-1 mb-2">
      {['Términos', 'Privacidad', 'Cookies', 'Accesibilidad', 'Ayuda', 'API'].map((link) => (
        <a
          key={link}
          href="#!"
          className="text-muted text-decoration-none"
          style={{ fontSize: '0.65rem' }}
        >
          {link} ·{' '}
        </a>
      ))}
    </div>
    <p className="text-muted mb-0" style={{ fontSize: '0.65rem' }}>
      © 2024 BlogSphere Inc. Todos los derechos reservados.
    </p>
  </div>
);

export default Dashboard;