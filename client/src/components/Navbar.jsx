import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-blue-600 text-white w-full px-6 py-4 shadow-md">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 rounded-full bg-white hover:scale-110 transition-transform"
        />
        <span className="text-xl font-bold">StudentApp</span>
      </div>

      <nav className="flex gap-6 items-center">
        <Link to="/" className="hover:text-amber-300 transition">
          Home
        </Link>
        <Link to="/students" className="hover:text-amber-300 transition">
          Students
        </Link>

        {token ? (
          <>
            <Link
              to="/students/add"
              className="hover:text-amber-300 transition"
            >
              Add Student
            </Link>
            <span className="font-semibold">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-amber-300 transition">
              Login
            </Link>
            <Link to="/signup" className="hover:text-amber-300 transition">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
