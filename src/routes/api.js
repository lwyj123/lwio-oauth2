const KoaRouter = require('koa-router')

const userControllers = require('../controllers/user.js')

const router = new KoaRouter({ prefix: '/api' })

router
  .get('/users/:username', userControllers.GetUserInfoByUsername)
  .post('/users', userControllers.Signup)
  // .all('/upload', controllers.upload.default)
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delect)

module.exports = router
