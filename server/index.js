const { ROOT } = require("./env.js");
const routes = require(`${ROOT}/routes.js`);
const express = require('express');

const PORT = 80;

// Create a server
const app = express();

// Configure the server routes we will accept
routes.configure(app);

// Start server
app.listen(PORT, function sayServerStarted() {
  console.log("Server started on port " + PORT)
});

