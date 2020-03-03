/*
    Koa 使用koa-bodyparser获取表单提交的数据

    1. npm install --save koa-bodyparser

    2. 引入 bodyParser = require('koa-bodyparser');

    3. app.use(bodyParser());
    
    4. var data = ctx.request.body;
    
*/


var Koa = require("koa"),
    router = require("koa-router")(),
    views = require("koa-views"),
    common = require('./module/common.js'),
    bodyParser = require('koa-bodyparser');

var app = new Koa();

// 配置post bodyParser的中间件
app.use(bodyParser());

app.use(views('views', {
    extension: 'ejs'
}))


router.get('/', async (ctx) => {
    await ctx.render('form');
})

// 接受post提交的数据
router.post('/doAdd', async (ctx) => {
    // 原生nodejs在koa中获取表单提交的数据
    // var data = await common.getPostData(ctx);

    // koa-bodyParser获取表单提交的数据
    var data = ctx.request.body;
    console.log(data);
    ctx.body = data;
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);