"use client";

import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getTrailerKey } from "../lib/getTrailer";

interface MovieModalProps {
  movie: any;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrailer() {
      const key = await getTrailerKey(movie.id);
      setTrailerKey(key); // key can be null, that is OK
    }
    loadTrailer();
  }, [movie.id]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-5 rounded-lg w-3/4 lg:w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* If trailer exists → show video */}
        {trailerKey ? (
          <YouTube
            videoId={trailerKey}
            opts={{
              width: "100%",
              height: "380",
              playerVars: { autoplay: 1 },
            }}
          />
        ) : (
          // If trailer missing → show movie details instead of crashing
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-300 mb-2">{movie.overview}</p>
            <p>⭐ Rating: {movie.vote_average}</p>
            <p>📅 Release: {movie.release_date}</p>
            <p className="mt-3 text-red-400">
              Trailer not available — showing movie details.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 rounded text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}



