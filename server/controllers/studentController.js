import Student from "../models/Student.js";
import path from "path";

// CRUD Operations: Add Student
export const addStudent = async (req, res) => {
  try {
    const { name, email, age, course, gender } = req.body;
    const imageFile = req.file;

    if (!name || !email || !age || !course || !gender) {
      return res.json({
        success: false,
        message: "All fields except image are required",
      });
    }

    let imagePath = null;
    if (imageFile) {
      imagePath = `/uploads/${imageFile.filename}`;
    }

    const newStudent = await Student.create({
      name,
      email,
      age,
      course,
      gender,
      image: imagePath,
    });

    return res.json({
      success: true,
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// GET All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.json({ success: true, students });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// UPDATE Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, course, gender } = req.body;
    const imageFile = req.file;

    let updateData = { name, email, age, course, gender };

    if (imageFile) {
      updateData.image = `/uploads/${imageFile.filename}`;
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// DELETE Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    return res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
