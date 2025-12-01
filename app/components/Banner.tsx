"use client";

import { useEffect, useState } from "react";

export default function Banner() {
  const [movie, setMovie] = useState<any>(null);
  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchBanner() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API}`
      );
      const data = await res.json();
      setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
    }
    fetchBanner();
  }, []);

  if (!movie) return null;

  return (
    <div
      className="h-[60vh] bg-cover bg-center flex flex-col justify-end p-10"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <p className="max-w-lg opacity-80">{movie.overview}</p>
    </div>
  );
}
