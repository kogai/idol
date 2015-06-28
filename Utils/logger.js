const log4js = require("log4js");
const log4js_extend = require("log4js-extend");

var configure = {
	debug: {
		type: 'console',
		category: 'debug'
	}
};

log4js.configure({
	appenders: [
		configure.debug
	]
});

log4js_extend(log4js, {
  path: __dirname,
  format: "[@file:@line:@column]"
});

module.exports = log4js.getLogger("debug");
