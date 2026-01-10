import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ 
    accessionNumber: '', 
    memberId: '', 
    memberType: '',
    borrowDate: new Date().toISOString().split('T')[0]
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books?limit=1000');
      setBooks(response.data.books.filter(b => b.AvailableCopy > 0));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const searchMembers = async (query) => {
    if (!query) {
      setMembers([]);
      return;
    }
    try {
      const response = await api.get(`/admin/members/search?query=${query}`);
      setMembers(response.data.members || []);
    } catch (error) {
      console.error('Error searching members:', error);
    }
  };

  const handleMemberSelect = (member) => {
    setFormData({
      ...formData,
      memberId: member.id,
      memberType: member.type
    });
    setSearchQuery(`${member.name} (${member.id}) - ${member.type}`);
    setMembers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.memberId || !formData.memberType) {
      setError('Please select a valid member');
      return;
    }

    try {
      await api.post('/admin/issue-book', formData);
      setSuccess('Book issued successfully!');
      setFormData({ 
        accessionNumber: '', 
        memberId: '', 
        memberType: '',
        borrowDate: new Date().toISOString().split('T')[0]
      });
      setSearchQuery('');
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to issue book');
    }
  };

  return (
    <div className="container">
      <h1>📤 Issue Book</h1>
      <div className="library-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Book *</label>
            <select required value={formData.accessionNumber} onChange={(e) => setFormData({...formData, accessionNumber: e.target.value})}>
              <option value="">Choose a book...</option>
              {books.map(book => (
                <option key={book.AccessionNumber} value={book.AccessionNumber}>
                  {book.Title} - {book.AuthorEditor} (Available: {book.AvailableCopy})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Search Member (Student/Faculty) *</label>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchMembers(e.target.value);
              }}
              placeholder="Search by name, reg number, or teacher ID"
            />
            {members.length > 0 && (
              <div style={{ 
                border: '1px solid #ddd', 
                marginTop: '5px', 
                maxHeight: '200px', 
                overflowY: 'auto',
                backgroundColor: 'white'
              }}>
                {members.map(member => (
                  <div 
                    key={member.id}
                    onClick={() => handleMemberSelect(member)}
                    style={{ 
                      padding: '10px', 
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      ':hover': { backgroundColor: '#f5f5f5' }
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    <strong>{member.name}</strong> ({member.id})<br />
                    <small>{member.type.toUpperCase()} - {member.department}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Borrow Date *</label>
            <input type="date" required value={formData.borrowDate} onChange={(e) => setFormData({...formData, borrowDate: e.target.value})} />
          </div>
          <button type="submit" style={{ width: '100%' }}>Issue Book</button>
        </form>
      </div>
    </div>
  );
}

export default IssueBook;
