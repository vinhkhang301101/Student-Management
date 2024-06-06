import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
  },
  {
    collection: "nb-classes",
    minimize: false,
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);
