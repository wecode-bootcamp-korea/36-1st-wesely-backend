const express = require('express');
const productController =require('../controllers/productController');

const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/all', productController.getProducts);
router.get('/main', productController.getMain);

router.post('/cartIn',auth.validationToken, productController.createCart);
router.get('/detail/:productId', productController.getDetail);

module.exports={
    router
}
