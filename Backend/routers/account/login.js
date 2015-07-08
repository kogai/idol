"use strict"

const objectAssign = require('object-assign')

const passport = require('Backend/common/passport')
const User = require('Backend/classes/User')()
const log = require('Utils/common/log')

module.exports = {
	post: function(req, res, next){
		var authenticationCallback = passport.authenticate('jwt', { session: false }, function(err, user, ret){
			if(err){
				return res.send({
					message: 'ログイン認証が失敗しました。',
					status: 'ERROR',
					body: err
				})
			}
			res.send({
				message: 'ログイン認証が成功しました。',
				status: 'SUCCESS',
				body: user
			})
		})
		return authenticationCallback(req, res)
	}
}
