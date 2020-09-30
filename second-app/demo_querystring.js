const http = require('http');
const url = require('url');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let q = url.parse(req.url, true).query;
    let text = `${q.year} ${q.month}`;
    res.end(text);
}).listen(8080);