"use strict";

const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/user/:user_id', cartController.getCartListAll);
router.delete('/user/:user_id/image/:image_id', cartController.deleteCartProduct);
router.patch('/plus/user/:user_id/image/:image_id', cartController.cartProductQuantityPlus);
router.patch('/minus/user/:user_id/image/:image_id', cartController.cartProductQuantityMinus);
router.post('/order/user/:user_id/image/:image_id', cartController.orderInfo);

module.exports = { router };