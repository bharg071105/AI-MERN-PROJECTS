import fs from "fs";
import Document from "../models/Document.js";
import Embedding from "../models/Embedding.js";
import { getEmbedding } from "../utils/gemini.js";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

/* ---------------------------
   📄 UPLOAD DOCUMENT
---------------------------- */
export const uploadDocument = async (req, res) => {
  try {
    console.log("🔥 UPLOAD API HIT");
    console.log("📁 REQUEST FILE:", req.file);

    // 📁 Check file
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📁 FILE RECEIVED:", req.file);

    const filePath = req.file.path;
    console.log("📂 FILE PATH:", filePath);

    // 💾 Save document in DB
    const doc = await Document.create({
      fileUrl: filePath,
      uploadedBy: req.user?.id || null,
    });

    const buffer = fs.readFileSync(filePath);
    console.log("📦 BUFFER SIZE:", buffer.length);

    // ⚠️ Convert Buffer → Uint8Array (required by pdfjs)
    const uint8Array = new Uint8Array(buffer);

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDoc = await loadingTask.promise;

    let text = "";

    // 📄 Extract text from PDF
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map(item => item.str).join(" ");
      text += pageText + "\n";
    }

    console.log("📄 EXTRACTED TEXT LENGTH:", text.length);
    console.log("📄 SAMPLE TEXT:", text.slice(0, 200));

    if (!text.trim()) {
      return res.status(400).json({
        message: "PDF has no readable text (maybe scanned PDF)",
      });
    }

    // ✂️ Chunking
    const chunkSize = 1000;
    const overlap = 150;

    const chunks = [];

    for (let i = 0; i < text.length; i += chunkSize - overlap) {
      const chunk = text.slice(i, i + chunkSize);
      if (chunk.trim()) chunks.push(chunk);
    }

    console.log("✂️ TOTAL CHUNKS:", chunks.length);

    // 🧠 Generate embeddings
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await Embedding.create({
        text: chunk,
        embedding,
        documentId: doc._id,
      });
    }

    // ✅ Success response
    res.status(200).json({
      message: "Uploaded & Indexed Successfully",
      documentId: doc._id,
      chunks: chunks.length,
    });

  } catch (error) {
    console.error("❌ UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};

/* ---------------------------
   📄 LIST DOCUMENTS
---------------------------- */
export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching documents",
      error: error.message,
    });
  }
};

/* ---------------------------
   🗑️ DELETE DOCUMENT
---------------------------- */
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    await Document.findByIdAndDelete(id);
    await Embedding.deleteMany({ documentId: id });

    res.json({ message: "Document deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};