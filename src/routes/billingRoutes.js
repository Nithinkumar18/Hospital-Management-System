

const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const validateRequest = require('../middleware/userAuthorization');
const validateRole = require('../middleware/roleAuthorization');

router.get('/allbills',validateRequest,validateRole(['Admin','Staff']),billingController.Bills);
router.get('/customRange/:start_date/:end_date',validateRequest,validateRole(['Admin']),billingController.customGeneratedBillsRevenue);
router.get('/revenue',validateRequest,validateRole(['Admin']),billingController.generatedRevenue);
router.get('/patientBill/:patientId',validateRequest,validateRole(['Admin','Staff']),billingController.viewPatientBills);
router.post('/upload',validateRequest,validateRole(['Staff','Admin']),billingController.uploadBill);
router.put('/updatebill/:bill_id',validateRequest,validateRole(['Staff','Admin']),billingController.updateBillInfo);
router.delete('/delete/:billId',validateRequest,validateRole(['Admin','Staff']),billingController.deleteBills);


module.exports = router;