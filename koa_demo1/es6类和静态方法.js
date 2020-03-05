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
class Person {
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
w.run();