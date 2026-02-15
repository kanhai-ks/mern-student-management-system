import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../components/StudentForm";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        if (response.data.success) {
          setStudent(response.data.student);
        } else {
          toast.error("Student not found");
          navigate("/students");
        }
      } catch (error) {
        toast.error("Error fetching student");
        navigate("/students");
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const handleSubmit = async (updatedData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", updatedData.name);
      formDataToSend.append("email", updatedData.email);
      formDataToSend.append("age", updatedData.age);
      formDataToSend.append("course", updatedData.course);
      formDataToSend.append("gender", updatedData.gender);

      if (updatedData.image instanceof File) {
        formDataToSend.append("image", updatedData.image);
      }

      const response = await api.put(`/students/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/students");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating student");
    }
  };

  const handleCancel = () => {
    navigate("/students");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        {student ? (
          <>
            <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
              Edit Student
            </h1>
            <p className="text-gray-600 mb-3 text-center">
              Update the form below to edit student record.
            </p>
            <StudentForm
              student={student}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <svg
              className="animate-spin h-6 w-6 text-blue-600 mr-2"
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
            <span className="text-gray-500">Loading student details...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
