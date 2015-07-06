"use strict"

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const objectAssign = require('object-assign')

const User = require('Backend/classes/User')()
const log = require('Utils/common/log')

module.exports = {
	post: function(req, res, next){
		var opts = objectAssign({}, req.body, {
			secretOrKey: 'secret'
		})

		var jwt = new JwtStrategy(opts, function(jwt_payload, done){
			log.info(jwt_payload)
		})
		passport.use(jwt)
		passport.authenticate('jwt', { sessigon: false }, function(req, res){
			log.info(req)
		})
	}
}

/*

app.post('/profile', passport.authenticate('jwt', { session: false}),
    function(req, res) {
        res.send(req.user.profile);
    }
);

var JwtStrategy = require('passport-jwt').Strategy;
var opts = {}
opts.secretOrKey = 'secret';
opts.issuer = "accounts.examplesoft.com";
opts.audience: "yoursite.net";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
    	done(null, false);
      // or you could create a new account
    }
  });
}));
*/
