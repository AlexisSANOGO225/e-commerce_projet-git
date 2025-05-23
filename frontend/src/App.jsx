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
import OrderList from './pages/OrderList';
import OrderCreate from './pages/OrderCreate';
import OrderEdit from './pages/OrderEdit';
import OrderHistory from './pages/OrderHistory';
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
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/new" element={<OrderCreate />} />
        <Route path="/orders/:id/edit" element={<OrderEdit />} />
        <Route path="/orders/history/:userId" element={<OrderHistory />} />
        {/* Placeholder for future development */}
        <Route path="/coming-soon" element={<div className='p-8 text-2xl text-gray-700'>Page à venir...</div>} />
      </Routes>
    </>
  );
}


