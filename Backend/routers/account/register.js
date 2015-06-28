module.exports = {
	get: function(req, res, next){
		console.log(req.params);
		res.send('ok')
		return next()
	},
	post: function(req, res, next){
		console.log(req.body);
		res.send('ok')
		return next()
	}
}
