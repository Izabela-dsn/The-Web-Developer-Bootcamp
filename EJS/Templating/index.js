const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.set('view engine', 'ejs');


// work from different directory
// node Templating/index.js
// getting the path where the past views are located and joining it with the views folder
// now we can render the ejs files from the views directory
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('home'); // renders home.ejs
});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 42) + 1;
    res.render('random', { rand: num }); // renders random.ejs and passes the num variable
    // res.render('random', { num }); can be used this way as well
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit });
});

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
    res.render('cats', { cats });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});