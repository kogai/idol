"use strict"

const UserModel = require('Backend/models/User')

module.exports = {
	get: function(req, res, next){
		res.send('ok')
		return next()
	},

	post: function(req, res, next){
		let name = req.body.name
		let mail = req.body.mail
		let password = req.body.password

		res.send(req.body)

		return next()
	}
}
