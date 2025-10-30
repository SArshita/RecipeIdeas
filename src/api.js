// Using TheMealDB API for free recipe lookups
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

export async function fetchRecipes(ingredients) {
  try {
    const query = ingredients.trim().replace(/\s+/g, "_");
    const response = await fetch(`${BASE_URL}${query}`);
    const data = await response.json();

    if (data.meals) return data.meals;
    return [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function fetchRecipeDetails(id) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
}
