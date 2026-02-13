import express from "express";
import {
  signup,
  login,
  forgetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Forget password route
router.post("/forgetpassword", forgetPassword);

export default router;
