"use strict"

const http = require('http')
const util = require('util')

const nodeStatic = require('node-static');
const fileServer = new nodeStatic.Server('./App')
const PORT = 3000

http.createServer(function(req, res) {
	fileServer.serve(req, res);
}).listen(PORT);
