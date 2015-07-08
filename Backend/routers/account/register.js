"use strict"

const User = require('Backend/classes/User')()
const log = require('Utils/common/log')

module.exports = {
	post: function(req, res, next){
		User.create(req.body, function(err, newUser){
			if(err){
				return res.send({
					message: 'アカウント登録が失敗しました。',
					status: 'ERROR',
					body: err
				})
			}
			res.send({
				message: 'アカウント登録が成功しました。',
				status: 'SUCCESS',
				body: newUser
			})
			return next()
		})
	}
}
