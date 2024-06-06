import express from "express";
const router = express.Router();
import chatController from "../controllers/chatController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

router.get("/:id", jwtAuth, chatController.getFullChats);

export default router;
