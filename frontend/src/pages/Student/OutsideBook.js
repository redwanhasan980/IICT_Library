import React, { useState } from 'react';
import api from '../../services/api';

function OutsideBook({ user }) {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    bookTitle: '',
    department: '',
    semester: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await api.post('/outside-books', {
        ...formData,
        studentEmail: user.email
      });
      setSuccess('Outside book entry logged successfully!');
      setFormData({
        registrationNumber: '',
        bookTitle: '',
        department: '',
        semester: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to log outside book');
    }
  };

  return (
    <div className="container">
      <h1>📓 Outside Book Entry</h1>
      <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
        Log books you're bringing from outside the library
      </p>

      <div className="library-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: '#f0f8ec', padding: '15px', marginBottom: '20px', border: '1px solid #6ba544' }}>
          <p style={{ fontStyle: 'italic' }}>
            <strong>Note:</strong> Students bringing books from outside must register them here 
            for security and tracking purposes. This helps maintain library records and prevents 
            confusion with library books.
          </p>
        </div>

        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter your registration number"
              required
            />
          </div>

          <div className="form-group">
            <label>Book Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              placeholder="Enter the book title"
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          <button type="submit" style={{ width: '100%' }}>Log Outside Book</button>
        </form>
      </div>

      <div className="library-card" style={{ maxWidth: '700px', margin: '20px auto' }}>
        <h3>Why Log Outside Books?</h3>
        <ul style={{ lineHeight: '2', marginTop: '10px' }}>
          <li>Helps librarians distinguish between library and personal books</li>
          <li>Maintains accurate inventory records</li>
          <li>Prevents accidental check-ins of non-library books</li>
          <li>Ensures security at library entrances and exits</li>
        </ul>
      </div>
    </div>
  );
}

export default OutsideBook;
