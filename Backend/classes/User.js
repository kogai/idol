"use strict"

const util = require('util')
const uuid = require('uuid')
const bcrypt = require('bcrypt');
const Q = require('q')

const log = require('Utils/common/log')
const UserModel = require('Backend/models/User')
const SALT_WORK_FACTOR = 10

class User{
  constructor(){
    this.Model = require('Backend/models/User')
  }

  create(userData, done){
    var _self = this

    this.Model
    .query()
    .where('mail', userData.mail)
    .then(function(users){
      if(users){
        return done('登録済みのメールアドレスです。')
      }
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
    })
    .fail(function(err){
      done(err)
    })
  }

  findOne(user, done){
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
