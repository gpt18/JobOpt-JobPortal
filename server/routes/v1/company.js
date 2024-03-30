const express = require('express');
const { handleGetCompanyBalance, 
    handleGetCompanyProfile, 
    handleGetCompanyTransactions, 
    handlePostJob,
    handleGetAllJob } = require('../../controllers/companyController');
const router = express.Router();

router.get('/balance/:id', handleGetCompanyBalance);
router.get('/profile/:email', handleGetCompanyProfile );
router.get('/account-history/:id', handleGetCompanyTransactions);
router.post('/post-job', handlePostJob);
router.get('/all-jobs/:id', handleGetAllJob);

module.exports = router