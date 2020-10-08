const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// init custom middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route, uses template engine
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`)); 