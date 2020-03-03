exports.getPostData = function (ctx) {
    return new Promise(function(resolve, reject) {
        try {
            console.log(ctx);
            let  str = '';
            ctx.req.on('data', function(chunk) {
                console.log(chunk);
                console.log(str);
                str += chunk;
            })

            ctx.req.on('end', function(chunk) {
                console.log(str);
                resolve(str);
            })
        } catch(err) {
            reject(err);
        }
    })
}