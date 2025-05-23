import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../services/orderService';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch {
      setError('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette commande ?')) return;
    try {
      await deleteOrder(id);
      setOrders(orders.filter((o) => o._id !== id));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">📦 Commandes</h1>
          <Link to="/orders/new" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold text-lg transition-all">Ajouter</Link>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="product-th">Utilisateur</th>
                <th className="product-th">Produits</th>
                <th className="product-th">Total</th>
                <th className="product-th">Statut</th>
                <th className="product-th">Date</th>
                <th className="product-th text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400 text-xl">Aucune commande trouvée.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-blue-50 transition-all group">
                    <td className="product-td font-semibold text-gray-900 text-lg group-hover:text-blue-700">{order.user?.name || '—'}</td>
                    <td className="product-td">
                      {order.products.map((p, i) => (
                        <span key={i} className="block">
                          {p.product?.name || '—'} x{p.quantity}
                        </span>
                      ))}
                    </td>
                    <td className="product-td">{order.total !== undefined ? order.total + ' €' : '—'}</td>
                    <td className="product-td">{order.status || '—'}</td>
                    <td className="product-td">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="product-td flex gap-3 justify-center">
                      <Link to={`/orders/${order._id}/edit`} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow font-semibold transition-all">Modifier</Link>
                      <button onClick={() => handleDelete(order._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow font-semibold transition-all">Supprimer</button>
                      <Link to={`/orders/history/${order.user?._id}`} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow font-semibold transition-all">Historique</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
