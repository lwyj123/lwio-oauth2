const KoaRouter = require('koa-router')

const oauthClientControllers = require('../controllers/oauth-client.js')

const router = new KoaRouter({ prefix: '/api' })

// 本文件用于OAuth client的注册
router
  .get('/oauth/clients/:clientId', userControllers.GetUserInfoByUsername)
  .post('/users', userControllers.Signup)

module.exports = router
