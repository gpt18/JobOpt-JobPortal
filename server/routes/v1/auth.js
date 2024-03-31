const express = require('express');
const { handleSendOtp, handleVerifyOtp, handlePremission } = require('../../controllers/authController');
const { addAuthPayload } = require('../../middleware/auth');
const router =  express.Router();

router.post('/send-otp', handleSendOtp);
router.post('/verify-otp', handleVerifyOtp);
router.get('/p', addAuthPayload, handlePremission);

module.exports = router
