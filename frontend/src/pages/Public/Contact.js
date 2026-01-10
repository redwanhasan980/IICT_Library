import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
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
        <h1>Contact Us</h1>
        
        <div className="library-card">
          <h2>IICT Library</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '2', marginTop: '15px' }}>
            <strong>Institute of Information and Communication Technology</strong><br />
            University Campus<br />
            [Address Line 1]<br />
            [City, State - PIN Code]
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '20px 0' }}>
          <div className="library-card">
            <h3>📞 Phone</h3>
            <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>
              +91 XXX XXX XXXX<br />
              Extension: XXXX
            </p>
          </div>

          <div className="library-card">
            <h3>✉️ Email</h3>
            <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>
              library@iict.edu<br />
              librarian@iict.edu
            </p>
          </div>

          <div className="library-card">
            <h3>🕐 Working Hours</h3>
            <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 1:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="library-card">
          <h2>Library Staff</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. [Name]</td>
                <td>Chief Librarian</td>
                <td>chief.librarian@iict.edu</td>
              </tr>
              <tr>
                <td>[Name]</td>
                <td>Assistant Librarian</td>
                <td>assistant.librarian@iict.edu</td>
              </tr>
              <tr>
                <td>[Name]</td>
                <td>Library Assistant</td>
                <td>library.assistant@iict.edu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Contact;
