const express = require('express');
const { handleSelectRole, handleCreateCompanyProfile } = require('../../controllers/registerController');
const router =  express.Router();

router.post('/select-role', handleSelectRole);
router.post('/company/:id', handleCreateCompanyProfile);


module.exports = router