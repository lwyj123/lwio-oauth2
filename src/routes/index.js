const compose = require('koa-compose')
const apiRoutes = require('./api')
const oauthRoutes = require('./oauth-new-router')

const router = compose([
  apiRoutes.routes(),
  apiRoutes.allowedMethods(),
  oauthRoutes.routes(),
  oauthRoutes.allowedMethods(),
])

module.exports = router
