import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ user, onLogout }) {
  const location = useLocation();
  const isAdmin = user?.role === 'admin' || user?.role === 'librarian';
  const isFaculty = user?.role === 'faculty';
  const isStudent = user?.role === 'member' || user?.role === 'student';

  const getNavLinks = () => {
    if (isAdmin) {
      return (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/books">Books</Link>
          <Link to="/admin/issue">Issue</Link>
          <Link to="/admin/return">Return</Link>
          <Link to="/admin/borrowers">Borrowers</Link>
          <Link to="/admin/reports">Reports</Link>
        </>
      );
    }
    if (isFaculty) {
      return (
        <>
          <Link to="/faculty/dashboard">Dashboard</Link>
          <Link to="/faculty/books">Books</Link>
          <Link to="/faculty/history">History</Link>
          <Link to="/faculty/profile">Profile</Link>
        </>
      );
    }
    return (
      <>
        <Link to="/student/dashboard">Dashboard</Link>
        <Link to="/student/books">Books</Link>
        <Link to="/student/history">History</Link>
        <Link to="/student/outside-book">Outside Book</Link>
        <Link to="/student/profile">Profile</Link>
      </>
    );
  };

  const getBottomNavLinks = () => {
    if (isAdmin) {
      return (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/books">Books</Link>
          <Link to="/admin/issue">Issue</Link>
          <Link to="/admin/return">Return</Link>
        </>
      );
    }
    if (isFaculty) {
      return (
        <>
          <Link to="/faculty/dashboard">Dashboard</Link>
          <Link to="/faculty/books">Books</Link>
          <Link to="/faculty/history">History</Link>
          <Link to="/faculty/profile">Profile</Link>
        </>
      );
    }
    return (
      <>
        <Link to="/student/dashboard">Dashboard</Link>
        <Link to="/student/books">Books</Link>
        <Link to="/student/history">History</Link>
        <Link to="/student/profile">Profile</Link>
      </>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="top-nav">
        <Link to="/" className="nav-brand">IICT Library</Link>
        <div className="nav-menu">
          {getNavLinks()}
          <span className="nav-user">Welcome, {user?.username}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="bottom-nav">
        <div className="bottom-nav-items">
          {getBottomNavLinks()}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
