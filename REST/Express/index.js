const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
uuidv4();

//parse data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    console.log(req.body);
    const { meat, qty } = req.body;
    res.send(`POST /tacos response: Here are your request: meat: ${meat} - qty: ${qty}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


let comments = [{
    id: uuidv4(),
    username: "Todd",
    comment: "lol that is so funny!"
},
{
    id: uuidv4(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog"
},
{
    id: uuidv4(),
    username: "onlysayswoof",
    comment: "woof woof woof"
},
{
    id: uuidv4(),
    username: "catperson",
    comment: "meow"
},
{
    id: uuidv4(),
    username: "justsaying",
    comment: "go outside more, Todd"
}]

//list all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

//create a new comment, go to the form page
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

//create a new comment
app.post('/comments', (req, res) => {
    console.log(req.body);
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    res.redirect('/comments');
})

//get a specific comment using its id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params; // it will be a string
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

//update a specific comment using its id
// can have a body
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

//routee to serve the form to edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

//delete a specific comment using its id
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})