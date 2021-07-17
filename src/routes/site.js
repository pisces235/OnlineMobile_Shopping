const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// website.index

router.get('/cart', siteController.cart);
router.get('/filter', siteController.filter);
router.get('/', isLoggedIn, siteController.index);

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/user/login');
  }
  function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }
  