import React, { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeList({ recipes }) {
  const [selected, setSelected] = useState(null);

  if (recipes.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        No recipes found yet — try searching ingredients above!
      </p>
    );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((r) => (
        <div
          key={r.idMeal}
          onClick={() => setSelected(r)}
          className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
        >
          <img
            src={r.strMealThumb}
            alt={r.strMeal}
            className="w-full h-48 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-800 p-3 text-center">
            {r.strMeal}
          </h3>
        </div>
      ))}

      {selected && (
        <RecipeModal meal={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
