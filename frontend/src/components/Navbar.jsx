import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center gap-8 mb-8 sticky top-0 z-50">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Accueil</NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Produits</NavLink>
      <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Commandes</NavLink>
      <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Utilisateurs</NavLink>
    </nav>
  );
};

export default Navbar;
