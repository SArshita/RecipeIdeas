import axios from "axios";

export default async function handler(req, res) {
  try {
    const { ingredients } = req.query;

    const prompt = `
You are a recipe recommendation assistant.
The user has the following ingredients: ${ingredients}.
Suggest 3 simple, Indian-style recipes where these are *main ingredients* (not secondary).
For each recipe, include:
- Name
- 1 image URL (royalty-free)
- Ingredients list
- Step-by-step instructions
Keep it concise and clear.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0].message.content;
    res.status(200).json({ recipes: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate recipes" });
  }
}
