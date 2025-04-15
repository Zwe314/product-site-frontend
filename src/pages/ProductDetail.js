import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://product-site-backend.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <div className="d-flex flex-wrap gap-3 mb-3">
        {product.imageUrls.map((url, idx) => (
          <img key={idx} src={url} alt="Product" style={{ maxWidth: '200px' }} />
        ))}
      </div>
      <p>{product.description}</p>
      <h5 className="text-primary">${product.price}</h5>

      <div className="mt-3">
        <h6>Available Sizes:</h6>
        <ul>
          {product.sizes.map((size, idx) => (
            <li key={idx}>{size}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <h6>Order Confirmation</h6>
        <form onSubmit={(e) => {
          e.preventDefault();
          alert('✅ Order confirmed!');
        }}>
          <input placeholder="Your name" className="form-control mb-2" required />
          <input placeholder="Your email" type="email" className="form-control mb-2" required />
          <button className="btn btn-success" type="submit">Confirm Order</button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetail;



