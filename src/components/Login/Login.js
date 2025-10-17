import React, { useState } from 'react';
import './Login.css';

const Login = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check for admin credentials
    if (formData.username === "shehanaa@gmail.com" && formData.password === "2244") {
      // Admin login
      onLogin({
        username: formData.username,
        isAdmin: true,
        loginTime: new Date().toISOString()
      });
    } else {
      // Regular user login
      setTimeout(() => {
        if (formData.username && formData.password) {
          // Simulate successful login
          onLogin({
            username: formData.username,
            isAdmin: false,
            loginTime: new Date().toISOString()
          });
        } else {
          setError('Please enter both username and password');
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={handleBackdropClick}>
      <div className="login-modal">
        <div className="login-header">
          <h2>Log in to your account</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="forgot-password"
              onClick={() => alert('Forgot password functionality would be implemented here')}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <button className="signup-link">Sign up</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
