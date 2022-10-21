const { ROOT } = require("./env.js");
const root = require(`${ROOT}/routes/root.js`);
const api_user = require(`${ROOT}/routes/api/user.js`);
const api_song = require(`${ROOT}/routes/api/song.js`);
const api_playlist = require(`${ROOT}/routes/api/playlist.js`);
const api_artist = require(`${ROOT}/routes/api/artist.js`);
const api_album = require(`${ROOT}/routes/api/album.js`);

function configure(app, database) {
  app.get("/", root.handle);
  app.get("/api/user", (req, res) => api_user.handle(req, res, database))
  app.get("/api/song", (req, res) => api_song.handle(req, res, database))
  app.get("/api/playlist", (req, res) => api_playlist.handle(req, res, database))
  app.get("/api/artist", (req, res) => api_artist.handle(req, res, database))
  app.get("/api/album", (req, res) => api_album.handle(req, res, database));
}

module.exports = {
  configure: configure
};
