const rootPage = `
<h1>User page</h1>
`

function handle(req, res) {
  res.send(rootPage);
}

module.exports = { handle: handle };
