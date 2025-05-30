import React, { useEffect, useState } from 'react';
import { getOrderHistoryByUser } from '../services/orderService';
import { useParams } from 'react-router-dom';

const OrderHistory = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [userId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getOrderHistoryByUser(userId);
      setOrders(data);
    } catch {
      setError('Erreur lors du chargement de l\'historique');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">Historique des commandes</h1>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="product-th">Produits</th>
                <th className="product-th">Total</th>
                <th className="product-th">Statut</th>
                <th className="product-th">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400 text-xl">Aucun historique trouvé.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-blue-50 transition-all group">
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

export default OrderHistory;
