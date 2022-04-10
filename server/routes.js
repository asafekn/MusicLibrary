const { ROOT } = require("./env.js");
const root = require(`${ROOT}/routes/root.js`);
const api_user = require(`${ROOT}/routes/api/user.js`);

function configure(app) {
  app.get("/", root.handle);
  app.get("/api/user", api_user.handle);
}

module.exports = {
  configure: configure
};
