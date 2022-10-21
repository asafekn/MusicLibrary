
function handle(req, res, database) {

  // get all results from this query
  database.all("SELECT * FROM User", function (err, results) {
    if (err == undefined) {
      res.json(results);
    } else {
      res.json({ error: "Unable to fetch database data: " + err });
    }
  });

}

module.exports = { handle: handle };
