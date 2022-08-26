"use strict";

const express = require('express');
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth')
const router = express.Router();


router.get('/', auth.validationToken, cartController.getCartListAll);
router.delete('/image/:imageId', auth.validationToken, cartController.deleteCartProduct);
router.patch('/plus/image/:imageId', auth.validationToken, cartController.cartProductQuantityPlus);
router.patch('/minus/image/:imageId', auth.validationToken, cartController.cartProductQuantityMinus);
router.post('/order/image/:imageId', auth.validationToken, cartController.orderInfo);

module.exports = { router };