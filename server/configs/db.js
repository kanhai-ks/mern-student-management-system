import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const MONGO_URI = isProduction
      ? process.env.MONGODB_URL_ATLAS
      : process.env.MONGODB_URL_LOCAL;

    console.log("Connecting MongoDB...");
    console.log("Environment:", process.env.NODE_ENV);

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;