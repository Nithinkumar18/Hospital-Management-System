const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/userAuthorization');
const validateRole = require('../middleware/roleAuthorization');
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', validateRequest, validateRole(['Staff', 'Doctor', 'Admin']), appointmentController.allAppointments);
router.get('/doctor/:doctorId', validateRequest, validateRole(['Staff', 'Doctor', 'Admin']), appointmentController.viewDoctorAppointments);
router.get('/patient/:patientId', appointmentController.viewPatientAppointments);
router.get('/byStatus/:status', validateRequest, validateRole(['Staff', 'Admin']), appointmentController.viewAllAppointmentsByCategory);
router.post('/schedule', validateRequest, validateRole(['Staff', 'Doctor', 'Admin']), appointmentController.scheduleAnAppointment);
router.put('/update/:appid', validateRequest, validateRole(['Staff', 'Doctor', 'Admin']), appointmentController.updateAppointmentInfo);
router.delete('/remove/:appointmentId', validateRequest, validateRole(['Staff', 'Doctor', 'Admin']), appointmentController.deleteAnAppointment);


module.exports = router;