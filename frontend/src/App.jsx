import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import UserList from './pages/UserList';
import UserCreate from './pages/UserCreate';
import UserEdit from './pages/UserEdit';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';

export default function App() {
  useEffect(() => {
    document.title = 'E-commerce App';
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductCreate />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        {/* Placeholder for orders */}
        <Route path="/orders" element={<div className='p-8 text-2xl text-gray-700'>Gestion des commandes à venir...</div>} />
      </Routes>
    </>
  );
}


