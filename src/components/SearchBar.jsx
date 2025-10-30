import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-2xl mb-8"
    >
      <input
        type="text"
        placeholder='Try "chicken, eggs, garlic"...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-r-lg flex items-center justify-center"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
