import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalMembers: 0,
    activeTransactions: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch data from APIs
      const booksRes = await api.get('/books?limit=1000');
      const membersRes = await api.get('/members?limit=1000');
      const transactionsRes = await api.get('/transactions?status=issued');

      const books = booksRes.data.books || [];
      const availableCount = books.reduce((sum, book) => sum + book.available, 0);

      setStats({
        totalBooks: books.length,
        availableBooks: availableCount,
        totalMembers: membersRes.data.total || 0,
        activeTransactions: transactionsRes.data.total || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome to IICT Library Management System, {user?.username}!</p>
      
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
          <h3>Active Transactions</h3>
          <p>{stats.activeTransactions}</p>
        </div>
      </div>

      <div className="card">
        <h2>Quick Actions</h2>
        <p>Use the navigation menu above to manage books, members, and transactions.</p>
        <ul>
          <li>View and manage the book inventory</li>
          <li>Add and update library members</li>
          <li>Issue and return books</li>
          <li>Track overdue items and fines</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
