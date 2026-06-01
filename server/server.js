const express = require("express");
const path = require("path");
const movies = require("./movies_metadata.json");

const app = express();

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/movies", (req, res) => {
  console.log("Movies loaded:", movies.length);
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(
    (m) => String(m.id) === String(req.params.id)
  );

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  res.json(movie);
});

let port;

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../build/index.html")
    );
  });
} else {
  port = 3001;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});