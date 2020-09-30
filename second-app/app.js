const http = require('http');
const dt = require('./myfirstmodule');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("The current Date and time are : " +dt.myDateTime());
    res.end('Hello world');
}).listen(8080);