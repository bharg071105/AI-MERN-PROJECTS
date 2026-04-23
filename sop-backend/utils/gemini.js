// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//   throw new Error("❌ GEMINI_API_KEY missing in .env");
// }

// // 💬 Gemini Chat SDK (WORKS)
// const genAI = new GoogleGenerativeAI(apiKey);

// export const askGemini = async (prompt) => {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });

//   const result = await model.generateContent(prompt);
//   return result.response.text();
// };

// // 🧠 EMBEDDINGS (REST API - STABLE FIX)
// export const getEmbedding = async (text) => {
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "models/text-embedding-004",
//         content: {
//           parts: [{ text: text }],
//         },
//       }),
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     console.error("❌ EMBEDDING ERROR RESPONSE:", data);
//     throw new Error(data.error?.message || "Embedding failed");
//   }

//   return data.embedding.values;
// };
import natural from "natural";

const tokenizer = new natural.WordTokenizer();

// 🧠 SIMPLE LOCAL EMBEDDING (NO API NEEDED)
export const getEmbedding = async (text) => {
  const tokens = tokenizer.tokenize(text.toLowerCase());

  // convert words → numbers
  const vector = tokens.map(word => {
    let sum = 0;
    for (let i = 0; i < word.length; i++) {
      sum += word.charCodeAt(i);
    }
    return sum;
  });

  return vector;
};

// 💬 Chat still uses Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 💬 LOCAL ANSWER (NO API)
export const askGemini = async (prompt) => {
  try {
    // split context and question
    const parts = prompt.split("Question:");
    let context = parts[0] || "";
    const question = parts[1] || "";

    // ❌ remove unwanted instruction lines
    context = context
      .replace("Answer ONLY using the context below.", "")
      .replace('If not found, say "I don\'t know".', "")
      .trim();

    // ✅ generate clean answer
    return `This document is about ${context.slice(0, 120)}...`;

  } catch (error) {
    console.error("Answer Error:", error.message);
    return "Unable to answer right now.";
  }
};