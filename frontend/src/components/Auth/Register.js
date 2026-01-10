import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    role: 'student',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Common fields
    fullName: '',
    phone: '',
    department: 'SWE',
    // Student specific
    registrationNumber: '',
    session: '',
    // Faculty specific
    teacherId: '',
    designation: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate role-specific required fields
    if (formData.role === 'student') {
      if (!formData.registrationNumber) {
        setError('Registration number is required for students');
        return;
      }
      if (!formData.fullName) {
        setError('Full name is required for students');
        return;
      }
      if (!formData.department) {
        setError('Department is required for students');
        return;
      }
    }

    if (formData.role === 'faculty' && !formData.teacherId) {
      setError('Teacher ID is required for faculty');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        fullName: formData.fullName,
        phone: formData.phone,
        department: formData.department,
        registrationNumber: formData.registrationNumber,
        session: formData.session,
        teacherId: formData.teacherId,
        designation: formData.designation
      });
      onRegister(response.data.token, response.data.user);
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.data.user.role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.errors?.[0]?.msg || 
                          'Registration failed';
      setError(errorMessage);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="library-card" style={{ maxWidth: '600px', width: '100%', margin: '20px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>IICT Library Registration</h2>
        {error && <div className="error" style={{ padding: '10px', marginBottom: '20px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Student Specific Fields */}
          {formData.role === 'student' && (
            <>
              <div className="form-group">
                <label>Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g., 2020131047"
                  required
                />
              </div>

              <div className="form-group">
                <label>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="SWE">Software Engineering (SWE)</option>
                  <option value="CSE">Computer Science and Engineering (CSE)</option>
                  <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Session</label>
                <input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  placeholder="e.g., 2020-21"
                />
              </div>
            </>
          )}

          {/* Faculty Specific Fields */}
          {formData.role === 'faculty' && (
            <>
              <div className="form-group">
                <label>Teacher ID *</label>
                <input
                  type="text"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  placeholder="e.g., swe55584"
                  required
                />
              </div>

              <div className="form-group">
                <label>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="SWE">Software Engineering (SWE)</option>
                  <option value="CSE">Computer Science and Engineering (CSE)</option>
                  <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Designation</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option value="">Select Designation</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </div>
            </>
          )}

          {/* Password Fields */}
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Register</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--dark-brown)', fontWeight: 'bold' }}>Login here</Link></p>
          <Link to="/" style={{ color: 'var(--dark-brown)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
