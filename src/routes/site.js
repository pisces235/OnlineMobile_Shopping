const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// website.index

router.get('/cart', siteController.cart);
router.get('/filter', siteController.filter);
router.get('/', siteController.index);

module.exports = router;