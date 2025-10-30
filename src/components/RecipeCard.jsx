import React from "react";

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      onClick={() => onSelect(recipe.idMeal)}
      className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-200"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-3 text-center">
        <h3 className="font-semibold text-lg text-orange-600">
          {recipe.strMeal}
        </h3>
      </div>
    </div>
  );
}
