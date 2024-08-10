import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Files",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    isAll: {
      type: String,
      enum: ["user", "Student", "none"],
      default: "none",
    },
  },
  {
    collection: "nb-announcements",
    minimize: false,
    timestamps: true,
  }
);

export default mongoose.model("Announcement", announcementSchema);
