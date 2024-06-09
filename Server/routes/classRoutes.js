import express from "express";
import classController from "../controllers/classController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
// import isTeacher from "../middlewares/isTeacher.js";

const router = express.Router();

router.post("/add-class", jwtAuth, classController.addClass);
router.get("/", jwtAuth, classController.getClasses);
router.get("/:id", jwtAuth, classController.getClassDetail);
router.put("/update/:id", jwtAuth, classController.updateClass);
router.delete("/delete/:id", jwtAuth, classController.removeClass);

export default router;
