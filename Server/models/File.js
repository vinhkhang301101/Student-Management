import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    filename: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcement",
      required: true,
    },
  },
  {
    collection: "nb-files",
    minimize: false,
  }
);

const File = mongoose.model("Files", fileSchema);

export default File;
