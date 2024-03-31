const express = require('express');
const { handleSelectRole, 
    handleCreateCompanyProfile,
    handleCreateStudentProfile } = require('../../controllers/registerController');
const { addAuthPayload } = require('../../middleware/auth');
const router =  express.Router();

router.get('/', (req, res) => {
    res.send("You Hit the Register Route!")
})


router.post('/select-role', handleSelectRole);
router.post('/company/create', addAuthPayload, handleCreateCompanyProfile);
router.post('/student/create', addAuthPayload, handleCreateStudentProfile);


module.exports = router