const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/login' ,userController.login);
router.post('/check', userController.emailCheck);


module.exports = {
    router
};