import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Public Pages
import Landing from './pages/Public/Landing';
import Login from './pages/Public/Login';
import Register from './components/Auth/Register';
import About from './pages/Public/About';
import Contact from './pages/Public/Contact';

// Student Pages
import StudentDashboard from './pages/Student/Dashboard';
import StudentBooks from './pages/Student/Books';
import BookDetails from './pages/Student/BookDetails';
import BorrowHistory from './pages/Student/BorrowHistory';
import OutsideBook from './pages/Student/OutsideBook';
import StudentProfile from './pages/Student/Profile';

// Faculty Pages
import FacultyDashboard from './pages/Faculty/Dashboard';
import FacultyBooks from './pages/Faculty/Books';
import FacultyHistory from './pages/Faculty/History';
import FacultyProfile from './pages/Faculty/Profile';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminBooks from './pages/Admin/Books';
import AddBook from './pages/Admin/AddBook';
import EditBook from './pages/Admin/EditBook';
import IssueBook from './pages/Admin/IssueBook';
import ReturnBook from './pages/Admin/ReturnBook';
import BorrowersList from './pages/Admin/BorrowersList';
import FacultyRecords from './pages/Admin/FacultyRecords';
import OutsideBookLogs from './pages/Admin/OutsideBookLogs';
import UserManagement from './pages/Admin/UserManagement';
import Reports from './pages/Admin/Reports';

// Layout
import Navigation from './components/Layout/Navigation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getDefaultRoute = (role) => {
    if (role === 'admin' || role === 'librarian') return '/admin/dashboard';
    if (role === 'faculty') return '/faculty/dashboard';
    return '/student/dashboard';
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navigation user={user} onLogout={handleLogout} />}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to={getDefaultRoute(user?.role)} /> : <Landing />} 
          />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={getDefaultRoute(user?.role)} />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register onRegister={handleLogin} /> : <Navigate to={getDefaultRoute(user?.role)} />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={isAuthenticated ? <StudentDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student/books" 
            element={isAuthenticated ? <StudentBooks user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student/books/:id" 
            element={isAuthenticated ? <BookDetails user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student/history" 
            element={isAuthenticated ? <BorrowHistory user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student/outside-book" 
            element={isAuthenticated ? <OutsideBook user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student/profile" 
            element={isAuthenticated ? <StudentProfile user={user} /> : <Navigate to="/login" />} 
          />

          {/* Faculty Routes */}
          <Route 
            path="/faculty/dashboard" 
            element={isAuthenticated && user?.role === 'faculty' ? <FacultyDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/faculty/books" 
            element={isAuthenticated && user?.role === 'faculty' ? <FacultyBooks user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/faculty/history" 
            element={isAuthenticated && user?.role === 'faculty' ? <FacultyHistory user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/faculty/profile" 
            element={isAuthenticated && user?.role === 'faculty' ? <FacultyProfile user={user} /> : <Navigate to="/login" />} 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <AdminDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/books" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <AdminBooks user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/books/add" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <AddBook user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/books/edit/:id" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <EditBook user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/issue" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <IssueBook user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/return" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <ReturnBook user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/borrowers" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <BorrowersList user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/faculty-records" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <FacultyRecords user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/outside-books" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <OutsideBookLogs user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/users" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <UserManagement user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/reports" 
            element={isAuthenticated && (user?.role === 'admin' || user?.role === 'librarian') ? <Reports user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
