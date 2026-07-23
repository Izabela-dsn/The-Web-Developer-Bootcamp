const express = require('express')
const router = express.Router({mergeParams: true})
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const { reviewSchema } = require('../schemas.js');
const Review = require('../models/review')

const validateCampgroundReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.post('/', validateCampgroundReview, async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    try {
        campground.reviews.push(review)
        await review.save()
        await campground.save()
        req.flash('success', 'Successfully created a new review')
        res.redirect(`/campgrounds/${campground._id}`)
    } catch (err) {
        console.log(err);
        res.send('Error fetching campground');
    }
})

router.delete('/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    try {
        await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId)
        req.flash('success', 'Successfully deleted a review')
        res.redirect(`/campgrounds/${id}`)
    } catch (error) {
        console.log(error);
        res.send('Error fetching campground');
    }
})

module.exports = router 