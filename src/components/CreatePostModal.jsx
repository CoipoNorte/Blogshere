// src/components/CreatePostModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CreatePostModal = ({ onPost }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      userId: user.id,
      content,
      image: null,
      likes: 0,
      comments: [],
      shares: 0,
      saved: false,
      liked: false,
      time: 'Ahora',
      tags: [],
    };

    onPost(newPost);
    setContent('');
    setShowModal(false);
  };

  return (
    <>
      {/* Trigger card */}
      <div className="bg-white rounded-3 shadow-sm border p-3 mb-3">
        <div className="d-flex gap-3 align-items-center">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="rounded-circle"
            style={{ width: '44px', height: '44px', objectFit: 'cover' }}
          />
          <button
            className="btn btn-light flex-grow-1 text-start text-muted rounded-pill py-2 px-3"
            onClick={() => setShowModal(true)}
          >
            ¿Qué estás pensando, {user?.name?.split(' ')[0]}?
          </button>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-sm text-dark"
            onClick={() => setShowModal(true)}
            style={{ border: 'none' }}
          >
            📷 Foto
          </button>
          <button
            className="btn btn-sm text-dark"
            onClick={() => setShowModal(true)}
            style={{ border: 'none' }}
          >
            🎥 Video
          </button>
          <button
            className="btn btn-sm text-dark"
            onClick={() => setShowModal(true)}
            style={{ border: 'none' }}
          >
            📊 Encuesta
          </button>
          <button
            className="btn btn-sm text-dark d-none d-sm-inline"
            onClick={() => setShowModal(true)}
            style={{ border: 'none' }}
          >
            😊 Mood
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div
            className="modal-backdrop show"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowModal(false)}
          ></div>
          <div
            className="modal d-block"
            tabIndex="-1"
            onClick={() => setShowModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content border-0 rounded-4 shadow-lg">
                {/* Header */}
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">Crear Publicación</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                {/* Body */}
                <div className="modal-body">
                  <div className="d-flex gap-3 mb-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="rounded-circle"
                      style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                    />
                    <div>
                      <p className="fw-semibold mb-0 small">{user?.name}</p>
                      <span className="badge bg-light text-dark" style={{ fontSize: '0.65rem' }}>
                        🌍 Público
                      </span>
                    </div>
                  </div>

                  <textarea
                    className="form-control border-0 bg-transparent"
                    rows="5"
                    placeholder={`¿Qué quieres compartir, ${user?.name?.split(' ')[0]}?`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                      resize: 'none',
                      fontSize: content.length < 100 ? '1.2rem' : '0.95rem',
                    }}
                    autoFocus
                  ></textarea>

                  {/* Tools */}
                  <div className="d-flex justify-content-between align-items-center border rounded-3 p-2 mt-3">
                    <span className="small fw-semibold">Agregar:</span>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm" title="Foto">📷</button>
                      <button className="btn btn-sm" title="Video">🎥</button>
                      <button className="btn btn-sm" title="GIF">🎞️</button>
                      <button className="btn btn-sm" title="Encuesta">📊</button>
                      <button className="btn btn-sm" title="Ubicación">📍</button>
                      <button className="btn btn-sm" title="Emoji">😊</button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer border-0 pt-0">
                  <button
                    className="btn btn-dark w-100 py-2 fw-semibold rounded-pill"
                    disabled={!content.trim()}
                    onClick={handlePost}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePostModal;