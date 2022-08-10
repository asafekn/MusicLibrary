const { CLIENT_PATH } = require("../env.js");

function handle(req, res) {
  // Send the html page for the compiled client code.
  res.sendFile(CLIENT_PATH);
}

module.exports = { handle: handle };
