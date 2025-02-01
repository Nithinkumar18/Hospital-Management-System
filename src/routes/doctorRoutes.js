const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const validateRequest = require('../middleware/userAuthorization');
const validateRole = require('../middleware/roleAuthorization');

router.get('/viewdoctors',validateRequest,doctorController.viewAllDoctors);
router.post('/addDoctor',validateRequest,validateRole(['Admin']),doctorController.assignDept);
router.put('/bookconsultation/:d_id',validateRequest,validateRole(['Staff','Admin']),doctorController.assignDoctorToPatient);


module.exports = router;