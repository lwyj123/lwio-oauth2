const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const oauthRouter = require('./routes/oauth-router');
const routes = require('./routes/index')

const app = new koa();
const cors = require('koa2-cors');
const ErrorRoutesCatch = require('./middleware/ErrorRoutesCatch')

const db = require('./db/mongodb')

app.keys = [ 'some-keys-to-sign-cookies-by-koa-session' ];

app.use(bodyParser());
app.use(session(app));
app.use(cors());
app.use(async (ctx, next) => {
    //needed by authenticateHandler, see oauth-router
    ctx.request.session = ctx.session;
    await next();
});

app.use(ErrorRoutesCatch())
app.use(oauthRouter(app, { 'prefix': '/oauth' }).routes());
app.use(routes);

app.listen(29305, function(){
    console.log(`oauth server listening on port ${29305}`);
});