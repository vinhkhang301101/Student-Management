import authRoutes from "../routes/authRoutes.js";
import classRoutes from "../routes/classRoutes.js";
import announcementRoutes from "../routes/announcementRoutes.js";
import fileRoutes from "../routes/fileRoutes.js";
import chatRoutes from "../routes/chatRoutes.js";

function router(app) {  
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/class", classRoutes);
  app.use("/api/v1/announcement", announcementRoutes);
  app.use("/api/v1/file", fileRoutes);
  app.use("/api/v1/chat", chatRoutes);
}

export default router;
