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
You are a professional recipe curator.

TASK:
Given a list of ingredients, find recipes where those ingredients are the **main or dominant** part of the dish.
Completely ignore recipes where the ingredient is used as a binder or small part (for example, if the query is "eggs", do NOT include banana pancakes).
Prioritize Indian cuisine dishes at the top of the list, but include international ones too if they fit the ingredient focus.

RULES:
1. Each recipe must have the queried ingredient as the primary or key ingredient.
2. Prefer savory dishes over sweet if both fit equally well.
3. Rank Indian recipes first (mark them clearly).
4. Provide concise output as valid JSON — no explanation text.

OUTPUT FORMAT (strict JSON array):
[
  {
    "recipe_name": "Tomato Curry",
    "main_ingredient": "Tomato",
    "description": "A spicy Indian curry where tomato forms the base of the gravy."
  },
  ...
]

Ingredients provided: ${ingredients}.
Generate up to 7 recipes only.
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
    let recipes = [];
    try {
      recipes = JSON.parse(content);
    } catch (e) {
      recipes = [];
    }

    // filter results: must mention ingredient prominently
    const mainWord = ingredients.trim().toLowerCase().split(" ")[0]; // e.g., 'egg' from '2 eggs'
    recipes = recipes.filter(
      (r) =>
        r.main_ingredient?.toLowerCase().includes(mainWord) ||
        r.recipe_name?.toLowerCase().includes(mainWord)
    );

    // prioritize Indian recipes
    recipes.sort((a, b) => {
      const aIndian = /indian/i.test(a.description || a.recipe_name);
      const bIndian = /indian/i.test(b.description || b.recipe_name);
      return aIndian === bIndian ? 0 : aIndian ? -1 : 1;
    });

    return new Response(JSON.stringify(recipes), {
      headers: { "Content-Type": "application/json" },
    });

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
