const connection = require("../db/connection");

module.exports = function(app){

  app.get("/api/notes", function(req, res){
    connection.query("SELECT * FROM noteBook", function(err, dbNotes){
      res.jason(dbNotes);
    });
  });

  app.post("/api/write", function(req, res){
    connection.query("INSERT INTO noteBook SET ?", req.body, function(err, result){
      if (err) throw err;

      res.jason(result);
    });
  });

  app.delete("/api/erase/:id", function(req, res){
    connection.query("DELETE FROM noteBook WHERE id = ?",req.body.id, function(err, result){
      if (err) throw err;

      res.jason(result);
    })
  })
}