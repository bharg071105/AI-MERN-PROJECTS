import Embedding from "../models/Embedding.js";

const cosine = (a, b) => {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
};

export const findTopChunks = async (queryEmbedding) => {
  const chunks = await Embedding.find();

  const scored = chunks.map(c => ({
    ...c._doc,
    score: cosine(queryEmbedding, c.embedding),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
};