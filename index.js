const express = require("express");
const app = express();
const port = 3000;

let newID = 5;
const DEFAULT_RATING = 4;

let movies = [
  { id: 1, title: "Jaws", year: 1975, rating: 8 },
  { id: 2, title: "Avatar", year: 2009, rating: 7.8 },
  { id: 3, title: "Brazil", year: 1985, rating: 8 },
  { id: 4, title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

const isValidYear = (year) => {
  console.log(year);
  if (isNaN(year)) return false; // we only process strings!

  if (String(year).length !== 4) {
    return false;
  }
  return true;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

app.get("/time", (req, res) => {
  const now = new Date();
  res.send({ status: 200, message: `${now.getHours()}:${now.getMinutes()}` });
});

app.get("/hello/:ID", (req, res) => {
  res.send({ status: 200, message: `Hello ${req.params.ID}` });
});

app.get("/search", (req, res) => {
  const queryData = req.query.s;

  let response = {
    status: 500,
    error: true,
    message: "You have to provide search",
  };
  if (queryData != null) {
    response = { status: 200, message: "ok", data: req.query.s };
  }

  res.send(response);
});

app.get("/movies/update/:ID", (req, res) => {
  const title = req.query.title;
  const rating = req.query.rating;
  let selectedMovie;
  movies.forEach((movie) => {
    if (movie.id == req.params.ID) {
      selectedMovie = movie;
    }
  });
  if (selectedMovie == undefined) {
    res.send({
      status: 404,
      error: true,
      message: `The movie ${req.params.ID} does not exist.`,
    });
    return;
  }
  selectedMovie.title = title ? title : selectedMovie.title;
  selectedMovie.rating = rating ? rating : selectedMovie.rating;
  res.send({ status: 200, data: movies });
});

app.get("/movies/delete/:ID", (req, res) => {
  const newMovies = movies.filter((movie) => {
    return movie.id != req.params.ID;
  });

  if (newMovies.length === movies.length) {
    res.send({
      status: 404,
      error: true,
      message: `the movie ${req.params.ID} does not exist`,
    });
    return;
  }
  movies = newMovies;
  res.send({ status: 200, data: movies });
});

///////////////////////////////////////////////////////////////////////////////////////////
// Step 5 & 8

app.get("/movies/create", (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating ? req.query.rating : DEFAULT_RATING;

  if (title == undefined || !isValidYear(year)) {
    res.send({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
    return;
  }
  movies.push({
    id: newID++,
    title,
    year,
    rating,
  });
  res.send({ status: 200, data: movies[movies.length - 1] });
});

app.get("/movies/read", (req, res) => {
  res.send({ status: 200, data: movies });
});

/////////////////////////////////////////////////////////////////////////////////////////
// Step 6
const moviesSorted = (res, filter) => {
  res.send({
    status: 200,
    data: movies.sort((movie1, movie2) => {
      return movie1[filter] > movie2[filter] ? 1 : -1;
    }),
  });
};

app.get("/movies/read/by-date", (req, res) => {
  moviesSorted(res, "year");
});

app.get("/movies/read/by-rating", (req, res) => {
  moviesSorted(res, "rating");
});

app.get("/movies/read/by-title", (req, res) => {
  moviesSorted(res, "title");
});

///////////////////////////////////////////////////////////////////////////////////////

app.get("/movies/read/id/:ID", (req, res) => {
  movies.forEach((movie) => {
    if (movie.id == req.params.ID) {
      res.send({ status: 200, data: movie });
      return;
    }
  });
  res.send({
    status: 404,
    error: true,
    message: `The movie ${req.params.ID} does not exist.`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
