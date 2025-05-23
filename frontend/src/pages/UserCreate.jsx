import React, { useState } from 'react';
import { createUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      navigate('/users');
    } catch {
      setError('Erreur lors de la création de l\'utilisateur');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="w-full border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border p-2 rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Mot de passe" type="password" className="w-full border p-2 rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="customer">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Créer</button>
      </form>
    </div>
  );
};

export default UserCreate;
