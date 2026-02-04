import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // Here you would normally send data to backend or state management
    console.log("New Student Added:", formData);
    toast.success("Student added successfully!");
    navigate("/students");
  };

  const handleCancel = () => {
    navigate("/students");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <StudentForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
      <Footer />
    </div>
  );
};

export default AddStudent;
