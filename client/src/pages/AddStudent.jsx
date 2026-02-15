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
        setTimeout(() => navigate("/students"), 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Add New Student
        </h1>
        <StudentForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddStudent;
