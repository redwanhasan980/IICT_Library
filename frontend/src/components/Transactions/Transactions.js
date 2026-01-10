import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Transactions({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: ''
  });

  useEffect(() => {
    fetchTransactions();
    fetchBooks();
    fetchMembers();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions?limit=100');
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books?limit=1000');
      setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await api.get('/members?limit=1000');
      setMembers(response.data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleIssueBook = () => {
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 14); // 14 days from now
    
    setFormData({
      bookId: '',
      memberId: '',
      dueDate: defaultDueDate.toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions/issue', formData);
      setShowModal(false);
      fetchTransactions();
      fetchBooks(); // Refresh to update available count
    } catch (error) {
      alert('Error issuing book: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleReturn = async (id) => {
    if (window.confirm('Mark this book as returned?')) {
      try {
        const response = await api.put(`/transactions/return/${id}`);
        if (response.data.fine > 0) {
          alert(`Book returned. Fine: ₹${response.data.fine}`);
        } else {
          alert('Book returned successfully');
        }
        fetchTransactions();
        fetchBooks(); // Refresh to update available count
      } catch (error) {
        alert('Error returning book: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'librarian';

  return (
    <div className="container">
      <h1>Transactions Management</h1>
      
      {isAdmin && (
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleIssueBook}>Issue New Book</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Book</th>
            <th>Member</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Fine</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.Book?.title || 'N/A'}</td>
              <td>{transaction.Member?.name || 'N/A'}</td>
              <td>{new Date(transaction.issueDate).toLocaleDateString()}</td>
              <td>{new Date(transaction.dueDate).toLocaleDateString()}</td>
              <td>{transaction.status}</td>
              <td>₹{transaction.fine}</td>
              {isAdmin && (
                <td>
                  {transaction.status === 'issued' && (
                    <button 
                      className="btn-sm btn-success" 
                      onClick={() => handleReturn(transaction.id)}
                    >
                      Return
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Issue Book</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <select
                value={formData.bookId}
                onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                required
              >
                <option value="">Select Book</option>
                {books.filter(b => b.available > 0).map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} - {book.author} (Available: {book.available})
                  </option>
                ))}
              </select>
              <select
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                required
              >
                <option value="">Select Member</option>
                {members.filter(m => m.status === 'active').map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.membershipId})
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
              <button type="submit">Issue Book</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
