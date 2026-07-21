const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({ secret: 'shhhsecret', resave: false, saveUninitialized: false }))

app.get('/viewcount', (req, res) => {
    req.session.count ? req.session.count += 1 : req.session.count = 1
    res.send(`HI, you visited ${req.session.count}x times`)
})

app.get('/register', (req, res) => {
    const { username = 'Anon' } = req.query
    req.session.username = username
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const { username } = req.session
    res.send(`welcome back ${username}`)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})