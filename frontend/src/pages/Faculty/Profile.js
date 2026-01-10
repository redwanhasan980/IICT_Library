import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function FacultyProfile({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const teacherId = user?.teacherId || user?.username;
      
      if (teacherId) {
        const response = await api.get(`/faculty/profile/${teacherId}`);
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="container">
      <h1>👤 Faculty Profile</h1>
      
      <div className="library-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Faculty Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Name</strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.TeacherName || user?.username}</span>
          </div>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Teacher ID</strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.TeacherID || user?.email}</span>
          </div>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Email</strong>
            <span style={{ fontSize: '1.1rem' }}>{user?.email}</span>
          </div>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Designation</strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.Designation || 'N/A'}</span>
          </div>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Department</strong>
            <span style={{ fontSize: '1.1rem' }}>{profile?.department?.DepartmentName || profile?.DepartmentNameShortHand || 'N/A'}</span>
          </div>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Maximum Books Allowed</strong>
            <span style={{ fontSize: '1.1rem' }}>5 books</span>
          </div>
          <div style={{ padding: '15px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>Borrowing Period</strong>
            <span style={{ fontSize: '1.1rem' }}>30 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyProfile;
