const express = require('express')
const router = express.Router({ mergeParams: true })
const methodOverride = require('method-override')
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.use(methodOverride('_method'));

router.get('/', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    } catch (err) {
        console.log(err);
        res.send('Error fetching campgrounds');
    }
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.post('/', isLoggedIn, validateCampground, async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    try {
        campground.author = req.user._id;
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
        const campground = await Campground.findById(id).populate(
            {
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            }
        ).populate('author');
        res.render('campgrounds/show', { campground });
    } catch (err) {
        req.flash('error', 'Cannot find that campground')
        console.log(err);
        //res.send('Error fetching campground');
        res.redirect('/campgrounds');
    }
});

router.get('/:id/edit', isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    try {
        const campground = await Campground.findById(id);
        if (!campground) {
            req.flash('error', 'Cannot find that campground')
            return res.redirect('/campgrounds');
        }
        res.render('campgrounds/edit', { campground });
    } catch (err) {
        req.flash('error', 'Cannot edit that campground')
        console.log(err);
        // res.send('Error fetching campground');
        res.redirect('/campgrounds');
    }
});

router.put('/:id', isLoggedIn, isAuthor, async (req, res) => {
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

router.delete('/:id', isLoggedIn, isAuthor, async (req, res) => {
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