import express from "express";
const router = express.Router();
import announcementController from "../controllers/announcementController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
// import isTeacher from "../middlewares/isTeacher.js";

router.post("/create", jwtAuth, announcementController.createAnnouncement);
router.get("/", jwtAuth, announcementController.getAllAnnouncements);
router.get("/:id", jwtAuth, announcementController.getAnnouncementById);
router.put("/update", jwtAuth, announcementController.updateAnnouncement);
router.delete(
  "/delete/:id",
  jwtAuth,
  announcementController.deleteAnnouncements
);

export default router;
