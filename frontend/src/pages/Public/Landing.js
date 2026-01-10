import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-page">
      <nav className="top-nav">
        <Link to="/" className="nav-brand">IICT Library</Link>
        <div className="nav-menu">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </nav>

      <div className="hero-section">
        <h1>IICT Library</h1>
        <p>Institute of Information and Communication Technology</p>
        <p style={{ fontSize: '1.1rem', fontStyle: 'normal', marginTop: '20px' }}>
          Preserving Knowledge, Empowering Minds
        </p>
        <Link to="/login">
          <button style={{ marginTop: '30px', padding: '15px 40px', fontSize: '18px' }}>
            Enter Library
          </button>
        </Link>
      </div>

      <div className="container">
        <div className="library-card">
          <h2>Welcome to Our Collection</h2>
          <p style={{ fontSize: '1.1rem', marginTop: '15px' }}>
            Our library houses an extensive collection of books, journals, and research papers 
            covering various domains of Information and Communication Technology. From classic 
            computer science texts to the latest research in artificial intelligence, we provide 
            resources for students, faculty, and researchers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '40px 0' }}>
          <div className="library-card">
            <h3>📚 Vast Collection</h3>
            <p>Thousands of books across multiple disciplines including Computer Science, 
            Electronics, Mathematics, and more.</p>
          </div>
          <div className="library-card">
            <h3>🔍 Easy Search</h3>
            <p>Find books quickly using our catalog search by title, author, or 
            Dewey Decimal Classification.</p>
          </div>
          <div className="library-card">
            <h3>👥 For Everyone</h3>
            <p>Resources available for students, faculty members, and research scholars 
            with dedicated borrowing privileges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
