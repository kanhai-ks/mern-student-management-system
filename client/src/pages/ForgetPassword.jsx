// src/pages/ForgetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import navigate
import { toast } from "react-toastify";
import InputField from "../components/InputField";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your Gmail address");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      toast.error("Only Gmail addresses are allowed");
      return;
    }

    // Dummy recovery logic
    toast.success("Password recovery link sent to your Gmail!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Recover Password
        </h2>

        {/* Gmail Input */}
        <InputField
          label="Enter your Gmail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
        >
          Send Recovery Link
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
    </div>
  );
};

export default ForgetPassword;
