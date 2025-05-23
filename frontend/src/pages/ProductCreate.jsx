import React, { useState } from 'react';
import { createProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10)
      });
      console.log('Produit créé:', created); // DEBUG
      navigate('/products');
    } catch {
      setError('Erreur lors de la création du produit');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="w-full border p-2 rounded" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Catégorie" className="w-full border p-2 rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Prix" type="number" min="0" className="w-full border p-2 rounded" required />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" min="0" className="w-full border p-2 rounded" required />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Créer</button>
      </form>
    </div>
  );
};

export default ProductCreate;
