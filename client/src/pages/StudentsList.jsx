import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      if (response.data.success) {
        setStudents(response.data.students);
      } else {
        toast.error("Failed to fetch students");
      }
    } catch {
      toast.error("Error fetching students");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/students/${id}`);
      if (response.data.success) {
        setStudents(students.filter((s) => s._id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Error deleting student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-3 py-4 md:px-4 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-blue-700">
          Manage Students
        </h2>

        {students.length === 0 ? (
          <p className="text-sm md:text-base text-gray-600">
            No students found. Add some!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow-sm text-sm md:text-base">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="border px-2 py-1 md:px-4 md:py-2 text-left">
                    Name
                  </th>
                  <th className="border px-2 py-1 md:px-4 md:py-2 text-left">
                    Email
                  </th>
                  <th className="border px-2 py-1 md:px-4 md:py-2 text-left">
                    Age
                  </th>
                  <th className="border px-2 py-1 md:px-4 md:py-2 text-left">
                    Course
                  </th>
                  <th className="border px-2 py-1 md:px-4 md:py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border px-2 py-1 md:px-4 md:py-2">
                      {student.name}
                    </td>
                    <td className="border px-2 py-1 md:px-4 md:py-2">
                      {student.email}
                    </td>
                    <td className="border px-2 py-1 md:px-4 md:py-2">
                      {student.age}
                    </td>
                    <td className="border px-2 py-1 md:px-4 md:py-2">
                      {student.course}
                    </td>
                    <td className="border px-2 py-1 md:px-4 md:py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/students/edit/${student._id}`}
                          className="bg-yellow-500 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded hover:bg-yellow-600 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="bg-red-600 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 md:mt-6">
          <Link
            to="/students/add"
            className="bg-green-600 text-white px-3 px-4 py-2 rounded hover:bg-green-700 inline-block   text-center"
          >
            + Add Student
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentsList;
