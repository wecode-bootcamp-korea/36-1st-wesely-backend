const express = require('express');
const homeController =require('../controllers/homeController');

const router = express.Router();

router.get('/main', homeController.getProducts);

module.exports={
    router
}