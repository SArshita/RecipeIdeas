import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onSelect }) {
  if (!recipes.length)
    return (
      <p className="text-gray-600 text-center">
        🔎 Type ingredients to find delicious recipes!
      </p>
    );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((r) => (
        <RecipeCard key={r.idMeal} recipe={r} onSelect={onSelect} />
      ))}
    </div>
  );
}
