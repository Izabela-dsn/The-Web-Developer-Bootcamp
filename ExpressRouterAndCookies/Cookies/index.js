const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

//this is my secret have to be on the .env file
app.use(cookieParser('thisismysecret'))

app.get('/greet', (req, res) => {
    const { name = '', animal = '' } = req.cookies
    res.send(`hey there ${name}`)
})

//sending a cookie
app.get('/setName', (req, res) => {
    res.cookie('name', 'izabela azul')
    res.cookie('animal', 'harlequin shrimp')
    res.send('here a cookie honey')
})

app.get('/getSignedCookie', (req, res) => {
    res.cookie('fruit', 'strawberry', { signed: true })
    res.send('here a cookie honey')
})


app.get('/verifyfruit', (req, res) => {
    //the signed cookies are here
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log('Serving cunt and app on localhost:3000')
})