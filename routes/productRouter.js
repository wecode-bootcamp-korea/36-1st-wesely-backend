const express = require('express');
const productController =require('../controllers/productController');

const router = express.Router();

router.get('/home', productController.getProducts);

module.exports={
    router
}