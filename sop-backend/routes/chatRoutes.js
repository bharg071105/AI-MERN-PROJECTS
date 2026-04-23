import express from "express";
import {
  askQuestion,
  getChatHistory,
  deleteChatHistory,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", protect, askQuestion);
router.get("/history/:userId", protect, getChatHistory);
router.delete("/history/:chatId", protect, deleteChatHistory);

export default router;