const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

console.log(userController);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
