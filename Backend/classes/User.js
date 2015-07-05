"use strict"

const util = require('util')
const uuid = require('uuid')
const bcrypt = require('bcrypt');
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

  get(userid){
    // this.connection.connect()
    //
    // let query = "SELECT userid, name, mail, password FROM idol.user"
    //
    // this.connection.query(query, function(err, rows, fields){
    //   if(err){
    //     return console.log(err)
    //   }
    //   console.log(util.inspect(rows, null, null));
    //   // console.log(util.inspect(fields, null, null));
    // })
    // this.connection.end()
  }
}

module.exports = function(){
  return new User()
}

/*
"use strict";

var mongoose = require('mongoose');
var mongodb = require('common/makeCredential')('mongodb');
var db = mongoose.createConnection(mongodb);

var Q = require('q');
var SALT_WORK_FACTOR = require('common/constant').SALT_WORK_FACTOR;

UserSchema.methods.comparePassword = function(candidatePassword, hashedPassword, done) {
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) {
      return done(err);
    }
    done(null, isMatch);
  });
};



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
