"use strict"

const UserModel = require('Backend/models/User')
const log = require('Utils/common/log')

module.exports = {
	get: function(req, res, next){

		/*
		*/
		return next()
	},

	post: function(req, res, next){
		UserModel
		.query()
		.insert(req.body)
		.then(function(user){
			res.send(user)
		})
		.catch(function(err){
			return log.info(err)
		})
		.done(function(){
			return next()
		})
	}
}
