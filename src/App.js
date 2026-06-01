import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const loadMovie = async (id) => {
    try {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (selectedMovie) {
    return (
      <div className="container">
        <button onClick={() => setSelectedMovie(null)}>
          ← Back
        </button>

        <h1>{selectedMovie.title}</h1>

        <p><strong>ID:</strong> {selectedMovie.id}</p>

        <p>
          <strong>Original Title:</strong>{" "}
          {selectedMovie.original_title}
        </p>

        <p>
          <strong>Overview:</strong>{" "}
          {selectedMovie.overview}
        </p>

        <p>
          <strong>Release Date:</strong>{" "}
          {selectedMovie.release_date}
        </p>

        <p>
          <strong>Runtime:</strong>{" "}
          {selectedMovie.runtime} minutes
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedMovie.status}
        </p>

        <p>
          <strong>Tagline:</strong>{" "}
          {selectedMovie.tagline}
        </p>

        <p>
          <strong>Vote Average:</strong>{" "}
          {selectedMovie.vote_average}
        </p>

        <p>
          <strong>Vote Count:</strong>{" "}
          {selectedMovie.vote_count}
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => loadMovie(movie.id)}
          >
            <h3>{movie.title}</h3>

            <p>
              {movie.tagline || "No Tagline Available"}
            </p>

            <p>
              Rating: {movie.vote_average}/10
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;