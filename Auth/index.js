const express = require('express');
const User = require('./models/user');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authDemo')
    .then(() => {
        console.log('MongoDB connection open');
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'shhitsasecret!' }))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    req.session.user_id = foundUser._id;
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        // res.send('Invalid password');
        res.redirect('/login');
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    res.render('secret')
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})