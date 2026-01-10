import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function StudentProfile({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Extract registration number from user data
      // Assuming it's stored in user object from registration
      const regNumber = user?.registrationNumber || user?.username;
      
      console.log('User object:', user);
      console.log('Registration Number:', regNumber);
      
      if (regNumber) {
        const response = await api.get(`/students/profile/${regNumber}`);
        console.log('Profile response:', response.data);
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      console.error('Error response:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="container">
      <h1>👤 My Profile</h1>
      
      <div className="library-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Student Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Name
            </strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.StudentName || user?.username}</span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Registration Number
            </strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.StudentRegNumber || user?.email}</span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Email
            </strong>
            <span style={{ fontSize: '1.1rem' }}>{user?.email}</span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Phone Number
            </strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.PhoneNumber || 'N/A'}</span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Department
            </strong>
            <span style={{ fontSize: '1.1rem' }}>
              {profile?.department?.DepartmentName || profile?.DepartmentNameShortHand || 'N/A'}
            </span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Session
            </strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.Session || 'N/A'}</span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Maximum Books Allowed
            </strong>
            <span style={{ fontSize: '1.1rem' }}>3 books</span>
          </div>

          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
              Borrowing Period
            </strong>
            <span style={{ fontSize: '1.1rem' }}>14 days</span>
          </div>
        </div>
      </div>

      <div className="library-card" style={{ maxWidth: '700px', margin: '20px auto' }}>
        <h3>Library Privileges</h3>
        <ul style={{ lineHeight: '2', marginTop: '10px' }}>
          <li>Borrow up to 3 books at a time</li>
          <li>14-day borrowing period</li>
          <li>Access to digital resources and e-journals</li>
          <li>Use of library reading rooms and study areas</li>
          <li>Inter-library loan facility (subject to availability)</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentProfile;
