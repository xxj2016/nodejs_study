const MongoClient = require("mongodb").MongoClient;

const CONFIG = require("./config");

class DB {
    constructor() {
        // this.connect();
    }

    connect() {
        console.log("连接数据库");
        return new Promise((resolve, reject) => {
            MongoClient.connect(CONFIG.dbUrl, (err, client) => {
                if (err) {
                    reject(err);
                } else {
                    var db = client.db(CONFIG.dbName);
                    resolve(db);
                }
            });
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

var db = new DB();
console.time("START");
db.find("user", {}).then(data => {
    console.timeEnd("START");
    console.log(data);
});
