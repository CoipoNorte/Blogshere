// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockPosts, getUserById } from '../data/mockData';
import PostCard from '../components/PostCard';

const Profile = ({ profileUserId }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBio, setEditBio] = useState(user?.bio || '');

  const profileUser = profileUserId ? getUserById(profileUserId) : user;
  const isOwnProfile = profileUser?.id === user?.id;
  const userPosts = mockPosts.filter((p) => p.userId === profileUser?.id);

  const tabs = [
    { id: 'posts', label: '📝 Posts', count: userPosts.length },
    { id: 'media', label: '📷 Media', count: userPosts.filter((p) => p.image).length },
    { id: 'likes', label: '❤️ Likes', count: 24 },
    { id: 'about', label: 'ℹ️ Acerca de', count: null },
  ];

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7 px-0 px-md-3">

          {/* Cover Photo */}
          <div className="position-relative">
            <div
              className="w-100 position-relative overflow-hidden"
              style={{ borderRadius: '0 0 16px 16px' }}
            >
              <img
                src={profileUser?.coverPhoto}
                alt="Cover"
                className="w-100"
                style={{ height: '280px', objectFit: 'cover' }}
              />
              {/* Gradient overlay */}
              <div
                className="position-absolute bottom-0 start-0 w-100"
                style={{
                  height: '80px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                }}
              ></div>
              {isOwnProfile && (
                <button
                  className="btn btn-dark btn-sm position-absolute rounded-pill px-3"
                  style={{ bottom: '12px', right: '12px', opacity: 0.8 }}
                >
                  📷 Cambiar portada
                </button>
              )}
            </div>

            {/* Avatar */}
            <div className="position-absolute" style={{ bottom: '-55px', left: '24px' }}>
              <div className="position-relative">
                <img
                  src={profileUser?.avatar}
                  alt={profileUser?.name}
                  className="rounded-circle border border-4 border-white shadow"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                {isOwnProfile && (
                  <button
                    className="btn btn-dark btn-sm rounded-circle position-absolute d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      bottom: '5px',
                      right: '5px',
                      fontSize: '0.8rem',
                    }}
                  >
                    📷
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-3 shadow-sm border mx-2 mx-md-0 mb-3">
            {/* Action row */}
            <div className="d-flex justify-content-end gap-2 p-3">
              {isOwnProfile ? (
                <button
                  className="btn btn-outline-dark btn-sm rounded-pill px-4"
                  onClick={() => setShowEditModal(true)}
                >
                  ✏️ Editar perfil
                </button>
              ) : (
                <>
                  <button className="btn btn-outline-dark btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px' }}
                  >
                    ⋯
                  </button>
                  <button className="btn btn-outline-dark btn-sm rounded-pill px-3">
                    💬 Mensaje
                  </button>
                  <button
                    className={`btn btn-sm rounded-pill px-4 ${
                      isFollowing ? 'btn-outline-dark' : 'btn-dark'
                    }`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? '✓ Siguiendo' : '+ Seguir'}
                  </button>
                </>
              )}
            </div>

            {/* Name & Bio */}
            <div className="px-3 pb-3" style={{ marginTop: '10px' }}>
              <h4 className="fw-bold mb-0">{profileUser?.name}</h4>
              <p className="text-muted small mb-2">@{profileUser?.username}</p>
              <p className="mb-2" style={{ fontSize: '0.95rem' }}>{profileUser?.bio}</p>

              {/* Extra info */}
              <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
                <span>📍 Ciudad de México</span>
                <span>🔗 blogsphere.com/{profileUser?.username}</span>
                <span>📅 Se unió en Enero 2024</span>
              </div>

              {/* Stats */}
              <div className="d-flex gap-4">
                <div style={{ cursor: 'pointer' }}>
                  <span className="fw-bold">{profileUser?.posts}</span>{' '}
                  <span className="text-muted small">posts</span>
                </div>
                <div style={{ cursor: 'pointer' }}>
                  <span className="fw-bold">{profileUser?.followers?.toLocaleString()}</span>{' '}
                  <span className="text-muted small">seguidores</span>
                </div>
                <div style={{ cursor: 'pointer' }}>
                  <span className="fw-bold">{profileUser?.following}</span>{' '}
                  <span className="text-muted small">siguiendo</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="d-flex border-top overflow-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`btn flex-fill py-3 rounded-0 border-0 small text-nowrap ${
                    activeTab === tab.id
                      ? 'fw-bold text-dark border-bottom border-3 border-dark'
                      : 'text-muted'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label} {tab.count !== null && `(${tab.count})`}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-2 px-md-0">
            {activeTab === 'posts' && (
              <>
                {userPosts.length > 0 ? (
                  userPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                  <EmptyState icon="📝" text="Aún no hay publicaciones" />
                )}
              </>
            )}

            {activeTab === 'media' && (
              <div className="bg-white rounded-3 shadow-sm border p-3">
                <div className="row g-2">
                  {userPosts.filter((p) => p.image).map((post) => (
                    <div className="col-4 col-md-3" key={post.id}>
                      <div className="position-relative" style={{ paddingTop: '100%' }}>
                        <img
                          src={post.image}
                          alt="Media"
                          className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                          style={{ objectFit: 'cover', cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  ))}
                  {userPosts.filter((p) => p.image).length === 0 && (
                    <EmptyState icon="📷" text="Sin contenido multimedia" />
                  )}
                </div>
              </div>
            )}

            {activeTab === 'likes' && (
              <EmptyState icon="❤️" text="Los likes aparecerán aquí" />
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-3 shadow-sm border p-4">
                <h5 className="fw-bold mb-4">Acerca de {profileUser?.name}</h5>

                {[
                  { icon: '💼', label: 'Trabajo', value: 'Desarrollador Full Stack' },
                  { icon: '🎓', label: 'Educación', value: 'Universidad Nacional Autónoma' },
                  { icon: '📍', label: 'Ubicación', value: 'Ciudad de México, México' },
                  { icon: '🌐', label: 'Sitio web', value: `blogsphere.com/${profileUser?.username}` },
                  { icon: '📅', label: 'Miembro desde', value: 'Enero 2024' },
                  { icon: '🎂', label: 'Cumpleaños', value: '15 de Marzo' },
                ].map((item, i) => (
                  <div className="d-flex align-items-center gap-3 mb-3" key={i}>
                    <span
                      className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                      style={{ width: '40px', height: '40px', fontSize: '1.1rem', flexShrink: 0 }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>{item.label}</p>
                      <p className="fw-semibold mb-0 small">{item.value}</p>
                    </div>
                  </div>
                ))}

                {/* Interests */}
                <h6 className="fw-bold mt-4 mb-3">🏷️ Intereses</h6>
                <div className="d-flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'Diseño UI', 'Fotografía', 'Startups', 'IA', 'Música', 'Viajes'].map((tag) => (
                    <span key={tag} className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Spacer para mobile nav */}
          <div style={{ height: '80px' }}></div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <>
          <div
            className="modal-backdrop show"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="modal d-block" onClick={() => setShowEditModal(false)}>
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Editar Perfil</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  {/* Avatar preview */}
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="rounded-circle"
                        style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                      />
                      <button
                        className="btn btn-dark btn-sm rounded-circle position-absolute d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px', bottom: 0, right: 0, fontSize: '0.7rem' }}
                      >
                        📷
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre</label>
                    <input type="text" className="form-control" defaultValue={user?.name} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Username</label>
                    <div className="input-group">
                      <span className="input-group-text">@</span>
                      <input type="text" className="form-control" defaultValue={user?.username} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Bio</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      maxLength={160}
                    ></textarea>
                    <small className="text-muted">{editBio.length}/160</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Ubicación</label>
                    <input type="text" className="form-control" defaultValue="Ciudad de México" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Sitio web</label>
                    <input type="url" className="form-control" defaultValue={`blogsphere.com/${user?.username}`} />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-dark rounded-pill px-4"
                    onClick={() => setShowEditModal(false)}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const EmptyState = ({ icon, text }) => (
  <div className="text-center py-5 text-muted bg-white rounded-3 shadow-sm border">
    <p className="display-4 mb-2">{icon}</p>
    <p className="small">{text}</p>
  </div>
);

export default Profile;