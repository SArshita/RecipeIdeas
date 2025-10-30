// src/App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";

export default function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🍳 Taylor’s Recipe Ideas
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10">
        <SearchBar onSearch={handleSearch} />
        <p className="text-gray-500 text-sm text-center mt-2">
          Tip: You can type natural words like "2 eggs, rice, tomato"
        </p>
      </div>

      {/* Recipe List */}
      <div className="w-full max-w-4xl">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}
