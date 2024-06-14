import express from "express";
import fileController from "../controllers/fileController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import ApiError from "../utils/ApiError.js";
import { uploadMongo } from "../middlewares/uploadMongo.js";

const router = express.Router();

router.get("/:id", fileController.getFile);
// router.get("/", jwtAuth, fileController.getAllFile);
router.post("/upload", uploadMongo.single("file"), (req, res) => {
  if (req.file) {
    console.log(req.file.path);
    res.json({
      success: true,
      message: `Upload successfully!`,
    });
  } else {
    throw new ApiError(400, "No files uploaded!")
  }
});

export default router;
