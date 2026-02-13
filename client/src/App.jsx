import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Hero from "./pages/Hero";
import NotFound from "./pages/NotFound";
import StudentsList from "./pages/StudentsList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* Protected routes */}
        <Route path="/students" element={<StudentsList />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/logout" element={<Logout />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast container must be rendered once in your app */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
