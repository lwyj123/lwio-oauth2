
// const path = require('path')
const BaseController = require('./prototype/BaseController')
const ClientModel = require('../models/client')
const consolidate = require('consolidate');
const path = require('path');
const jwt = require('jsonwebtoken');
// const pagination = require('../helpers/page')

const templateConfig = {
	'basePath': path.resolve(`${__dirname}/../views`),
	'ext': 'html',
	'engine': 'lodash'
};

const renderer = consolidate[templateConfig.engine];
if(!renderer) {
  throw new Error(`template engine ${templateConfig.engine} is unsupported`);
}

class AuthController extends BaseController {
  async Login (ctx) {
		let { username, password, return_to } = ctx.request.body

    if(!return_to || !username || !password){
      throw new Error('return_to、username、password都需要传')
    }

    return_to = decodeURIComponent(return_to)

    const user = await UserModel.getUserInfoByUsername(username)

    if(!user || await user.comparePassword(password)) {
      throw new Error('用户不存在或密码错误')
    }

    //login successfully

    ctx.session.loginUser = { 'username': username };

    ctx.redirect(return_to);
  }
}

module.exports = new AuthController()