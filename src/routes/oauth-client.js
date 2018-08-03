const KoaRouter = require('koa-router')

const oauthClientControllers = require('../controllers/oauth-client.js')

const router = new KoaRouter({ prefix: '/api' })

// 本文件用于OAuth client的注册
router
  .get('/oauth/clients/:clientId', oauthClientControllers.GetClientById)
  .post('/oauth/clients', oauthClientControllers.CreateClient)
  .put('/oauth/clients/:clientId', oauthClientControllers.UpdateClient)
  .delete('/oauth/clients/:clientId', oauthClientControllers.DeleteClient)

module.exports = router
