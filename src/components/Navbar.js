import React from 'react';
import { Link } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">ProductSite</span>
      <div>
        <Link to="/" className="btn btn-outline-light me-2">
          All Products
        </Link>
        <Link to="/contact" className="btn btn-outline-light me-2">
          Contact Us
        </Link>
        {!isAdmin() && (
          <Link to="/admin" className="btn btn-outline-light">
            Admin Login
          </Link>
        )}
        {isAdmin() && (
          <button
            className="btn btn-outline-light"
            onClick={() => {
              localStorage.removeItem('isAdmin');
              window.location.href = '/';
            }}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


