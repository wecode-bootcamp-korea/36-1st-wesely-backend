const express = require('express');
const productController =require('../controllers/productController');

const router = express.Router();

router.get('/all', productController.getProducts);
router.get('/main', productController.getMain);

module.exports={
    router
}