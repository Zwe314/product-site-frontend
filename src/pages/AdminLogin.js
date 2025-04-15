import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (password === adminPassword) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/'); // Redirect after login
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Admin Log-in</h2>
      <div className="d-flex flex-column align-items-center">
        <input
          type="password"
          className="form-control mb-3"
          style={{ maxWidth: '300px' }}
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-dark" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;


