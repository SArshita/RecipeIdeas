import React from "react";

export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-rose-700">
          {recipe.strMeal}
        </h3>
      </div>
    </div>
  );
}
