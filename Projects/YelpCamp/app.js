const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    } catch (err) {
        console.log(err);
        res.send('Error fetching campgrounds');
    }
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    try {
        await campground.save();
        res.redirect('/campgrounds');
    } catch (err) {
        console.log(err);
        res.send('Error creating campground');
    }
});

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id);
        res.render('campgrounds/show', { campground });
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground');
    }
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id);
        res.render('campgrounds/edit', { campground });
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground');
    }
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
        res.redirect(`/campgrounds/${campground._id}`);
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground')
    }
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findByIdAndDelete(id);
        res.redirect(`/campgrounds`);
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground')
    }
});


app.listen(3000, () => {
    console.log('Serving on port 3000');
});

// Anotation> for initial setup
// app.get('/makeCampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping!' });
//     try {
//         const savedCampground = await camp.save();
//         res.send(savedCampground);
//     } catch (err) {
//         console.log(err);
//         res.send('Error creating campground');
//     }
// });