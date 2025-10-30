import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          {recipe.strMeal}
        </h2>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-lg mb-4 w-full object-cover"
        />

        <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => {
            const ingredient = recipe[`strIngredient${n}`];
            const measure = recipe[`strMeasure${n}`];
            return ingredient ? (
              <li key={n}>
                {ingredient} — {measure}
              </li>
            ) : null;
          })}
        </ul>

        <h3 className="font-semibold text-lg mb-2">Instructions</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {recipe.strInstructions}
        </p>
      </div>
    </div>
  );
}
