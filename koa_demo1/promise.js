// var p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         var name = "Jet";
//         if (Math.random() < 0.5) {
//             resolve(name);
//         } else {
//             reject("失败了");
//         }
//     }, 1000);
// });

// p.then(data => {
//     console.log(data);
// });


function getData(resolve, reject) {
    setTimeout(() => {
        var name = 'Xu';
        if (Math.random() < 0.7) {
            resolve(name);
        } else {
            reject('失败了');
        }
    }, 1000);
}

var p = new Promise(getData);

p.then(data => {
    console.log(data);
})