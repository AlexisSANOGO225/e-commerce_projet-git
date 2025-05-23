import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await getUserById(id);
      setForm({
        name: data.name || '',
        email: data.email || '',
        password: '', // Do not prefill password
        role: data.role || 'customer'
      });
    } catch {
      setError('Erreur lors du chargement de l\'utilisateur');
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
      await updateUser(id, form);
      navigate('/users');
    } catch {
      setError('Erreur lors de la modification');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Modifier l'utilisateur</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="w-full border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border p-2 rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)" type="password" className="w-full border p-2 rounded" />
        <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="customer">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded w-full">Enregistrer</button>
      </form>
    </div>
  );
};

export default UserEdit;
