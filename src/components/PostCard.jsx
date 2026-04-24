// src/components/PostCard.jsx
import React, { useState } from 'react';
import { getUserById } from '../data/mockData';

const PostCard = ({ post, onViewProfile }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.saved);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const author = getUserById(post.userId);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { userId: 1, text: newComment, time: 'Ahora' }]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-3 shadow-sm border mb-3">
      {/* Header */}
      <div className="d-flex align-items-center p-3">
        <img
          src={author?.avatar}
          alt={author?.name}
          className="rounded-circle me-3"
          style={{ width: '44px', height: '44px', objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => onViewProfile && onViewProfile(author?.id)}
        />
        <div className="flex-grow-1">
          <p
            className="fw-semibold mb-0 small"
            style={{ cursor: 'pointer' }}
            onClick={() => onViewProfile && onViewProfile(author?.id)}
          >
            {author?.name}
          </p>
          <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
            @{author?.username} · {post.time}
          </p>
        </div>
        <button className="btn btn-link text-dark p-0">⋯</button>
      </div>

      {/* Content */}
      <div className="px-3 pb-2">
        <p className="mb-2" style={{ whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
          {post.content}
        </p>
        {/* Tags */}
        {post.tags && (
          <div className="mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="badge bg-light text-primary me-1"
                style={{ fontSize: '0.7rem', cursor: 'pointer' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-3 pb-2">
          <img
            src={post.image}
            alt="Post"
            className="w-100 rounded-3"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-3 py-2 d-flex justify-content-between border-top border-bottom">
        <small className="text-muted">
          {liked ? '❤️' : '🤍'} {likesCount.toLocaleString()} me gusta
        </small>
        <small className="text-muted">
          {comments.length} comentarios · {post.shares} compartidos
        </small>
      </div>

      {/* Action buttons */}
      <div className="d-flex px-2 py-1">
        <button
          className={`btn btn-sm flex-fill ${liked ? 'text-danger' : 'text-dark'}`}
          onClick={toggleLike}
          style={{ border: 'none' }}
        >
          {liked ? '❤️' : '🤍'} Me gusta
        </button>
        <button
          className="btn btn-sm text-dark flex-fill"
          onClick={() => setShowComments(!showComments)}
          style={{ border: 'none' }}
        >
          💬 Comentar
        </button>
        <button className="btn btn-sm text-dark flex-fill" style={{ border: 'none' }}>
          🔄 Compartir
        </button>
        <button
          className={`btn btn-sm flex-fill ${saved ? 'text-warning' : 'text-dark'}`}
          onClick={() => setSaved(!saved)}
          style={{ border: 'none' }}
        >
          {saved ? '🔖' : '📑'} Guardar
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-top p-3">
          {/* Existing comments */}
          {comments.map((comment, i) => {
            const commentUser = getUserById(comment.userId);
            return (
              <div className="d-flex gap-2 mb-3" key={i}>
                <img
                  src={commentUser?.avatar}
                  alt={commentUser?.name}
                  className="rounded-circle"
                  style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                />
                <div className="bg-light rounded-3 p-2 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold" style={{ fontSize: '0.8rem' }}>
                      {commentUser?.name}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                      {comment.time}
                    </span>
                  </div>
                  <p className="mb-0 small">{comment.text}</p>
                </div>
              </div>
            );
          })}

          {/* Add comment */}
          <form onSubmit={addComment} className="d-flex gap-2 mt-2">
            <input
              type="text"
              className="form-control form-control-sm bg-light rounded-pill"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-dark btn-sm rounded-pill px-3"
              disabled={!newComment.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;