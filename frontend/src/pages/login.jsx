import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("Connexion réussie !");
      // Rediriger vers la page d'accueil ou dashboard ici si besoin
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
          Connexion
        </h2>
        <p className="text-center text-gray-400 mb-4">
          Connecte-toi à ton espace personnel
        </p>
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
          Se connecter
        </button>
        {message && (
          <div className="text-center text-red-500 font-semibold">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
