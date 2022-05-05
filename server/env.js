// This file contains environment variables that are
// useful for functions throughout the server.
const path = require("path");

const PROJECT_ROOT = path.join(__dirname, "..");

const DB_NAME = "library.db";

const env = {
  // This is the path to the `/server` directory in the local machine
  // that is running this code. We will use it to especify full paths
  // when importing local modules.
  ROOT: __dirname,

  // Path to the database file. It lives at the project's root, which
  // is one directory above the directory this file is in.
  DB_PATH: path.join(PROJECT_ROOT, DB_NAME),

  // Path to the compiled client code.
  CLIENT_PATH: path.join(PROJECT_ROOT, "client/index.html"),
}

module.exports = env;
