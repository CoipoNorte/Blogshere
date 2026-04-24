// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError('');
  };

  // Validación de fuerza de contraseña
  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return { level: 0, label: '', color: '' };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 2) return { level: 33, label: 'Débil', color: 'danger' };
    if (score <= 3) return { level: 66, label: 'Media', color: 'warning' };
    return { level: 100, label: 'Fuerte', color: 'success' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = register(form.name, form.username, form.email, form.password);
      if (!result.success) {
        setError(result.message);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.95)',
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
                  <h3 className="fw-bold mb-1">Únete a BlogSphere</h3>
                  <p className="text-muted small">Crea tu cuenta gratuita</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="alert alert-danger py-2 small text-center">
                    ⚠️ {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre completo</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">👤</span>
                      <input
                        type="text"
                        className="form-control bg-light border-start-0"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">@</span>
                      <input
                        type="text"
                        className="form-control bg-light border-start-0"
                        placeholder="tunombre"
                        value={form.username}
                        onChange={(e) =>
                          handleChange('username', e.target.value.toLowerCase().replace(/\s/g, ''))
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">📧</span>
                      <input
                        type="email"
                        className="form-control bg-light border-start-0"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control bg-light border-start-0 border-end-0"
                        placeholder="Mínimo 6 caracteres"
                        value={form.password}
                        onChange={(e) => handleChange('password', e.target.value)}
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
                    {/* Strength bar */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="progress" style={{ height: '4px' }}>
                          <div
                            className={`progress-bar bg-${strength.color}`}
                            style={{ width: `${strength.level}%`, transition: 'width 0.3s' }}
                          ></div>
                        </div>
                        <small className={`text-${strength.color}`}>{strength.label}</small>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Confirmar contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control bg-light border-start-0"
                        placeholder="Repite tu contraseña"
                        value={form.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <small className="text-danger">Las contraseñas no coinciden</small>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label className="form-check-label small" htmlFor="terms">
                      Acepto los{' '}
                      <a href="#!" className="text-decoration-none">
                        términos y condiciones
                      </a>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 fw-semibold mb-3"
                    disabled={loading}
                    style={{ borderRadius: '12px' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                  </button>
                </form>

                {/* Login link */}
                <p className="text-center mb-0 small">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none fw-semibold"
                    onClick={onSwitchToLogin}
                  >
                    Inicia sesión
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

export default Register;