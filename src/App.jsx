import React, { useState } from "react";
import { fetchRecipesByIngredient, fetchRecipeDetails } from "./api";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredient) => {
    setLoading(true);
    const results = await fetchRecipesByIngredient(ingredient);
    setRecipes(results);
    setLoading(false);
  };

  const handleSelectRecipe = async (id) => {
    const details = await fetchRecipeDetails(id);
    setSelectedRecipe(details);
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-rose-600 mb-6">
        🍳 Taylor’s Recipe Ideas
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p className="text-gray-500 mt-4">Loading recipes...</p>
      ) : (
        <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
