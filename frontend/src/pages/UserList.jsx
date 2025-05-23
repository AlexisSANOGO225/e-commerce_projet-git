import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/userService';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">👤 Utilisateurs</h1>
          <Link to="/users/new" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold text-lg transition-all">Ajouter</Link>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="product-th">Nom</th>
                <th className="product-th">Email</th>
                <th className="product-th">Rôle</th>
                <th className="product-th">Créé le</th>
                <th className="product-th text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400 text-xl">Aucun utilisateur trouvé.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-blue-50 transition-all group">
                    <td className="product-td font-semibold text-gray-900 text-lg group-hover:text-blue-700">{user.name || '—'}</td>
                    <td className="product-td">{user.email || '—'}</td>
                    <td className="product-td">{user.role || '—'}</td>
                    <td className="product-td">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="product-td flex gap-3 justify-center">
                      <Link to={`/users/${user._id}/edit`} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow font-semibold transition-all">Modifier</Link>
                      <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow font-semibold transition-all">Supprimer</button>
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

export default UserList;
