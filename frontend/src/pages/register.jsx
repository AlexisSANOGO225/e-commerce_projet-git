import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/register", form);
      setMessage("Inscription réussie ! Vous pouvez vous connecter.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-blue-100"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
          Inscription
        </h2>
        <p className="text-center text-gray-400 mb-4">
          Crée ton compte pour accéder à la boutique
        </p>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-1"
            htmlFor="name"
          >
            Nom
          </label>
          <input
            name="name"
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-1"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            name="password"
            type="password"
            placeholder="Votre mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 rounded-lg shadow transition"
        >
          S'inscrire
        </button>
        {message && (
          <div className="text-center text-blue-600 font-semibold">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
