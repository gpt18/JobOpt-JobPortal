const express = require('express');
const { handleGetStudentProfile, handleGetStudentTransactions, handleGetAllJob, handleApplyJob, handleGetAppliedJobs } = require('../../controllers/studentController');
const router = express.Router();

router.get('/profile/:email', handleGetStudentProfile);
router.get('/account-history/:id', handleGetStudentTransactions);
router.get('/all-jobs', handleGetAllJob);
router.post('/apply-job/:id', handleApplyJob)
router.get('/applied-jobs/:id', handleGetAppliedJobs);


module.exports = router