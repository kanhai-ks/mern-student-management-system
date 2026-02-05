import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-blue-500 text-white w-full p-4 mt-0">
      <img
        src={logo}
        alt="Logo"
        className="h-15 w-15 mr-2 rounded-full bg-white hover:scale-140"
      />
      <nav className="flex gap-4 justify-evenly">
        <Link to="/" className="hover:text-amber-300">
          Home
        </Link>
        <Link to="/students" className="hover:text-amber-300">
          Students
        </Link>
        <Link to="/students/add" className="hover:text-amber-300">
          Add Student
        </Link>

        <Link to="/login" className="hover:text-amber-300">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
