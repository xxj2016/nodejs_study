const MongoClient = require("mongodb").MongoClient;

const CONFIG = require("./config");

class DB {
    static getInstance() {
        // 单例模式，解决多次实例化问题
        if (!DB.instance) {
            DB.instance = new DB();
        }

        return DB.instance;
    }

    constructor() {
        this.dbClient = ""; // 属性 放db对象
        // this.connect();
    }

    connect() {
        var _that = this;
        return new Promise((resolve, reject) => {
            if (!_that.dbClient) {
                console.log("连接数据库");
                // 解决数据库多次连接的问题
                MongoClient.connect(CONFIG.dbUrl, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        _that.dbClient = client.db(CONFIG.dbName);
                        resolve(_that.dbClient);
                    }
                });
            } else {
                resolve(_that.dbClient);
            }
        });
    }

    find(collectionName, json) {
        // 查询数据
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                var results = db.collection(collectionName).find(json);
                results.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        });
    }

    update() {}
}

// var db = new DB();
var db = DB.getInstance();

setTimeout(() => {
    console.time("START");
    db.find("user", {}).then(data => {
        console.timeEnd("START");
        // console.log(data);
    });
}, 500);

setTimeout(() => {
    console.time("START1");
    db.find("user", {}).then(data => {
        console.timeEnd("START1");
        // console.log(data);
    });
}, 3000);

// var db1 = new DB();
var db1 = DB.getInstance();

setTimeout(() => {
    console.time("START2");
    db1.find("user", {}).then(data => {
        console.timeEnd("START2");
        // console.log(data);
    });
}, 5000);

setTimeout(() => {
    console.time("START3");
    db1.find("user", {}).then(data => {
        console.timeEnd("START3");
        // console.log(data);
    });
}, 7000);
