import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      onLogin(response.data.token, response.data.user);
      
      // Redirect based on role
      if (response.data.user.role === 'admin' || response.data.user.role === 'librarian') {
        navigate('/admin/dashboard');
      } else if (response.data.user.role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="library-card" style={{ maxWidth: '450px', width: '90%', margin: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>IICT Library Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email / ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email or ID"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ marginBottom: '10px' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--dark-brown)', fontWeight: 'bold' }}>Register here</Link>
          </p>
          <Link to="/" style={{ color: 'var(--dark-brown)', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
