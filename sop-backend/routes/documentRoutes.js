import express from "express";
import multer from "multer";
import {
  uploadDocument,
  listDocuments,
  deleteDocument
} from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📁 multer setup
const upload = multer({ dest: "uploads/" });

// ⚠️ IMPORTANT: "file" must match Postman key
router.post("/upload", protect, upload.single("file"), uploadDocument);

router.get("/", protect, listDocuments);
router.delete("/:id", protect, deleteDocument);

export default router;