const sqlite3 = require("sqlite3").verbose();

function openLibraryDatabase(path) {

  const database = new sqlite3.Database(path);

  // ensure that foreign keys are respected.
  database.run(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
  `);

  // Do this before the main process is stopped.  We want to make sure that we
  // close the database file in case the server is stopped. The lines below will
  // setup a callback to be invoked just before the process is stopped.
  // This ensures that if someone uses 'kill' or Ctrl+C on our process we will
  // not leave the database in a corrupted state.
  process.on("exit", () => {
    console.log("closing database");
    database.close(() => {
      console.log("database closed");
    });
  });

  return database;
}

module.exports = {
  openLibraryDatabase : openLibraryDatabase
};
