import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://product-site-backend.onrender.com/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await axios.delete(`https://product-site-backend.onrender.com/api/products/${id}`);
      alert('Product deleted.');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="container mt-5">
      {/* ✅ Header + Add button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/add')}
        >
          + Add Product
        </button>
      </div>

      {/* ✅ Product list */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageUrls?.[0]}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  
                  {/* ✅ Show price without $ sign */}
                  <h6 className="text-primary">{product.price}</h6>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/admin/edit/${product._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;



