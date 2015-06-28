"use strict"

const restify = require('restify')

var server = restify.createServer({
  name: 'idol-api-server',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
