import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success("Login successful");
        navigate("/students");
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <p className="text-center mt-3">
            <button
              type="button"
              onClick={() => navigate("/forgetpassword")}
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </p>

          {/* Go to Home Link */}
          <p className="text-center mt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:underline font-medium"
            >
              Go to Home
            </button>
          </p>

          {/* Optional: Create Account Button (like Facebook) */}
          <p className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create New Account
            </button>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
