import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">All Products</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
          {!isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Log-in</Link>
            </li>
          )}
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Product</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;



