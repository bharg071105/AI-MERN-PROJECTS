import mongoose from "mongoose";

const schema = new mongoose.Schema({
  text: String,
  embedding: [Number],
  documentId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Embedding", schema);