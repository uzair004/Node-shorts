const express = require('express');

const app = express();

// setting ejs as template engine
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/profile/:name', function(req, res) {

    let data = {age: '21', job: 'developer', hobbies: ['reading', 'football', 'fishing']}

    // using template engine
    // file will be taken from views folder by default

    res.render('profile2', {person: req.params.name, data: data});
});


app.listen(8080);