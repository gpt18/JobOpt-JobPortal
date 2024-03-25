const express = require('express');
const { handleGetCompanyBalance } = require('../../controllers/companyController');
const router = express.Router();

router.get('/balance/:id', handleGetCompanyBalance);

module.exports = router