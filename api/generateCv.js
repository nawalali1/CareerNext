import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Generate professional CV text based on user details.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500
    });

    res.status(200).json({ text: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
