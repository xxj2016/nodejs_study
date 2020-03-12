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
    path = require("path"),
    DB = require("./module/db"),
    static = require("koa-static"),
    bodyParser = require("koa-bodyparser"),
    render = require("koa-art-template");

var app = new Koa();
app.use(static("./static"));
app.use(bodyParser());

// 配置koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, "view"),
    extname: ".html",
    debug: process.env.NODE_ENV !== "production"
});


// 首页
router.get("/", async ctx => {
    console.time("首页");
    var datas = await DB.find("user", {});
    console.timeEnd("首页");
    // console.log(data);
    await ctx.render("index", {
        datas
    });
});

// 跳转到添加用户页面
router.get("/add", async ctx => {
    // ctx.body = "添加数据";
    // console.log(data);
    await ctx.render("add");
});

// 跳转到编辑用户页面
router.get("/edit", async ctx => {
    console.log();

    // 根据当前点击的id获取到对应数据，传进edit页面
    const id = ctx.query.id;
    var data = await DB.find('user', {'_id': DB.getObjectId(id)});
    // ctx.body = "添加数据";
    // console.log(data);
    await ctx.render("edit", {
        data: data[0]
    });
});

// 添加用户
router.post("/addUser", async ctx => {
    // ctx.body = "添加数据";
    var data = ctx.request.body;
    console.time("addUser");
    var data = await DB.insert("user", data);
    console.timeEnd("addUser");
    try {
        if (data.result.ok) {
            await ctx.redirect('/')
        }
    } catch (error) {
        console.log(error);
        await ctx.redirect('/add')
        return;

    }
});

// 更新用户
router.post("/editUser", async ctx => {
    // ctx.body = "添加数据";
    var data = ctx.request.body;
    const id = data.id;
    const username = data.username;
    const age = data.age;
    const sex = data.sex;
    console.log(id);
    console.time("editUser");
    var data = await DB.update("user", {"_id": DB.getObjectId(id)}, {username, age, sex});
    console.timeEnd("editUser");
    try {
        if (data.result.ok) {
            await ctx.redirect('/')
        }
    } catch (error) {
        console.log(error);
        await ctx.redirect('/edit')
        return;

    }
});

router.get("/delete", async ctx => {
    // ctx.body = "删除数据";
    var id = ctx.query.id;

    var data = await DB.delete('user', {'_id': DB.getObjectId(id)})

    console.time("start4");

    try {
        if (data.result.ok) {
            await ctx.redirect('/')
        }
    } catch (error) {
        console.log(error);
        await ctx.redirect('/')
        return;

    }
    console.timeEnd("start4");
    // console.log(data);
});

router.get("/news", async ctx => {
    ctx.body = "新闻页面";

    console.time("start1");
    var d = await DB.find("user", {});
    console.timeEnd("start1");
    console.log(d);

    let data = {
        list: [
            { title: "1212", content: "sdsaf hjkh 67" },
            { title: "5656", content: "fdg 2344 zx" },
            { title: "dsfs", content: "asd fg jhk" },
            { title: "87878", content: "xcv 678gfh fdg" }
        ],
        title: "我是大标题",
        number: 2000
    };
    await ctx.render("news", {
        data
    });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
