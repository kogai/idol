"use strict"

const User = require('Backend/classes/User')()
const log = require('Utils/common/log')

module.exports = {
	get: function(req, res, next){
		return next()
	}
}
