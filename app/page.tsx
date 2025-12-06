"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MovieRow from "./components/MovieRow";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [action, setAction] = useState<any[]>([]);
  const [indian, setIndian] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const API_KEY = "ee279a791265ac584b2d951668038a26";

  // Fetch Home Page Movies
  const fetchMovies = async () => {
    const [p, t, a, i] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`).then(
        (res) => res.json()
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=IN`
      ).then((res) => res.json()),
    ]);

    setPopular(p.results);
    setTopRated(t.results);
    setAction(a.results);
    setIndian(i.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Search handler
  const handleSearch = async (query: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await response.json();
    setSearchResults(data.results || []);
  };

  // Genre Filter
  const handleGenreSelect = async (genreId: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    const data = await response.json();
    setSearchResults(data.results || []);
  };

  // Language Filter
  const handleLanguageSelect = async (langCode: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${langCode}`
    );

    const data = await response.json();
    setSearchResults(data.results || []);
  };

  return (
    <div className="bg-black min-h-screen text-white">

      {/* Pass the functions to navbar */}
      <Navbar
        onGenreSelect={handleGenreSelect}
        onLanguageSelect={handleLanguageSelect}
      />

      <Banner />

      {/* SEARCH BOX */}
      <div className="mt-6 px-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* SHOW RESULTS IF SEARCHED / FILTERED */}
      {searchResults.length > 0 && (
        <div className="mt-10 px-4">
          <MovieRow title="Results" movies={searchResults} />
        </div>
      )}

      {/* DEFAULT HOME PAGE SECTIONS */}
      {searchResults.length === 0 && (
        <div className="mt-10 space-y-10 px-4">
          <MovieRow title="Indian Movies" movies={indian} />
          <MovieRow title="Trending Now" movies={popular} />
          <MovieRow title="Top Rated" movies={topRated} />
          <MovieRow title="Action Movies" movies={action} />
        </div>
      )}
    </div>
  );
}





