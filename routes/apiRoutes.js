const connection = require("../db/connection");

module.exports = function(app){

  app.get("/api/notes", function(req, res){
    connection.query("SELECT * FROM noteBook", function(err, dbNotes){
      res.jason(dbNotes);
    });
  });

  app.post("/api/notes", function(req, res){
    connection.query("INSERT INTO noteBook SET ?", req.body, function(err, result){
      if (err) throw err;

      res.jason(result);
    });
  });

  app.delete("/api/notes/:id", function(req, res){
    connection.query("DELETE FROM noteBook WHERE id = ?",[req.params.id], function(err, result){
      if (err) res.status(500).end();

      res.jason(result);
    })
  })
}