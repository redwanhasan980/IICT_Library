import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function StudentDashboard({ user }) {
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
      // Extract registration number from user
      const regNumber = user?.registrationNumber || user?.username;
      
      if (regNumber) {
        const response = await api.get(`/students/borrowing/${regNumber}`);
        const borrowings = response.data || [];
        
        const borrowed = borrowings.filter(b => b.Status === 'Issued' || b.Status === 'Borrowed').length;
        const overdue = borrowings.filter(b => {
          if (b.Status === 'Issued' || b.Status === 'Borrowed') {
            const returnDate = new Date(b.ReturnDate);
            return returnDate < new Date();
          }
          return false;
        }).length;
        
        setStats({
          borrowedBooks: borrowed,
          overdueBooks: overdue,
          totalBorrowed: borrowings.length
        });
        
        setRecentBorrows(borrowings.slice(0, 5));
      } else {
        // Fallback to old method if no registration number
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
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
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
              {recentBorrows.map((transaction, index) => {
                const isReturned = transaction.Status === 'Returned';
                const isBorrowed = transaction.Status === 'Issued' || transaction.Status === 'Borrowed';
                
                return (
                  <tr key={transaction.BorrowID || index} className={isReturned ? 'returned' : ''}>
                    <td>{transaction.book?.Title || transaction.Book?.title || 'N/A'}</td>
                    <td>{new Date(transaction.BorrowDate || transaction.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(transaction.ReturnDate || transaction.dueDate).toLocaleDateString()}</td>
                    <td>{transaction.Status || transaction.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: '15px', fontStyle: 'italic' }}>No books borrowed yet.</p>
        )}
      </div>

      <div className="library-card">
        <h2>Quick Links</h2>
        <ul style={{ lineHeight: '2', marginTop: '15px' }}>
          <li><a href="/student/books" style={{ color: 'var(--dark-brown)' }}>Search & Browse Books</a></li>
          <li><a href="/student/history" style={{ color: 'var(--dark-brown)' }}>View Borrow History</a></li>
          <li><a href="/student/outside-book" style={{ color: 'var(--dark-brown)' }}>Log Outside Book</a></li>
          <li><a href="/student/profile" style={{ color: 'var(--dark-brown)' }}>My Profile</a></li>
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;
