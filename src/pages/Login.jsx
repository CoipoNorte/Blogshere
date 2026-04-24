// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de red
    setTimeout(() => {
      const result = login(email, password);
      if (!result.success) {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = () => {
    setEmail('carlos@blog.com');
    setPassword('123456');
    setError('');
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            {/* Card */}
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="card-body p-4 p-md-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-dark text-white mb-3"
                    style={{ width: '64px', height: '64px', fontSize: '1.8rem' }}
                  >
                    🌐
                  </div>
                  <h3 className="fw-bold mb-1">BlogSphere</h3>
                  <p className="text-muted small">Inicia sesión en tu cuenta</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="alert alert-danger py-2 small text-center" role="alert">
                    ⚠️ {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">📧</span>
                      <input
                        type="email"
                        className="form-control bg-light border-start-0"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control bg-light border-start-0 border-end-0"
                        placeholder="••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label small" htmlFor="remember">
                        Recordarme
                      </label>
                    </div>
                    <a href="#!" className="small text-decoration-none">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 fw-semibold mb-3"
                    disabled={loading}
                    style={{ borderRadius: '12px' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Ingresando...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </button>
                </form>

                {/* Demo */}
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2 mb-3 small"
                  onClick={fillDemo}
                  style={{ borderRadius: '12px' }}
                >
                  🚀 Usar cuenta demo
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-3 text-muted small">o</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Social */}
                <div className="d-flex gap-2 mb-4">
                  <button
                    className="btn btn-outline-dark flex-fill py-2"
                    style={{ borderRadius: '12px' }}
                  >
                    🔵 Google
                  </button>
                  <button
                    className="btn btn-outline-dark flex-fill py-2"
                    style={{ borderRadius: '12px' }}
                  >
                    ⚫ GitHub
                  </button>
                </div>

                {/* Register link */}
                <p className="text-center mb-0 small">
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none fw-semibold"
                    onClick={onSwitchToRegister}
                  >
                    Regístrate
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;