
const rootPage = `
<h1>Hello world</h1>
<p>This is the root page for Music Library</p>
`

function handle(req, res) {
  res.send(rootPage);
}

module.exports = { handle: handle };
