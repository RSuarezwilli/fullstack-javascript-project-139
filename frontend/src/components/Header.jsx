// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">Chat</Link>

      <div>
        {auth.user ? (
          <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline-primary">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
