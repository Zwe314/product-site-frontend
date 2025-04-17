import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/contact';

import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/admindashboard';
import AdminLayout from './components/AdminLayout';

// ✅ Check if admin is logged in
const getIsAdmin = () => localStorage.getItem('isAdmin') === 'true';

function App() {
  const location = useLocation();

  // ✅ Hide navbar for admin routes only
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ✅ Public (Customer Facing) Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={getIsAdmin() ? <AdminLayout><AdminDashboard /></AdminLayout> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add"
          element={getIsAdmin() ? <AdminLayout><AddProduct /></AdminLayout> : <Navigate to="/" />}
        />
        <Route
          path="/admin/edit/:id"
          element={getIsAdmin() ? <AdminLayout><EditProduct /></AdminLayout> : <Navigate to="/" />}
        />
        <Route
          path="/admin/login"
          element={getIsAdmin() ? <Navigate to="/admin/dashboard" /> : <AdminLayout><AdminLogin /></AdminLayout>}
        />

        {/* ✅ 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h3>404 - Page Not Found</h3>
              <p className="mt-3">
                Oops! The page you’re looking for doesn’t exist.{' '}
                <a href="/" className="btn btn-link">Go back to Home</a>
              </p>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}











