import React, { useState } from 'react';
import './Login.css';

const Login = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
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

    if (isRegister) {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (!formData.email || !formData.username || !formData.password) {
        setError('Please fill all fields');
        setIsLoading(false);
        return;
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.find(user => user.username === formData.username || user.email === formData.email)) {
        setError('User already exists');
        setIsLoading(false);
        return;
      }

      // Register new user
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // In real app, hash this
        isAdmin: false,
        registrationTime: new Date().toISOString()
      };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      onLogin({
        ...newUser,
        loginTime: new Date().toISOString()
      });
      setIsLoading(false);
    } else {
      // Login logic
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
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === formData.username && u.password === formData.password);
        if (user) {
          onLogin({
            ...user,
            loginTime: new Date().toISOString()
          });
        } else {
          setError('Invalid username or password');
        }
      }
      setIsLoading(false);
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
          <h2>{isRegister ? 'Create an account' : 'Log in to your account'}</h2>
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

          {isRegister && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                />
              </div>
            </>
          )}

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
          <p>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              className="signup-link"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setFormData({
                  username: '',
                  password: '',
                  email: '',
                  confirmPassword: ''
                });
              }}
            >
              {isRegister ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
