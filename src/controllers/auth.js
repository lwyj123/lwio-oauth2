
// const path = require('path')
const BaseController = require('./prototype/BaseController')
const ClientModel = require('../models/client')
const consolidate = require('consolidate')
const path = require('path')
const jwt = require('jsonwebtoken')
// const pagination = require('../helpers/page')

const templateConfig = {
  basePath: path.resolve(`${__dirname}/../views`),
  ext: 'html',
  engine: 'lodash'
}

const renderer = consolidate[templateConfig.engine]
if (!renderer) {
  throw new Error(`template engine ${templateConfig.engine} is unsupported`)
}

class AuthController extends BaseController {
  async LoginPage(ctx) {
    // for oauth
    const { client_id, return_to } = ctx.query

    const viewPath = path.resolve(`${templateConfig.basePath}`, 'login.html')
    const viewModel = {
      client: {},
      loginSubmitUrl: '/login',
      return_to
    }

    ctx.body = await renderer(viewPath, viewModel)
  }
  async Login(ctx) {
    let { username, password, return_to } = ctx.request.body

    if (!return_to || !username || !password) {
      throw new Error('return_to、username、password都需要传')
    }

    return_to = decodeURIComponent(return_to)

    const user = await UserModel.getUserInfoByUsername(username)

    if (!user || await user.comparePassword(password)) {
      throw new Error('用户不存在或密码错误')
    }

    // login successfully

    ctx.session.loginUser = { username }

    ctx.redirect(return_to)
  }
  async AuthorizePage(ctx) {
    const { client_id, scope, redirect_uri, response_type, state } = ctx.query
    const loginUser = ctx.session.loginUser

    const scopes = scope.split(' ')

    if (!client_id || !scope) {
      throw Error('没有的clientId或scope')
    }

    // TODO: client注册信息后面从数据库里面取。开放平台
    // TODO: 根据client_id去拿client的数据，比如client的图片啥的
    const clientDoc = await ClientModel.getDocById(client_id)
    const viewPath = path.resolve(`${templateConfig.basePath}`, 'user-confirm.html')

    // TODO: 从文件里面读cert，而不是一个写死的lwio，还有过期时间对应上
    const accessToken = jwt.sign({
      user: {
        username: loginUser.username
      },
      permissions: scopes
    }, 'lwio', { algorithm: 'HS256' }, {
      expiresIn: '24h'
    })
    const viewModel = {
      client: clientDoc.toObject(),
      loginUser,
      scopes, // TODO: 描述
      state,
      accessToken // TODO: 神tm这里就传token，要确认后再生成（发个请求然后302？）
    }

    ctx.body = await renderer(viewPath, viewModel)
  }

  async Authorize(ctx) {
    console.log('未完成')
  }

  async SignupPage(ctx) {
    // for oauth
    const { return_to } = ctx.query

    const viewPath = path.resolve(`${templateConfig.basePath}`, 'signup.html')
    const viewModel = {
      client: {},
      signupSubmitUrl: '/signup',
      return_to
    }

    ctx.body = await renderer(viewPath, viewModel)
  }
  async Signup(ctx) {
    const { email, username, password, nickname, return_to } = ctx.request.body

    if (!return_to || !username || !password || !email || !nickname) {
      throw new Error('return_to、username、password、email、nickname都需要传')
    }

    return_to_decoded = decodeURIComponent(return_to)

    const user = await UserModel.getUserInfoByUsername(username)

    if (user) {
      throw new Error('用户名已存在')
    }

    // signup successfully
    ctx.session.loginUser = { username }

    ctx.redirect(return_to_decoded)
  }
}

module.exports = new AuthController()
