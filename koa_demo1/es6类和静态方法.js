/* 定义Person类 */

/* class Person {
    constructor(name, age) {
        // 类的构造函数，实例化的时候执行，new的时候执行
        this._name = name;
        this._age = age;
    }

    // 定义方法 注意：在es6里面方法之间没有逗号
    getName() {
        console.log(this._name);
    }

    setName(name) {
        this._name = name;
    }
}

var p = new Person("sdasd", 20);
p.setName("Jet");
p.getName(); */



// es6继承
/* class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getInfo() {
        console.log(`姓名：${this.name} --- 年龄：${this.age}`);
    }

    run() {
        console.log("run");
    }
}

class Web extends Person {
    constructor(name, age, sex) {
        super(name, age);
        this.sex = sex;
    }

    print() {
        console.log(`${this.name} --- ${this.age} --- ${this.sex}`);
    }
}

var w = new Web("Jet", 30, "男");
w.print();
w.getInfo();
w.run(); */


// es6静态方法
/* class Person {
    constructor(name) {
        this._name = name;
    }

    run() {
        console.log(this._name);
    }

    static work() {
        console.log('这事es6里面的静态方法');
    }
}

Person.instance = '这事一个实例';

var p = new Person('Jet');

p.run();
Person.work(); // es6里面的静态方法

console.log(Person.instance); */

// es6单例模式

class Db {

    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {
        console.log('实例化会触发构造函数');

        this.connect();
    }

    connect() {
        console.log('连接数据库');
    }

    find() {
        console.log('查询数据库');
    }
}

var db1 = Db.getInstance();
var db2 = Db.getInstance();
var db3 = Db.getInstance();

db3.find();