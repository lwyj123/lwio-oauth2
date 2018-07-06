const KoaRouter = require('koa-router')

const apiControllers = require('../controllers/api.js')

const router = new KoaRouter({ prefix: '/api' })

router
  .get('/user/detail', apiControllers.GetUserInfo)
  // .all('/upload', controllers.upload.default)
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delect)

module.exports = router
