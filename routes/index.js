const express = require('express');
const router = express.Router({mergeParams:true});
const passport = require('passport');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/register', (req, res) => {
    res.render('register');
})

// handle signup logic
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err)
            req.flash('error', err.message)
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp,  '    +      user.username);
            res.redirect('/campgrounds');
        });
    });
});

router.get('/login',  (req, res) => {
    res.render('login');
})

// handling login routes
router.post('/login', passport.authenticate('local', 
{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
});

// logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged you out');
    res.redirect('/campgrounds');
})

module.exports = router;
