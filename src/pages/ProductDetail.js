import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [email, setEmail] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  useEffect(() => {
    axios
      .get(`https://product-site-backend.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  const handleOrder = async () => {
    if (!selectedSize || !email) {
      alert('Please select a size and enter your email.');
      return;
    }

    try {
      const res = await axios.post(`https://product-site-backend.onrender.com/api/products/${id}/order`, {
        size,
        email,
      });
      setOrderMessage(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    }
  };

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">{product.name}</h2>

      {/* Image Gallery */}
      <div className="row">
        {(product.imageUrls && product.imageUrls.length > 0
          ? product.imageUrls
          : [product.imageUrl]
        ).map((img, idx) => (
          <div className="col-md-4 mb-3" key={idx}>
            <img
              src={img}
              alt={`Product ${idx + 1}`}
              className="img-fluid rounded"
              style={{ height: '250px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      <p>{product.description}</p>
      <h4 className="text-primary">${product.price}</h4>

      {/* Size selection */}
      <div className="mb-3">
        <label className="form-label fw-bold">Available Sizes:</label>
        <div>
          {product.sizes && product.sizes.length > 0 ? (
            product.sizes.map((size) => (
              <button
                key={size}
                className={`btn btn-outline-dark me-2 ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))
          ) : (
            <p>No sizes listed.</p>
          )}
        </div>
      </div>

      {/* Email input */}
      <div className="mb-3">
        <label className="form-label fw-bold">Your Email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Order button */}
      <button className="btn btn-success" onClick={handleOrder}>
        Order Now
      </button>

      {/* Confirmation */}
      {orderMessage && (
        <div className="alert alert-success mt-3">
          {orderMessage}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;


