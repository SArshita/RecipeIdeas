import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onSelectRecipe }) {
  if (recipes.length === 0)
    return <p className="text-gray-500">No recipes found. Try another ingredient!</p>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={() => onSelectRecipe(recipe.idMeal)}
        />
      ))}
    </div>
  );
}
