// Authentication: Controllers for user authentication
// Handles signup, login, and password recovery with JWT tokens.

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import transporter from "../configs/nodemailer.js";

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.json({ success: false, message: "All fields required" });
  }

  if (password !== confirmPassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ name, email, password, confirmPassword });
    await newUser.save();

    return res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// FORGET PASSWORD (Send Recovery Email)
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Recovery",
      text: `Your password is: ${user.password}`,
    });

    return res.json({ success: true, message: "Password sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
