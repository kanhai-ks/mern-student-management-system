import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
await connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("API is working.."));
app.use("/api/users", authRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
