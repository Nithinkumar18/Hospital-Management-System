
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const validateRequest = require('../middleware/userAuthorization');
const validateRole = require('../middleware/roleAuthorization');


router.post('/register',validateRequest,validateRole(['Staff','Admin']),patientController.addNewPatient);
router.get('/profile/:id',validateRequest,validateRole(['Staff','Admin','Doctor']),patientController.viewPatient);
router.get('/viewPatients',validateRequest,validateRole(['Staff','Admin','Doctor']),patientController.viewAllPatients);
router.put('/profileupdate/:id',validateRequest,validateRole(['Staff','Admin','Doctor']),patientController.updateProfile);
router.put('/deactivate/:id',validateRequest,validateRole(['Admin']),patientController.deletePatientRecord);


module.exports = router;