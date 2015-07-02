const log4js = require("log4js")
const log4js_extend = require("log4js-extend")
const moment = require('moment-timezone')

var configure = {
	debug: {
		type: 'console',
		category: 'debug'
	}
}

log4js.configure({
	appenders: [
		configure.debug
	]
})

log4js_extend(log4js, {
  path: __dirname,
  format: "[@file:@line:@column]"
})

var log = log4js.getLogger("debug")

module.exports = log
module.exports.detail = function(data){
	return log.info("debug")(util.inspect(data, null, null))
}
