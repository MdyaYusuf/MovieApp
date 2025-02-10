import { useEffect, useState } from "react";

const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [totalResults, setTotalResults] = useState(0);

function nextPage() {
  setCurrentPage(currentPage + 1);
}

function previousPage() {
  setCurrentPage(currentPage - 1);
}

const api_key = "insert some key here";

export default function useMovies(query) {

  // First render => Mount
  useEffect(function () {
    const controller = new AbortController();
    const signal = controller.signal;
    /*
    // Alternatif Yöntem
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
    */
    async function getMovies(page) {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`, { signal: signal });

        if (res.ok) {
          throw new Error("Bilinmeyen bir hata oluştu.");
        }

        const data = await res.json();

        if (data.total_results === 0) {
          throw new Error("Film bulunamadı.")
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      }
      catch (err) {
        if (err.name === "AbortError") {
          console.log("aborted...");
        } else {
          setError(err.message);
        }
      }
      setLoading(false);
    }

    if (query.length < 4) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies(currentPage);

    return () => {
      controller.abort();
    }
  }, [query, currentPage]);

  return { movies, loading, error, currentPage, totalPages, total_results, nextPage, previousPage };
}