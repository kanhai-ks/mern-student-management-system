import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Hero = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-5xl font-bold text-blue-700">
          Student Management System
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Manage student records efficiently with full CRUD operations.
        </p>
        <div className="mt-6">
          <Link
            to="/students"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            View Students
          </Link>
          <Link
            to="/students/add"
            className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Student
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hero;
