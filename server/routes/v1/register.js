const express = require('express');
const { handleSelectRole } = require('../../controllers/registerController');
const router =  express.Router();

router.post('/select-role', handleSelectRole);

module.exports = router