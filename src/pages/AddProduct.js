import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    sizes: '',
    images: [],
  });

  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedUrls = [];

      for (const img of form.images) {
        const imageData = new FormData();
        imageData.append('image', img);
        const res = await axios.post('https://product-site-backend.onrender.com/api/products/upload-image', imageData);
        uploadedUrls.push(res.data.imageUrl);
      }

      const productData = {
        name: form.name,
        description: form.description,
        price: form.price,
        sizes: form.sizes.split(',').map(s => s.trim()),
        imageUrls: uploadedUrls
      };

      await axios.post('https://product-site-backend.onrender.com/api/products', productData);
      alert('✅ Product added!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="form-control mb-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="form-control mb-2" />
        <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="Available sizes (comma separated)" className="form-control mb-2" />
        <input type="file" multiple accept="image/*" onChange={handleImagesChange} className="form-control mb-3" />
        {preview.length > 0 && (
          <div className="mb-3">
            {preview.map((img, idx) => (
              <img key={idx} src={img} alt="preview" width="100" className="me-2 mb-2" />
            ))}
          </div>
        )}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;




