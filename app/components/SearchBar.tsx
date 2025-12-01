"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 px-4 flex items-center gap-3">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Search
      </button>
    </form>
  );
}
