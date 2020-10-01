const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/contact.html');
});

app.listen(8080);