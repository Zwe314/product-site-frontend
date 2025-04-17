import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const CLOUDINARY_CLOUD_NAME = 'dwmiuqw26';
const CLOUDINARY_UPLOAD_PRESET = 'product_upload_unsigned';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [price, setPrice] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [bagType, setBagType] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        const data = res.data;
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price || '');
        setSizes(data.sizes?.join(', ') || '');
        setColors(data.colors?.join(', ') || '');
        setExpectedDelivery(data.expectedDelivery || '');
        setBagType(data.bagType || '');
        setImageUrls(data.imageUrls || []);
      } catch (err) {
        console.error('Failed to fetch product', err);
        alert('Error loading product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageUpload = async (files) => {
    const urls = [];
    for (let file of files) {
      if (!file || !(file instanceof File)) continue;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error('Image upload failed:', err);
        alert('Image upload failed. Please try again.');
      }
    }
    return urls;
  };

  const handleRemoveImage = (url) => {
    setImageUrls((prev) => prev.filter((item) => item !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let newImageUrls = [...imageUrls];

      if (imageFiles.length > 0) {
        const uploaded = await handleImageUpload(imageFiles);
        newImageUrls = [...newImageUrls, ...uploaded];
      }

      const updated = {
        name,
        description,
        price, // ✅ string format supported
        sizes: sizes.split(',').map((s) => s.trim()),
        colors: colors.split(',').map((c) => c.trim()),
        expectedDelivery,
        bagType,
        imageUrls: newImageUrls,
      };

      await axios.put(`/api/products/${id}`, updated);
      alert('Product updated successfully');
      setImageFiles([]);
    } catch (err) {
      console.error('Error updating product:', err);
      alert(`Update failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Product</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/dashboard')}>
          &larr; Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sizes (comma-separated)</label>
          <input value={sizes} onChange={(e) => setSizes(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Colors (comma-separated)</label>
          <input value={colors} onChange={(e) => setColors(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Expected Delivery</label>
          <input
            value={expectedDelivery}
            onChange={(e) => setExpectedDelivery(e.target.value)}
            className="form-control"
            placeholder="e.g. 1 week, 2 weeks"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bag Type</label>
          <input
            value={bagType}
            onChange={(e) => setBagType(e.target.value)}
            className="form-control"
            placeholder="e.g. Handbag, Backpack"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="form-control"
            onChange={(e) => setImageFiles(Array.from(e.target.files))}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Existing Images</label>
          <div className="row">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="col-md-3 mb-3 text-center">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={url}
                    alt={`Product ${idx}`}
                    className="img-thumbnail"
                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  />
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-danger mt-2"
                  onClick={() => handleRemoveImage(url)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-warning text-dark fw-bold" disabled={loading}>
          {loading ? 'Saving...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
















