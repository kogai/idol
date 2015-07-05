"use strict"

const User = require('Backend/classes/User')()
const UserModel = require('Backend/models/User')
const log = require('Utils/common/log')

module.exports = {
	get: function(req, res, next){
		return next()
	},

	post: function(req, res, next){
		User.create(req.body, function(err, newUser){
			if(err){
				return log.info(err)
			}
			log.info(newUser)
			return next()
		})
	}
}
