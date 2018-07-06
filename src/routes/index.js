const compose = require('koa-compose')
const apiRoutes = require('./api')

const router = compose([
  apiRoutes.routes(),
  apiRoutes.allowedMethods(),
])

module.exports = router
