import { useEffect, useState } from "react";

const KEY = "405c6e96";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController(); // to clean up old request when ther is new fetch request (happens due to each key stroke)

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // to connect Abortcontroller with fetch function
          );

          if (!res.ok)
            throw new Error("something went wrong with fethching movies");

          const data = await res.json();
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            //as when the request get canceled JS show that as abort error
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.len < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovies();
      return function () {
        // clean up function
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
