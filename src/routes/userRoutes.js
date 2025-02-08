const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middleware/userAuthorization');
const validateRole = require('../middleware/roleAuthorization');


router.post('/signup',userController.signUpUser);
router.get('/view',validateRequest,validateRole(['Admin']),userController.listUsers);
router.put('/update/:userId',validateRequest,userController.updateProfile);
router.delete('/deactivateAcc/:userid',validateRequest,validateRole(['Admin']),userController.UnregisterUser);
router.post('/login',userController.signIn);


module.exports = router;
