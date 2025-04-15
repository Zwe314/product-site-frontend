import React from 'react';
import { Link } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">ProductSite</Link>
      <div className="ms-auto d-flex align-items-center">
        {isAdmin() && (
          <Link to="/add" className="btn btn-sm btn-success me-2">Add Product</Link>
        )}
        {isAdmin() ? (
          <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-sm btn-outline-light">
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

