const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// import mongoose schema model
const User = require('./models/user');

const app = express();
const port = process.env.PUBLIC_PORT || 9000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// ------------ ROUTES ----------------
// ---- serving files -----
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/static/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname+'/static/login.html')
});

app.get('/change-password', (req, res) => {
    res.sendFile(__dirname+'/static/change-password.html');
});
// --X---- serving files ----X--

// Register User
app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword } = req.body;

    if(!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'inavlid username'});
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'invalid password'});
    }

    if(plainTextPassword.length < 5) {
        return res.json({status: 'error', error: 'password too small, must be atleast 6 characters'});
    }

    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    try {

        const createdUser = new User({
            username,
            password: hashedPassword
        });
        const response = createdUser.save();
        // console.log(`user added successfully ${response}`);
        return res.json({status: 'ok'})

    } catch(err) {
        
        if(err.code === 11000) {
            return res.json({status: 'error', error: 'Username already exists'});
        }
        throw err;
    }

});


// Login User
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username: username});

    // checking if user exist
    if(!user) {
        return res.json({ status: 'error', error: 'inavlid username/password' });
    }
    // checking password (matching)
    if(await bcrypt.compare(password, user.password)) {
        
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET);

        return res.json({ status: 'ok', data: token });
    }

    return res.json({ status: 'error', error: 'inalvid username/password' });
});

// Change password
app.post('/api/change-password', async (req, res) => {
    const { newpassword: plainTextPassword } = req.body;

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'invalid password'});
    }

    if(plainTextPassword.length < 5) {
        return res.json({status: 'error', error: 'password too small, must be atleast 6 characters'});
    }

    try {
        if(!req.headers.authorization.includes("Bearer")) {
            return res.json({status: 'error', error: 'wrong authentication schema, "Bearer" in auth header expected'});
        }
        // get auth headers and remove first part, word "Bearer", get rest of token (2nd part)
        const tokenWithQuotes = req.headers.authorization.split(" ")[1]; 
        // get rid of quotes around token
        const token = tokenWithQuotes.replace(/^"|"$/g, '');
        // verify token against secret
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const newHashedPassword = await bcrypt.hash(plainTextPassword, 10);

        const foundUser = await User.findById({_id: decodedToken.id});
        foundUser.password = newHashedPassword;
        await foundUser.save();
        return res.json({status: 'ok'});
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', error: error.message})
    }
})

// ---X---------- ROUTES -----------X---


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.log(`OOPS can't connect to database ${err.reason}`));

// Server created
app.listen(port, () => console.log(`Server listening at port ${port}`))
