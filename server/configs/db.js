import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  dns.setServers(["1.1.1.1", "8.8.8.8"]); 
  try {
    await mongoose.connect(process.env.MONGODB_URL); 
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); 
  }
};

export default connectDB;