const { ROOT } = require("./env.js");
const root = require(`${ROOT}/routes/root.js`);
const api_user = require(`${ROOT}/routes/api/user.js`);

function configure(app, database) {
  app.get("/", root.handle);
  app.get("/api/user", (req, res) => api_user.handle(req, res, database));
}

module.exports = {
  configure: configure
};
