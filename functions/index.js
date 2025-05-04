// functions/index.js
const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");

const openaiKey = functions.config().openai.key;
const config = new Configuration({ apiKey: openaiKey });
const openai = new OpenAIApi(config);

exports.generateCvText = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .send({ error: "Missing or invalid 'prompt'." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful CV-writing assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500
    });

    const text = completion.data.choices[0].message.content.trim();
    return res.json({ text });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res
      .status(500)
      .send({ error: "AI service error." });
  }
});
