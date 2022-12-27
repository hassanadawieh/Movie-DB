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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
