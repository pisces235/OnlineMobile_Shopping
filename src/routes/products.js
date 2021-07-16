const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductController');


router.get('/search', productsController.search);

router.post('/filter-search', productsController.filter_search);

router.post('/filter', productsController.filter);


router.get('/:id', productsController.show);
// productsController.index
router.get('/', productsController.index);

module.exports = router;
