import multer from "multer";
import { nanoid } from "nanoid";
import path, { join } from "path";
import { GridFsStorage } from "multer-gridfs-storage";

const fileFilter = (req, file, cb) => {
  const allowExtensions = [
    ".jpg",
    ".png",
    ".jpeg",
    ".doc",
    ".docx",
    ".pdf",
    ".pptx",
  ];
  const fileExtension = path.extname(file.originalname);

  const regex = new RegExp(`(${allowExtensions.join("|")})$`, "i");
  if (regex.test(fileExtension)) {
    // console.log("File is allowed!");
    cb(null, true);
  } else {
    // console.log("File is not allowed!");
    cb(new Error("This file extension is not allowed!"), false);
  }
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: `${nanoid(16)}${path.extname(file.originalname)}`,
      bucketName: process.env.BUCKET_NAME,
    };
  },
});

export const uploadMongo = multer({ storage, fileFilter });
