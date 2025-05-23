import React, { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../services/productService';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setForm({
        name: data.name || '',
        description: data.description || '',
        price: data.price || '',
        category: data.category || '',
        imageUrl: data.imageUrl || '',
        stock: data.stock || ''
      });
    } catch {
      setError('Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10)
      });
      navigate('/products');
    } catch {
      setError('Erreur lors de la modification');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Modifier le produit</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="w-full border p-2 rounded" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Catégorie" className="w-full border p-2 rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Prix" type="number" min="0" className="w-full border p-2 rounded" required />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" min="0" className="w-full border p-2 rounded" required />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded w-full">Enregistrer</button>
      </form>
    </div>
  );
};

export default ProductEdit;
