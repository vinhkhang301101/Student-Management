import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required!"],
    },
    code: {
      type: String,
      required: [true, "Class ID is required!"],
      unique: true,
    },
    slot: {
      type: Number,
    },
  },
  {
    collection: "nb-classes",
    minimize: false,
    timestamps: true,
  }
);

mongoose.set("runValidators", true)

export default mongoose.model("Classes", classSchema);
