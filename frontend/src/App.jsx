import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import OrderList from './pages/OrderList';
import OrderCreate from './pages/OrderCreate';
import OrderEdit from './pages/OrderEdit';
import OrderHistory from './pages/OrderHistory';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import "./App.css";

// Route privée pour l'admin
const PrivateRoute = () => {
  const isAdmin = localStorage.getItem('adminToken');
  return (
    <>
      {isAdmin ? (
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductCreate />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/new" element={<UserCreate />} />
          <Route path="users/:id/edit" element={<UserEdit />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/new" element={<OrderCreate />} />
          <Route path="orders/:id/edit" element={<OrderEdit />} />
          <Route path="orders/history/:userId" element={<OrderHistory />} />
        </Routes>
      ) : (
        <Navigate to="/admin/login" replace />
      )}
    </>
  );
};

export default function App() {
  useEffect(() => {
    document.title = "E-commerce App";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<PrivateRoute />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/new" element={<OrderCreate />} />
        <Route path="/orders/:id/edit" element={<OrderEdit />} />
        <Route path="/orders/history/:userId" element={<OrderHistory />} />
        <Route path="/coming-soon" element={<div className='p-8 text-2xl text-gray-700'>Page à venir...</div>} />
      </Routes>
    </>
  );
}