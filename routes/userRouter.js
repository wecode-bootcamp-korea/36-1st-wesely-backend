const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/signIn' , userController.signIn);
router.post('/authRouter', userController.authRouter);


module.exports = {
    router
};