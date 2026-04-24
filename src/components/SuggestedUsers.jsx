// src/components/SuggestedUsers.jsx
import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const SuggestedUsers = () => {
  const { user } = useAuth();
  const [following, setFollowing] = useState({});
  const [showAll, setShowAll] = useState(false);

  const suggestions = mockUsers.filter((u) => u.id !== user?.id);
  const displayed = showAll ? suggestions : suggestions.slice(0, 3);

  const toggleFollow = (userId) => {
    setFollowing({ ...following, [userId]: !following[userId] });
  };

  return (
    <div className="bg-white rounded-3 shadow-sm border p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">👥 Sugerencias para ti</h6>
        <button
          className="btn btn-link text-decoration-none small p-0"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Menos' : 'Ver todo'}
        </button>
      </div>

      {displayed.map((sugUser) => (
        <div
          className="d-flex align-items-center gap-2 mb-3"
          key={sugUser.id}
        >
          <img
            src={sugUser.avatar}
            alt={sugUser.name}
            className="rounded-circle"
            style={{ width: '44px', height: '44px', objectFit: 'cover', cursor: 'pointer' }}
          />
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <p className="fw-semibold mb-0 text-truncate" style={{ fontSize: '0.8rem' }}>
              {sugUser.name}
            </p>
            <p className="text-muted mb-0 text-truncate" style={{ fontSize: '0.7rem' }}>
              @{sugUser.username} · {sugUser.followers.toLocaleString()} seguidores
            </p>
          </div>
          <button
            className={`btn btn-sm rounded-pill px-3 ${
              following[sugUser.id] ? 'btn-outline-dark' : 'btn-dark'
            }`}
            onClick={() => toggleFollow(sugUser.id)}
            style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
          >
            {following[sugUser.id] ? '✓ Siguiendo' : 'Seguir'}
          </button>
        </div>
      ))}

      {/* Mutual connections hint */}
      <div className="bg-light rounded-3 p-2 mt-2">
        <p className="text-muted mb-0 text-center" style={{ fontSize: '0.7rem' }}>
          💡 Basado en tus intereses y conexiones
        </p>
      </div>
    </div>
  );
};

export default SuggestedUsers;