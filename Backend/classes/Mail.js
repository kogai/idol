"use strict"

class Mail {
  constructor(){
    this.validator = require('validator')
    this.nodemailer = require('nodemailer')
    this.transport = require('nodemailer-mandrill-transport')
    this.templates = require('email-templates')
    this.templatesDir = require('path').resolve(__dirname, '..',  "email-templates")
  }

  /**
  @param { String } type - テンプレートのタイプ
  @param { Object } args - メールテンプレートに渡す変数を格納したオブジェクト
  @example {
    book: [ 'mybook', 'yourbook' ],
    mail: 'yourmail@dot.com'
  }
  @param { Function } done - 非同期処理の完了後に呼ばれるコールバック関数
  **/
  create(type, args, done){
    let _self = this
    this.templates(this.templatesDir, function(err, template){
      if(err){
        return done(err);
      }
      template(type, args, function(err, html, text){
        if(err){
          return done(err);
        }
        _self.html = html
        _self.text = text
        done(null, html, text);
      });
    });
  }

  /**
  @param { String } mailOpts - 送信するメールの情報
  @example {
    from: 'mymail@dot.com',
    to: 'usermail@dot.com',
    subject: 'this mail is maybe important.',
    text: 'my mail is verified.',
    html: '<h1>my mail is verified.</h1>'
  }
  @param { Function } done - 非同期処理の完了後に呼ばれるコールバック関数
  **/
  send(mailOpts, done){
		// 必須項目のチェック
		if(!mailOpts.from || typeof mailOpts.from !== 'string'){ throw new Error('配信元のメールアドレスは必須項目') }
		if(!mailOpts.to || typeof mailOpts.to !== 'string'){ throw new Error('配信先のメールアドレスは必須項目') }
		if(!mailOpts.subject || typeof mailOpts.subject !== 'string'){ throw new Error('メールの題名は必須項目') }
		if(!mailOpts.text){ throw new Error('テキストメールは必須項目') }
		if(!mailOpts.html){ throw new Error('HTMLメールは必須項目') }

    let transportOpts = { auth: { apiKey: 'some-api-key' } }
    let transporter = this.nodemailer.createTransport(this.transport(transportOpts));
		
		transporter.sendMail(mailOpts, function(err, info){
			if(err){
				return done(err)
			}
			done(null, info)
		})
  }
}
