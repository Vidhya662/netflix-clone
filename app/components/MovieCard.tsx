"use client";

import Image from "next/image";
import { useState } from "react";
import MovieModal from "./MovieModal";

export default function MovieCard({ movie }: any) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className="w-36 md:w-48 lg:w-52 cursor-pointer transition-transform duration-200 hover:scale-110"
        onClick={() => setOpenModal(true)}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={300}
          height={450}
          alt={movie.title}
          className="rounded-lg"
        />
      </div>

      {openModal && (
        <MovieModal movie={movie} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}
