const express = require('express');
const { handleGetCompanyBalance, handleGetCompanyProfile } = require('../../controllers/companyController');
const router = express.Router();

router.get('/balance/:id', handleGetCompanyBalance);
router.get('/:id', handleGetCompanyProfile );

module.exports = router