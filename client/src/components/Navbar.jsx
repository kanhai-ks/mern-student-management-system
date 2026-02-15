import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-600 text-white w-full shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full bg-white hover:scale-110 transition-transform"
          />
          <span className="text-xl font-bold">StudentApp</span>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-white focus:outline-none p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`hover:text-amber-300 transition ${
              isActive("/") ? "text-amber-300 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/students"
            className={`hover:text-amber-300 transition ${
              isActive("/students") ? "text-amber-300 font-semibold" : ""
            }`}
          >
            Students
          </Link>

          {token ? (
            <>
              <Link
                to="/students/add"
                className={`hover:text-amber-300 transition ${
                  isActive("/students/add")
                    ? "text-amber-300 font-semibold"
                    : ""
                }`}
              >
                Add Student
              </Link>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{user?.name || "Guest"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 px-3 py-1 md:px-4 md:py-2 rounded hover:bg-red-700 transition text-sm md:text-base"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{user?.name || "Guest"}</span>
              </div>
              <Link
                to="/login"
                className={`hover:text-amber-300 transition ${
                  isActive("/login") ? "text-amber-300 font-semibold" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`hover:text-amber-300 transition ${
                  isActive("/signup") ? "text-amber-300 font-semibold" : ""
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-1 bg-blue-700 px-2 py-1">
          <Link
            to="/"
            onClick={closeMenu}
            className={`px-4 py-1 rounded hover:bg-blue-600 transition ${
              isActive("/") ? "bg-blue-600 text-amber-300 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/students"
            onClick={closeMenu}
            className={`px-4 py-1 rounded hover:bg-blue-600 transition ${
              isActive("/students")
                ? "bg-blue-600 text-amber-300 font-semibold"
                : ""
            }`}
          >
            Students
          </Link>

          {token ? (
            <>
              <Link
                to="/students/add"
                onClick={closeMenu}
                className={`px-4 py-1 rounded hover:bg-blue-600 transition ${
                  isActive("/students/add")
                    ? "bg-blue-600 text-amber-300 font-semibold"
                    : ""
                }`}
              >
                Add Student
              </Link>
              <div className="flex items-center gap-1 px-2 py-1">
                <span className="font-semibold">{user?.name || "Guest"}</span>
              </div>
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="flex items-center justify-center gap-1 w-50 bg-red-600 px-2 py-2 rounded-lg hover:bg-red-700 transition text-base font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="font-semibold">{user?.name || "Guest"}</span>
              </div>
              <Link
                to="/login"
                onClick={closeMenu}
                className={`px-4 py-1 rounded hover:bg-blue-600 transition ${
                  isActive("/login")
                    ? "bg-blue-600 text-amber-300 font-semibold"
                    : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className={`px-4 py-1 rounded hover:bg-blue-600 transition ${
                  isActive("/signup")
                    ? "bg-blue-600 text-amber-300 font-semibold"
                    : ""
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
