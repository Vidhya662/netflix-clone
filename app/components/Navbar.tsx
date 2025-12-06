"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar({ onGenreSelect, onLanguageSelect }: any) {
  const [showGenres, setShowGenres] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const genres = [
    { id: 10749, name: "Romance" },
    { id: 35, name: "Comedy" },
    { id: 53, name: "Thriller" },
    { id: 27, name: "Horror" },
    { id: 10751, name: "Family" },
    { id: 18, name: "Drama" },
  ];

  const languages = [
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "ml", name: "Malayalam" },
    { code: "kn", name: "Kannada" },
    { code: "hi", name: "Hindi" },
    { code: "en", name: "English" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white sticky top-0 z-50">
      {/* LOGO */}
      <div className="text-red-600 text-3xl font-extrabold">NETFLIX</div>

      {/* MENU */}
      <div className="flex gap-8">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <Link href="/" className="hover:text-gray-400">Movies</Link>

        {/* Genres Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowGenres(true)}
          onMouseLeave={() => setShowGenres(false)}
        >
          <span className="hover:text-gray-400 cursor-pointer">Genres</span>
          {showGenres && (
            <div className="absolute top-6 left-0 bg-[#111] p-4 rounded shadow-lg w-40">
              {genres.map((g) => (
                <p
                  key={g.id}
                  className="py-1 hover:text-red-500 cursor-pointer"
                  onClick={() => onGenreSelect(g.id)}
                >
                  {g.name}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Languages Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowLanguages(true)}
          onMouseLeave={() => setShowLanguages(false)}
        >
          <span className="hover:text-gray-400 cursor-pointer">Languages</span>
          {showLanguages && (
            <div className="absolute top-6 left-0 bg-[#111] p-4 rounded shadow-lg w-40">
              {languages.map((l) => (
                <p
                  key={l.code}
                  className="py-1 hover:text-red-500 cursor-pointer"
                  onClick={() => onLanguageSelect(l.code)}
                >
                  {l.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

