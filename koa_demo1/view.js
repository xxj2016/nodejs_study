/* 
    1.npm install koa-views --save

    2.npm install ejs --save

    3. var views = require('koa-views');

    4. app.use(views(__dirname, { extension: 'ejs'}));

    5. await ctx.render('index');
 */
var Koa = require("koa"),
    router = require("koa-router")(),
    views = require("koa-views");

var app = new Koa();

// 配置模板引擎中间件--第三方中间件
// app.use(views('views', { map: { html: 'ejs' }}));这样配置也可以,但模板后缀名需要.html
app.use(
    views("views", {
        extension: "ejs" // 应用ejs模板引擎
    })
);


router.get('/', async (ctx) => {

    let title = '你好，ejs';
    let news = [
        {title: 'DFsdfh dfsdf sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
        {title: 'DFs sdsd dfh dfsdf sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
        {title: 'DFsdfh sdsd sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
        {title: 'DFsdfh as sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
    ]
    await ctx.render('index', {
        title,
        news
    });
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());
app.listen(3000);