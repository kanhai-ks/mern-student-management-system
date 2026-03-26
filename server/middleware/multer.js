// Multer configuration for handling file uploads with custom storage settings

import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOADS_FOLDER);
  },
  // Filename format: current timestamp + original file extension
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer instance with defined storage settings
const upload = multer({ storage });
export default upload;
