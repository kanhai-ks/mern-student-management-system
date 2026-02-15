//  Mongoose schema and model definition for Student records

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    course: {
      type: String,
      required: true,
      enum: ["BBA", "BBS", "BCA", "BIM"],
    },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
