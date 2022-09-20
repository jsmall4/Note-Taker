const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const app = express();
const uuid = require("./helper/uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  // res.json(db);
});

app.get("/api/notes", (req, res) => res.json(db));

app.post("/api/notes", (req, res) => {
  // console.log(req.body);
  req.body.id = uuid();
  db.push(req.body);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(db, null, 1)
  );
  res.json(req.body);
});

// app.delete("/notes/:id", (req, res) => {
//   console.log(req.params);
//   db.splice(req.params.id - 1, 1);
//   res.json(db);
// });

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
