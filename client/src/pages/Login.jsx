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
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/forgetpassword")}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mt-4"
          >
            Forgot Password?
          </button>
          {/* Go to Home Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mt-4"
          >
            Go to Home
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
