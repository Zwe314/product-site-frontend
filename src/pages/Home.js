import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('https://product-site-backend.onrender.com/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products:', err));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`https://product-site-backend.onrender.com/api/products/${id}`);
      alert("Product deleted.");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100">
              <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6 className="text-primary">${product.price}</h6>

                {isAdmin() && (
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/edit/${product._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;



