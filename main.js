import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ChatGPT API 엔드포인트
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-4o-mini",
    });

    res.json({
      response: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
