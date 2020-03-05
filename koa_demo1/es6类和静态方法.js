/* 定义Person类 */

class Person {
    constructor(name, age) { // 类的构造函数，实例化的时候执行，new的时候执行
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

var p = new Person('sdasd', 20);
p.setName('Jet');
p.getName();

