// async function getData() {
//     return 'jjjj';
// }


// async function test() {
//     var d = await getData();
//     console.log(d);
// }

// test();


function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var name = 'Jet';
            if (Math.random() < 0.5) {
                resolve(name);
            } else {
                reject("失败了");
            }
        }, 1000);
    })
}


async function test () {
    var d = await getData();
    console.log(d);
}

test();