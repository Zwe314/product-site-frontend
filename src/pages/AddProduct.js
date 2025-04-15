
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

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

      // ✅ LIVE backend URL
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full" />
        <input type="file" onChange={handleImageChange} class

