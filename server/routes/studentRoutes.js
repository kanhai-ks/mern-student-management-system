import express from "express";
import upload from "../middleware/multer.js";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import Student from "../models/Student.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, student });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Protected routes
router.post("/", protect, upload.single("image"), addStudent);
router.put("/:id", protect, upload.single("image"), updateStudent);
router.delete("/:id", protect, deleteStudent);

// Public route
router.get("/", getStudents);

export default router;
