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
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";

const isLoggedIn = () => !!localStorage.getItem("token");

export default function App() {
  useEffect(() => {
    document.title = "E-commerce App";
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={isLoggedIn() ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route path="/products/new" element={<ProductCreate />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/orders"
          element={
            isLoggedIn() ? (
              <div className="p-8 text-2xl text-gray-700">
                Gestion des commandes à venir...
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}
