const { resolve } = require("path");
const Koa = require("koa");
const router = require("koa-router")();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");

const config = require("./config");
const traverse = require("./utils/traverse");

const next = require("next");
const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: "next"
});

const handle = app.getRequestHandler();

// session存储配置
const sessionMysqlConfig = {
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    host: config.database.host,
};

app.prepare().then(() => {
    const application = new Koa();
    global.Router = router; // 把 router 挂到全局对象上，阔以直接在 route 里用
    traverse(resolve(__dirname, './server/route'));   //require route
    // 配置session中间件
    application.use(session({
        key: "USER_SID",
        store: new MysqlStore(sessionMysqlConfig)
    }));

    application.use(logger());
    application.use(bodyParser());

    // 格式化api接口返回
    application.use(async (ctx, next) => {
        ctx.apiSuccess = (data = {}, code = 200) => {
            const res = {
                success: true,
                code,
                data
            };
            ctx.body = res;
        };
        ctx.apiError = (data = "接口异常", code = 500) => {
            const res = {
                success: false,
                code,
                data
            };
            ctx.body = res;
        };
        await next();
    });

    // 路由拦截处理，区分页面和 api
    application.use(async (ctx, next) => {
        const { path } = ctx;
        const reg = /^\/api\//;
    
        if (reg.test(path)) {
            await next();  // api 走 koa 的路由
        } else { // 下边走 next 的渲染
            await handle(ctx.req, ctx.res, path, ctx.query);
            ctx.respond = false;
        }
    });

    application.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next();
    })

    application.use(Router.routes(), Router.allowedMethods());
    // error
    application.on("error", (ctx, error) => {
        console.error("server error:", error, ctx);
    });
    application.listen(3000);
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});



