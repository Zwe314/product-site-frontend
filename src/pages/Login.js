import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/');
      window.location.reload(); // Refresh to update Navbar
    } else {
      alert('❌ Incorrect password');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Admin log-in</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Enter Admin Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
