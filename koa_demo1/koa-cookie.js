/* 

cookie:
1.
cookie保存在浏览器客户端

2.
可以让我们用同一个浏览器访问同一个域名的时候共享数据


用途:
1、保存用户信息
2、浏览器历史记录
3、猜你喜欢的功能
4、十天免登陆
5、多个页面实现数据船体
6、实现购物车功能

*/

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

    ctx.cookies.set('userInfo', encodeURIComponent('总裁'), {
        maxAge: 1000 * 5 // 多少毫秒后过期
    });
    await ctx.render("index");
});

router.get("/news", async ctx => {
    // ctx.body = "新闻页面";

    const userInfo = decodeURIComponent(ctx.cookies.get('userInfo'));
    console.log(userInfo);

    let data = {
        
        lastName: 'Jet',
    }
    await ctx.render("news", {
        data
    });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
