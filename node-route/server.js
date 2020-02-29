var http = require('http');
var app = require('./app');

var hostname = 'localhost';
var port = 8000;


var server = http.createServer(app.handleRequest);


server.listen(port, hostname, function () {
    console.log('Server running11 at http://'+hostname + ':' + port + '/');
});