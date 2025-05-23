import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import './App.css';

export default function App() {
  useEffect(() => {
    document.title = 'E-commerce App';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/new" element={<ProductCreate />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />
    </Routes>
  );
}


