// src/api.js

// Remove quantities and stopwords from user input
function normalizeIngredients(rawInput) {
  return rawInput
    .toLowerCase()
    .replace(
      /\b(\d+|half|quarter|cup|cups|tablespoon|tablespoons|tsp|teaspoon|teaspoons|grams|g|kg|ml|pieces|slice|slices|soaked|boiled|chopped|fresh)\b/g,
      ""
    )
    .replace(/[^a-zA-Z,\s]/g, "") // remove extra punctuation
    .replace(/\s+/g, " ")
    .trim()
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i.length > 0);
}

export async function fetchRecipesByIngredients(input) {
  const ingredients = normalizeIngredients(input);

  if (!ingredients.length) {
    throw new Error("Please enter at least one valid ingredient.");
  }

  // Fetch recipes for each ingredient
  const requests = ingredients.map((ing) =>
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        ing
      )}`
    )
      .then((res) => res.json())
      .then((data) => data.meals || [])
  );

  // Prioritize recipes that have the ingredient name in title
  const prioritized = data.sort((a, b) => {
    const firstIng = ingredients[0].toLowerCase();
    const aMatch = a.strMeal.toLowerCase().includes(firstIng);
    const bMatch = b.strMeal.toLowerCase().includes(firstIng);
    return bMatch - aMatch;
  });
  setRecipes(prioritized);

  const results = await Promise.all(requests);
  const combined = results.flat();

  // Find recipes that include all given ingredients (intersection)
  const grouped = combined.reduce((map, meal) => {
    map[meal.idMeal] = map[meal.idMeal] ? map[meal.idMeal] + 1 : 1;
    return map;
  }, {});

  const filtered = combined.filter(
    (meal) => grouped[meal.idMeal] === ingredients.length
  );

  // If no exact match, fallback to any with at least one ingredient
  const finalResults = filtered.length ? filtered : combined;

  return finalResults.slice(0, 20); // limit results for clarity
}

export async function fetchRecipeDetails(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}
