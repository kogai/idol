"use strict"

const User = require('Backend/classes/User')()
const log = require('Utils/common/log')

module.exports = {
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
