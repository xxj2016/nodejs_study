/* 
1. npm install --save mongodb

2. 引入mongodb下面的MongoClient
    var MongoClient = require('mongodb').MongoClient;

3.定义数据库连接的地址 以及配置数据库
    koa数据库的名称

    var url = "mongodb://localhost:27017/"

    var dbName = 'koa';

4. nodejs 连接数据库

    MongoClient.conect(url, function(err, client)){
        const db = client.db(dbName);  数据库db对象
    }

5.操作数据库
    db.user.insert
    MongoClient.connect(url, function(err, db){
        db.collection('user).insertOne({"name":"张三"}, function(err, result) {
            db.close() // 关闭连接
        })
    })
*/

const MongoClient = require('mongodb').MongoClient;

const dbUrl = "mongodb://localhost:27017";

const dbName = 'koa';

// 连接数据库
console.time('start');
MongoClient.connect(dbUrl, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    var db = client.db(dbName);

    // 增加数据
    db.collection('user').insertOne({'username':'Xu','age': 32,'sex': '男','status': "1"}, function(err, result) {
        if (!err) {
            console.log('增加数据成功');

            client.close();

            console.timeEnd('start');
        }
    })
})