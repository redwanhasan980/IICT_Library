import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalMembers: 0,
    activeTransactions: 0,
    overdueBooks: 0,
    totalStudents: 0,
    totalFaculty: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontStyle: 'italic' }}>
        Library Management Overview
      </p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p>{stats.totalBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Available Books</h3>
          <p>{stats.availableBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Members</h3>
          <p>{stats.totalMembers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Borrowings</h3>
          <p>{stats.activeTransactions}</p>
        </div>
        <div className="stat-card" style={{ background: stats.overdueBooks > 0 ? 'linear-gradient(135deg, var(--maroon), #5d1520)' : undefined }}>
          <h3>Overdue Books</h3>
          <p>{stats.overdueBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Faculty</h3>
          <p>{stats.totalFaculty}</p>
        </div>
      </div>

      <div className="library-card">
        <h2>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
          <a href="/admin/issue" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%' }}>Issue Book</button>
          </a>
          <a href="/admin/return" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%' }}>Return Book</button>
          </a>
          <a href="/admin/books/add" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%' }}>Add New Book</button>
          </a>
          <a href="/admin/users" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%' }}>Manage Users</button>
          </a>
        </div>
      </div>

      <div className="library-card">
        <h2>System Information</h2>
        <p style={{ marginTop: '10px', lineHeight: '1.8' }}>
          <strong>Logged in as:</strong> {user?.username} ({user?.role})<br />
          <strong>Last Login:</strong> {new Date().toLocaleString()}<br />
          <strong>System Status:</strong> <span style={{ color: '#4a7c31', fontWeight: 'bold' }}>Operational</span>
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
