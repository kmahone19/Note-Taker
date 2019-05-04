const express = require('express');
const connection = require('./db/connection');
const path = require('path');
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  connection.query("SELECT * FROM noteBook", function (err, dbNotes) {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(dbNotes);
  });
});

app.post("/api/notes", function (req, res) {
  connection.query("INSERT INTO noteBook SET ?", req.body, function (err, result) {
    if (err) return res.status(500).json(err);

    res.json({ status: 'successful' });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  connection.query("DELETE FROM noteBook WHERE id = ?", [req.params.id], function (err, result) {
    if (err) res.status(500).end();

    res.json(result);
  })
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});