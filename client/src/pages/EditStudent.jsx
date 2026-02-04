import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentForm from "../components/StudentForm";

const EditStudent = () => {
  const { id } = useParams(); // get student ID from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  // Simulate fetching student data (replace with API call or state management)
  useEffect(() => {
    // Example: fetch student by ID from backend or local storage
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const foundStudent = storedStudents.find((s) => s.id === parseInt(id));

    if (foundStudent) {
      setStudent(foundStudent);
    } else {
      toast.error("Student not found");
      navigate("/students");
    }
  }, [id, navigate]);

  const handleSubmit = (updatedData) => {
    // Update student in localStorage (replace with API call in real app)
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const updatedStudents = storedStudents.map((s) =>
      s.id === parseInt(id) ? { ...s, ...updatedData } : s,
    );

    localStorage.setItem("students", JSON.stringify(updatedStudents));
    toast.success("Student updated successfully!");
    navigate("/students");
  };

  const handleCancel = () => {
    navigate("/students");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {student ? (
          <StudentForm
            student={student}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <p className="text-center text-gray-600">
            Loading student details...
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditStudent;
