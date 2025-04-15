import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAdmin } from '../utils/auth';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔐 Block if not admin
  useEffect(() => {
    if (!isAdmin()) {
      alert('❌ You must be an admin to access this page.');
      navigate('/login');
    }
  }, []);

  // 📦 Load existing product
  useEffect(() => {
    axios.get(`https://product-site-backend.onrender.com/api/products/${id}`)
      .then((res) => {
        const { name, description, price, imageUrl } = res.data;
        setForm({ name, description, price, imageUrl });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewImage(URL.createObjectURL(file)); // ✅ Set preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm('Are you sure you want to update this product?');
    if (!confirm) return;

    setSubmitting(true);

    try {
      let imageUrl = form.imageUrl;

      if (newImage) {
        const imageData = new FormData();
        imageData.append('image', newImage);
        const uploadRes = await axios.post(
          'https://product-site-backend.onrender.com/api/products/upload-image',
          imageData
        );
        imageUrl = uploadRes.data.imageUrl;
      }

      const updatedData = {
        ...form,
        imageUrl
      };

      await axios.put(`https://product-site-backend.onrender.com/api/products/${id}`, updatedData);
      alert('✅ Product successfully updated!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update product');
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Current Image</label><br />
          <img src={form.imageUrl} alt="Current" style={{ maxHeight: '200px' }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload New Image (optional)</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>

        {previewImage && (
          <div className="mb-3">
            <label className="form-label">Preview New Image</label><br />
            <img src={previewImage} alt="Preview" style={{ maxHeight: '200px' }} />
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Updating...
            </>
          ) : (
            'Update Product'
          )}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;


