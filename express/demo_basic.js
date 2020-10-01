const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send('this is homepage');
});

app.get('/contact', function(req, res) {
    res.send('this is contact page');
});

app.get('/profile/:id', function(req, res) {
    res.send('You are looking at profile with id of '+req.params.id);
})

app.listen(8080);