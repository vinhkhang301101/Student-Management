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
    // users: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // isAll: {
    //   type: String,
    //   enum: ["student", "teacher", "none"],
    //   default: "none",
    // },
  },
  {
    collection: "nb-announcements",
    minimize: false,
    timestamps: true,
  }
);

export default mongoose.model("Announcement", announcementSchema);
