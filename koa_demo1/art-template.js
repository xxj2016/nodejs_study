/* 
http://aui.github.io/art-template/koa/
1.
npm install --save art-template
npm install --save koa-art-template

2.
const render = require('koa-art-template');

3.
render(app, {
  root: path.join(__dirname, 'view'), // 视图位置
  extname: '.art', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

4.
app.use(async function (ctx) {
  await ctx.render('user');
});

 */
var Koa = require("koa"),
    router = require("koa-router")(),
    path = require('path');

const render = require("koa-art-template");
var app = new Koa();

// 配置koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, "view"),
    extname: ".html",
    debug: process.env.NODE_ENV !== "production"
});

router.get("/", async ctx => {
    ctx.body = "首页";
});

router.get("/news", async ctx => {
    ctx.body = "新闻页面";

    let data = {
        list: [
            {title: '1212', content: 'sdsaf hjkh 67'},
            {title: '5656', content: 'fdg 2344 zx'},
            {title: 'dsfs', content: 'asd fg jhk'},
            {title: '87878', content: 'xcv 678gfh fdg'},
        ],
        title: '我是大标题',
        number: 2000
    }
    await ctx.render("news", {
        data
    });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
