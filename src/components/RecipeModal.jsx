import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  // Extract ingredients and measurements dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) ingredients.push(`${measure} ${ingredient}`);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full overflow-y-auto max-h-[90vh]">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded-t-xl"
        />
        <div className="p-5 text-left">
          <h2 className="text-2xl font-bold text-rose-600 mb-2">
            {recipe.strMeal}
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Category:</strong> {recipe.strCategory}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Area:</strong> {recipe.strArea}
          </p>

          <h3 className="text-lg font-semibold text-rose-600 mb-2">
            Ingredients:
          </h3>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-rose-600 mb-2">
            Instructions:
          </h3>
          <p className="text-gray-700 whitespace-pre-line">
            {recipe.strInstructions}
          </p>

          <button
            onClick={onClose}
            className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
