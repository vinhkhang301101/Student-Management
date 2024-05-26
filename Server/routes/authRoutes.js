import express from "express";
import authController from "../controllers/authController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/", authController.getUsers);
router.get("/all-students", authController.getAllStudents);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/", jwtAuth, authController.updateProfile);
router.put("/update-students", jwtAuth, authController.updateStudents);
router.put("/update-email", jwtAuth, authController.updateEmail);

export default router;
