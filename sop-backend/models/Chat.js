import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  answer: String,
  department: String,
}, { timestamps: true });

export default mongoose.model("Chat", schema);