import { useEffect, useState } from "react";

const api_key = "insert some key here";

export default function useMovieDetails(id) {

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function getMovieDetails() {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${api_key}`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    }
    getMovieDetails();
  }, [id]);

  return { movie, loading };
}