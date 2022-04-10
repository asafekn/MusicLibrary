const { ROOT, DB_PATH } = require("./env.js");
const routes = require(`${ROOT}/routes.js`);
const express = require('express');
const { openLibraryDatabase } = require(`${ROOT}/database.js`);

const database = openLibraryDatabase(DB_PATH);

// Create a server
const app = express();

// Configure the server routes we will accept
routes.configure(app, database);

// Start the server
const PORT = 80;
server = app.listen(PORT, function sayServerStarted() {
  console.log("Server started on port " + PORT)
});

// Do this before the process is stopped
process.on("exit", () => {
  console.log("stopping HTTP server");
  server.close(() => {
    console.log("HTTP server stopped");
  });
});
// call exit handlers if Ctrl+C is pressed
process.on("SIGINT", () => process.exit());
// call exit handlers if someone uses 'kill' to stop the process
process.on("SIGTERM", () => process.exit());

