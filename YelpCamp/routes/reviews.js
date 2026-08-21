const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground');
const Review = require('../models/review')
const { validateCampgroundReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateCampgroundReview, async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    try {
        review.author = req.user._id
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

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, async (req, res) => {
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