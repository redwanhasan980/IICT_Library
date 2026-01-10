import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function FacultyDashboard({ user }) {
  const [stats, setStats] = useState({
    borrowedBooks: 0,
    overdueBooks: 0,
    totalBorrowed: 0
  });
  const [recentBorrows, setRecentBorrows] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/transactions?limit=100');
      const userTransactions = response.data.transactions.filter(
        t => t.Member?.email === user.email
      );
      
      const borrowed = userTransactions.filter(t => t.status === 'issued').length;
      const overdue = userTransactions.filter(t => t.status === 'overdue').length;
      
      setStats({
        borrowedBooks: borrowed,
        overdueBooks: overdue,
        totalBorrowed: userTransactions.length
      });
      
      setRecentBorrows(userTransactions.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Faculty Dashboard</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '30px', fontStyle: 'italic' }}>
        Welcome back, {user?.username}!
      </p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Currently Borrowed</h3>
          <p>{stats.borrowedBooks}</p>
        </div>
        <div className="stat-card" style={{ background: stats.overdueBooks > 0 ? 'linear-gradient(135deg, var(--maroon), #5d1520)' : undefined }}>
          <h3>Overdue Books</h3>
          <p>{stats.overdueBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Borrowed</h3>
          <p>{stats.totalBorrowed}</p>
        </div>
        <div className="stat-card">
          <h3>Borrowing Limit</h3>
          <p>5 Books</p>
        </div>
      </div>

      <div className="library-card">
        <h2>Recent Borrows</h2>
        {recentBorrows.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBorrows.map((transaction) => (
                <tr key={transaction.id} className={transaction.status === 'returned' ? 'returned' : ''}>
                  <td>{transaction.Book?.title || 'N/A'}</td>
                  <td>{new Date(transaction.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(transaction.dueDate).toLocaleDateString()}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: '15px', fontStyle: 'italic' }}>No books borrowed yet.</p>
        )}
      </div>

      <div className="library-card">
        <h3>Faculty Privileges</h3>
        <ul style={{ lineHeight: '2', marginTop: '10px' }}>
          <li>Borrow up to 5 books at a time</li>
          <li>30-day borrowing period</li>
          <li>Priority access to new acquisitions</li>
          <li>Access to research journals and databases</li>
        </ul>
      </div>
    </div>
  );
}

export default FacultyDashboard;
