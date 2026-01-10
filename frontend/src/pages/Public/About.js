import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <nav className="top-nav">
        <Link to="/" className="nav-brand">IICT Library</Link>
        <div className="nav-menu">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </nav>

      <div className="container">
        <h1>About IICT Library</h1>
        
        <div className="library-card">
          <h2>Our History</h2>
          <p>
            The Institute of Information and Communication Technology Library was established 
            to serve as the intellectual heart of our institution. Since its inception, the 
            library has been committed to supporting academic excellence and research.
          </p>
        </div>

        <div className="library-card">
          <h2>Our Collection</h2>
          <p>The library maintains an extensive collection including:</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '2' }}>
            <li>Computer Science and Engineering textbooks</li>
            <li>Research journals and periodicals</li>
            <li>Reference materials and encyclopedias</li>
            <li>Electronics and Communication resources</li>
            <li>Mathematics and Physics texts</li>
            <li>Digital resources and e-books</li>
          </ul>
        </div>

        <div className="library-card">
          <h2>Library Rules</h2>
          <ol style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '2' }}>
            <li>Maintain silence in the library premises</li>
            <li>Students can borrow up to 3 books for 14 days</li>
            <li>Faculty members can borrow up to 5 books for 30 days</li>
            <li>Late returns will incur a fine of ₹5 per day</li>
            <li>Handle books with care - no marking or damage</li>
            <li>Return books on or before the due date</li>
            <li>Library cards must be carried at all times</li>
          </ol>
        </div>

        <div className="library-card">
          <h2>Departments Served</h2>
          <p>Our library serves various departments including:</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '2', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <li>Computer Science</li>
            <li>Information Technology</li>
            <li>Electronics & Communication</li>
            <li>Mathematics</li>
            <li>Physics</li>
            <li>Research Scholars</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
