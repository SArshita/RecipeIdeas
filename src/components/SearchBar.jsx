import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim()) onSearch(ingredient.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-2 mb-6"
    >
      <input
        type="text"
        placeholder="Enter an ingredient (e.g., chicken)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        className="border-2 border-rose-400 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-rose-600"
      />
      <button
        type="submit"
        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg"
      >
        🔍 Search
      </button>
    </form>
  );
}
