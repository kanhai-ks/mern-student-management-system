// src/pages/ForgetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your Gmail address");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      toast.error("Only Gmail addresses are allowed");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/users/forgetpassword", { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail(""); // clear field after success
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to send recovery email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Recover Password
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your Gmail address and we’ll send you a recovery link.
          </p>

          {/* Gmail Input */}
          <InputField
            label="Enter your Gmail"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Submit Button with animation */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white mt-2 transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Recovery Link"
            )}
          </button>

          {/* Go to Login Button */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
          >
            Go to Login
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
