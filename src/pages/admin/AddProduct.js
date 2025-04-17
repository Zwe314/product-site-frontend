import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const CLOUDINARY_CLOUD_NAME = 'dwmiuqw26';
const CLOUDINARY_UPLOAD_PRESET = 'product_upload_unsigned';

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [bagType, setBagType] = useState('');
  const [price, setPrice] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (files) => {
    const imageUrls = [];

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
        imageUrls.push(res.data.secure_url);
      } catch (err) {
        console.error('Image upload failed:', err);
        alert('Image upload failed. Please try again.');
      }
    }

    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImageUrls = await handleImageUpload(imageFiles);

      if (uploadedImageUrls.length === 0) {
        alert('Please upload at least one valid image.');
        setLoading(false);
        return;
      }

      const productData = {
        name,
        description,
        price, // ✅ Keep it as string now
        sizes: sizes.split(',').map((s) => s.trim()),
        colors: colors.split(',').map((c) => c.trim()),
        expectedDelivery,
        bagType,
        imageUrls: uploadedImageUrls,
      };

      await axios.post('/api/products', productData);
      alert('Product added successfully');

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setSizes('');
      setColors('');
      setExpectedDelivery('');
      setBagType('');
      setImageFiles([]);
    } catch (err) {
      console.error('Error adding product:', err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Add Product</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/dashboard')}>
          &larr; Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="shadow-sm p-4 bg-white rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required />
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
          <label className="form-label">Expected Delivery (e.g. 1 week, 2 weeks)</label>
          <input value={expectedDelivery} onChange={(e) => setExpectedDelivery(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Bag Type</label>
          <input value={bagType} onChange={(e) => setBagType(e.target.value)} className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="form-control"
            onChange={(e) => setImageFiles(Array.from(e.target.files))}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;












