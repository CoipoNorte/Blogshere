// src/components/TrendingPanel.jsx
import React, { useState } from 'react';
import { mockTrending } from '../data/mockData';

const extraTrending = [
  { tag: '#JavaScript', posts: '45.2k posts', category: 'Tecnología' },
  { tag: '#Fitness', posts: '18.6k posts', category: 'Salud' },
  { tag: '#Blockchain', posts: '9.4k posts', category: 'Finanzas' },
  { tag: '#Sustainability', posts: '7.1k posts', category: 'Medio Ambiente' },
  { tag: '#RemoteWork', posts: '28.9k posts', category: 'Trabajo' },
];

const TrendingPanel = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const allTrends = [
    ...mockTrending.map((t) => ({ ...t, category: 'Tecnología' })),
    ...extraTrending,
  ];

  const categories = ['all', ...new Set(allTrends.map((t) => t.category))];
  const filtered =
    activeCategory === 'all'
      ? allTrends
      : allTrends.filter((t) => t.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 5);

  return (
    <div className="bg-white rounded-3 shadow-sm border p-3 mb-3">
      <h6 className="fw-bold mb-3">🔥 Tendencias</h6>

      {/* Category pills */}
      <div className="d-flex gap-1 flex-wrap mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm rounded-pill ${
              activeCategory === cat ? 'btn-dark' : 'btn-outline-secondary'
            }`}
            style={{ fontSize: '0.65rem', padding: '2px 10px' }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'Todas' : cat}
          </button>
        ))}
      </div>

      {displayed.map((trend, i) => (
        <div
          key={i}
          className="d-flex justify-content-between align-items-center py-2 px-2 rounded-2 mb-1"
          style={{ cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div>
            <p className="text-muted mb-0" style={{ fontSize: '0.6rem' }}>
              {trend.category} · Tendencia
            </p>
            <p className="fw-semibold mb-0 small text-primary">{trend.tag}</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>
              {trend.posts}
            </p>
          </div>
          <span className="text-muted small">⋯</span>
        </div>
      ))}

      <button
        className="btn btn-link text-primary text-decoration-none small p-0 mt-2"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? '← Ver menos' : `Ver más tendencias (${filtered.length - 5}+) →`}
      </button>
    </div>
  );
};

export default TrendingPanel;