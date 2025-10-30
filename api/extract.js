export default async function handler(req, res) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return new Response(
        JSON.stringify({ error: "No ingredients provided" }),
        { status: 400 }
      );
    }

    const prompt = `
        You are a recipe expert. Given ingredients: ${ingredients}.
        Suggest recipes where these ingredients are the **main** components.
        Avoid recipes where they are minor (e.g., eggs in banana pancakes if eggs are the query).
        Prefer Indian dishes when possible.
        Return in JSON with fields: [recipe_name, main_ingredient, description].
      `;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // or your deployed domain
          "X-Title": "Taylor's Recipe Finder",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // or "mistralai/mistral-7b-instruct"
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    // Extract content safely
    const content = data?.choices?.[0]?.message?.content || "[]";
    return new Response(content, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
}
