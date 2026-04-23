import { getEmbedding, askGemini } from "../utils/gemini.js";
import { findTopChunks } from "../utils/vectorSearch.js";
import Chat from "../models/Chat.js";

export const askQuestion = async (req, res) => {
  const { question } = req.body;

  const queryEmbedding = await getEmbedding(question);
  const chunks = await findTopChunks(queryEmbedding);

  const context = chunks.map(c => c.text).join("\n\n");

  const prompt = `
Answer ONLY using the context below.
If not found, say "I don't know".

${context}

Question: ${question}
`;

  const answer = await askGemini(prompt);

  const chat = await Chat.create({
    user: req.user.id,
    question,
    answer,
  });

  res.json({
    answer,
    sources: chunks.map(c => c.text.slice(0, 100)),
    chat,
  });
};

export const getChatHistory = async (req, res) => {
  const chats = await Chat.find({ user: req.params.userId });
  res.json(chats);
};

export const deleteChatHistory = async (req, res) => {
  await Chat.findByIdAndDelete(req.params.chatId);
  res.json({ message: "Deleted" });
};