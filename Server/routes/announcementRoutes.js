import express from "express";
const router = express.Router();
import announcementController from "../controllers/announcementController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
// import isTeacher from "../middlewares/isTeacher.js";

router.post("/create", announcementController.createAnnouncement);
router.get("/", announcementController.getAnnouncements);
router.delete(
  "/:id",
  announcementController.deleteAnnouncements
);

export default router;
