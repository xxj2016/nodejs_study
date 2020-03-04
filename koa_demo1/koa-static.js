/*
    Koa 使用koa-bodyparser获取表单提交的数据

    1. npm install --save koa-static

    2. 引入 static = require('koa-static');

    3. app.use(static('./static'));
      
    or app.usr(static(__dirname + '/static'))
    
*/


var Koa = require("koa"),
    router = require("koa-router")(),
    views = require("koa-views"),
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static');

var app = new Koa();

// 配置post bodyParser的中间件
app.use(bodyParser());

// 配置静态web服务中间件
app.use(static('./static'));

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