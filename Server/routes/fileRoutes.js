import express from "express";
import fileController from "../controllers/fileController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/:filename", jwtAuth, fileController.getFile);

export default router;
