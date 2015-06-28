module.exports = {
	get: function(req, res, next){
		res.send('ok')
		return next()
	},

	post: function(req, res, next){
		let mail = req.body.mail
		let password = req.body.password

		res.send(req.body)

		return next()
	}
}
