import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center gap-8 mb-8 sticky top-0 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link nav-link-active" : "nav-link"
        }
      >
        Accueil
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Produits
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Commandes
          </NavLink>
        </>
      )}
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? "nav-link nav-link-active" : "nav-link"
        }
      >
        Utilisateurs
      </NavLink>
      {!isLoggedIn ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Connexion
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Inscription
          </NavLink>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="nav-link text-red-500 font-semibold hover:underline ml-2"
        >
          Déconnexion
        </button>
      )}
    </nav>
  );
};

export default Navbar;
