/* 
npm install --save koa-session

// 定义
const session = require('koa-session');

// 配置
const CONFIG = {
    key: 'koa:sess',
    maxAge: 8640000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true
}

app.use(session(CONFIG, app));

// 设置session
app.session.username = 'Jet';

// 获取session
app.session.username

 */
var Koa = require("koa"),
    router = require("koa-router")(),
    path = require('path');

const render = require("koa-art-template");

const session = require('koa-session');

var app = new Koa();



// 配置
app.keys = ['some secret hurr']; // cookie的签名
const CONFIG = {
    key: 'koa:sess',
    maxAge: 8640000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true
}
app.use(session(CONFIG, app));

// 配置koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, "view"),
    extname: ".html",
    debug: process.env.NODE_ENV !== "production"
});

router.get("/", async ctx => {
    ctx.body = "首页";
    ctx.session.username = 'Jet';
    await ctx.render("index");
});

router.get("/news", async ctx => {
    ctx.body = "新闻页面";
    const username = ctx.session.username;
    console.log(username);

});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
