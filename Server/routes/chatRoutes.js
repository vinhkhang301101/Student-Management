import express from "express";
import chatController from "../controllers/chatController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/:id", jwtAuth, chatController.getFullChats);

export default router;
