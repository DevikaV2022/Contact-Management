const express = require('express');
const router = express.Router();

// import controllers
const{
    registerController,
    forgotPassword,
    resetPassword
} = require('../controllers/userController')
const authController = require("../controllers/authController")

router.post('/register', registerController);
router.post('/login', authController.loginController);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
