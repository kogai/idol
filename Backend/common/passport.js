"use strict"

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('Backend/classes/User')()
const log = require('Utils/common/log')
const secret = require('credential.js').secret

var opts = {
	secretOrKey: secret,
	passReqToCallback: true
};

var jwt = new JwtStrategy(opts, function(req, payload, done){
	User.findOne(payload, function(err, user){
		if(err){
			return done(err)
		}
		User.comparePassword(payload.passport, user.passport, function(err, isMatch){
			if(err){
				return done(err)
			}
			if(isMatch){
				done(null, user, req)
			}else{
				done('パスワードが間違っています。')
			}
		})
	})
})

passport.use(jwt)

module.exports = passport
