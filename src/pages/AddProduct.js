import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth'; // ✅ make sure to import this

function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  // ✅ Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      alert('❌ You must be an admin to access this page.');
      navigate('/login');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData();
      imageData.append('image', form.image);

      const uploadRes = await axios.post('https://product-site-backend.onrender.com/api/products/upload-image', imageData);
      const imageUrl = uploadRes.data.imageUrl;

      const productData = {
        name: form.name,
        description: form.description,
        price: form.price,
        imageUrl
      };

      await axios.post('https://product-site-backend.onrender.com/api/products', productData);
      alert('✅ Product added!');
      setForm({ name: '', description: '', price: '', image: null });
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="form-control mb-3" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control mb-3" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="form-control mb-3" />
        <input type="file" onChange={handleImageChange} className="form-control mb-3" />
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;


