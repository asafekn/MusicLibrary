function configure(app) {

  app.get("/", function handleRoot(req, res) {
    res.send(`
      <h1>Hello world</h1>
    `);
  });
}

module.exports = {
  configure: configure
};
