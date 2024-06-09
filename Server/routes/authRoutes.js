import express from "express";
import authController from "../controllers/authController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/refresh-token", authController.refreshToken);
router.get("/", jwtAuth, authController.getUser);
router.get("/people", jwtAuth, authController.getPeople);
router.get("/student/:id", jwtAuth, authController.getStudentById);
router.get("/all", authController.getUsers);
router.get("/all-students", authController.getAllStudents);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/", jwtAuth, authController.updateProfile);
router.put("/update-students", jwtAuth, authController.updateStudents);
router.delete("/delete-student/:id", jwtAuth, authController.deleteStudent);
router.post("/send-email", authController.sendEmail);
router.post("/forgot-password", authController.forgotPassword);
router.put("/change-password", jwtAuth, authController.changePassword);

export default router;
