import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; 

    logout();
    toast.success("Logout successful");
    setTimeout(() => navigate("/"), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
          <h2 className="text-2xl font-bold mb-4">Logout</h2>
          <p className="mb-4">Are you sure you want to logout?</p>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow">
            <p className="mb-4">Confirm logout?</p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
