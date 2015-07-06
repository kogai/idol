"use strict"

const restify = require('restify')
const routers = require('Backend/routers')
const MoronModel = require('moron').MoronModel;
const credential = require('credential.js')

const server = restify.createServer({
	name: 'idol-api-server',
	version: '0.0.1'
});

const knex = require('knex')(credential.knex);

MoronModel.knex(knex)

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/account/login', routers.account.login.post)
server.post('/account/register', routers.account.register.post)

server.get('/echo/:name/:test', function(req, res, next) {
	res.send(req.params);
	return next();
});

server.listen(4000, function() {
	console.log('%s listening at %s', server.name, server.url);
});
