import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4">Admin Log-in</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter admin password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;

