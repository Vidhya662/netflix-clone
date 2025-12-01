"use client";

import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import MovieRow from "./components/MovieRow";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [action, setAction] = useState<any[]>([]);
  const [indian, setIndian] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "YOUR_API_KEY_HERE";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [resPopular, resTop, resAction, resIndian] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`),
          // discover Indian movies by origin country (IN)
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=IN`)
        ]);

        const dataPopular = await resPopular.json();
        const dataTop = await resTop.json();
        const dataAction = await resAction.json();
        const dataIndian = await resIndian.json();

        setPopular(dataPopular.results || []);
        setTopRated(dataTop.results || []);
        setAction(dataAction.results || []);
        setIndian(dataIndian.results || []);
      } catch (err) {
        console.error("Failed fetching movies:", err);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  // Search function used by SearchBar
  const handleSearch = async (query: string) => {
    if (!query || query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
      // Optionally you can scroll to top or show a section
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* If search results exist, show them first */}
      {searchResults.length > 0 && <MovieRow title="Search Results" movies={searchResults} />}

      {/* Banner + rows */}
      <Banner />

      <div className="mt-10 space-y-8 px-4">
        <MovieRow title="Indian Movies" movies={indian} />
        <MovieRow title="Trending Now" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Action Movies" movies={action} />
        {/* add more MovieRow components as you like */}
      </div>
    </div>
  );
}


