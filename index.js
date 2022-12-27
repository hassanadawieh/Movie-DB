const express = require("express");
const app = express();
const port = 3000;

const movies = [
  { id: 1, title: "Jaws", year: 1975, rating: 8 },
  { id: 2, title: "Avatar", year: 2009, rating: 7.8 },
  { id: 3, title: "Brazil", year: 1985, rating: 8 },
  { id: 4, title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

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

app.get("/movies/update", (req, res) => {
  res.send({ status: 200, message: "Temporary" });
});

app.get("/movies/delete", (req, res) => {
  res.send({ status: 200, message: "Temporary" });
});

///////////////////////////////////////////////////////////////////////////////////////////
// Step 5

app.get("/movies/create", (req, res) => {
  res.send({ status: 200, message: "Temporary" });
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
