const express = require('express');
const { handleSendOtp, handleVerifyOtp, handlePremission } = require('../../controllers/authController');
const { addAuthPayload } = require('../../middleware/auth');
const router =  express.Router();

router.get('/', (req, res) => {
    res.send("You Hit the Auth Route!")
})

router.post('/send-otp', handleSendOtp);
router.post('/verify-otp', handleVerifyOtp);
router.get('/p', addAuthPayload, handlePremission);

module.exports = router
