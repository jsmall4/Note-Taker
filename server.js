const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 3001;
// const notes = require("./lib/notes");
const db = require("./db/db.json");
const app = express();

app.get("/notes", (req, res) => {
  console.log(req.body);

  res.json(db);
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  db.push(req.body);
  res.json(db);
});

app.delete("/notes/:id", (req, res) => {
  console.log(req.params);
  db.splice(req.params.id - 1, 1);
  res.json(db);
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
