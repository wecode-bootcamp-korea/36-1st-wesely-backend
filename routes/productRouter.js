const express = require('express');
const productController =require('../controllers/productController');

const router = express.Router();

router.get('/home', productController.getProducts);
router.get('/detail/:productId', productController.getDetail);

module.exports={
    router
}