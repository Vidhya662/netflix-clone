export async function getTrailerKey(id: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      console.error("TMDB API key is missing");
      return null;
    }

    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error("API Error:", res.statusText);
      return null;
    }

    const data = await res.json();

    if (!data || !data.results) {
      console.error("No results in API response");
      return null;
    }

    const trailer = data.results.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );

    return trailer ? trailer.key : null;
  } catch (err) {
    console.error("Trailer Fetch Error:", err);
    return null;
  }
}

