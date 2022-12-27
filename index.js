const express = require("express");
const app = express();
const port = 3000;

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
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

///////////////////////////////////////////////////////////////////////////////////////////
// Step 5

app.get("/movies/create", (req, res) => {
  res.send({ status: 200, message: "Temporary" });
});

app.get("/movies/read", (req, res) => {
  res.send({ status: 200, data: JSON.stringify(movies) });
});

app.get("/movies/update", (req, res) => {
  res.send({ status: 200, message: "Temporary" });
});

app.get("/movies/delete", (req, res) => {
  res.send({ status: 200, message: "Temporary" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
