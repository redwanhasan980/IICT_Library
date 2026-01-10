import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container">
        <div className="library-card">
          <h2>Book Not Found</h2>
          <Link to="/student/books">← Back to Catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/student/books" style={{ color: 'var(--dark-brown)', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
        ← Back to Catalog
      </Link>

      <div className="library-card">
        <h1 style={{ marginBottom: '30px', borderBottom: '3px solid var(--border-color)', paddingBottom: '15px' }}>
          {book.title}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div>
            <h3 style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>Bibliographic Information</h3>
            <div className="book-metadata">
              <div><strong>Title:</strong> {book.title}</div>
              <div><strong>Author:</strong> {book.author}</div>
              <div><strong>ISBN:</strong> {book.isbn}</div>
              <div><strong>Publisher:</strong> {book.publisher || 'N/A'}</div>
              <div><strong>Publication Year:</strong> {book.publicationYear || 'N/A'}</div>
              <div><strong>Category:</strong> {book.category || 'N/A'}</div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>Availability</h3>
            <div className="book-metadata">
              <div><strong>Total Copies:</strong> {book.quantity}</div>
              <div><strong>Available:</strong> {book.available}</div>
              <div><strong>Shelf Location:</strong> {book.shelfLocation || 'N/A'}</div>
              <div style={{ marginTop: '20px' }}>
                {book.available > 0 ? (
                  <span style={{ color: '#4a7c31', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ✓ Available for Borrowing
                  </span>
                ) : (
                  <span style={{ color: 'var(--maroon)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ✗ Currently Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {book.description && (
          <div style={{ marginTop: '30px', padding: '20px', background: 'var(--parchment-dark)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '10px' }}>Description</h3>
            <p>{book.description}</p>
          </div>
        )}

        <div style={{ marginTop: '30px', padding: '20px', background: '#f0f8ec', border: '2px solid #6ba544' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            <strong>Note:</strong> To borrow this book, please visit the library counter with your student ID card.
          </p>
          <p style={{ fontStyle: 'italic' }}>
            Borrowing Period: 14 days | Fine for late return: ₹5 per day
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
