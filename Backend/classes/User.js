"use strict"

const util = require('util')
const uuid = require('uuid')
const mysql = require('mysql')
const credential = require('credential.js')

class User{
  constructor(){
    this.connection = mysql.createConnection(credential.mysql)
  }

  create(name, mail, password){
    this.connection.connect()

    let queries = "INSERT INTO idol.user (userid, name, mail, password) VALUES ('" + uuid.v1() + "', '" + name + "', '" + mail + "', '" + password + "')"
    console.log(queries)

    this.connection.query(queries, function(err, rows){
      if(err){
        return console.log(err)
      }
      console.log(util.inspect(rows, null, null));
    })

    this.connection.end()
  }

  get(userid){
    this.connection.connect()

    let query = "SELECT userid, name, mail, password FROM idol.user"

    this.connection.query(query, function(err, rows, fields){
      if(err){
        return console.log(err)
      }
      console.log(util.inspect(rows, null, null));
      // console.log(util.inspect(fields, null, null));
    })
    this.connection.end()
  }
}

module.exports = function(){
  return new User()
}
