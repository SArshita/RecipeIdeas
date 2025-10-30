export default async function handler(request, response) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients) {
      return response.status(400).json({ error: "No ingredients provided" });
    }

    const prompt = `
        You are a smart recipe assistant.
        Given ingredients: ${ingredients}.
        Suggest 3–5 recipes, prioritizing INDIAN cuisine if possible.
        Each recipe must be valid JSON with:
        - "name"
        - "region"
        - "ingredients"
        - "steps"
        Respond ONLY with a JSON array.
      `;

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await aiRes.json();
    let recipes = [];

    try {
      recipes = JSON.parse(data.choices?.[0]?.message?.content || "[]");
    } catch {
      recipes = [];
    }

    return response.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Server Error" });
  }
}
