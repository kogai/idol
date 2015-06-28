const credential = require('credential.js')
const knex = require('knex')(credential.mysql);
const bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
	tableName: 'users'
});
