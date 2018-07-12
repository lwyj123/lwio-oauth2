
// const path = require('path')
const BaseController = require('./prototype/BaseController')
const UserModel = require('../models/user')
// const pagination = require('../helpers/page')

class UserApi extends BaseController {
  async GetUserInfoByUsername (ctx) {
    const user = await UserModel.getUserInfoByUsername(ctx.params.username)
    if(user) {
      ctx.body = {
        ...user.toObject()
      }
    } else {
      ctx.status = 404
      ctx.body = {
        message: 'user not found'
      }
    }
  }
  async Signup (ctx) {
    const { ...params } = ctx.request.body
    const newUser = await UserModel.createUser({
      ...params
    })
    ctx.body = {
      ...newUser.toObject()
    }
  }
}

module.exports = new UserApi()