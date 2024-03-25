const express = require('express');
const { handleSendOtp, handleVerifyOtp } = require('../../controllers/authController');
const router =  express.Router();

router.post('/send-otp', handleSendOtp);
router.post('/verify-otp', handleVerifyOtp);

module.exports = router