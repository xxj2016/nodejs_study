var Koa = require('koa');

var router = require("koa-router")();



var app = new Koa();

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello koa';
});

router.get('/new', async (ctx, next) => {
    ctx.body = '新闻';
})

router.get('/newDetail', async (ctx, next) => {
    let url = ctx.url;


    // 从ctx的request里面读取get传值
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    // 从ctx中读取get传值
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;



    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
})

app.use(router.routes());
app.use(router.allowedMethods());

app.use( async (ctx) => {
    ctx.body = '第一次写koa11';
})

app.listen(3000, () => {
    console.log('运行在端口3000');
});