// This file contains environment variables that are
// useful for functions throughout the server.

module.exports = {
  // This is the path to the `/server` directory in the local machine
  // that is running this code. We will use it to especify full paths
  // when importing local modules.
  ROOT: __dirname,

  // Path to the database file. It lives at the project's root, which
  // is one directory above the directory this file is in.
  DB_PATH: __dirname + "../",
}
