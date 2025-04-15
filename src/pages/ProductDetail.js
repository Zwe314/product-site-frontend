import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // ✅ Add Link
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
      <Link to="/" className="btn btn-outline-secondary mb-4">← Back to Products</Link> {/* ✅ Back button */}
      <h2 className="mb-3">{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="img-fluid mb-3" style={{ maxHeight: '400px' }} />
      <p>{product.description}</p>
      <h4 className="text-primary">${product.price}</h4>
    </div>
  );
}

export default ProductDetail;

