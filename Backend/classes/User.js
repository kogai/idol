"use strict"

const util = require('util')
const uuid = require('uuid')
const bcrypt = require('bcrypt');

const log = require('Utils/common/log')
const UserModel = require('Backend/models/User')
const SALT_WORK_FACTOR = 10

class User{
  constructor(){
    this.Model = require('Backend/models/User')
  }

  create(userData, done){
    var _self = this
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      if(err){
        return done(err)
      }
      bcrypt.hash(userData.password, salt, function(err, hash){
        if(err){
          return done(err)
        }

    		_self.Model
    		.query()
    		.insert({
          userid: uuid.v1(),
          isVerified: false,
          name: userData.name,
          mail: userData.mail,
          password: hash
        })
    		.then(function(user){
          done(null, user)
    		})
    		.catch(function(err){
    			return done(err)
    		})
      })
    })
  }

  find(user, done){
		this.Model
		.query()
    .where('mail', user.mail)
    .first()
		.then(function(fetchedUser){
      done(null, fetchedUser)
		})
		.catch(function(err){
			return done(err)
		})
  }

  comparePassword(candidatePassword, hashedPassword, done){
    bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      done(null, isMatch);
    });
  }
}

module.exports = function(){
  return new User()
}

/*
UserSchema.pre('save', function(next) {
	var _user = this;

	// only hash the password if it has been modified (or is new)
	if (!_user.isModified('password')){
    return next();
  }

	var generateSalt = function() {
		var d = Q.defer();
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if(err){
        return next(err);
      }

			d.resolve(salt);
		});
		return d.promise;
	};

	var hashPassword = function(salt) {
		var d = Q.defer();
		bcrypt.hash(_user.password, salt, function(err, hash) {
			if (err){
        return next(err);
      }

			_user.password = hash;
			d.resolve(hash);
		});
		return d.promise;
	};

	generateSalt()
	.then(hashPassword)
	.done(function(hash) {
		next();
	});
});

module.exports = db.model('user', UserSchema);
*/
