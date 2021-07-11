const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductController');

// productsController.index

router.use('/', productsController.index);

module.exports = router;
