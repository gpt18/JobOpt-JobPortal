const express = require('express');
const { handleSelectRole, 
    handleCreateCompanyProfile,
    handleCreateStudentProfile } = require('../../controllers/registerController');
const router =  express.Router();

router.post('/select-role', handleSelectRole);
router.post('/company/create', handleCreateCompanyProfile);
router.post('/student/create', handleCreateStudentProfile);


module.exports = router