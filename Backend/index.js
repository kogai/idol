"use strict"

const restify = require('restify')
const routers = require('Backend/routers')

var server = restify.createServer({
  name: 'idol-api-server',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/account/register', routers.account.register.get)
server.post('/account/register', routers.account.register.post)

server.get('/echo/:name/:test', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(4000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
