var fs = require('fs'),
  https = require('https'),
  jsonServer = require('json-server'),
  server = jsonServer.create(),
  router = jsonServer.router('db.json'),
  middleware = jsonServer.defaults();

var options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

server.use(middleware);
server.use(router);

https.createServer(options, server).listen(3443, function() {
  console.log("json-server started on port " + 3443);
});