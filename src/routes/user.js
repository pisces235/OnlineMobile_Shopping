const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// userController
router.get('/update/:id', userController.update);
router.get('/add/:id', userController.add)
router.get('/login', userController.login);
router.get('/signin', userController.signin);

module.exports = router;