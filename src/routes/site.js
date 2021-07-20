const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// website.index

router.get('/cart', isLoggedIn,siteController.cart);
router.get('/checkout', isLoggedIn, siteController.checkout);
router.get('/order', siteController.order);
router.get('/filter', siteController.filter);
router.use('/', siteController.index);


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
  