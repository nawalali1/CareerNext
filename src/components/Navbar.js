import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar({ user }) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <nav className="navbar">
      <h2>CareerNext</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!user && (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
        {user && (
          <>
            <li><Link to="/questionnaire">Quiz</Link></li>
            <li><Link to="/results">Results</Link></li>
            <li><Link to="/cv-builder">Build CV</Link></li> {/* ✅ Added link */}
            <li style={{ color: '#3f51b5', fontWeight: '500' }}>{user.email}</li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
