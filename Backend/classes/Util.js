"use strict"

const Q = require('q')

class Util {

	/**
	引数にコールバック関数を持つメソッドをPromiseオブジェクトを返す関数でラップするメソッド
	コールバックパターンの関数をPromise化する
	@param { Function } method - callback関数を引数に持つメソッド
	@example
	var _method = Util.defer(Foo.method.bind(Foo));
	_method().done(function(items){ console.log(items, "done."); });
	**/
	defer(method){
		return function(){
			var d = Q.defer();

			// Promise経由で受け取れる引数は1つ
			var args = Array.prototype.slice.call(arguments);
					args = _.compact(args);

			// methodに渡すdoneコールバック関数
			// Promiseをresolve/rejectする
			var _done = function(err, res){
				if(err){
					return d.reject(err);
				}
				d.resolve(res);
			}

			args.push(_done);
			method.apply(this, args);

			return d.promise;
		};
	}
}

module.exports = function(){
	return new Util()
}
