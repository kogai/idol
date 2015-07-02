"use strict"

var http = require('http')
var util = require('util')

var nodeStatic = require('node-static');
var fileServer = new nodeStatic.Server('./Browser');

http.createServer(function(request, response) {
	fileServer.serve(request, response);
}).listen(3000);
