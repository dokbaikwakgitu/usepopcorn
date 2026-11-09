import { useState, useEffect } from "react";
const KEY = process.env.REACT_APP_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // why nested - react require the effect callback to either return nothing or cleanup function.
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {
              signal: controller.signal, //It hands fetch the "cancel channel" (controller.signal) — when controller.abort() fires, this fetch stops.
            },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found"); // what if movie queries not existed which mean data.search is undefined
          //When the search finds nothing, OMDB return { Response: "False", Error: "Movie not found!" }
          setMovies(data.Search);
          console.log(data.Search);
          setError(""); // why we need to set empty string here
        } catch (err) {
          console.log(err.message);
          if (err.name !== "AbortError") setError(err.message); //cancelling fetch also and error but it intentional
        } finally {
          // always executed
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie(); //set the selectedId to null first before searching for next movie

      const timer = setTimeout(() => {
        //debounce logic wait for 500ms before fetching
        fetchMovies(); // running the inside function after defining it above
      }, 500);

      //the one who called the function declared abovej

      return function () {
        clearTimeout(timer); //clear the timer
        controller.abort(); //cancels the fetch that was started with controller.signal.
      };
    },
    [query],
  );
  return { movies, isLoading, error };
}
