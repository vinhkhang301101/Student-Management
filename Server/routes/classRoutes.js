import express from "express";
import classController from "../controllers/classController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
// import isTeacher from "../middlewares/isTeacher.js";

const router = express.Router();

router.post("/add-class", classController.addClass);
router.get("/", classController.getClasses);
router.get("/:id", classController.getClassDetail);
router.put("/", classController.updateClass);
router.delete("/:id", classController.deleteClass);

export default router;
