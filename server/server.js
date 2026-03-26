import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// Allowed frontend origins for CORS
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Middleware for JSON parsing and serving static uploads
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => res.send("API is working.."));
app.use("/api/users", authRoutes);
app.use("/api/students", studentRoutes);

// Server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
