/**
@example
{
	message: 'ログイン認証が失敗しました。',
	status: 'ERROR'| 'SUCCESS',
	body: err | user
}
**/

module.exports = {
	account: {
		login: require('./account/login'),
		register: require('./account/register')
	}
}
