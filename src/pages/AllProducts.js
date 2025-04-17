import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllProducts.css';

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('https://product-site-backend.onrender.com/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products:', err));
  };

  return (
    <div className="all-products-page">
      <div className="container py-5">
        <h2 className="mb-4 text-center fw-bold text-warning">All Products</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p className="text-light">No products available.</p>
          ) : (
            products.map((product) => (
              <div className="product-card shadow-sm" key={product._id}>
                <Link to={`/product/${product._id}`} className="text-decoration-none text-light">
                  <div className="product-image-wrapper">
                    <img
                      src={product.imageUrls?.[0]}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-info p-3">
                    <h5 className="product-title mb-1" title={product.name}>
                      {product.name}
                    </h5>

                    {/* 🟡 Description hidden */}
                    {/* <p className="product-description mb-1">{product.description}</p> */}

                    <h6 className="product-price">{product.price}</h6>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;










