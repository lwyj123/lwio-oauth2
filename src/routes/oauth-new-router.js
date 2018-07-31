const KoaRouter = require('koa-router')

const authControllers = require('../controllers/auth.js')

const router = new KoaRouter({ prefix: '' })

router
  .get('/login/oauth/authorize', authControllers.AuthorizePage)
  .post('/login/oauth/authorize', authControllers.Authorize)
  .get('/login', authControllers.LoginPage)
  .post('/login', authControllers.Login)
  .get('/signup', authControllers.SignupPage)
  .post('/signup', authControllers.Signup)
  // .all('/upload', controllers.upload.default)
  // .get('/api/:name', controllers.api.Get)
  // .post('/api/:name', controllers.api.Post)
  // .put('/api/:name', controllers.api.Put)
  // .del('/api/:name', controllers.api.Delect)

module.exports = router
