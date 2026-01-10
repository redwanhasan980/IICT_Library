import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Books({ user }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    AccessionNumber: '',
    ISBN: '',
    Title: '',
    AuthorEditor: '',
    Publisher: '',
    PlaceOfPublication: '',
    Edition: '',
    Volume: '',
    AvailableCopy: 1
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const response = await api.get(`/books?search=${search}&limit=100`);
      // Ensure we're setting an array
      setBooks(response.data.books || response.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      AccessionNumber: '',
      ISBN: '',
      Title: '',
      AuthorEditor: '',
      Publisher: '',
      PlaceOfPublication: '',
      Edition: '',
      Volume: '',
      AvailableCopy: 1
    });
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setEditingId(book.AccessionNumber);
    setFormData(book);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, formData);
      } else {
        await api.post('/books', formData);
      }
      setShowModal(false);
      fetchBooks();
    } catch (error) {
      alert('Error saving book: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${id}`);
        fetchBooks();
      } catch (error) {
        alert('Error deleting book');
      }
    }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'librarian';

  return (
    <div className="container">
      <h1>Books Management</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books by title, author, or ISBN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isAdmin && <button onClick={handleAdd}>Add New Book</button>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Accession No.</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Available</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.AccessionNumber}>
              <td>{book.AccessionNumber}</td>
              <td>{book.ISBN}</td>
              <td>{book.Title}</td>
              <td>{book.AuthorEditor}</td>
              <td>{book.Publisher}</td>
              <td>{book.AvailableCopy > 0 ? 'Yes' : 'No'}</td>
              {isAdmin && (
                <td>
                  <div className="actions">
                    <button className="btn-sm" onClick={() => handleEdit(book)}>Edit</button>
                    <button className="btn-sm btn-danger" onClick={() => handleDelete(book.AccessionNumber)}>Delete</button>
                  </div>
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
              <h2>{editingId ? 'Edit Book' : 'Add New Book'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Accession Number</label>
                <input
                  placeholder="Accession Number"
                  value={formData.AccessionNumber}
                  onChange={(e) => setFormData({ ...formData, AccessionNumber: e.target.value })}
                  required
                  disabled={!!editingId}
                />
              </div>
              
              <div className="form-group">
                <label>ISBN</label>
                <input
                  placeholder="ISBN"
                  value={formData.ISBN}
                  onChange={(e) => setFormData({ ...formData, ISBN: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  placeholder="Title"
                  value={formData.Title}
                  onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Author / Editor</label>
                <input
                  placeholder="Author/Editor"
                  value={formData.AuthorEditor}
                  onChange={(e) => setFormData({ ...formData, AuthorEditor: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Publisher</label>
                <input
                  placeholder="Publisher"
                  value={formData.Publisher}
                  onChange={(e) => setFormData({ ...formData, Publisher: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Copies Available</label>
                 <input
                  type="number"
                  placeholder="Available Copies"
                  value={formData.AvailableCopy}
                  onChange={(e) => setFormData({ ...formData, AvailableCopy: parseInt(e.target.value) || 0 })}
                />
              </div>

              <button type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
