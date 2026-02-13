// CRUD Operations: Add Student Page
// This page allows adding a new student. Requires authentication.

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../components/StudentForm";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const AddStudent = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("course", formData.course);
      formDataToSend.append("gender", formData.gender);

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await api.post("/students", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/students"), 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding student");
    }
  };

  const handleCancel = () => {
    toast.info("Action cancelled");
    setTimeout(() => navigate("/students"), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <StudentForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddStudent;
