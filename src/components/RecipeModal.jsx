import React, { useEffect, useState } from "react";

export default function RecipeModal({ meal, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await res.json();
      setDetails(data.meals[0]);
    }
    fetchDetails();
  }, [meal.idMeal]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-black font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {details.strMeal}
        </h2>
        <img
          src={details.strMealThumb}
          alt={details.strMeal}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((i) => ({
              ingredient: details[`strIngredient${i}`],
              measure: details[`strMeasure${i}`],
            }))
            .filter((item) => item.ingredient)
            .map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">Instructions</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {details.strInstructions}
        </p>
      </div>
    </div>
  );
}
