import express from "express";
import fileController from "../controllers/fileController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/:id", jwtAuth, fileController.getFileById);
router.post("/upload", jwtAuth, fileController.uploadFile);

export default router;
