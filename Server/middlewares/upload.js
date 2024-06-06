import multer from "multer";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filter = (req, file, cb) => {
  const allowExtensions = [".jpg", ".png", ".jpeg", ".docx", ".pdf", ".pptx"]
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowExtensions.join("|")})$`, "i");
  console.log(fileExtension);
  if (regex.test(fileExtension)) {
    // console.log("File is allowed!");
    cb(null, true);
  } else {
    // console.log("File is not allowed!");
    cb(new Error("This file extension is not allowed!"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file: ", file);
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage, fileFilter: filter });
