const { ROOT } = require("./env.js");
const root = require(`${ROOT}/routes/root.js`);

function configure(app) {
  app.get("/", root.handle);
}

module.exports = {
  configure: configure
};
