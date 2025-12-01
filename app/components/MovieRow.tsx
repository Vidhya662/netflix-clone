import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}


