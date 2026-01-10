import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ReturnBook() {
  const [borrowings, setBorrowings] = useState([]);
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    try {
      const response = await api.get('/admin/borrowings/active');
      setBorrowings(response.data.borrowings || []);
    } catch (error) {
      console.error('Error fetching borrowings:', error);
    }
  };

  const handleReturn = async (borrowId, memberType) => {
    if (!window.confirm('Are you sure you want to mark this book as returned?')) return;
    
    setError('');
    setSuccess('');
    try {
      await api.post('/admin/return-book', { borrowId, memberType });
      setSuccess('Book returned successfully!');
      fetchBorrowings();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to return book');
    }
  };

  const filteredBorrowings = borrowings.filter(b => 
    b.memberName.toLowerCase().includes(search.toLowerCase()) ||
    b.memberId.toLowerCase().includes(search.toLowerCase()) ||
    b.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
    b.accessionNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📥 Return Book</h1>
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="library-card">
        <div className="form-group">
          <input 
            type="text"
            placeholder="Search by member name, ID, or book title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {filteredBorrowings.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No active borrowings found
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Member</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Book</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Borrow Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrowings.map((b) => (
                  <tr key={`${b.memberType}-${b.borrowId}`} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>
                      <strong>{b.memberName}</strong><br />
                      <small>{b.memberId} ({b.memberType})</small>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <strong>{b.bookTitle}</strong><br />
                      <small>{b.accessionNumber}</small>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {new Date(b.borrowDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        backgroundColor: b.status === 'Borrowed' ? '#fff3cd' : '#d1ecf1',
                        color: '#000'
                      }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleReturn(b.borrowId, b.memberType)}
                        style={{ 
                          padding: '6px 12px',
                          backgroundColor: 'var(--maroon)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Mark Returned
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnBook;

