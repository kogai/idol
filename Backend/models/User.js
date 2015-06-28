const credential = require('credential.js')
const knex = require('knex')(credential.mysql);
const bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,

	/*
	initialize: function() {
		bookshelf.Model.prototype.initialize.apply(this, arguments);
		this.on('saving', this.hashPassword, this);
	},

	hashPassword: function(){
	 var _this = this;

		return bcrypt.genSaltAsync(10)
			.then(function(salt) {
				_this.set('salt', salt);
				return bcrypt.hashAsync(_this.get('password'), salt);
			})
			.then(function(hash) {
				return _this.set('password', hash);
			});
	}
	*/
});
