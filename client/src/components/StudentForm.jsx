import React, { useState } from "react";
import { toast } from "react-toastify";
import InputField from "./InputField";

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    email: student?.email || "",
    age: student?.age || "",
    course: student?.course || "",
    gender: student?.gender || "",
    image: student?.image || null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, age, course, gender, image } = formData;
    if (!name || !email || !age || !course || !gender || !image) {
      toast.error("Please fill in all fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-2 rounded-lg shadow-md"
    >
      <h2 className="text-2xl text-center font-bold mb-2">
        {student ? "Edit Student" : "Add Student"}
      </h2>

      {/* Name */}
      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Email */}
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Age */}
      <InputField
        label="Age"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      {/* Course Dropdown */}
      <div className="mb-2">
        <label className="block text-gray-700">Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full px-3 py-1 border rounded"
          required
        >
          <option value="">Select a course</option>
          <option value="BBA">BBA</option>
          <option value="BBS">BBS</option>
          <option value="BCA">BCA</option>
          <option value="BIM">BIM</option>
        </select>
      </div>

      {/* Gender Dropdown */}
      <div className="mb-2">
        <label className="block text-gray-700">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-3 py-1 border rounded"
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="mb-2">
        <label className="block text-gray-700">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-1 border rounded"
          required
        />
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="mt-2 w-20 h-20 object-cover rounded"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {student ? "Update" : "Add"} Student
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
