import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function StudentBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const response = await api.get(`/catalog?search=${search}&searchBy=${searchBy}&limit=100`);
      setBooks(response.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="container">
      <h1>📚 Book Catalog</h1>
      <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
        Search and browse our collection
      </p>

      <div className="library-card">
        <div className="search-bar">
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} style={{ flex: '0 0 200px' }}>
            <option value="title">Search by Title</option>
            <option value="author">Search by Author</option>
            <option value="accession">Accession Number</option>
            <option value="ddc">Dewey Decimal</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchBy}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <Link to={`/student/books/${book.AccessionNumber}`} key={book.AccessionNumber} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="book-catalog-card">
              <h3>{book.Title}</h3>
              <div className="book-metadata">
                <div><strong>Author:</strong> {book.AuthorEditor}</div>
                <div><strong>ISBN:</strong> {book.ISBN || 'N/A'}</div>
                <div><strong>Publisher:</strong> {book.Publisher || 'N/A'}</div>
                <div><strong>Edition:</strong> {book.Edition || 'N/A'}</div>
                <div><strong>Accession:</strong> {book.AccessionNumber}</div>
                {book.classification?.SubjectCategory && (
                  <div><strong>Category:</strong> {book.classification.SubjectCategory}</div>
                )}
                {book.classification?.CallNumber && (
                  <div><strong>Call Number:</strong> {book.classification.CallNumber}</div>
                )}
                <div><strong>Available Copies:</strong> {book.AvailableCopy || 0}</div>
              </div>
              {book.AvailableCopy > 0 ? (
                <span style={{ color: '#4a7c31', fontWeight: 'bold', marginTop: '10px', display: 'block' }}>
                  ✓ Available
                </span>
              ) : (
                <span style={{ color: 'var(--maroon)', fontWeight: 'bold', marginTop: '10px', display: 'block' }}>
                  ✗ Not Available
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {books.length === 0 && (
        <div className="library-card">
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
            No books found. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}

export default StudentBooks;
