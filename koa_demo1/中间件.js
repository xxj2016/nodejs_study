var Koa = require("koa");

var router = require("koa-router")();

var app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
    if (ctx.status === 404) {
        ctx.status = 404;
        ctx.body = "这是一个404页面";
    } else {
        console.log(ctx.url);
    }
});

router.get("/", async (ctx, next) => {
    ctx.body = "Hello koa";
});

router.get("/new", async (ctx, next) => {
    ctx.body = "新闻";
});

router.get("/newDetail/:newId/:aId", async (ctx, next) => {
    let url = ctx.url;

    // 动态传值
    let newId = ctx.params.newId;
    let aId = ctx.params.aId;
    console.log(newId);
    console.log(aId);

    // 从ctx的request里面读取get传值
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    // 从ctx中读取get传值
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    ctx.body = {
        newId,
        aId,
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
});

app.use(router.routes());
app.use(router.allowedMethods());

// app.use( async (ctx) => {
//     ctx.body = 'Not Found';
// })

app.listen(3000, () => {
    console.log("运行在端口3000");
});
