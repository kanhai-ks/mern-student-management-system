import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Student Management System
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl">
          Manage student records efficiently with full CRUD operations. Add,
          edit, and delete students with ease.
        </p>
        <div className="flex gap-4">
          <Link
            to="/students"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            View Students
          </Link>
          <Link
            to="/students/add"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Student
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hero;
