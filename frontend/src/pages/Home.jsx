import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 drop-shadow-lg">Page d'acceuil </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        <Link to="/users" className="home-btn">Utilisateurs</Link>
        <Link to="/products" className="home-btn">Produits</Link>
        <Link to="/orders" className="home-btn">Commandes</Link>
      </div>
    </div>
  );
};

export default Home;
