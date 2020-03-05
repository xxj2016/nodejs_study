/* //  es5中的类和静态方法

function Person(name, age) {
    // 构造函数里面的方法和属性
    this.name = name;
    this.age = age;
    this.run = function() {
        console.log(`${this.name}---${this.age}`);
    };
}

// 原型链上面的属性和方法可以被多个实例共享
Person.prototype.sex = "男";
Person.prototype.work = function() {
    console.log(`${this.name}---${this.age}---${this.sex}`);
};

// 静态方法
Person.setName = function() {
    console.log("静态方法");
};

var p = new Person("JetXu", 20); // 实例方法是通过实例化来调用,静态是通过类名进行调用
p.run();
p.work();

Person.setName(); // 执行静态方法
 */



// es5继承
/* 
原型链继承和对象冒充继承

对象冒充继承：无法继承原型链上面的属性和方法

原型链继承：可以继承构造函数里面以及原型链上面的属性和方法
*/

function Person(name, age) {
    this.name = name;
    this.age = age;

    this.run = function() {
        console.log(this.name + "---" + this.age);
    };
}

Person.prototype.work = function() {
    console.log('work');
};

function Web(name, age) {
    Person.call(this, name, age); // 对象冒充实现继承
}

Web.prototype = new Person(); // 原型链继承

var w = new Web("李思", 22);
w.run();

w.work(); // 报错：因为 对象冒充继承 无法继承原型链上面的属性和方法