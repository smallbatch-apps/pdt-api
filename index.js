const app = require('./src/app');

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})