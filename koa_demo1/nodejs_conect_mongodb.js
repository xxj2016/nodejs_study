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