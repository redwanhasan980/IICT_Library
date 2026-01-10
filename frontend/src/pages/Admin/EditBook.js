import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isbn: '', title: '', author: '', publisher: '', category: '',
    quantity: 1, available: 1, publicationYear: '', shelfLocation: ''
  });

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, formData);
      navigate('/admin/books');
    } catch (error) {
      alert('Error updating book');
    }
  };

  return (
    <div className="container">
      <h1>✏️ Edit Book</h1>
      <div className="library-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label>ISBN</label>
              <input value={formData.isbn} onChange={(e) => setFormData({...formData, isbn: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Publisher</label>
              <input value={formData.publisher} onChange={(e) => setFormData({...formData, publisher: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Available</label>
              <input type="number" value={formData.available} onChange={(e) => setFormData({...formData, available: e.target.value})} />
            </div>
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Update Book</button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
