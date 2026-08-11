const express = require('express')
const router = express.Router({mergeParams: true})
const methodOverride = require('method-override')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');

router.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.get('/', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    } catch (err) {
        console.log(err);
        res.send('Error fetching campgrounds');
    }
});

router.get('/new', isLoggedIn,(req, res) => {
    res.render('campgrounds/new');
});

router.post('/', validateCampground, async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    try {
        await campground.save();
        req.flash('success', "Successfully made a new campground")
        res.redirect('/campgrounds');
    } catch (err) {
        console.log(err);
        next(err)
        // res.send('Error creating campsground');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id).populate('reviews');
        res.render('campgrounds/show', { campground });
    } catch (err) {
        req.flash('error', 'Cannot find that campground')
        console.log(err);
        //res.send('Error fetching campground');
        res.redirect('/campgrounds');
    }
});

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id);
        res.render('campgrounds/edit', { campground });
    } catch (err) {
        req.flash('error', 'Cannot edit that campground')
        console.log(err);
        // res.send('Error fetching campground');
        res.redirect('/campgrounds');
    }
});

router.put('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        req.flash('success', "Successfully updated campground")
        res.redirect(`/campgrounds/${campground._id}`);
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground')
    }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findByIdAndDelete(id);
        req.flash('success', 'Successfully deleted the campground')
        res.redirect(`/campgrounds`);
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground')
    }
});

module.exports = router