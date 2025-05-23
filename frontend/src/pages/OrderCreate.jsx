import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/userService';
import { getProducts } from '../services/productService';

const OrderCreate = () => {
  const [form, setForm] = useState({
    user: '',
    products: [{ product: '', quantity: 1 }],
    total: '',
    status: 'pending'
  });
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les utilisateurs et produits pour les selects
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const productsData = await getProducts();
        setUsers(usersData);
        setProducts(productsData);
      } catch {
        setError('Erreur lors du chargement des utilisateurs ou produits');
      }
    };
    fetchData();
  }, []);

  // Calcul automatique du total
  useEffect(() => {
    const selectedProduct = products.find(p => p._id === form.products[0].product);
    const quantity = parseInt(form.products[0].quantity, 10) || 0;
    const price = selectedProduct ? selectedProduct.price : 0;
    const total = price * quantity;
    setForm(f => ({ ...f, total }));
    // eslint-disable-next-line
  }, [form.products[0].product, form.products[0].quantity, products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    setForm({
      ...form,
      products: [{ ...form.products[0], [e.target.name]: e.target.value }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(form);
      navigate('/orders');
    } catch {
      setError('Erreur lors de la création de la commande');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Ajouter une commande</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="user" value={form.user} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Sélectionner un utilisateur</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
          ))}
        </select>
        <select name="product" value={form.products[0].product} onChange={handleProductChange} className="w-full border p-2 rounded" required>
          <option value="">Sélectionner un produit</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>{p.name} ({p.price} €)</option>
          ))}
        </select>
        <input name="quantity" value={form.products[0].quantity} onChange={handleProductChange} placeholder="Quantité" type="number" min="1" className="w-full border p-2 rounded" required />
        <input name="total" value={form.total} readOnly placeholder="Total" type="number" className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed" />
        <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="pending">En attente</option>
          <option value="paid">Payée</option>
          <option value="shipped">Expédiée</option>
          <option value="delivered">Livrée</option>
          <option value="cancelled">Annulée</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Créer</button>
      </form>
    </div>
  );
};

export default OrderCreate;
