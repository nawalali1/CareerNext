// /Users/nawal/Documents/CareerNext/api/generateCvText.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) {
    return res.status(401).end("Unauthorized");
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid prompt." });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({ apiKey: openaiKey });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful CV-writing assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500
    });

    const text = completion.data.choices[0].message.content.trim();
    res.status(200).json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service error." });
  }
}
