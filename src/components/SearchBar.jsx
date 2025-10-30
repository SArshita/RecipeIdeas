import React, { useState } from "react";
const Search = () => (
  <span role="img" aria-label="search">
    🔍
  </span>
);

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-full shadow-md overflow-hidden"
    >
      <input
        type="text"
        placeholder="Enter ingredients (e.g., chicken, eggs, garlic)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-5 py-3 text-gray-700 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 flex items-center justify-center"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
