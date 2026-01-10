import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">IICT Library</div>
      <div className="navbar-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/members">Members</Link>
        <Link to="/transactions">Transactions</Link>
        <span className="navbar-user">Welcome, {user?.username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
