// const path = require('path')
const BaseController = require('./prototype/BaseController')
const ClientModel = require('../models/client')
const path = require('path')
// const pagination = require('../helpers/page')

class OAuthClientController extends BaseController {
  async GetClientById(ctx) {
    const { clientId } = ctx.params
  }
  async CreateClient(ctx) {
    const {
      name,
      display_name,
      client_secret,
      redirect_uri,
      access_token_lifetime_second = 3600,
      refresh_token_lifetime_second = 3600 * 24 * 30
    } = ctx.request.body
    await ClientModel.createClient({
      name,
      display_name,
      client_secret,
      redirect_uri,
      access_token_lifetime_second,
      refresh_token_lifetime_second
    })
  }
  async UpdateClient(ctx) {
    console.log('未完成')
  }
  async DeleteClient(ctx) {
    console.log('未完成')
  }
}

module.exports = new AuthController()
