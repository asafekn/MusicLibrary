function handle(req, res, database) {

    database.all("SELECT * FROM Playlist", function (err, results) {
      if (err == undefined) {
        res.json(results);
      } else {
        res.json({ error: "Unable to fetch database data: " + err });
      }
    });
  
  }
  
  module.exports = { handle: handle };