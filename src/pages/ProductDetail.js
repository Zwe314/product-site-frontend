import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios
      .get(`https://product-site-backend.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.imageUrls?.[0] || '');
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        setIsLoading(false);
      });
  }, [id]);

  const handleOrder = () => {
    const hasSizes = product.sizes?.some(s => s.trim() !== '');
    const hasColors = product.colors?.some(c => c.trim() !== '');

    if (hasSizes && !selectedSize) {
      alert('Please choose a size.');
      return;
    }
    if (hasColors && !selectedColor) {
      alert('Please choose a color.');
      return;
    }
    setShowPopup(true);
  };

  const orderText = `🛍️ Product: ${product?.name}
💵 Price: ${product?.price}
🎨 Color: ${selectedColor || 'N/A'}
📏 Size: ${selectedSize || 'N/A'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goToMessenger = () => {
    window.open('https://m.me/CynosureCollab', '_blank');
  };

  if (isLoading) return <div className="container mt-5">Loading...</div>;
  if (!product) return <div className="container mt-5">Product not found.</div>;

  return (
    <div className="product-detail-page">
      <div className="container py-4">
        <button className="btn btn-link back-btn" onClick={() => navigate('/products')}>
          &larr; Back
        </button>

        <div className="row mt-3">
          {/* Left: Images */}
          <div className="col-md-6 mb-4">
            <div className="main-image mb-3">
              <Zoom>
                <img
                  src={mainImage}
                  alt="Main"
                  className="img-fluid shadow rounded"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </Zoom>
            </div>
            <div className="thumbnail-gallery">
              {product.imageUrls?.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Thumb ${idx}`}
                  className={`thumbnail-img ${mainImage === url ? 'active' : ''}`}
                  onClick={() => setMainImage(url)}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="col-md-6">
            <div className="product-card p-4 shadow-sm">
              <h2 className="mb-2">{product.name}</h2>
              <h4 className="text-primary mb-3">{product.price}</h4>
              <p>{product.description}</p>

              {/* Color Selector */}
              {product.colors?.length > 0 && product.colors.some(c => c.trim() !== '') && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Color</label>
                  <select
                    className="form-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="">-- Choose a color --</option>
                    {product.colors.map((color, idx) => (
                      <option key={idx} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Expected Delivery */}
              {product.expectedDelivery && product.expectedDelivery.trim() !== '' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Expected Delivery</label>
                  <p>{product.expectedDelivery}</p>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes?.length > 0 && product.sizes.some(s => s.trim() !== '') && (
                <div className="mb-3">
                  <label className="form-label">Select Size</label>
                  <select
                    className="form-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">-- Choose a size --</option>
                    {product.sizes.map((size, idx) => (
                      <option key={idx} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}

              <button className="btn btn-success w-100" onClick={handleOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Modal */}
      {showPopup && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h5>🧾 Order Summary</h5>
            <textarea className="form-control" readOnly value={orderText} />

            <button className="btn btn-outline-primary" onClick={copyToClipboard}>
              {copied ? '✅ Copied!' : '📋 Copy Order Summary'}
            </button>

            <small>📌 Please copy the order summary and click on continue.</small>
            <small>
              📩 By clicking continue, you will be redirected to Cynosure's Facebook page.
              <br />
              Please paste the above order message and send it to us.
            </small>

            <button className="btn btn-primary" onClick={goToMessenger}>
              🚀 Continue
            </button>

            <button className="btn-cancel" onClick={() => setShowPopup(false)}>
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;





















