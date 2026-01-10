import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function BorrowHistory({ user }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const regNumber = user?.registrationNumber || user?.username;
      
      if (regNumber) {
        const response = await api.get(`/students/borrowing/${regNumber}`);
        setTransactions(response.data || []);
      } else {
        // Fallback to old method
        const response = await api.get('/transactions?limit=200');
        const userTransactions = response.data.transactions.filter(
          t => t.Member?.email === user.email
        );
        setTransactions(userTransactions);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
    <div className="container">
      <h1>📖 Borrow History</h1>
      <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
        Your complete borrowing record
      </p>

      <div className="library-card">
        {transactions.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Accession No.</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr 
                    key={transaction.BorrowID || transaction.id || index} 
                    className={transaction.status === 'returned' ? 'returned' : ''}
                  >
                    <td>{transaction.Book?.isbn || 'N/A'}</td>
                    <td>{transaction.Book?.title || 'N/A'}</td>
                    <td>{transaction.Book?.author || 'N/A'}</td>
                    <td>{new Date(transaction.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(transaction.dueDate).toLocaleDateString()}</td>
                    <td>{transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : '-'}</td>
                    <td>
                      <span style={{ 
                        color: transaction.status === 'issued' ? '#4a7c31' : 
                               transaction.status === 'overdue' ? 'var(--maroon)' : 
                               'var(--text-secondary)',
                        fontWeight: 'bold'
                      }}>
                        {transaction.status}
                      </span>
                    </td>
                    <td>{transaction.fine > 0 ? `₹${transaction.fine}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="mobile-card-list">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="library-card" style={{ marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>{transaction.Book?.title}</h3>
                  <div className="book-metadata">
                    <div><strong>Author:</strong> {transaction.Book?.author}</div>
                    <div><strong>Issue Date:</strong> {new Date(transaction.issueDate).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(transaction.dueDate).toLocaleDateString()}</div>
                    <div><strong>Status:</strong> {transaction.status}</div>
                    {transaction.fine > 0 && <div><strong>Fine:</strong> ₹{transaction.fine}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', fontStyle: 'italic', padding: '30px' }}>
            No borrowing history found.
          </p>
        )}
      </div>

      <div className="library-card">
        <h3>Legend</h3>
        <ul style={{ lineHeight: '2', marginTop: '10px' }}>
          <li><span style={{ textDecoration: 'line-through' }}>Strikethrough</span> - Returned books</li>
          <li><span style={{ color: '#4a7c31', fontWeight: 'bold' }}>issued</span> - Currently borrowed</li>
          <li><span style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>overdue</span> - Past due date</li>
        </ul>
      </div>
    </div>
  );
}

export default BorrowHistory;
