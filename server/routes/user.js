const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const auth = require('../middleware/authenticateUser');

router.post('/signup', authController.signupRequest)
router.post('/verify-otp/:email', authController.verifyOTP);
router.post('/logout', auth, authController.logout);
router.post('/login', authController.login);
router.get('/login-google',authController.googleLogin);
router.post('/resetPassOtpRequest/:email', authController.resetPasswordOtpRequest);
router.post('/verify-ResetPassOtp/:email', authController.verifyResetPassOTP);
router.put('/update-password/',auth, authController.updatePassword);

router.get('/all-users/',auth, userController.getAllUsers);
// router.get('/all-users/:page/:pageSize/:lastId', auth, userController.getAllUsers); //infinity load route...

module.exports = router;