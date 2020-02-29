const http = require('http');
const module1 = require('./module1');
const module2 = require('./module2');

const hostname = '127.0.0.1';
const port = 3000;

function OnRequest(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World\n');
  res.write(module1.RequestStr + '\n');
  res.write(module2.module2Str);
  module1.OnRequestFun();
  module2.ResuestFun();
  res.end();
}

const server = http.createServer(OnRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});