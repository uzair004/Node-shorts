const express = require('express');

const app = express();

// setting ejs as template engine
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/contact.html');
});

app.get('/profile/:name', function(req, res) {

    let data = {age: '21', job: 'developer'}

    // using template engine
    // file will be taken from views folder by default

    res.render('profile', {person: req.params.name, data: data});
});



app.listen(8080);