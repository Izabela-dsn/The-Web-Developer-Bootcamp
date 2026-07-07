const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground');
const { campgroundSchema, reviewSchema } = require('./schemas');
const Review = require('./models/review')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}
const validateCampgroundReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

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

app.post('/campgrounds', validateCampground, async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    try {
        await campground.save();
        res.redirect('/campgrounds');
    } catch (err) {
        console.log(err);
        next(err)
        // res.send('Error creating campsground');
    }
});

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id).populate('reviews');
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
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
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

app.post('/campgrounds/:id/reviews', validateCampgroundReview, async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    try {
        campground.reviews.push(review)
        await review.save()
        await campground.save()
        res.redirect(`/campgrounds/${campground._id}`)

    } catch (err) {
        console.log(err);
        res.send('Error fetching campground');
    }
})

app.delete('/campgrounds/:id/reviews/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    try {
        await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId)
        res.redirect(`/campgrounds/${id}`)
    } catch (error) {
        console.log(err);
        res.send('Error fetching campground');
    }
})

app.all('/{*path}', (req, res, next) => {
    next(new ExpressError("Page Not Found :>(", 404))
    // res.send("404")
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!"
    res.status(statusCode).render('error', { err });
    // res.send("something went wrong!")
})

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

// not gonna use carchAsync because Express is updated 