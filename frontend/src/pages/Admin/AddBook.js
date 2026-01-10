import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AccessionNumber: '',
    Title: '',
    AuthorEditor: '',
    Edition: '',
    Volume: '1',
    Publisher: '',
    PlaceOfPublication: '',
    DateOfPublication: '',
    Source: 'purchase',
    Binding: 'PB',
    Pagination: '',
    BillNumber: '',
    BillDate: '',
    ISBN: '',
    AvailableCopy: 1
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', formData);
      setSuccess('Book added successfully!');
      setTimeout(() => navigate('/admin/books'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add book');
    }
  };

  return (
    <div className="container">
      <h1>➕ Add New Book</h1>
      <div className="library-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label>Accession Number *</label>
              <input required value={formData.AccessionNumber} onChange={(e) => setFormData({...formData, AccessionNumber: e.target.value})} placeholder="e.g., I002537" />
            </div>
            <div className="form-group">
              <label>Title *</label>
              <input required value={formData.Title} onChange={(e) => setFormData({...formData, Title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Author/Editor *</label>
              <input required value={formData.AuthorEditor} onChange={(e) => setFormData({...formData, AuthorEditor: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Publisher</label>
              <input value={formData.Publisher} onChange={(e) => setFormData({...formData, Publisher: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Place of Publication</label>
              <input value={formData.PlaceOfPublication} onChange={(e) => setFormData({...formData, PlaceOfPublication: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Date of Publication</label>
              <input type="date" value={formData.DateOfPublication} onChange={(e) => setFormData({...formData, DateOfPublication: e.target.value})} />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input value={formData.ISBN} onChange={(e) => setFormData({...formData, ISBN: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Edition</label>
              <input value={formData.Edition} onChange={(e) => setFormData({...formData, Edition: e.target.value})} placeholder="e.g., 3rd" />
            </div>
            <div className="form-group">
              <label>Volume</label>
              <input value={formData.Volume} onChange={(e) => setFormData({...formData, Volume: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Source</label>
              <select value={formData.Source} onChange={(e) => setFormData({...formData, Source: e.target.value})}>
                <option value="purchase">Purchase</option>
                <option value="donation">Donation</option>
                <option value="gift">Gift</option>
              </select>
            </div>
            <div className="form-group">
              <label>Binding</label>
              <select value={formData.Binding} onChange={(e) => setFormData({...formData, Binding: e.target.value})}>
                <option value="PB">Paperback (PB)</option>
                <option value="HB">Hardback (HB)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pagination</label>
              <input type="number" value={formData.Pagination} onChange={(e) => setFormData({...formData, Pagination: e.target.value})} placeholder="Total pages" />
            </div>
            <div className="form-group">
              <label>Bill Number</label>
              <input value={formData.BillNumber} onChange={(e) => setFormData({...formData, BillNumber: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Bill Date</label>
              <input type="date" value={formData.BillDate} onChange={(e) => setFormData({...formData, BillDate: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Available Copies *</label>
              <input type="number" required min="1" value={formData.AvailableCopy} onChange={(e) => setFormData({...formData, AvailableCopy: e.target.value})} />
            </div>
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
