// AddStudent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    console.log("New Student Added:", formData);
    toast.success("Student added successfully!");
    setTimeout(() => {
      navigate("/students");
    }, 2000);
  };

  const handleCancel = () => {
    toast.info("Action cancelled");
    setTimeout(() => {
      navigate("/students");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <StudentForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddStudent;
