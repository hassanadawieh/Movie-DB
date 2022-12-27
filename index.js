const express = require("express");
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
