const express = require('express');
const router = express.Router({mergeParams:true});
const Campground = require('../models/campground');
const middleware = require('../middleware/index');

// Show campgrounds
router.get('/', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err)
        } else {
            res.render('campgrounds/index',{campgrounds: campgrounds})
        }
    })
});

// Create new backgrounds
router.post('/', middleware.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const price = req.body.price;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, image: image, description: desc, author: author, price: price}
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err)
        } else {
            console.log(newlyCreated);
            res.redirect('/campgrounds')
        }
    })
})

// New campground form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

// SHOW-shows more info about a campground
router.get('/:id', (req, res) => {
    // find the campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err) {
            console.log(err)
        } else {
            // render the show template
            res.render('campgrounds/show', {campgrounds: foundCampground});
        }
    })
});

// edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            req.flash('error', 'Campground not found')

        } else {
            res.render('campgrounds/edit', {campgrounds: foundCampground});
        }
    });
});

// update campground routes
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
    // redirect to the show page
})

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, middleware.isLoggedIn, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, deletedCampground) => {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
})

module.exports = router;
