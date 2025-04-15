import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orderMessage, setOrderMessage] = useState('');

  useEffect(() => {
    axios
      .get(`https://product-site-backend.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        setIsLoading(false);
      });
  }, [id]);

  const handleOrder = async () => {
    if (!selectedSize || !email) {
      alert('Please choose a size and enter your email.');
      return;
    }

    try {
      const res = await axios.post(`https://product-site-backend.onrender.com/api/products/${id}/order`, {
        size: selectedSize,
        email,
      });
      setOrderMessage(res.data.message);
    } catch (err) {
      alert('Failed to confirm order.');
    }
  };

  if (isLoading) return <div className="container mt-5">Loading...</div>;
  if (!product) return <div className="container mt-5">Product not found.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">{product.name}</h2>

      {/* Primary image */}
      <img src={product.imageUrl} alt={product.name} className="img-fluid mb-3" style={{ maxHeight: '400px' }} />

      {/* Additional images */}
      <div className="d-flex gap-3 flex-wrap mb-3">
        {product.imageUrls &&
          product.imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Product ${index}`} className="img-thumbnail" style={{ width: '150px' }} />
          ))}
      </div>

      <p>{product.description}</p>
      <h4 className="text-primary">${product.price}</h4>

      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-3">
          <label className="form-label">Select Size</label>
          <select className="form-select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">-- Choose a size --</option>
            {product.sizes.map((size, idx) => (
              <option key={idx} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Email + Order Button */}
      <div className="mt-3">
        <label className="form-label">Your Email</label>
        <input
          type="email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
        />
        <button className="btn btn-success" onClick={handleOrder}>
          Confirm Order
        </button>
      </div>

      {orderMessage && <div className="alert alert-info mt-3">{orderMessage}</div>}
    </div>
  );
}

export default ProductDetail;



