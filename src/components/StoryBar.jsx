// src/components/StoryBar.jsx
import React, { useState } from 'react';
import { mockStories, getUserById } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const StoryBar = () => {
  const { user } = useAuth();
  const [viewingStory, setViewingStory] = useState(null);
  const [progress, setProgress] = useState(0);

  const openStory = (story) => {
    setViewingStory(story);
    setProgress(0);

    // Simular progreso
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setViewingStory(null);
      }
    }, 100);
  };

  return (
    <>
      <div className="bg-white rounded-3 shadow-sm p-3 mb-3 border">
        <div
          className="d-flex gap-3 overflow-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Tu historia */}
          <div className="text-center flex-shrink-0" style={{ width: '72px', cursor: 'pointer' }}>
            <div className="position-relative d-inline-block">
              <img
                src={user?.avatar}
                alt="Tu historia"
                className="rounded-circle"
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  border: '3px solid #e0e0e0',
                }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '20px', height: '20px', fontSize: '0.7rem', border: '2px solid white' }}
              >
                +
              </span>
            </div>
            <p className="mb-0 mt-1" style={{ fontSize: '0.65rem' }}>Tu historia</p>
          </div>

          {/* Stories */}
          {mockStories.map((story) => {
            const storyUser = getUserById(story.userId);
            return (
              <div
                key={story.userId}
                className="text-center flex-shrink-0"
                style={{ width: '72px', cursor: 'pointer' }}
                onClick={() => openStory(story)}
              >
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '66px',
                    height: '66px',
                    background: story.seen
                      ? '#e0e0e0'
                      : 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    padding: '3px',
                  }}
                >
                  <img
                    src={storyUser?.avatar}
                    alt={storyUser?.name}
                    className="rounded-circle bg-white"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      padding: '2px',
                    }}
                  />
                </div>
                <p className="mb-0 mt-1 text-truncate" style={{ fontSize: '0.65rem' }}>
                  {storyUser?.name?.split(' ')[0]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {viewingStory && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.9)' }}
            onClick={() => setViewingStory(null)}
          >
            <div
              className="position-relative"
              style={{ width: '380px', maxWidth: '90vw', height: '680px', maxHeight: '85vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bar */}
              <div className="position-absolute top-0 start-0 w-100 p-2" style={{ zIndex: 10 }}>
                <div className="progress" style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <div
                    className="progress-bar bg-white"
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                  ></div>
                </div>
              </div>

              {/* Header */}
              <div
                className="position-absolute top-0 start-0 w-100 d-flex align-items-center gap-2 p-3 pt-4"
                style={{ zIndex: 10 }}
              >
                <img
                  src={getUserById(viewingStory.userId)?.avatar}
                  alt=""
                  className="rounded-circle"
                  style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                />
                <div>
                  <p className="text-white fw-semibold mb-0 small">
                    {getUserById(viewingStory.userId)?.name}
                  </p>
                  <p className="text-white mb-0" style={{ fontSize: '0.65rem', opacity: 0.7 }}>
                    Hace 2 horas
                  </p>
                </div>
                <button
                  className="btn btn-link text-white ms-auto"
                  onClick={() => setViewingStory(null)}
                >
                  ✕
                </button>
              </div>

              {/* Story image */}
              <img
                src={viewingStory.img}
                alt="Story"
                className="w-100 h-100 rounded-4"
                style={{ objectFit: 'cover' }}
              />

              {/* Reply */}
              <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ zIndex: 10 }}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control rounded-pill bg-transparent text-white border-white"
                    placeholder="Responder..."
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button className="btn btn-outline-light rounded-pill ms-2">➤</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StoryBar;