import React, { useEffect, useState } from "react";

import "./App.css";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_KEY = "######"; // Your API Key
const API_URL = "http://www.omdbapi.com?apikey=" + API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    if (title !== "") {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
    } else {
      setMovies(false); // Set movies to default if input is empty
    }
  };

  useEffect(() => {
    setMovies(false); // Default action trigerred on first page load
  }, []);

  return (
    <div className="app">
      <h1
        onClick={() => {
          setMovies(false);
          setSearchTerm("");
        }}
      >
        MovieLand
      </h1>

      {/* Search Container */}
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies ? (
        movies?.length > 0 ? (
          // All Movies
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          // When no movies found
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      ) : (
        // When input is empty or default behaviour
        <div className="empty">
          <h2>Type something to search</h2>
        </div>
      )}
    </div>
  );
};

export default App;
