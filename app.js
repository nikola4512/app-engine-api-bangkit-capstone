const express = require("express");
const { db } = require("./utils/db-connect.js");

const app = express();
const port = 3000;

// Routing

app.get("/", async (req, res) => {
  res.json({ text: "Hello all!" });
});

app.get("/learning", (req, res) => {
  const querySql = "SELECT * FROM learning";
  db.query(querySql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/quiz", (req, res) => {
  const querySql = "SELECT * FROM quiz";
  db.query(querySql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
