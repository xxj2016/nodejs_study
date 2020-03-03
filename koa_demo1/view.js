/* 
    1.npm install koa-views --save

    2.npm install ejs --save

    3. var views = require('koa-views');

    4. app.use(views(__dirname, { extension: 'ejs'}));

    5. await ctx.render('index');


    注意：我们需要在每一个路由的render里面都要渲染一个公共的数据

    公共的数据放在这个里面，这样的话在任何的模板都可以使用

    ctx.state = { // 放在中间件
        session: this.session,
        title: 'Jet'
    }
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


// 写一个中间件配置公共的数据
app.use(async (ctx, next) => {
    ctx.state = {
        username: 'JetXu',
        password: '111111'
    }

    await next(); // 继续向下匹配路由
})

router.get('/', async (ctx) => {

    let title = '你好，ejs';
    await ctx.render('index', {
        title
    });
})
router.get('/new', async (ctx) => {

    let news = [
        {title: 'DFsdfh dfsdf sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
        {title: 'DFs sdsd dfh dfsdf sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
        {title: 'DFsdfh sdsd sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
        {title: 'DFsdfh as sdfdsf', content: 'sdad asda sd asd asd asd asd asda sdas d asd '},
    ]

    let content = '<h2>绑定html数据<h2>';
    await ctx.render('news', {
        news,
        content
    });
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());
app.listen(3000);