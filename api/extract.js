// api/extract.js
export default async function handler(req, res) {
  try {
    const { ingredients } = req.body || {};

    if (!ingredients) {
      return res.status(400).json({ error: "No ingredients provided" });
    }

    const prompt = `
        You are a helpful culinary assistant.
        Given ingredients: ${ingredients}.
        Return ONLY a JSON array of possible Indian and global recipes.
        Each recipe must have:
        - "name": the recipe name
        - "region": cuisine or origin (prioritize Indian recipes)
        - "ingredients": list of ingredients with quantity if possible
        - "steps": list of steps in simple English
        Respond in valid JSON only.
      `;

    const apiRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await apiRes.json();

    // Try to parse JSON from the AI response
    let recipes;
    try {
      recipes = JSON.parse(data.choices?.[0]?.message?.content || "[]");
    } catch {
      recipes = [];
    }

    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
}
