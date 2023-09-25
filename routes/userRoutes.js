const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const User = require('../models/User'); // Import the User model

router.get('/signup', authController.signup);
router.get('/login', authController.login);

router.get('/getAllUsers', authController.getAllUsers);

router.get('/user/:userId', authController.getUserById);

  
module.exports = router;