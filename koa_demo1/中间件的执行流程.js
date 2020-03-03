var Koa = require("koa");

var router = require("koa-router")();

var app = new Koa();

app.use(async (ctx, next) => {
    console.log("1.中间件");
    await next();
    console.log("5.匹配路由完成以后又会返回来执行中间件");
});

app.use(async (ctx, next) => {
    console.log("2.中间件");
    await next();
    console.log("4.匹配路由完成以后又会返回来执行中间件");
});

router.get("/", async (ctx, next) => {
    ctx.body = "Hello koa";
});

router.get("/new", async (ctx, next) => {
    console.log('3.匹配到new这个路由');
    ctx.body = "新闻";
});


app.use(router.routes());
app.use(router.allowedMethods());

// app.use( async (ctx) => {
//     ctx.body = 'Not Found';
// })

app.listen(3000, () => {
    console.log("运行在端口3000");
});
