const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../app/controllers/UserController');

// userController
router.get('/update/:id', userController.update);
router.get('/add/:id', isLoggedIn, userController.add);
router.get('/logout', isLoggedIn, userController.logout);
router.get('/login', userController.login);
router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/products',
    failureRedirect: 'login',
    failureFlash: true,
}));
router.get('/register', userController.register);
router.post('/register', passport.authenticate('local.signup', {
    successRedirect: '/products',
    failureRedirect: 'register',
    failureFlash: true,
}));

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/user/signin');
  }
  function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }
  