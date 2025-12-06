import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: any[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies && movies.length > 0 ? (
          movies.map((movie: any) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}




