import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fileUrl: String,
  department: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Document", schema);