// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import imagekit from "./config/imageKit.js";

dotenv.config();
await connectDB();

const app = express();

//  Allowed frontend origins (CORS)
const allowedOrigins = ["http://localhost:5173"];

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get("/", (req, res) => res.send("API is working.."));

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
